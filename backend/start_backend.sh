#!/bin/bash

cd /home/publicsync/backend
source /home/publicsync/backend/venv/bin/activate
uvicorn app:app --host 0.0.0.0 --port 8000
