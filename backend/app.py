from fastapi import FastAPI, HTTPException, Depends, status, Body, Query
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from passlib.context import CryptContext
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import mysql.connector
import subprocess
from datetime import datetime, timedelta
from jose import JWTError, jwt
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, EmailStr
import requests
import traceback  


# JWT Configurações
SECRET_KEY = "chave_super_secreta_123456"
ALGORITHM = "HS256"
EXPIRA_MINUTOS = 60

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Inicia app
app = FastAPI()

app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")
# CORS liberado para testes e frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8081", "http://192.168.0.15:8081"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Verificar último acesso do usuário

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

# Conexão MySQL

def conectar():
    return mysql.connector.connect(
        host="localhost",
        user="admin",
        password="fabio",
        database="publicacoes_db"
    )

#buscar usuários no localStorage
def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token inválido ou expirado",
            headers={"WWW-Authenticate": "Bearer"},
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

class NovoUsuario(BaseModel):
    nome: str
    email: str
    senha: str
    perfil: str  # Deve ser 'admin' ou 'usuario'

# Gera o token

def criar_token(dados: dict):
    to_encode = dados.copy()
    to_encode.update({"exp": datetime.utcnow() + timedelta(minutes=EXPIRA_MINUTOS)})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def verificar_token(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return {"usuario": payload["sub"], "permissao": payload["permissao"]}
    except JWTError:
        raise HTTPException(status_code=401, detail="Token inválido ou expirado")

def verificar_permissao_admin(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        if payload.get("permissao") != "admin":
            raise HTTPException(status_code=403, detail="Acesso restrito a administradores")
        return payload["sub"]
    except JWTError:
        raise HTTPException(status_code=401, detail="Token inválido ou expirado")

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
        "permissao": usuario["perfil"],
        "id":usuario["id"]
    })
    registrar_atividade(usuario["nome"], "fez login no sistema", "usuario")
    return {
        "access_token": token,
        "token_type": "bearer",
        "nome": usuario["nome"],
        "perfil": usuario["perfil"],
        "usuario_id": usuario["id"],
        "avatar": usuario["avatar"] or "/public/user.jpg"
}

# Cria log de atividades
def registrar_atividade(usuario: str, acao: str, tipo: str):
    conn = conectar()
    cursor = conn.cursor()
    try:
        agora = datetime.now()  # inclui data e hora
        cursor.execute("""
            INSERT INTO log_atividades (usuario, acao, tipo, data)
            VALUES (%s, %s, %s, %s)
        """, (usuario, acao, tipo, agora))
        conn.commit()
    except Exception as e:
        print(f"Erro ao registrar log: {e}")
    finally:
        cursor.close()
        conn.close()


# Cria log de atividades
def registrar_atividade(usuario: str, acao: str, tipo: str):
    conn = conectar()
    cursor = conn.cursor()
    try:
        agora = datetime.now()  # inclui data e hora
        cursor.execute("""
            INSERT INTO log_atividades (usuario, acao, tipo, data)
            VALUES (%s, %s, %s, %s)
        """, (usuario, acao, tipo, agora))
        conn.commit()
    except Exception as e:
        print(f"Erro ao registrar log: {e}")
    finally:
        cursor.close()
        conn.close()


# Consulta consolidada de status de usuários
@app.get("/usuarios/status")
def contar_usuarios():
    conn = conectar()
    cursor = conn.cursor(dictionary=True)
    sete_dias_atras = (datetime.now() - timedelta(days=7)).strftime('%Y-%m-%d')

    cursor.execute("""
        SELECT 
            COUNT(*) AS total,
            SUM(CASE WHEN ativo = 1 THEN 1 ELSE 0 END) AS ativos,
            SUM(CASE WHEN ativo = 2 THEN 1 ELSE 0 END) AS inativos,
            SUM(CASE WHEN data_criacao >= %s THEN 1 ELSE 0 END) AS novos
        FROM usuarios
    """, (sete_dias_atras,))

    resultado = cursor.fetchone()
    cursor.close()
    conn.close()
    return resultado

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

# Busca categorias  no banco
@app.get("/categorias/{tipo}")
def listar_categorias(tipo: str):
    conn = conectar()
    cursor = conn.cursor()
    cursor.execute("SELECT nome FROM categorias WHERE tipo = %s", (tipo,))
    resultados = [linha[0] for linha in cursor.fetchall()]
    cursor.close()
    conn.close()
    return resultados

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

@app.get("/categorias/publico")
def listar_publico():
    conn = conectar()
    cursor = conn.cursor()
    cursor.execute("SELECT nome FROM categorias WHERE tipo = 'publico'")
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

#Rota para  atividdes recentes 
@app.get("/atividades/recentes")
def listar_atividades_recentes():
    conn = conectar()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT usuario, acao, tipo, data
        FROM log_atividades
        ORDER BY data DESC
        LIMIT 10
    """)

    atividades = cursor.fetchall()

    for a in atividades:
        a["tempo"] = format_last_access(a["data"])
        # ⛔️ Não remover mais 'data'

    cursor.close()
    conn.close()

    return atividades



# Criar nova publicação e acionar IA


     # Apos inserir, aciona IA automaticamente (sem gravar resposta no banco)
#@app.post("/publicacoes")
#def criar_publicacao(dados: Publicacao):
#    conn = conectar()
#    cursor = conn.cursor()

    # Verifica se a data foi informada
#    data_publicacao = dados.data_publicacao
#    agora = datetime.now()
#
#    # ✅ Validações
#    if not data_publicacao:
#        raise HTTPException(status_code=400, detail="A data e hora da publicação são obrigatórias.")
#    
#    if data_publicacao < agora:
#        raise HTTPException(status_code=400, detail="A data da publicação não pode ser no passado.")
#    
#    if (data_publicacao - agora).total_seconds() < 300:
#        raise HTTPException(status_code=400, detail="A data da publicação deve ser pelo menos 5 minutos após o horário atual.")
#
#    # ✅ Define o status com base na data
#    if data_publicacao > agora + timedelta(minutes=5):
#        status = "agendado"
#    else:
#        status = "pendente"
#
#    # ✅ Insere a publicação no banco
#    sql = """
#        INSERT INTO publicacoes (data_publicacao, tema, roteiro, tom, tipo, objetivo, resposta, status_publicacao)
#        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
#    """
#    valores = (
#        data_publicacao,
#        dados.tema,
#        dados.roteiro,
#        dados.tom,
#        dados.tipo,
#        dados.objetivo,
#        dados.resposta,
#        status
#    )
#
#    cursor.execute(sql, valores)
#    conn.commit()
#    novo_id = cursor.lastrowid
#
#    # ✅ Aciona o N8N para geração de conteúdo com IA
#    try:
#        url_n8n = "http://192.168.0.8:5678/webhook/gera-ia"
#        requests.post(
#            url_n8n,
#            json={
#                "id": novo_id,
#                "tema": dados.tema,
#                "roteiro": dados.roteiro,
#                "tom": dados.tom,
#                "tipo": dados.tipo,
#                "objetivo": dados.objetivo
#            },
#            timeout=1
#        )
#    except Exception as e:
#        print(f"Erro ao acionar IA: {e}")
#
#    # ✅ Finaliza a conexão
#    cursor.close()
#    conn.close()
#    return {"mensagem": "Publicação criada com sucesso", "id": novo_id}

#listar publicações no publicationsItem
@app.get("/publicacoes")
def listar_publicacoes(
    skip: int = Query(0),
    limit: int = Query(10),
    usuario: dict = Depends(get_current_user)
):
    try:
        conn = conectar()
        cursor = conn.cursor(dictionary=True)

        cursor.execute("""
            SELECT id, tema, data_publicacao, 
                   status_publicacao AS status,
                   tom, tipo, objetivo, resposta,
                   curtidas, comentarios, visualizacoes,
                   linkedin_url, imagem_url, imagem_path
            FROM publicacoes
            WHERE usuario_id = %s
            ORDER BY data_publicacao DESC
            LIMIT %s OFFSET %s
        """, (usuario["id"], limit, skip))

        resultado = cursor.fetchall()
        conn.close()
        return resultado

    except Exception as e:
        print("❌ Erro ao listar publicações:")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail="Erro interno ao listar publicações")



#reusmo das  publicações
@app.get("/publicacoes/resumo")
def resumo_publicacoes(usuario: dict = Depends(verificar_token)):
    conn = conectar()
    cursor = conn.cursor(dictionary=True)

    try:
        cursor.execute("""
            SELECT 
                SUM(CASE WHEN status_publicacao = 'publicado' THEN 1 ELSE 0 END) AS publicadas,
                SUM(CASE WHEN status_publicacao = 'agendado' THEN 1 ELSE 0 END) AS agendadas,
                SUM(CASE WHEN status_publicacao = 'pendente' THEN 1 ELSE 0 END) AS pendentes,
                SUM(curtidas + comentarios) AS interacoes
            FROM publicacoes
            WHERE usuario_id = (
                SELECT id FROM usuarios WHERE email = %s
            )
        """, (usuario["usuario"],))

        resumo = cursor.fetchone()
        # Garante que zeros sejam retornados caso não existam registros
        return {
            "publicadas": resumo["publicadas"] or 0,
            "agendadas": resumo["agendadas"] or 0,
            "pendentes": resumo["pendentes"] or 0,
            "interacoes": resumo["interacoes"] or 0
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()
        conn.close()

#listar datas das publicaçoes
@app.get("/publicacoes/status-por-data")
def listar_status_por_data():
    conn = conectar()
    cursor = conn.cursor(dictionary=True)

    query = """
        SELECT DATE(data_publicacao) AS data, status_publicacao AS status
        FROM publicacoes
        WHERE status_publicacao IN ('agendado', 'publicado')
    """
    cursor.execute(query)
    rows = cursor.fetchall()

    cursor.close()
    conn.close()

    # Formata para retorno JSON: [{ data: '2025-05-26', status: 'publicado' }, ...]
    return [{"data": row["data"].isoformat(), "status": row["status"]} for row in rows]



#agendar pubçiocação
@app.post("/publicacoes/agendar")
def agendar_publicacao(publicacao: dict, usuario: dict = Depends(get_current_user)):
    # lógica de salvar com status 'agendada'
    return {"mensagem": "Publicação agendada com sucesso"}


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

#botão salar rascuno
@app.post("/publicacoes/rascunho")
def salvar_rascunho(publicacao: dict, usuario: dict = Depends(get_current_user)):
    tema = publicacao.get("tema")
    roteiro = publicacao.get("roteiro")
    data_publicacao = publicacao.get("data_publicacao")

    if not tema or not roteiro or not data_publicacao:
        raise HTTPException(status_code=400, detail="Tema, roteiro e data são obrigatórios.")

    try:
    	data_publicacao = data_publicacao.replace("Z", "").split(".")[0]
    	data_publicacao = datetime.fromisoformat(data_publicacao).strftime("%Y-%m-%d %H:%M:%S")
    except Exception as e:
    	raise HTTPException(status_code=400, detail="Formato de data inválido.")

    tom = publicacao.get("tom")
    tipo = publicacao.get("tipo")
    objetivo = publicacao.get("objetivo")
    imagem_url = publicacao.get("imagem_url")  # usar este campo corretamente
    status = publicacao.get("status_publicacao", "rascunho")
    usuario_id = usuario["id"]

    conn = conectar()
    cursor = conn.cursor()

    query = """
        INSERT INTO publicacoes (
            tema, roteiro, data_publicacao,
            tom, tipo, objetivo, imagem_url,
            status_publicacao, usuario_id
        )
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
    """
    valores = (
        tema,
        roteiro,
        data_publicacao,
        tom,
        tipo,
        objetivo,
        imagem_url,
        status,
        usuario_id
    )

    cursor.execute(query, valores)
    conn.commit()
    novo_id = cursor.lastrowid

    cursor.close()
    conn.close()

    return {
        "id": novo_id,
        "mensagem": "Rascunho salvo com sucesso"
    }



# Atualizar resposta da publicação (usado somente ao agendar)
#@app.put("/publicacoes/{id}/resposta")
#def atualizar_resposta(id: int, dados: dict):
#    conn = conectar()
#    cursor = conn.cursor()
#    try:
#        cursor.execute(
#            "UPDATE publicacoes SET resposta = %s, status_publicacao = 'rascunho' WHERE id = %s",
#            (dados.get("resposta"), id)
#        )
#        conn.commit()
#        return {"mensagem": "Resposta atualizada com sucesso"}
#    except Exception as e:
#        return {"erro": str(e)}
#    finally:
#        cursor.close()
#        conn.close()
#
#
#@app.get("/executar-agendadas")
#def executar_agendadas():
#    agora = datetime.now()
#    conn = conectar()
#    cursor = conn.cursor(dictionary=True)


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
            "isActive": u["ativo"] == 1,
        })

    cursor.close()
    conn.close()
    return usuarios



#    # Busca publicações que devem ser executadas
#    cursor.execute("""
#        SELECT * FROM publicacoes
#        WHERE status_publicacao = 'agendado'
#        AND data_publicacao <= %s
#    """, (agora,))
#    publicacoes = cursor.fetchall()
#
#    for pub in publicacoes:
#        try:
#            # Converte datetime para string ISO
#            dados_convertidos = {
#                k: (v.isoformat() if isinstance(v, datetime) else v)
#                for k, v in pub.items()
#            }
#
#            response = requests.post(
#                "https://light-catfish-46.hooks.n8n.cloud/webhook/publicar-linkedin",
#                json=dados_convertidos,
#                timeout=3
#            )
#
#            print(f"[✔] Publicação {pub['id']} enviada - status {response.status_code}")
#
#        except Exception as e:
#            print(f"[✘] Erro ao enviar publicação {pub['id']} para o N8N: {e}")

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


class AtualizaStatusUsuario(BaseModel):
    ativo: int


#ativa/inativa usuario
@app.put("/usuarios/status/{id}")
def atualizar_status_usuario(
    id: int,
    dados: AtualizaStatusUsuario,
    usuario_logado: dict = Depends(verificar_token)
):
    conn = conectar()
    cursor = conn.cursor()

    try:
        cursor.execute("""
            UPDATE usuarios
            SET ativo = %s
            WHERE id = %s
        """, (dados.ativo, id))

        cursor.execute("SELECT nome FROM usuarios WHERE id = %s", (id,))
        resultado = cursor.fetchone()
        nome_alterado = resultado[0] if resultado else f"ID {id}"

        acao = f"inativou o usuário {nome_alterado}" if dados.ativo == 2 else f"ativou o usuário {nome_alterado}"
        registrar_atividade(usuario_logado["usuario"], acao, "usuario")

        conn.commit()
        return {"mensagem": "Status atualizado com sucesso."}

    except Exception as e:
        print(f"Erro ao atualizar status: {e}")
        return JSONResponse(content={"erro": "Erro ao atualizar status."}, status_code=500)

    finally:
        cursor.close()
        conn.close()


#atualizer  usuário
class AtualizarUsuario(BaseModel):
    nome: str
    email: EmailStr
    perfil: str  # "admin" ou "usuario"

@app.put("/usuarios/{id}")
def editar_usuario(id: int, dados: AtualizarUsuario, usuario_logado: dict = Depends(verificar_permissao_admin)):
    conn = conectar()
    cursor = conn.cursor()

    try:
        # Atualiza o usuário no banco
        cursor.execute("""
            UPDATE usuarios
            SET nome = %s, email = %s, perfil = %s
            WHERE id = %s
        """, (dados.nome, dados.email, dados.perfil, id))

        conn.commit()

# Loga a ação
# registrar_atividade(usuario_logado["usuario"], f"editou o usuário {dados.nome}", "usuario")

        return {"mensagem": "Usuário atualizado com sucesso."}
    except Exception as e:
        print(f"Erro ao editar usuário: {e}")
        raise HTTPException(status_code=500, detail="Erro ao editar usuário.")
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

# Executar Backup para Git
@app.post("/backup", status_code=status.HTTP_202_ACCEPTED)
def executar_backup(usuario: dict = Depends(verificar_permissao_admin)):
    try:
        resultado = subprocess.run(
            ["bash", "/home/publicsync/backup_publicsync.sh"],
            capture_output=True,
            text=True,
            timeout=30
        )
        if resultado.returncode != 0:
            raise HTTPException(status_code=500, detail=f"Erro ao executar backup: {resultado.stderr}")
        return {"mensagem": "Backup executado com sucesso!", "saida": resultado.stdout}
    except Exception as e:
        print("Erro:", e)
        raise HTTPException(status_code=500, detail="Erro inesperado ao executar o backup.")


