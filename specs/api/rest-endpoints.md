# REST API Endpoints Specification

## Purpose and Scope

Define the complete REST API for the Todo application with JWT authentication, following standard HTTP methods and status codes.

## Base URL
`/api/{user_id}`

## Authentication Requirements

All endpoints require:
- Valid JWT token in `Authorization: Bearer <token>` header
- User ID in URL path must match JWT subject
- Unauthorized requests return HTTP 401

## Endpoint Specifications

### GET /api/{user_id}/tasks
#### Purpose
Retrieve all tasks for the authenticated user

#### Request
- Method: GET
- Headers: `Authorization: Bearer <valid_jwt_token>`
- Path Parameters: `user_id` (must match JWT subject)
- Query Parameters: None

#### Response
- Success: HTTP 200 with array of task objects
- Unauthorized: HTTP 401
- Forbidden: HTTP 403 (user_id mismatch)
- Server Error: HTTP 500

#### Example Response
```json
[
  {
    "id": 1,
    "title": "Sample Task",
    "description": "Sample description",
    "completed": false,
    "due_date": "2024-12-31T23:59:59Z",
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-01T00:00:00Z"
  }
]
```

### POST /api/{user_id}/tasks
#### Purpose
Create a new task for the authenticated user

#### Request
- Method: POST
- Headers: `Authorization: Bearer <valid_jwt_token>`
- Path Parameters: `user_id` (must match JWT subject)
- Body: JSON object with task properties
  ```json
  {
    "title": "Task Title",
    "description": "Task Description",
    "due_date": "2024-12-31T23:59:59Z"
  }
  ```

#### Response
- Success: HTTP 201 with created task object
- Bad Request: HTTP 400 (invalid input)
- Unauthorized: HTTP 401
- Forbidden: HTTP 403 (user_id mismatch)
- Server Error: HTTP 500

### GET /api/{user_id}/tasks/{id}
#### Purpose
Retrieve a specific task for the authenticated user

#### Request
- Method: GET
- Headers: `Authorization: Bearer <valid_jwt_token>`
- Path Parameters: `user_id` (must match JWT subject), `id` (task id)
- Query Parameters: None

#### Response
- Success: HTTP 200 with task object
- Not Found: HTTP 404 (task not found or not owned by user)
- Unauthorized: HTTP 401
- Forbidden: HTTP 403 (user_id mismatch)
- Server Error: HTTP 500

### PUT /api/{user_id}/tasks/{id}
#### Purpose
Update a specific task for the authenticated user

#### Request
- Method: PUT
- Headers: `Authorization: Bearer <valid_jwt_token>`
- Path Parameters: `user_id` (must match JWT subject), `id` (task id)
- Body: JSON object with updated task properties
  ```json
  {
    "title": "Updated Task Title",
    "description": "Updated Task Description",
    "due_date": "2024-12-31T23:59:59Z"
  }
  ```

#### Response
- Success: HTTP 200 with updated task object
- Bad Request: HTTP 400 (invalid input)
- Not Found: HTTP 404 (task not found or not owned by user)
- Unauthorized: HTTP 401
- Forbidden: HTTP 403 (user_id mismatch)
- Server Error: HTTP 500

### PATCH /api/{user_id}/tasks/{id}/complete
#### Purpose
Toggle the completion status of a specific task

#### Request
- Method: PATCH
- Headers: `Authorization: Bearer <valid_jwt_token>`
- Path Parameters: `user_id` (must match JWT subject), `id` (task id)
- Body: JSON object with completion status
  ```json
  {
    "completed": true
  }
  ```

#### Response
- Success: HTTP 200 with updated task object
- Bad Request: HTTP 400 (invalid input)
- Not Found: HTTP 404 (task not found or not owned by user)
- Unauthorized: HTTP 401
- Forbidden: HTTP 403 (user_id mismatch)
- Server Error: HTTP 500

### DELETE /api/{user_id}/tasks/{id}
#### Purpose
Delete a specific task for the authenticated user

#### Request
- Method: DELETE
- Headers: `Authorization: Bearer <valid_jwt_token>`
- Path Parameters: `user_id` (must match JWT subject), `id` (task id)

#### Response
- Success: HTTP 204 (no content)
- Not Found: HTTP 404 (task not found or not owned by user)
- Unauthorized: HTTP 401
- Forbidden: HTTP 403 (user_id mismatch)
- Server Error: HTTP 500

## Common Response Formats

### Success Responses
- Follow standard JSON format
- Include relevant data in response body
- Use appropriate HTTP status codes

### Error Responses
- Format: `{"detail": "error_message"}`
- Include descriptive error messages
- Use appropriate HTTP status codes

## Validation Rules

- All user_id path parameters must match JWT subject
- All task operations restricted to authenticated user's tasks
- Input validation applied to all request bodies
- Proper error handling for database operations

## Security Requirements

- JWT authentication required for all endpoints
- User isolation enforced at database level
- Input sanitization applied to prevent injection
- Proper CORS configuration