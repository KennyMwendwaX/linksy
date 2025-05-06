export default function Settings() {
  return (
    <div className="px-4 lg:px-6">
      <h1 className="text-2xl font-bold">Settings</h1>
      <p className="mt-2 text-gray-600">Here you can find settings options.</p>
      <ul className="mt-4 space-y-2">
        <li>
          <a
            href="https://example.com"
            className="text-blue-500 hover:underline">
            Example Settings Link 1
          </a>
        </li>
        <li>
          <a
            href="https://example.com"
            className="text-blue-500 hover:underline">
            Example Settings Link 2
          </a>
        </li>
      </ul>
    </div>
  );
}
