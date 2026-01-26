import { XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { TrendingDown, Calendar, ArrowDownRight, ArrowUpRight } from 'lucide-react';
import useProductTrendQuery from '@/hooks/queries/useProductTrendQuery';

const PriceTrendGraph = ({ productCode }: { productCode: number }) => {
  const { data } = useProductTrendQuery(productCode);

  if (!data) return null;

  const chartData = data.price_history.map((item) => ({
    date: item.date.slice(5),
    price: item.price,
  }));

  const prices = chartData.map((d) => d.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const currentPrice = prices[prices.length - 1];
  const priceChange = currentPrice - prices[0];
  const priceChangePercent = ((priceChange / prices[0]) * 100).toFixed(1);

  return (
    <div className="flex h-full flex-col rounded-3xl bg-white p-8 shadow-sm">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200">
            <TrendingDown className="h-5 w-5 text-black" strokeWidth={1.5} />
          </div>
          <div>
            <h4 className="text-sm font-light tracking-wide text-black">최저가 추이</h4>
            <p className="text-xs font-light text-gray-500">
              {data.selected_period}{data.period_unit} 가격 변동
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 rounded-full border border-gray-200 px-4 py-2">
          <Calendar className="h-3 w-3 text-gray-500" strokeWidth={1.5} />
          <span className="text-xs font-light text-gray-600">최근 7일</span>
        </div>
      </div>

      {/* Price Summary Cards */}
      <div className="mb-6 grid grid-cols-3 gap-3">
        <div className="rounded-2xl border border-gray-200 p-4">
          <p className="mb-1 text-xs font-light uppercase tracking-wider text-gray-500">최저가</p>
          <p className="text-lg font-light text-black">
            {minPrice.toLocaleString()}
            <span className="text-xs font-light text-gray-400">원</span>
          </p>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
          <p className="mb-1 text-xs font-light uppercase tracking-wider text-gray-500">최고가</p>
          <p className="text-lg font-light text-black">
            {maxPrice.toLocaleString()}
            <span className="text-xs font-light text-gray-400">원</span>
          </p>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
          <p className="mb-1 text-xs font-light uppercase tracking-wider text-gray-500">변동</p>
          <div className="flex items-center gap-1">
            {priceChange <= 0 ? (
              <ArrowDownRight className="h-4 w-4 text-black" strokeWidth={1.5} />
            ) : (
              <ArrowUpRight className="h-4 w-4 text-gray-500" strokeWidth={1.5} />
            )}
            <p className={`text-lg font-light ${priceChange <= 0 ? 'text-black' : 'text-gray-500'}`}>
              {priceChangePercent}%
            </p>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="min-h-48 flex-1 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="priceGradientMinimal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#000000" stopOpacity={0.1} />
                <stop offset="100%" stopColor="#000000" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: '#9ca3af', fontWeight: 300 }}
              dy={10}
            />
            <YAxis
              hide
              domain={['dataMin - 5000', 'dataMax + 5000']}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                boxShadow: 'none',
                padding: '12px 16px',
              }}
              labelStyle={{ fontSize: '11px', color: '#6b7280', marginBottom: '4px', fontWeight: 300 }}
              itemStyle={{ fontSize: '14px', fontWeight: 300, color: '#000000' }}
              formatter={(value: number | undefined) => [`${(value ?? 0).toLocaleString()}원`, '가격']}
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#000000"
              strokeWidth={1.5}
              fill="url(#priceGradientMinimal)"
              activeDot={{
                r: 5,
                fill: '#000000',
                strokeWidth: 2,
                stroke: 'white',
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom Info */}
      <div className="mt-auto flex items-center justify-between border-t border-gray-200 pt-4">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 bg-black" />
          <span className="text-xs font-light text-gray-500">현재가</span>
          <span className="text-sm font-light text-black">
            {currentPrice.toLocaleString()}원
          </span>
        </div>
        <button className="text-xs font-light text-black underline underline-offset-2 hover:no-underline">
          상세 분석 보기
        </button>
      </div>
    </div>
  );
};

export default PriceTrendGraph;
