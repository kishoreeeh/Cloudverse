# CloudVerse

> A centralized learning platform for DevOps and Cloud technologies.

Instead of searching across multiple websites for documentation, tutorials, interview questions, and quizzes — **CloudVerse** brings everything together in one organized, professional platform.

![CloudVerse](https://img.shields.io/badge/CloudVerse-DevOps%20Learning-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2-6DB33F?style=flat-square&logo=spring-boot)
![MongoDB](https://img.shields.io/badge/MongoDB-7.0-47A248?style=flat-square&logo=mongodb)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=flat-square&logo=docker)

---

## Features

### Technologies Covered
| Technology | Topics | Description |
|-----------|--------|-------------|
| ☁️ **AWS** | 12 topics | IAM, EC2, S3, VPC, ALB, CloudWatch, ECS, and more |
| 🐳 **Docker** | 10 topics | Images, Containers, Compose, Multi-Stage Builds |
| ☸️ **Kubernetes** | 12 topics | Pods, Deployments, Services, Ingress, StatefulSets |
| 🐧 **Linux** | 8 topics | Commands, Permissions, Processes, SSH, Networking |
| 🔀 **Git** | 12 topics | Branching, Merging, Rebasing, Cherry Pick, GitHub Flow |
| 🏗️ **Terraform** | 8 topics | Providers, Resources, State, Modules, Backend |

### Per Technology
- 📖 **Overview** — Detailed explanations in simple language
- 📚 **Learning Path** — Organized chapters/topics
- 📝 **Personal Notes** — Markdown notes for each topic
- 📄 **Official Documentation** — Direct links to official docs
- 🎥 **Video Tutorials** — Curated YouTube playlists
- ❓ **Interview Questions** — Common Q&A with detailed answers
- ✅ **MCQ Quiz** — Multiple choice questions with instant scoring
- 🃏 **Flash Cards** — Quick revision flip cards

### Platform Features
- 🔍 **Global Search** — Search across all technologies and topics
- 🌙 **Dark Theme** — Professional dark UI (Vercel/Linear inspired)
- 📱 **Responsive** — Works on desktop, tablet, and mobile
- ⚡ **Fast** — Vite-powered frontend with optimized builds

---

## Architecture

```
┌──────────────────────────────────────────────────┐
│                    Frontend                       │
│          React + Vite + Tailwind CSS              │
│              (Port 3000 / Nginx)                  │
└──────────────────┬───────────────────────────────┘
                   │ HTTP / REST API
┌──────────────────▼───────────────────────────────┐
│                    Backend                        │
│            Spring Boot 3.2 (Java 17)              │
│                 (Port 8080)                       │
└──────────────────┬───────────────────────────────┘
                   │ MongoDB Driver
┌──────────────────▼───────────────────────────────┐
│                   Database                        │
│              MongoDB 7.0                          │
│                (Port 27017)                       │
└──────────────────────────────────────────────────┘
```

---

## Folder Structure

```
cloudverse/
├── frontend/                     # React application
│   ├── src/
│   │   ├── components/           # Reusable UI components
│   │   │   ├── ui/               # Button, Card, Input, Modal, etc.
│   │   │   └── common/           # Navbar, Sidebar, Footer, etc.
│   │   ├── config/               # App configuration
│   │   ├── features/             # Feature modules
│   │   │   ├── technology/       # Technology detail pages
│   │   │   └── search/           # Global search
│   │   ├── layouts/              # Page layouts
│   │   ├── pages/                # Route pages
│   │   ├── router/               # React Router config
│   │   ├── services/             # API service layer
│   │   ├── store/                # Zustand state
│   │   └── utils/                # Utilities
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
│
├── backend/                      # Spring Boot application
│   ├── src/main/java/com/cloudverse/
│   │   ├── config/               # CORS, OpenAPI config
│   │   ├── common/               # Shared DTOs, exceptions
│   │   ├── model/                # MongoDB documents
│   │   ├── dto/                  # Request/Response DTOs
│   │   ├── repository/           # Data access layer
│   │   ├── service/              # Business logic
│   │   └── controller/           # REST controllers
│   ├── src/main/resources/
│   │   └── application.yml
│   ├── Dockerfile
│   └── pom.xml
│
├── docker-compose.yml            # Full stack orchestration
├── .gitignore
└── README.md
```

---

## Quick Start

### Prerequisites
- **Node.js** 18+ and npm
- **Java** 17+ (JDK)
- **Maven** 3.9+
- **MongoDB** 7.0 (or Docker)

### Option 1: Docker Compose (Recommended)

```bash
# Clone the repository
git clone https://github.com/yourusername/cloudverse.git
cd cloudverse

# Start all services
docker-compose up --build

# Access the application
# Frontend: http://localhost:3000
# Backend API: http://localhost:8080/api/v1
# Swagger UI: http://localhost:8080/swagger-ui.html
# MongoDB: localhost:27017
```

### Option 2: Manual Setup

**Start MongoDB:**
```bash
# Using Docker
docker run -d --name cloudverse-mongo -p 27017:27017 mongo:7.0

# Or install MongoDB locally
```

**Start Backend:**
```bash
cd backend
./mvnw spring-boot:run

# API available at http://localhost:8080
# Swagger UI at http://localhost:8080/swagger-ui.html
```

**Start Frontend:**
```bash
cd frontend
npm install
npm run dev

# App available at http://localhost:5173
```

---

## REST API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/v1/technologies` | List all technologies |
| `GET` | `/api/v1/technologies/{slug}` | Get technology by slug |
| `GET` | `/api/v1/technologies/{slug}/topics` | Get topics for technology |
| `GET` | `/api/v1/topics/{id}` | Get full topic detail |
| `GET` | `/api/v1/topics/{topicId}/quiz` | Get quiz for topic |
| `POST` | `/api/v1/quizzes/submit` | Submit quiz answers |
| `GET` | `/api/v1/notes/topic/{topicId}` | Get notes for topic |
| `POST` | `/api/v1/notes` | Save/update notes |
| `DELETE` | `/api/v1/notes/{id}` | Delete notes |
| `GET` | `/api/v1/search?q={query}` | Global search |

---

## Docker Commands

```bash
# Build and start all services
docker-compose up --build -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Stop and remove volumes (clears database)
docker-compose down -v

# Rebuild a specific service
docker-compose build backend
docker-compose build frontend

# View running containers
docker-compose ps
```

---

## Environment Variables

### Backend
| Variable | Default | Description |
|----------|---------|-------------|
| `MONGODB_URI` | `mongodb://localhost:27017/cloudverse` | MongoDB connection string |
| `SPRING_PROFILES_ACTIVE` | `dev` | Active Spring profile |

### Frontend
| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_API_URL` | `http://localhost:8080/api/v1` | Backend API base URL |

---

## Tech Stack

### Frontend
- **React 18** — UI library
- **Vite 5** — Build tool & dev server
- **Tailwind CSS 3** — Utility-first CSS
- **React Router 6** — Client-side routing
- **Axios** — HTTP client
- **Zustand** — State management
- **Framer Motion** — Animations
- **Lucide React** — Icons
- **React Markdown** — Markdown rendering
- **React Syntax Highlighter** — Code highlighting

### Backend
- **Spring Boot 3.2** — Application framework
- **Spring Data MongoDB** — Database access
- **Java 17** — Language
- **Lombok** — Boilerplate reduction
- **SpringDoc OpenAPI** — API documentation

### Database
- **MongoDB 7.0** — NoSQL document database

### DevOps
- **Docker** — Containerization
- **Docker Compose** — Multi-container orchestration
- **Nginx** — Frontend reverse proxy

---

## Future Enhancements

- [ ] User authentication (JWT)
- [ ] Progress tracking per user
- [ ] Bookmarking topics
- [ ] Admin panel for content management
- [ ] More technologies (Jenkins, Ansible, Prometheus, Grafana, Helm, ArgoCD)
- [ ] Certificate generation on course completion
- [ ] GitHub Actions CI/CD pipeline
- [ ] Deployment to AWS ECS
- [ ] Dark/Light theme toggle
- [ ] Export notes as PDF
- [ ] Collaborative notes
- [ ] Spaced repetition for flash cards

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">
  Built with ❤️ for the DevOps & Cloud community
</p>
