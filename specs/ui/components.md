# UI Components Specification

## Purpose and Scope

Define reusable UI components for the Todo application using Next.js 16 App Router, TypeScript, and Tailwind CSS.

## Component Architecture

All components follow:
- TypeScript interfaces for props
- Responsive design with Tailwind CSS
- Accessibility best practices
- Consistent styling and theming

## Core Components

### TaskList Component
#### Purpose
Display a list of tasks with filtering and pagination capabilities

#### Props Interface
```typescript
interface TaskListProps {
  tasks: Task[];
  onTaskUpdate?: (task: Task) => void;
  onTaskDelete?: (taskId: number) => void;
  loading?: boolean;
  error?: string;
}
```

#### Features
- Display tasks in a clean, organized list
- Show task title, description, completion status, and due date
- Visual indicators for completed tasks
- Loading states during API operations
- Error handling and display
- Responsive layout for mobile/desktop

#### Styling
- Card-based layout with consistent spacing
- Hover effects for interactive elements
- Clear visual hierarchy
- Color-coded status indicators

### TaskCard Component
#### Purpose
Display individual task information with action buttons

#### Props Interface
```typescript
interface TaskCardProps {
  task: Task;
  onToggleComplete?: (task: Task) => void;
  onEdit?: (task: Task) => void;
  onDelete?: (taskId: number) => void;
}
```

#### Features
- Task title with strikethrough when completed
- Description display with expand/collapse capability
- Due date display with color coding for urgency
- Completion toggle button
- Edit and delete action buttons
- Visual feedback for interactions

#### Styling
- Card layout with shadow and rounded corners
- Consistent padding and typography
- Interactive button styles
- Status-specific color schemes

### TaskForm Component
#### Purpose
Provide form for creating and updating tasks

#### Props Interface
```typescript
interface TaskFormProps {
  task?: Task;
  onSubmit: (taskData: TaskFormData) => void;
  onCancel?: () => void;
  loading?: boolean;
  error?: string;
}
```

#### Features
- Title input with validation
- Description textarea
- Due date picker with calendar widget
- Completion checkbox
- Form validation and error display
- Submit and cancel buttons
- Loading state during submission

#### Styling
- Clean form layout with proper spacing
- Input field styling with focus states
- Validation error messages
- Consistent button styles
- Responsive form layout

### Navbar Component
#### Purpose
Provide navigation and user session controls

#### Props Interface
```typescript
interface NavbarProps {
  user?: User;
  onLogout?: () => void;
  currentPage?: string;
}
```

#### Features
- Application logo/title
- Navigation links to key pages
- User profile display when authenticated
- Logout button
- Mobile-responsive hamburger menu
- Active page highlighting

#### Styling
- Fixed positioning at top of page
- Background with appropriate contrast
- Consistent spacing and typography
- Mobile-friendly collapsed menu

### AuthForm Component
#### Purpose
Handle user authentication (login/signup)

#### Props Interface
```typescript
interface AuthFormProps {
  mode: 'login' | 'signup';
  onSubmit: (credentials: AuthCredentials) => void;
  onSwitchMode?: () => void;
  loading?: boolean;
  error?: string;
}
```

#### Features
- Email input with validation
- Password input with strength indicator
- Remember me checkbox
- Submit button with loading state
- Mode switching (login/signup)
- Error message display
- Social login options (if applicable)

#### Styling
- Centered card layout
- Input field styling with validation states
- Button styles with hover/focus states
- Form spacing and alignment
- Responsive design for mobile

## Reusable Elements

### Button Component
Consistent button styling across the application with variants:
- Primary, secondary, danger, success
- Loading states
- Disabled states
- Size variations (sm, md, lg)

### Input Component
Standardized input fields with:
- Label integration
- Error state styling
- Helper text support
- Validation feedback

### Modal Component
Reusable modal container for:
- Confirmations
- Forms
- Information display
- Loading states

## Accessibility Requirements

- Proper semantic HTML structure
- Keyboard navigation support
- Screen reader compatibility
- Sufficient color contrast
- Focus management
- ARIA labels where needed

## Responsive Design

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Flexible grid layouts
- Touch-friendly targets
- Adaptive navigation

## Error Handling

- Consistent error message display
- Form validation feedback
- Loading state indicators
- Network error handling
- Graceful degradation