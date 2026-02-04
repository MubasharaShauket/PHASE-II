# Frontend CLAUDE Code Guidelines

## Directory Structure
- `/app` - Next.js 16+ App Router pages and layouts
- `/components` - Reusable UI components
- `/lib` - Utility functions and API clients
- `/types` - TypeScript type definitions
- `/styles` - Global styles and Tailwind configuration

## Development Standards
- Use TypeScript for all components
- Follow Next.js 16+ App Router patterns
- Implement responsive design with Tailwind CSS
- Use Server Components by default, Client Components only when needed
- Maintain accessibility standards

## API Integration
- Use centralized API client in `/lib/api.ts`
- Implement proper error handling and loading states
- Follow the API specifications from `/specs/api/rest-endpoints.md`
- Include JWT authentication in all requests

## Component Architecture
- Follow the component specifications in `/specs/ui/components.md`
- Maintain consistent styling with Tailwind CSS
- Implement proper prop interfaces with TypeScript
- Include accessibility attributes where needed

## Authentication
- Integrate Better Auth following `/specs/features/authentication.md`
- Protect routes as specified in `/specs/ui/pages.md`
- Handle session management properly
- Implement proper redirect flows

## Testing
- Unit test components where appropriate
- Test API integration thoroughly
- Verify authentication flows
- Test responsive behavior