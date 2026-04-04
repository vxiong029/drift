export default function Header() {
  return (
      <div className="flex items-center gap-2 mb-4">
      <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 text-white transition-colors">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
      </svg>
      <h1 className="text-xl font-semibold">Azula</h1>
      <p className="text-sm text-neutral-400">Last updated 2 min ago</p>
      </div>
  )
}