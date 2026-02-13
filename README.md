# Phase II Todo Full-Stack Web Application

## Project Overview

A secure, multi-user task management application built with a modern full-stack architecture. This project represents Phase II of our development cycle, focusing on implementing core task management features with robust authentication and authorization systems. The application allows users to create, manage, and organize their tasks securely with role-based access controls.

**Objective**: To build a scalable, secure, and user-friendly task management platform that supports multiple users with individual task lists and collaborative features.

**Current Phase**: Phase II - Full-stack implementation with authentication and task management features.

## Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS, CSS Modules
- **State Management**: Zustand
- **Authentication**: Better Auth
- **Icons**: Heroicons React

### Backend
- **Runtime**: Node.js
- **Framework**: FastAPI (Python) / Express.js (Node.js)
- **Authentication**: JWT-based with Better Auth integration
- **Database**: PostgreSQL / MongoDB (depending on implementation)

### Additional Technologies
- **Deployment**: Vercel (Frontend), Self-hosted (Backend)
- **Containerization**: Docker (optional)
- **Environment Management**: dotenv
- **Code Quality**: ESLint, Prettier

## Features

- ✅ **Task Management**: Create, Read, Update, and Delete (CRUD) operations for tasks
- ✅ **User Authentication**: Secure sign-up and login functionality
- ✅ **JWT Security**: JSON Web Token-based authentication and authorization
- ✅ **Multi-user Support**: Individual task lists per authenticated user
- ✅ **Task Status Management**: Mark tasks as complete/incomplete
- ✅ **Responsive Design**: Mobile-first responsive interface
- ✅ **Secure Session Management**: Automatic session handling with Better Auth
- ✅ **Real-time Updates**: Live task updates without page refresh

## API Endpoints

### Authentication Endpoints
```
POST   /api/auth/register    - Register a new user
POST   /api/auth/login       - Authenticate user and return JWT
POST   /api/auth/logout      - Logout user and invalidate session
GET    /api/auth/me          - Get current user profile
```

### Task Management Endpoints
```
GET    /api/tasks            - Retrieve all tasks for authenticated user
POST   /api/tasks            - Create a new task
GET    /api/tasks/:id        - Retrieve a specific task
PUT    /api/tasks/:id        - Update a specific task
DELETE /api/tasks/:id        - Delete a specific task
PATCH  /api/tasks/:id/status - Toggle task completion status
```

### User Management Endpoints
```
GET    /api/users/profile    - Get user profile information
PUT    /api/users/profile    - Update user profile
DELETE /api/users/profile    - Delete user account
```

## Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Python 3.9+ (for backend, if using FastAPI)
- PostgreSQL or MongoDB (for database)

### Frontend Setup
```bash
# Clone the repository
git clone https://github.com/MubasharaShauket/PHASE-II.git
cd PHASE-II/frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Add your environment variables
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000

# Run the development server
npm run dev
```

### Backend Setup
```bash
# Navigate to backend directory
cd ../backend

# Install Python dependencies (if using FastAPI)
pip install -r requirements.txt

# Or install Node.js dependencies (if using Express)
npm install

# Create environment file
cp .env.example .env

# Add your environment variables
DATABASE_URL=postgresql://username:password@localhost:5432/todo_db
JWT_SECRET_KEY=your_jwt_secret_key_here
FRONTEND_URL=http://localhost:3000

# Run the backend server
python main.py  # For FastAPI
# OR
npm run dev     # For Express
```

### Docker Setup (Optional)
```bash
# Build and run with Docker Compose
docker-compose up --build

# Or run individual services
docker-compose up frontend backend database
```

## Usage Instructions

### Getting Started
1. Sign up for a new account or log in with existing credentials
2. Navigate to the dashboard to view your task list
3. Create new tasks using the "Add Task" button
4. Mark tasks as complete/incomplete by clicking the checkbox
5. Edit or delete tasks as needed

### Creating Tasks
1. Click the "New Task" button
2. Enter task title and description
3. Set priority level and due date (optional)
4. Click "Save Task" to add it to your list

### User Authentication
- **Sign Up**: Click "Register" and provide email, username, and password
- **Sign In**: Enter your credentials on the login page
- **Session Management**: Sessions are automatically handled by Better Auth
- **Logout**: Click the logout button in the navigation menu

### Task Operations
- **View Tasks**: Tasks are displayed in chronological order on the dashboard
- **Toggle Completion**: Click the checkbox next to a task to mark it as complete/incomplete
- **Edit Tasks**: Click the edit icon to modify task details
- **Delete Tasks**: Click the trash icon to remove a task (confirmation required)

## Project Structure

```
PHASE-II/
├── backend/                    # Backend API server
│   ├── api/                   # API routes and controllers
│   ├── auth/                  # Authentication modules
│   ├── core/                  # Core utilities and configurations
│   ├── database/              # Database connection and models
│   ├── models/                # Data models
│   ├── requirements.txt       # Python dependencies
│   └── main.py               # Main application entry point
├── frontend/                  # Next.js frontend application
│   ├── app/                  # App Router pages
│   │   ├── globals.css       # Global styles
│   │   ├── layout.tsx        # Root layout
│   │   ├── page.tsx          # Home page
│   │   ├── login/            # Login page
│   │   ├── signup/           # Signup page
│   │   └── dashboard/        # Dashboard with tasks
│   ├── components/           # Reusable React components
│   ├── contexts/             # React context providers
│   ├── lib/                  # Utility functions
│   ├── public/               # Static assets
│   ├── styles/               # Additional stylesheets
│   ├── types/                # TypeScript type definitions
│   ├── package.json          # Frontend dependencies
│   ├── next.config.js        # Next.js configuration
│   ├── tailwind.config.js    # Tailwind CSS configuration
│   └── tsconfig.json         # TypeScript configuration
├── specs/                     # Project specifications and documentation
├── docker-compose.yml        # Docker configuration
├── .env.example              # Environment variable template
├── .gitignore                # Git ignore rules
├── CLAUDE.md                 # AI-assisted development notes
└── README.md                 # This file
```

## Contribution Guidelines

We welcome contributions to this project! Here's how you can help:

### Development Process
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Add tests if applicable
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Code Standards
- Follow the existing code style and conventions
- Write meaningful commit messages
- Add documentation for new features
- Ensure all tests pass before submitting

### Reporting Issues
- Use the GitHub Issues section to report bugs or suggest features
- Provide detailed steps to reproduce any issues
- Include your environment information

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Developed by Mubashara Shauket**

For questions or support, please open an issue in the GitHub repository.