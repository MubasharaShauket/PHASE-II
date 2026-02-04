# Backend CLAUDE Code Guidelines

## Directory Structure
- `/models` - SQLModel database models
- `/database` - Database connection and session management
- `/api` - FastAPI route handlers
- `/auth` - JWT authentication middleware
- `/schemas` - Pydantic request/response schemas
- `/core` - Core application configuration

## Development Standards
- Use Python 3.9+ with type hints
- Follow FastAPI best practices
- Implement proper error handling
- Use dependency injection where appropriate
- Follow the API specifications from `/specs/api/rest-endpoints.md`

## Database Layer
- Use SQLModel ORM as specified in `/specs/database/schema.md`
- Implement proper session management
- Follow multi-user isolation requirements
- Use parameterized queries to prevent injection

## Authentication
- Implement JWT middleware as specified in `/specs/features/authentication.md`
- Validate tokens properly
- Enforce user ID matching between JWT and URL
- Return proper HTTP status codes for auth failures

## API Design
- Follow REST principles
- Use Pydantic schemas for request/response validation
- Implement proper HTTP status codes
- Include comprehensive error handling
- Follow the endpoint specifications from `/specs/api/rest-endpoints.md`

## Security
- Validate all input parameters
- Implement proper authorization checks
- Prevent cross-user data access
- Use secure coding practices
- Implement rate limiting where appropriate

## Testing
- Unit test API endpoints
- Test authentication middleware
- Verify multi-user isolation
- Test error scenarios
- Validate input validation