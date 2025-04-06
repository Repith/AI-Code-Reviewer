# AI Code Reviewer

An AI-powered application that provides instant code reviews and feedback for your JavaScript and TypeScript code.

## Features

- AI-powered code analysis and feedback
- Support for JavaScript and TypeScript
- User authentication system
- Review history tracking
- Real-time streaming feedback

## Tech Stack

### Backend
- NestJS framework
- MongoDB database
- OpenAI API integration
- JWT authentication

### Frontend
- React with TypeScript
- Tailwind CSS for styling
- React Router for navigation
- Axios for API requests

## Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ai-code-reviewer.git
cd ai-code-reviewer
```

2. Install dependencies:
```bash
npm run install:all
```

3. Set up environment variables:
   - Create a `.env` file in the backend directory with:
   ```
   MONGODB_URI=mongodb://admin:password@localhost:27017/code-reviewer?authSource=admin
   JWT_SECRET=your_jwt_secret
   OPENAI_API_KEY=your_openai_api_key
   ```

4. Start the application:
```bash
npm start
```

The application will be available at:
- Frontend: http://localhost:3001
- Backend API: http://localhost:3000/api

## Docker Setup

You can also run the application using Docker:

```bash
docker-compose up
```

## Project Structure

```
ai-code-reviewer/
├── backend/             # NestJS backend
│   ├── src/
│   │   ├── config/      # Configuration files
│   │   ├── modules/     # Feature modules
│   │   └── main.ts      # Application entry point
│   └── Dockerfile
├── frontend/            # React frontend
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── contexts/    # React contexts
│   │   ├── pages/       # Page components
│   │   └── services/    # API services
│   └── Dockerfile
└── docker-compose.yml   # Docker configuration
```

## Development

- Backend development server: `npm run start:backend`
- Frontend development server: `npm run start:frontend`
- Lint code: `npm run lint`
- Format code: `npm run format`

## License

[MIT License](LICENSE)

