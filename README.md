# Property Management System

A full-stack application for managing rental properties, tenants, maintenance requests, and rent collection.

## Features

- **Property Management**: Add, edit, and manage rental properties
- **Tenant Management**: Track tenant information, lease dates, and payment history
- **Rent Collection**: Track monthly rent payments and payment history
- **Maintenance Requests**: Create, track, and resolve maintenance issues
- **Lease Management**: Digital lease documents and renewal tracking
- **Dashboard**: Overview of properties, upcoming rents, and pending maintenance
- **User Authentication**: Landlord and tenant login with role-based access

## Tech Stack

**Backend**: Java Spring Boot, Spring Security, JPA/Hibernate, PostgreSQL
**Frontend**: React, Tailwind CSS, Vite, Context API
**Database**: PostgreSQL with migrations
**Authentication**: JWT tokens

## Project Structure

```
property-management/
├── backend/
│   ├── src/main/java/com/property/
│   │   ├── model/
│   │   ├── controller/
│   │   ├── service/
│   │   ├── repository/
│   │   ├── security/
│   │   └── config/
│   ├── pom.xml
│   └── application.properties
└── frontend/
    ├── src/
    │   ├── pages/
    │   ├── components/
    │   ├── context/
    │   └── App.jsx
    ├── package.json
    └── vite.config.js
```

## Getting Started

### Backend
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Access the app at `http://localhost:5173`
# property-management
