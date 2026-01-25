import { Bell } from 'lucide-react';

const TimerRegisterButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center justify-center gap-2 border border-black bg-black py-4 text-sm font-light tracking-wide text-white transition-all hover:bg-white hover:text-black"
    >
      <Bell className="h-4 w-4" strokeWidth={1.5} />
      가격 알림 설정
    </button>
  );
};

export default TimerRegisterButton;
