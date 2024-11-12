import Link from "next/link";

const UnderDevelopment = () => {
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className=" p-8 bg-gray-900 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-4">Page Under Development</h1>
        <p className="text-gray-700 mb-4">
          We're working hard to bring this page to you soon. Stay tuned!
        </p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.995 3.744v7.5a6 6 0 1 1-12 0v-7.5m-2.25 16.502h16.5"
          />
        </svg>

        <Link href="/" className="text-blue-500 hover:underline">
          Go back to Home
        </Link>
      </div>
    </div>
  );
};

export default UnderDevelopment;
