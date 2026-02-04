# UI Pages Specification

## Purpose and Scope

Define the complete page structure for the Todo application using Next.js 16 App Router with proper routing, authentication protection, and responsive design.

## Page Structure

All pages follow Next.js 16 App Router conventions with:
- Server Components by default
- Client Components only where interactivity is required
- Proper metadata and SEO considerations
- Authentication protection where needed

## Protected Pages

### /dashboard/tasks
#### Purpose
Main dashboard showing user's tasks with filtering and management capabilities

#### Layout
- Header with navigation and user profile
- Sidebar with quick actions (create task, filters)
- Main content area with task list
- Footer with application information

#### Features
- Display all user tasks in a list view
- Filter tasks by completion status
- Sort tasks by due date or creation date
- Search functionality for task titles
- Pagination for large task lists
- Quick add task button
- Empty state when no tasks exist

#### Components Used
- Navbar
- TaskList
- SearchBar (if implemented)
- Pagination (if needed)

#### Authentication
- Protected route requiring authentication
- Redirect to login if unauthenticated
- User context available for task filtering

### /tasks/new
#### Purpose
Page for creating new tasks

#### Layout
- Header with navigation
- Main content area with task form
- Footer with application information

#### Features
- Task creation form with all required fields
- Real-time validation feedback
- Success/error notifications
- Cancel/back navigation
- Auto-focus on first input field

#### Components Used
- Navbar
- TaskForm

#### Authentication
- Protected route requiring authentication
- Redirect to login if unauthenticated

### /tasks/[id]/edit
#### Purpose
Page for editing existing tasks

#### Layout
- Header with navigation
- Main content area with task form pre-filled
- Footer with application information

#### Features
- Pre-populate form with existing task data
- Real-time validation feedback
- Success/error notifications
- Cancel/back navigation
- Delete task option
- Back button to return to task list

#### Components Used
- Navbar
- TaskForm

#### Authentication
- Protected route requiring authentication
- Verify user owns the task before displaying
- Redirect to login if unauthenticated
- Return 404 if task doesn't exist or isn't owned by user

## Public Pages

### /login
#### Purpose
User authentication login page

#### Layout
- Centered auth form
- Branding/logo area
- Link to signup page
- Password reset link (if implemented)

#### Features
- Email and password inputs
- Form validation
- Loading state during authentication
- Error message display
- Link to signup page
- Remember me functionality

#### Components Used
- AuthForm

#### Authentication
- Public route accessible to unauthenticated users
- Redirect to dashboard if already authenticated

### /signup
#### Purpose
User registration page

#### Layout
- Centered auth form
- Branding/logo area
- Link to login page

#### Features
- Email and password inputs
- Password confirmation
- Form validation
- Loading state during registration
- Error message display
- Link to login page
- Terms of service agreement (if needed)

#### Components Used
- AuthForm

#### Authentication
- Public route accessible to unauthenticated users
- Redirect to dashboard if already authenticated

## Route Protection

### Middleware Implementation
- Global authentication check for protected routes
- Redirect to login page for unauthorized access
- Preserve intended destination in session
- Proper error handling for authentication failures

### Protected Routes Pattern
```
/dashboard/*
/tasks/*
/api/*
```

### Public Routes Pattern
```
/login
/signup
/forgot-password
/api/auth/*
```

## Layout Structure

### Root Layout (`/app/layout.tsx`)
- HTML structure with proper meta tags
- Global styles and fonts
- Theme provider
- Global error boundary

### Dashboard Layout (`/app/dashboard/layout.tsx`)
- Navigation sidebar
- Main content area
- Responsive design for mobile

### Auth Layout (`/app/(auth)/layout.tsx`)
- Centered content for auth pages
- Minimal navigation
- Brand-focused design

## SEO and Metadata

### Common Metadata
- Page titles with application name
- Meta descriptions
- Open Graph tags
- Favicon and app icons

### Dynamic Metadata
- Personalized titles for user-specific pages
- Task-specific metadata when viewing/editing tasks
- Proper canonical URLs

## Error Handling

### Global Error Boundary
- Catch unhandled errors
- Display user-friendly error page
- Log errors for debugging

### Route-Level Error Handling
- 404 pages for non-existent routes
- 403 pages for unauthorized access
- 500 pages for server errors

## Loading States

### Global Loading
- Loading skeleton for initial page load
- Consistent loading indicators
- Optimistic UI updates where appropriate

### Component Loading
- Per-component loading states
- Network request indicators
- Form submission loading states

## Accessibility

### Semantic Structure
- Proper heading hierarchy
- Landmark roles for navigation
- Section organization
- Skip navigation link

### Interactive Elements
- Keyboard navigation support
- Focus management
- ARIA attributes where needed
- Screen reader compatibility

## Performance

### Code Splitting
- Route-level code splitting
- Component lazy loading where appropriate
- Image optimization
- Font optimization

### Caching Strategy
- Static site generation where possible
- Server-side rendering for dynamic content
- Client-side caching for API responses
- Image caching headers