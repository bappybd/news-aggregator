import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <>
      <header className="text-gray-400 bg-gray-900 body-font sticky top-0 z-0 ">
        <div className="container mx-auto flex flex-wrap p-2 flex-col md:flex-row items-center">
          <a className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span className="ml-3 text-xl cursor-pointer hidden lg:block">
              News Aggregator
            </span>
          </a>
          <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-700	flex flex-wrap items-center text-base justify-center">
            <Link to="/" className="mr-4">
              Home
            </Link>
            <Link to="/settings">Settings</Link>
          </nav>
        </div>
      </header>
    </>
  );
}
