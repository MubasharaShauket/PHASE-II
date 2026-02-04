# CLAUDE Code Guidelines for Todo Application

## Repository Structure
This is the main repository for the full-stack Todo application. It contains both frontend and backend code organized in a monorepo structure.

## Project Organization
- `/specs` - All specifications following Spec-Kit governance
- `/frontend` - Next.js 16+ application code
- `/backend` - FastAPI application code
- `/docs` - Additional documentation

## Development Workflow
1. All changes must have corresponding specifications
2. Follow the Spec-Driven Development approach
3. Maintain traceability between specs and implementation
4. Update history files for all major changes

## Technology Stack
- Frontend: Next.js 16+, TypeScript, Tailwind CSS
- Backend: FastAPI, Python, SQLModel ORM
- Database: Neon Serverless PostgreSQL
- Authentication: Better Auth with JWT

## Security Requirements
- JWT authentication for all API endpoints
- User isolation - no cross-user data access
- Input validation on all fields
- Secure token handling