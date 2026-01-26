interface PriceComparisonTableProps {
  comparisons: {
    mall_name: string;
    price: number;
    url: string;
  }[];
}

const PriceComparisonTable = ({ comparisons }: PriceComparisonTableProps) => {
  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-200 p-6">
        <h3 className="text-lg font-light tracking-wide text-black">가격비교</h3>
        <span className="text-sm font-light text-gray-500">판매처 {comparisons.length}곳</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="px-6 py-4 text-left text-xs font-light tracking-wider text-gray-500 uppercase">
                판매처
              </th>
              <th className="px-6 py-4 text-right text-xs font-light tracking-wider text-gray-500 uppercase">
                가격
              </th>
              <th className="px-6 py-4 text-center text-xs font-light tracking-wider text-gray-500 uppercase">
                구매
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {comparisons.map((comparison, index) => (
              <tr key={index} className="transition-colors hover:bg-gray-50">
                <td className="px-6 py-5">
                  <span className="text-sm font-light text-black">{comparison.mall_name}</span>
                </td>
                <td className="px-6 py-5 text-right">
                  <span className="text-base font-light tracking-tight text-black">
                    {comparison.price.toLocaleString()}원
                  </span>
                </td>
                <td className="px-6 py-5 text-center">
                  <a
                    href={comparison.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block rounded-full border border-black px-4 py-1.5 text-xs font-medium text-black transition-all hover:bg-black hover:text-white"
                  >
                    이동
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PriceComparisonTable;
