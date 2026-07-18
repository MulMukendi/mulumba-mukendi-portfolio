# User Management System

A full-stack User Management System built to demonstrate modern backend development using **Spring Boot**, **React**, **MySQL**, and **Redis**. The application allows users to be created, searched, updated, and deleted while showcasing production-ready features such as RESTful APIs, server-side caching, and responsive user interfaces.

---

## Features

- Create new users
- View all users
- Search users by first name
- View individual user details
- Update existing users
- Delete users
- Display the total number of users
- Display the three most recently added users
- Display the average age of all users
- Display the number of users created today
- Responsive React frontend
- RESTful Spring Boot backend
- Redis caching for improved performance
- Global exception handling
- Duplicate email and username validation

---

## Tech Stack

### Frontend

- React
- Axios
- React Router
- CSS

### Backend

- Java 17
- Spring Boot
- Spring Data JPA
- Spring Cache
- Redis
- MySQL
- Maven

### Development Tools

- Docker
- Git
- GitHub
- IntelliJ IDEA
- Postman

---

## Architecture

```text
React Frontend
       │
       ▼
Spring Boot REST API
       │
       ├────────► Redis Cache
       │
       ▼
 MySQL Database
```

---

## Caching

This project uses **Spring Cache** with **Redis** to improve application performance by reducing unnecessary database queries.

The following data is cached:

- User by ID
- All users
- Total number of users
- Average user age
- Three most recently added users
- Number of users created today

Caches are automatically invalidated whenever a user is created, updated, or deleted to ensure cached data remains consistent with the database.

---

## Prerequisites

Before running the project, ensure you have the following installed:

- Java 17
- Maven
- Node.js
- MySQL
- Docker Desktop
- Git

---

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd "User Management System"
```

### 2. Start Redis

Make sure Docker Desktop is running, then start the Redis container:

```bash
docker compose up -d
```

### 3. Configure the application

The repository includes an example configuration file:

```text
application-example.properties
```

Create a new file named:

```text
application-local.properties
```

Copy the contents of `application-example.properties` into `application-local.properties`, then replace the placeholder values with your own MySQL credentials.

### 4. Run the backend

```bash
./mvnw spring-boot:run
```

or run the application directly from IntelliJ IDEA.

### 5. Run the frontend

```bash
npm install
npm run dev
```

---

## Configuration

Configure the following properties in `application-local.properties`:

- MySQL database URL
- MySQL username
- MySQL password
- Redis host (if different from localhost)
- Redis port (if different from 6379)

Local configuration files are excluded from version control using `.gitignore` to keep sensitive information secure.

---

## API Endpoints

| Method | Endpoint                   | Description                       |
| ------ | -------------------------- | --------------------------------- |
| GET    | `/users`                   | Get all users                     |
| GET    | `/users/{id}`              | Get user by ID                    |
| GET    | `/users/search?firstName=` | Search users by first name        |
| POST   | `/users`                   | Create a new user                 |
| PUT    | `/users/{id}`              | Update an existing user           |
| DELETE | `/users/{id}`              | Delete a user                     |
| GET    | `/users/count`             | Get total number of users         |
| GET    | `/users/recent`            | Get recently added users          |
| GET    | `/users/average-age`       | Get average user age              |
| GET    | `/users/created-today`     | Get number of users created today |

---

## Future Improvements

- JWT Authentication
- Role-based authorization
- Pagination and sorting
- Advanced filtering
- Redis cache expiration (TTL)
- Dockerized frontend and backend
- Unit and integration testing
- API documentation with Swagger/OpenAPI
- CI/CD pipeline
- Cloud deployment (AWS)

---

## Learning Objectives

This project was built to gain hands-on experience with:

- Spring Boot
- REST API development
- Spring Data JPA
- Spring Cache
- Redis
- Docker
- MySQL
- React
- Git and GitHub
- Full-stack application architecture

---

## Author

**Mulumba Mukendi**

Computer Science student passionate about backend development, cloud technologies, and building scalable web applications.
