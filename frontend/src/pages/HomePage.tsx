export default function HomePage() {
  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-4 text-2xl font-bold">Welcome to AI Code Reviewer</h1>
      <p className="mb-4">Get instant feedback on your code from our AI assistant.</p>
      <div className="flex gap-4">
        <a href="/review" className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
          Try Code Review
        </a>
        <a href="/login" className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
          Login
        </a>
      </div>
    </div>
  );
}
