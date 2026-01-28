interface LoadingProps {
  title?: string;
  message?: string;
}

const Loading = ({ title = 'Loading...', message = '잠시만 기다려 주세요' }: LoadingProps) => {
  return (
    <>
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-15px); }
          }
          @keyframes blink {
            0%, 90%, 100% { transform: scaleY(1); }
            95% { transform: scaleY(0.1); }
          }
          /* 왼쪽 팔 애니메이션 */
          @keyframes wave-left {
            0%, 100% { transform: rotate(20deg); }
            50% { transform: rotate(60deg); }
          }
          /* 오른쪽 팔: -20도에서 -60도 사이 회전 (완전 대칭) */
          @keyframes wave-right {
            0%, 100% { transform: rotate(-20deg); }
            50% { transform: rotate(-60deg); }
          }
          @keyframes loading-bar {
            0% { width: 0%; }
            100% { width: 100%; }
          }
        `}
      </style>

      <div className="flex flex-col items-center justify-center p-10">
        {/* Robot Wrapper */}
        <div className="relative h-75 w-55 animate-[float_3s_ease-in-out_infinite]">
          {/* Antenna */}
          <div className="absolute top-10 left-1/2 z-10 flex w-20 -translate-x-1/2 justify-between">
            <div className="relative h-9 w-1.5 origin-bottom -rotate-25 rounded bg-neutral-400">
              <div className="absolute -top-3 -left-2 h-5 w-5 rounded-full bg-orange-500" />
            </div>
            <div className="relative h-9 w-1.5 origin-bottom rotate-25 rounded bg-neutral-400">
              <div className="absolute -top-3 -left-2 h-5 w-5 rounded-full bg-orange-500" />
            </div>
          </div>

          {/* Ears */}
          <div className="absolute top-20 left-9 z-0 h-8 w-6 rounded-full bg-orange-500" />
          <div className="absolute top-20 right-9 z-0 h-8 w-6 rounded-full bg-orange-500" />

          {/* Arms */}
          <div className="absolute top-44 left-19 z-10 h-12 w-5 origin-top animate-[wave-left_1.5s_ease-in-out_infinite] rounded-full bg-orange-500" />
          <div className="absolute top-44 right-19 z-10 h-12 w-5 origin-top animate-[wave-right_1.5s_ease-in-out_infinite] rounded-full bg-orange-500" />

          {/* Helmet & Face */}
          <div className="absolute top-14 left-1/2 z-20 flex h-32 w-32 -translate-x-1/2 items-center justify-center rounded-full border-[5px] border-orange-500 bg-[#d4c4a0]">
            <div className="relative flex h-23.75 w-23.75 flex-col items-center justify-center rounded-full bg-white">
              <div className="-mt-1.25 flex gap-6">
                <div className="h-8 w-6 animate-[blink_4s_infinite] rounded-full bg-neutral-800" />
                <div className="h-8 w-6 animate-[blink_4s_infinite] rounded-full bg-neutral-800" />
              </div>
              <div className="absolute bottom-4 h-4 w-8 rounded-b-full border-b-4 border-neutral-800" />
            </div>
          </div>

          {/* Torso (몸통) */}
          <div className="absolute top-42 left-1/2 z-10 flex h-15 w-17.5 -translate-x-1/2 flex-col items-center rounded-t-[18px] rounded-b-[15px] bg-[#c9b896]">
            <div className="mt-6 flex h-4 w-full items-center justify-center bg-neutral-900">
              <div className="h-4 w-4 rounded-full border-2 border-[#8a3a20] bg-[#b54a2a]" />
            </div>
          </div>

          {/* Legs (다리) */}
          <div className="absolute bottom-12 left-1/2 flex w-14.5 -translate-x-1/2 justify-between">
            <div className="h-9 w-6 rounded-b-xl bg-orange-500" />
            <div className="h-9 w-6 rounded-b-xl bg-orange-500" />
          </div>
        </div>

        {/* UI Box (Title, Progress, Message) */}
        <div className="w-full max-w-87.5 text-center">
          <h2 className="mb-4 text-xl font-bold tracking-widest text-black uppercase">{title}</h2>
          {/* Progress Bar */}
          <div className="h-1 w-full overflow-hidden rounded-full bg-gray-400">
            <div className="h-full animate-[loading-bar_4s_linear_infinite] bg-black shadow-[0_0_10px_#00f2ff]" />
          </div>
          <p className="mt-4 text-sm font-medium text-neutral-500">{message}</p>
        </div>
      </div>
    </>
  );
};

export default Loading;
