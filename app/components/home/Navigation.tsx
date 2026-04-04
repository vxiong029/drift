import Link from "next/link"

export default function Navigation() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-neutral-900 border-t border-neutral-800">
      <div className="max-w-md mx-auto flex justify-around py-2">
        <Link href="/">
          <button className="flex flex-col items-center text-xs text-white">

          <span className="text-lg">🏠</span>
          Home
        </button>
      </Link>

      <Link href="/timeline">
      <button className="flex flex-col items-center text-xs text-neutral-500">
          <span className="text-lg">🕒</span>
          Timeline
        </button>
      </Link>
      </div>
    </div>
  )
}