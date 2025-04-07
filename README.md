# AI Code Reviewer

An AI-powered application that provides instant code reviews and feedback for your JavaScript and TypeScript code.

![AI Code Reviewer](frontend/public/screenshots/shot_1.png)

## Features

- AI-powered code analysis and feedback
- Support for JavaScript and TypeScript
- User authentication with JWT
- Review history tracking
- Real-time streaming feedback
- Dark/light theme support
- Responsive design

## Screenshots

<div align="center">
  <img src="frontend/public/screenshots/shot_2.png" alt="Code Review" width="45%" />
  <img src="frontend/public/screenshots/shot_3.png" alt="Review History" width="45%" />
</div>

<div align="center">
  <img src="frontend/public/screenshots/shot_4.png" alt="Login Page" width="45%" />
  <img src="frontend/public/screenshots/shot_5.png" alt="Dark Mode" width="45%" />
</div>

## Tech Stack

### Backend
- NestJS framework (v10.4+)
- MongoDB with Mongoose ODM
- OpenAI API integration
- JWT authentication
- CQRS pattern support

### Frontend
- React 19 with TypeScript
- Tailwind CSS 4 for styling
- React Router v7 for navigation
- Axios for API requests
- React Hook Form for form handling
- React Markdown for rendering feedback
- Framer Motion for animations

## Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Repith/ai-code-reviewer.git
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

This will start:
- MongoDB container on port 27017
- Backend container on port 3000
- Frontend container on port 3001

## Project Structure

```
ai-code-reviewer/
├── backend/                # NestJS backend
│   ├── src/
│   │   ├── config/         # Configuration files
│   │   ├── modules/        # Feature modules
│   │   │   ├── auth/       # Authentication module
│   │   │   ├── review/     # Code review module
│   │   │   └── user/       # User management module
│   │   └── main.ts         # Application entry point
│   ├── Dockerfile          # Backend Docker configuration
│   └── package.json        # Backend dependencies
├── frontend/               # React frontend
│   ├── public/             # Static assets
│   │   └── screenshots/    # Application screenshots
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── contexts/       # React contexts (Auth, Theme)
│   │   ├── pages/          # Page components
│   │   └── services/       # API services
│   ├── Dockerfile          # Frontend Docker configuration
│   └── package.json        # Frontend dependencies
├── docker-compose.yml      # Docker configuration
└── package.json            # Root package.json for scripts
```

## Development

- Backend development server: `npm run start:backend`
- Frontend development server: `npm run start:frontend`
- Lint code: `npm run lint`
- Format code: `npm run format`
- Update dependencies: `npm run update-deps`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

[MIT License](LICENSE)

