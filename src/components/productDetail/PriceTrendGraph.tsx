import { XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { TrendingDown, Calendar, ArrowDownRight } from 'lucide-react';
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
    <div className="flex-1 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-[var(--color-gradient-purple)]/10 to-[var(--color-gradient-blue)]/10">
            <TrendingDown className="h-5 w-5 text-[var(--color-gradient-purple)]" />
          </div>
          <div>
            <h4 className="text-[15px] font-bold text-gray-900">최저가 추이</h4>
            <p className="text-[12px] text-gray-500">
              {data.selected_period}{data.period_unit} 가격 변동
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5">
          <Calendar className="h-3 w-3 text-gray-500" />
          <span className="text-[11px] font-medium text-gray-600">최근 7일</span>
        </div>
      </div>

      {/* Price Summary Cards */}
      <div className="mb-6 grid grid-cols-3 gap-3">
        <div className="rounded-xl bg-gradient-to-br from-[var(--color-gradient-purple)]/5 to-[var(--color-gradient-blue)]/5 p-3">
          <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-gray-500">최저가</p>
          <p className="text-lg font-bold text-[var(--color-gradient-purple)]">
            {minPrice.toLocaleString()}
            <span className="text-xs font-normal text-gray-400">원</span>
          </p>
        </div>
        <div className="rounded-xl bg-gray-50 p-3">
          <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-gray-500">최고가</p>
          <p className="text-lg font-bold text-gray-900">
            {maxPrice.toLocaleString()}
            <span className="text-xs font-normal text-gray-400">원</span>
          </p>
        </div>
        <div className="rounded-xl bg-gray-50 p-3">
          <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-gray-500">변동</p>
          <div className="flex items-center gap-1">
            <ArrowDownRight className={`h-4 w-4 ${priceChange <= 0 ? 'text-green-500' : 'text-red-500'}`} />
            <p className={`text-lg font-bold ${priceChange <= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {priceChangePercent}%
            </p>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-48 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: '#9ca3af' }}
              dy={10}
            />
            <YAxis
              hide
              domain={['dataMin - 5000', 'dataMax + 5000']}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                borderRadius: '12px',
                border: '1px solid #e5e7eb',
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                padding: '12px 16px',
              }}
              labelStyle={{ fontSize: '11px', color: '#6b7280', marginBottom: '4px' }}
              itemStyle={{ fontSize: '14px', fontWeight: '700', color: '#111827' }}
              formatter={(value: number | undefined) => [`${(value ?? 0).toLocaleString()}원`, '가격']}
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#8b5cf6"
              strokeWidth={2.5}
              fill="url(#priceGradient)"
              activeDot={{
                r: 6,
                fill: '#8b5cf6',
                strokeWidth: 3,
                stroke: 'white',
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom Info */}
      <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-[var(--color-gradient-purple)]" />
          <span className="text-[12px] font-medium text-gray-500">현재가</span>
          <span className="text-[14px] font-bold text-gray-900">
            {currentPrice.toLocaleString()}원
          </span>
        </div>
        <button className="text-[12px] font-semibold text-[var(--color-gradient-purple)] hover:underline">
          상세 분석 보기 →
        </button>
      </div>
    </div>
  );
};

export default PriceTrendGraph;
