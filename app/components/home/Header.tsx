export default function Header() {
  return (
    <div className="px-4 py-3 border-b border-neutral-800">
      <div className="flex items-center gap-3">
        <button className="">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-4 text-white transition-colors"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        </button>

        <div className="flex flex-col">
          <h1 className="text-xl font-semibold">Azula</h1>
          {/* TODO: Add last updated time based on active log */}
          {/* <p className="text-sm text-neutral-400">
            Last updated 2 min ago
          </p> */}
        </div>
      </div>
    </div>
  );
}