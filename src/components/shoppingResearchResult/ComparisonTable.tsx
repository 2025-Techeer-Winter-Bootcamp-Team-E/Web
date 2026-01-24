import React from 'react';
import { RefreshCw } from 'lucide-react';
import StarRating from './StarRating';

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  performance_score: number;
  cpu: string;
  ram: string;
  is_lowest_price: boolean;
}

interface ComparisonTableProps {
  title: string;
  products: Product[];
}

const ComparisonTable: React.FC<ComparisonTableProps> = ({ title, products }) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3 px-1">
        <RefreshCw className="h-5 w-5 text-[var(--color-gradient-purple)]" strokeWidth={2.5} />
        <h2 className="text-[22px] font-bold tracking-tight text-gray-900">{title}</h2>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="w-40 px-6 py-12 text-center text-[13px] font-bold tracking-widest text-gray-500 uppercase">
                  속성
                </th>
                {products.map((product) => (
                  <th key={product.id} className="min-w-60 px-6 py-8 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-white p-2 shadow-sm">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-contain"
                        />
                      </div>
                      <p className="text-[15px] font-bold tracking-tight text-gray-900">
                        {product.name}
                      </p>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="bg-gray-50/50 px-6 py-5 text-center text-[14px] font-semibold text-gray-500">
                  가격
                </td>
                {products.map((product) => (
                  <td
                    key={product.id}
                    className="px-6 py-5 text-center text-[15px] font-bold text-gray-900"
                  >
                    <span className={product.is_lowest_price ? 'text-[var(--color-gradient-purple)]' : ''}>
                      {product.price.toLocaleString()}원
                    </span>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="bg-gray-50/50 px-6 py-5 text-center text-[14px] font-semibold text-gray-500">
                  성능 지수
                </td>
                {products.map((product) => (
                  <td key={product.id} className="px-6 py-5">
                    <div className="flex scale-90 justify-center opacity-80">
                      <StarRating rating={Math.round(product.performance_score * 5)} />
                    </div>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="bg-gray-50/50 px-6 py-5 text-center text-[14px] font-semibold text-gray-500">
                  프로세서
                </td>
                {products.map((product) => (
                  <td
                    key={product.id}
                    className="px-6 py-5 text-center text-[14px] font-medium text-gray-600"
                  >
                    {product.cpu}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="bg-gray-50/50 px-6 py-5 text-center text-[14px] font-semibold text-gray-500">
                  메모리 용량
                </td>
                {products.map((product) => (
                  <td
                    key={product.id}
                    className="px-6 py-5 text-center text-[14px] font-medium text-gray-600"
                  >
                    {product.ram}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ComparisonTable;
