import { useState } from 'react';
import TimerCard from '../components/myPage/timer/TimerCard';
import Pagination from '../components/layout/Pagination';
import useTimerAllGetQuery from '@/hooks/queries/useTimerAllGetQuery';
import { RefreshCw } from 'lucide-react';

const MyTimerGridPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const userId = Number(localStorage.getItem('user_id'));

  // 6개씩 페이징 처리
  const { data } = useTimerAllGetQuery(userId, currentPage, 6);
  const timers = data?.timers || [];
  const pageInfo = data?.page_info;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full">
      {timers.length > 0 ? (
        <div className=" ">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {timers.map((timer) => (
              <TimerCard key={timer.timer_id} timer={timer} />
            ))}
          </div>
          {pageInfo && pageInfo.total_pages > 1 && (
            <div className="mb-8 flex justify-center">
              <Pagination
                currentPage={pageInfo.current_page + 1}
                totalPages={pageInfo.total_pages}
                onPageChange={(page) => handlePageChange(page - 1)}
              />
            </div>
          )}
        </div>
      ) : (
        /* 빈 상태 디자인 (기존 코드 스타일 유지) */
        <div className="flex flex-col items-center justify-center rounded-[2rem] border border-dashed border-[#d2d2d7] bg-[#f5f5f7]/50 py-32 text-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-sm">
            <RefreshCw className="h-8 w-8 text-[#d2d2d7]" />
          </div>
          <h3 className="text-[21px] font-semibold text-[#1d1d1f]">보관함이 비어있습니다</h3>
          <p className="mt-2 text-[15px] text-[#86868b]">
            새로운 타이머를 등록해 쇼핑 인텔리전스를 경험하세요.
          </p>
        </div>
      )}
    </div>
  );
};

export default MyTimerGridPage;
