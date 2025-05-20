from fastapi import FastAPI, HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from passlib.context import CryptContext
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import mysql.connector
from datetime import datetime, timedelta
from jose import JWTError, jwt  # Corrigido
from datetime import datetime
import requests

#Verificar ultimo acesso do usuário
from datetime import datetime

def format_last_access(dt):
    if not dt:
        return "Nunca acessou"
    agora = datetime.now()
    diff = agora - dt
    if diff.days == 0:
        return "Hoje"
    elif diff.days == 1:
        return "Ontem"
    elif diff.days < 7:
        return f"Há {diff.days} dias"
    else:
        return dt.strftime("%d/%m/%Y")


# JWT Configurações
SECRET_KEY = "chave_super_secreta_123456"
ALGORITHM = "HS256"
EXPIRA_MINUTOS = 60

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Inicia app
app = FastAPI()

# CORS liberado para testes e frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8081", "http://192.168.0.15:8081"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Gera o token
def criar_token(dados: dict):
    to_encode = dados.copy()
    to_encode.update({"exp": datetime.utcnow() + timedelta(minutes=EXPIRA_MINUTOS)})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

# Verifica e decodifica o token
def verificar_token(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return {"usuario": payload["sub"], "permissao": payload["permissao"]}
    except JWTError:
        raise HTTPException(status_code=401, detail="Token inválido ou expirado")

# Verifica se o token é válido e se a permissão é 'admin'
def verificar_permissao_admin(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        if payload.get("permissao") != "admin":
            raise HTTPException(status_code=403, detail="Acesso restrito a administradores")
        return payload["sub"]
    except JWTError:
        raise HTTPException(status_code=401, detail="Token inválido ou expirado")

# Conexão MySQL
def conectar():
    return mysql.connector.connect(
        host="localhost",
        user="admin",
        password="fabio",
        database="publicacoes_db"
    )

# Modelos
class Publicacao(BaseModel):
    data_publicacao: datetime | None = None
    tema: str
    roteiro: str
    tom: str | None = None
    tipo: str | None = None
    objetivo: str | None = None
    resposta: str | None = None
    status_publicacao: str | None = "pendente"

class GerarConteudo(BaseModel):
    id: int

# Login
@app.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    conn = conectar()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT * FROM usuarios WHERE email = %s", (form_data.username,))
    usuario = cursor.fetchone()

    cursor.close()
    conn.close()

    if not usuario or not pwd_context.verify(form_data.password, usuario["senha"]):
        raise HTTPException(status_code=401, detail="Usuário ou senha inválidos")

    token = criar_token({
        "sub": usuario["email"],
        "nome": usuario["nome"],
        "permissao": usuario["perfil"]
    })

    return {"access_token": token, "token_type": "bearer"}

# Rota protegida simples
@app.get("/usuario/info")
def info_usuario(dados: dict = Depends(verificar_token)):
    return {"usuario": dados["usuario"], "mensagem": "Você acessou uma rota protegida"}

# Rota somente para admin
@app.get("/admin/somente")
def admin_area(dados: dict = Depends(verificar_token)):
    if dados["permissao"] != "admin":
        raise HTTPException(status_code=403, detail="Acesso negado. Apenas administradores.")
    return {"mensagem": f"Olá, {dados['usuario']}! Acesso autorizado como administrador."}

# Busca categorias por tipo
@app.get("/categorias/{tipo}")
def listar_categorias(tipo: str):
    conn = conectar()
    cursor = conn.cursor()
    cursor.execute("SELECT valor FROM categorias_publicacao WHERE tipo = %s", (tipo,))
    resultados = [linha[0] for linha in cursor.fetchall()]
    cursor.close()
    conn.close()
    return resultados

# Busca categorias por nome de tipo
@app.get("/categorias/tom")
def listar_tons():
    conn = conectar()
    cursor = conn.cursor()
    cursor.execute("SELECT nome FROM categorias WHERE tipo = 'tom'")
    resultado = [row[0] for row in cursor.fetchall()]
    cursor.close()
    conn.close()
    return resultado

@app.get("/categorias/tipo")
def listar_tipos():
    conn = conectar()
    cursor = conn.cursor()
    cursor.execute("SELECT nome FROM categorias WHERE tipo = 'tipo'")
    resultado = [row[0] for row in cursor.fetchall()]
    cursor.close()
    conn.close()
    return resultado

@app.get("/categorias/objetivo")
def listar_objetivos():
    conn = conectar()
    cursor = conn.cursor()
    cursor.execute("SELECT nome FROM categorias WHERE tipo = 'objetivo'")
    resultado = [row[0] for row in cursor.fetchall()]
    cursor.close()
    conn.close()
    return resultado

# Criar novo usuário
class NovoUsuario(BaseModel):
    nome: str
    email: str
    senha: str
    perfil: str  # Deve ser 'admin' ou 'usuario'

@app.post("/usuarios")
def criar_usuario(dados: NovoUsuario, usuario: str = Depends(verificar_permissao_admin)):
    conn = conectar()
    cursor = conn.cursor()

    # Validações básicas
    if dados.perfil not in ["admin", "usuario"]:
        raise HTTPException(status_code=400, detail="Perfil inválido. Use 'admin' ou 'usuario'.")

    try:
        senha_hash = pwd_context.hash(dados.senha)
        cursor.execute("""
            INSERT INTO usuarios (nome, email, senha, perfil, avatar, ativo)
            VALUES (%s, %s, %s, %s, %s, %s)
        """, (
            dados.nome,
            dados.email,
            senha_hash,
            dados.perfil,
            None,  # avatar padrão temporário
            1
        ))
        conn.commit()
        return {"mensagem": "Usuário criado com sucesso"}
    except mysql.connector.Error as e:
        raise HTTPException(status_code=500, detail=f"Erro ao criar usuário: {str(e)}")
    finally:
        cursor.close()
        conn.close()



# Criar nova publicação e acionar IA


    # Apos inserir, aciona IA automaticamente (sem gravar resposta no banco)
@app.post("/publicacoes")
def criar_publicacao(dados: Publicacao):
    conn = conectar()
    cursor = conn.cursor()

    # Verifica se a data foi informada
    data_publicacao = dados.data_publicacao
    agora = datetime.now()

    # ✅ Validações
    if not data_publicacao:
        raise HTTPException(status_code=400, detail="A data e hora da publicação são obrigatórias.")
    
    if data_publicacao < agora:
        raise HTTPException(status_code=400, detail="A data da publicação não pode ser no passado.")
    
    if (data_publicacao - agora).total_seconds() < 300:
        raise HTTPException(status_code=400, detail="A data da publicação deve ser pelo menos 5 minutos após o horário atual.")

    # ✅ Define o status com base na data
    if data_publicacao > agora + timedelta(minutes=5):
        status = "agendado"
    else:
        status = "pendente"

    # ✅ Insere a publicação no banco
    sql = """
        INSERT INTO publicacoes (data_publicacao, tema, roteiro, tom, tipo, objetivo, resposta, status_publicacao)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
    """
    valores = (
        data_publicacao,
        dados.tema,
        dados.roteiro,
        dados.tom,
        dados.tipo,
        dados.objetivo,
        dados.resposta,
        status
    )

    cursor.execute(sql, valores)
    conn.commit()
    novo_id = cursor.lastrowid

    # ✅ Aciona o N8N para geração de conteúdo com IA
    try:
        url_n8n = "http://192.168.0.8:5678/webhook/gera-ia"
        requests.post(
            url_n8n,
            json={
                "id": novo_id,
                "tema": dados.tema,
                "roteiro": dados.roteiro,
                "tom": dados.tom,
                "tipo": dados.tipo,
                "objetivo": dados.objetivo
            },
            timeout=1
        )
    except Exception as e:
        print(f"Erro ao acionar IA: {e}")

    # ✅ Finaliza a conexão
    cursor.close()
    conn.close()
    return {"mensagem": "Publicação criada com sucesso", "id": novo_id}

# Listar publicações
# Listar publicações com paginação
@app.get("/publicacoes")
def listar_publicacoes(pagina: int = 1, limite: int = 20):
    conn = conectar()
    cursor = conn.cursor(dictionary=True)

    offset = (pagina - 1) * limite

    cursor.execute("SELECT COUNT(*) AS total FROM publicacoes")
    total = cursor.fetchone()["total"]

    cursor.execute("SELECT * FROM publicacoes ORDER BY id DESC LIMIT %s OFFSET %s", (limite, offset))
    publicacoes = cursor.fetchall()

    cursor.close()
    conn.close()

    return {
        "publicacoes": publicacoes,
        "pagina": pagina,
        "limite": limite,
        "total": total,
        "total_paginas": (total + limite - 1) // limite
    }


# Obter publicação por ID
@app.get("/publicacoes/{id}")
def obter_publicacao(id: int):
    conn = conectar()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM publicacoes WHERE id = %s", (id,))
    resultado = cursor.fetchone()
    cursor.close()
    conn.close()
    if not resultado:
        raise HTTPException(status_code=404, detail="Publicação não encontrada")
    return resultado

# Atualizar resposta da publicação (usado somente ao agendar)
@app.put("/publicacoes/{id}/resposta")
def atualizar_resposta(id: int, dados: dict):
    conn = conectar()
    cursor = conn.cursor()
    try:
        cursor.execute(
            "UPDATE publicacoes SET resposta = %s, status_publicacao = 'rascunho' WHERE id = %s",
            (dados.get("resposta"), id)
        )
        conn.commit()
        return {"mensagem": "Resposta atualizada com sucesso"}
    except Exception as e:
        return {"erro": str(e)}
    finally:
        cursor.close()
        conn.close()


@app.get("/executar-agendadas")
def executar_agendadas():
    agora = datetime.now()
    conn = conectar()
    cursor = conn.cursor(dictionary=True)


#lista  usuários do banco
@app.get("/usuarios")
def listar_usuarios(dados: dict = Depends(verificar_token)):
    conn = conectar()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT id, nome, email, perfil, avatar, ultimo_acesso, ativo FROM usuarios")
    resultados = cursor.fetchall()

    usuarios = []
    for u in resultados:
        usuarios.append({
            "id": str(u["id"]),
            "name": u["nome"],
            "email": u["email"],
            "username": f"@{u['nome'].split()[0].lower()}",
            "role": u["perfil"],
            "avatar": u["avatar"] if u["avatar"] else "/user.jpg",
            "status": "Online" if u["ativo"] else "Offline",
            "lastAccess": format_last_access(u["ultimo_acesso"]),
            "isActive": bool(u["ativo"]),
        })

    cursor.close()
    conn.close()
    return usuarios



    # Busca publicações que devem ser executadas
    cursor.execute("""
        SELECT * FROM publicacoes
        WHERE status_publicacao = 'agendado'
        AND data_publicacao <= %s
    """, (agora,))
    publicacoes = cursor.fetchall()

    for pub in publicacoes:
        try:
            # Converte datetime para string ISO
            dados_convertidos = {
                k: (v.isoformat() if isinstance(v, datetime) else v)
                for k, v in pub.items()
            }

            response = requests.post(
                "https://light-catfish-46.hooks.n8n.cloud/webhook/publicar-linkedin",
                json=dados_convertidos,
                timeout=3
            )

            print(f"[✔] Publicação {pub['id']} enviada - status {response.status_code}")

        except Exception as e:
            print(f"[✘] Erro ao enviar publicação {pub['id']} para o N8N: {e}")

#deltar usuários
@app.delete("/usuarios/{id}")
def deletar_usuario(id: int, dados: dict = Depends(verificar_permissao_admin)):
    conn = conectar()
    cursor = conn.cursor()
    try:
        cursor.execute("DELETE FROM usuarios WHERE id = %s", (id,))
        conn.commit()
        return {"mensagem": "Usuário deletado com sucesso"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()
        conn.close()




# configuraçõe para ADM
@app.get("/configuracoes")
def acessar_configuracoes(usuario: str = Depends(verificar_permissao_admin)):
    # TODO: Implementar painel de configurações administrativas futuramente.
    # Este endpoint deve permitir visualização e edição de parâmetros do sistema,
    # gerenciamento de usuários, permissões e demais opções administrativas.
    # A estrutura será movida para um módulo separado posteriormente.
    return {
        "admin": usuario,
        "mensagem": "Você tem permissão de administrador e pode acessar as configurações do sistema."
    }



    cursor.close()
    conn.close()
    return {"executadas": len(publicacoes)}


# ------------------------------------------------------------
# 🔒 [PLANEJAMENTO FUTURO] Controle de Permissão por Tipo de Usuário
#
# Objetivo: diferenciar acessos com base em perfis como "admin", "comum", etc.
#
# Como fazer:
# 1. No momento do login, incluir no payload do token o campo "permissao":
#       Ex: criar_token({"sub": form_data.username, "permissao": "admin"})
# 2. Na função verificar_token(), extrair esse campo:
#       permissao = payload.get("permissao")
# 3. Usar Depends em rotas protegidas para validar permissões específicas:
#       def rota_admin(usuario = Depends(verificar_token)):
#           if usuario['permissao'] != "admin":
#               raise HTTPException(403, detail="Acesso restrito")
#
# Exemplo de payload JWT:
# {
#     "sub": "fabio",
#     "permissao": "comum",
#     "exp": 1234567890
# }
#
# Isso permitirá restringir funcionalidades por tipo de usuário.
# ------------------------------------------------------------


# --------------------------------------------
# [🔐 CONTROLE DE PERMISSÕES - FUTURO]
# O campo "permissao" já está sendo incluído no JWT.
# Exemplo: {"sub": "fabio", "permissao": "admin"}
#
# ➤ Próximos passos para implementar controle de acesso:
# 1. Criar função verificar_permissao() para validar tipos de usuários.
# 2. Usar Depends(verificar_permissao) nas rotas com restrições.
# 3. Aplicar lógica: if permissao != 'admin': raise HTTPException(403)
# --------------------------------------------
