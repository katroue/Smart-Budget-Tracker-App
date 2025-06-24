A full-stack, container-ready web app that helps users track income, expenses and budgets—built to showcase modern Node + MySQL development, JWT-based authentication, automated tests, and cloud-friendly deployment with Docker Compose (ready for ECS / RDS on AWS).

✨ Key Features
Layer	Tech	What it does
Frontend	Static HTML + Bootstrap 5 served by Nginx	Responsive pages (index.html, transactions.html) with forms, tables and Chart.js widgets (optional)
API	Node.js 18 + Express 4	REST endpoints:
• Auth `/api/auth/register
Database	MySQL 8 (InnoDB)	Tables: users, transactions, budgets…
Security	bcrypt password hashing • JWT bearer tokens • Helmet CORS	
Tests	Jest + Supertest (> 80 % coverage)	
DevOps	Dockerfile (multi-stage) • docker-compose.yml (backend, db, frontend) • Cloud-ready: push images to ECR, task definition for Fargate	
CI/CD	Sample GitHub Actions workflow → build, test, push image, update ECS service	

🏃‍♂️ Quick Start (local)
bash
Copier
Modifier
git clone https://github.com/<you>/smart-budget-tracker.git
cd smart-budget-tracker

# 1. Build & start all containers
docker compose up --build -d

# 2. Browse the app
# Frontend
open http://localhost:3000/transactions.html

# API
curl http://localhost:5001/api/transactions
Default credentials (dev middleware):

makefile
Copier
Modifier
username: demo
password: demo123
🌐 Endpoints (v1)
Method	Route	Description
POST	/api/auth/register	Create user ({ username, email, password })
POST	/api/auth/login	Returns JWT
DELETE	/api/auth/delete	Delete account (needs credentials)
GET	/api/transactions	List current user’s transactions
POST	/api/transactions	Create transaction
PUT	/api/transactions/:id	Update transaction
DELETE	/api/transactions/:id	Remove transaction

Full Swagger / OpenAPI spec available at /api/docs once the stack is running.

🐳 Services in docker-compose.yml
Service	Host Port	Purpose
backend	5001	Express API
db	3306	MySQL 8 with volume db_data
frontend	3000	Nginx serving static /frontend folder

Local .env (example):

ini
Copier
Modifier
DB_HOST=db
DB_USER=budget_user
DB_PASSWORD=userpass
DB_NAME=budget_db
JWT_SECRET=supersecretkey
