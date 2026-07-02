
export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="flex flex-col items-center gap-4">
        
        {/* Spinner */}
        <div className="w-14 h-14 border-4 border-gray-700 border-t-white rounded-full animate-spin"></div>

        {/* Text */}
        <p className="text-white text-lg font-medium tracking-wide">
          Loading...
        </p>
      </div>
    </div>
  );
}