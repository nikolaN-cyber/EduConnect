# EduConnect - Application for sharing knowledge

![NestJS](https://img.shields.io/badge/NestJS-v9.0-orange)
![Angular](https://img.shields.io/badge/Angular-v16.0-red)
![Docker](https://img.shields.io/badge/Docker-Container-blue)

---

## Content

- [Project description](#project-description)
- [Tehnologies](#tehnologies)
- [Architecture](#architecture)
- [Installation](#installation)
- [Running](#running)

---

## Project descriptiom

EduConnect is a moder web application where users are allowed to register, login and add posts. Main purpose of application is to share knowledge through posts that contains images, videos and/or text. Users can comment, like/dislike posts, but also give a reviews about other users.

---

## Technologies

- **Backend:** NestJS, TypeScript, PostgreSQL
- **Frontend:** Angular 16, TypeScript, RxJS
- **Database:** PostgreSQL in Docker container
- **Other:** Docker, Git, JWT authentification, PassportJS

---

## Architecture

Project is split into three main parts:

1. **Backend (NestJS):**  
   API server with REST endpoints, authentification, autorization i business logic.

2. **Frontend (Angular):**  
   Single Page Application (SPA) with modular components, services for communication with backend and state management.

3. **Database:**  
   PostgreSQL server running in a Docker container, for use in development and production environments.

---

## Installation

1. **Repo clone**

```bash
git clone https://github.com/tvojusername/sportsbet.git
cd sportsbet
```

2. **Database running**

```bash
docker-compose up -d
```

3. **Backend setup**

```bash
cd backend
npm install
```

4. **Frontend setup**

```bash
cd ../frontend
npm install
```

---

## Running

### Backend

```bash
cd backend
npm run start:dev
```

Backend will listen at `http://localhost:3000`.

### Frontend

```bash
cd frontend
ng serve
```

Frontend will be available `http://localhost:4200`.



