export default function AppPage() {
  return (
    <div className="w-full max-w-[1920px] mx-auto">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Dashboard content will go here */}
        <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Welcome</h2>
          <p className="text-gray-400">
            Your dashboard content will appear here.
          </p>
        </div>
      </div>
    </div>
  );
}

