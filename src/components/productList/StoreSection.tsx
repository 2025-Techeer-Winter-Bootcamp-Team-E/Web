import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface Store {
  id: string;
  name: string;
  rating: number;
  reviewCount: string;
  logo?: string;
}

const MOCK_STORES: Store[] = [
  { id: '1', name: 'Deux par Deux', rating: 4.5, reviewCount: '2.6k' },
  { id: '2', name: 'Paisley & Grey', rating: 5.0, reviewCount: '294' },
  { id: '3', name: 'Ally fashion', rating: 4.8, reviewCount: '2.6k' },
  { id: '4', name: 'Nike', rating: 4.9, reviewCount: '2.6k' },
  { id: '5', name: 'Adidas', rating: 4.7, reviewCount: '1.8k' },
];

const StoreCard = ({ store, index }: { store: Store; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="flex w-44 flex-shrink-0 cursor-pointer flex-col items-center rounded-2xl border border-gray-100 bg-white p-4 transition-shadow hover:shadow-md"
    >
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100">
        <span className="text-lg font-bold text-gray-400">
          {store.name.charAt(0)}
        </span>
      </div>
      <h3 className="mb-1 text-sm font-medium text-gray-900">{store.name}</h3>
      <div className="flex items-center gap-1">
        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
        <span className="text-xs font-medium text-gray-700">{store.rating}</span>
        <span className="text-xs text-gray-400">({store.reviewCount})</span>
      </div>
      <button className="mt-3 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600 transition-colors hover:bg-blue-100">
        Visit shop
      </button>
    </motion.div>
  );
};

interface StoreSectionProps {
  stores?: Store[];
}

const StoreSection = ({ stores = MOCK_STORES }: StoreSectionProps) => {
  return (
    <section className="mb-8">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Store</h2>
        <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
          View All &gt;
        </button>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {stores.map((store, index) => (
          <StoreCard key={store.id} store={store} index={index} />
        ))}
      </div>
    </section>
  );
};

export default StoreSection;
