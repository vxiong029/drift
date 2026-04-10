export function AlertBanner({
  message,
  subtext,
  onClick,
}: {
  message: string;
  subtext?: string;
  onClick: (action: 'stop' | 'continue') => void;
}) {
  return (
    <div className="
      fixed bottom-4 left-4 right-4
      z-50
      animate-slide-up
    ">
      <div className="
        bg-neutral-900/90 backdrop-blur
        border border-neutral-800
        rounded-2xl shadow-xl
        p-4
      ">
        <div className="flex items-start gap-3">
          <div className="text-lg">⏰</div>

          <div className="flex-1">
            <p className="text-sm font-medium text-white">
              {message}
            </p>

            {subtext && (
              <p className="text-xs text-neutral-400 mt-1">
                {subtext}
              </p>
            )}
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <button
            onClick={() => onClick('stop')}
            className="
              flex-1
              bg-white text-black
              text-sm font-medium
              py-2 rounded-xl
              active:scale-95 transition
            "
          >
            Stop
          </button>

          <button
            onClick={() => onClick('continue')}
            className="
              flex-1
              bg-neutral-800 text-white
              text-sm
              py-2 rounded-xl
              active:scale-95 transition
            "
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}