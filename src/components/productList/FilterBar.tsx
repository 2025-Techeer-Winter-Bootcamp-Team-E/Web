import { useState } from 'react';
import FilterDropdown from './FilterDropdown';

const CATEGORY_OPTIONS = [
  { value: '', label: 'All Categories' },
  { value: 'electronics', label: 'Electronics' },
  { value: 'fashion', label: 'Fashion' },
  { value: 'home', label: 'Home & Living' },
  { value: 'sports', label: 'Sports' },
];

const RATING_OPTIONS = [
  { value: '', label: 'All Ratings' },
  { value: '4', label: '4+ Stars' },
  { value: '3', label: '3+ Stars' },
  { value: '2', label: '2+ Stars' },
];

const PRICE_OPTIONS = [
  { value: '', label: 'All Prices' },
  { value: '0-50000', label: 'Under 50,000' },
  { value: '50000-100000', label: '50,000 - 100,000' },
  { value: '100000-200000', label: '100,000 - 200,000' },
  { value: '200000+', label: '200,000+' },
];

const SORT_OPTIONS = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'newest', label: 'Newest' },
];

interface FilterBarProps {
  onFilterChange?: (filters: Record<string, string>) => void;
}

const FilterBar = ({ onFilterChange }: FilterBarProps) => {
  const [filters, setFilters] = useState({
    category: '',
    rating: '',
    price: '',
    sort: 'relevance',
  });

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  return (
    <div className="flex flex-wrap items-center gap-3 border-b border-gray-100 pb-4">
      <FilterDropdown
        label="Category"
        options={CATEGORY_OPTIONS}
        value={filters.category}
        onChange={(value) => handleFilterChange('category', value)}
      />
      <FilterDropdown
        label="Rating"
        options={RATING_OPTIONS}
        value={filters.rating}
        onChange={(value) => handleFilterChange('rating', value)}
      />
      <FilterDropdown
        label="Price"
        options={PRICE_OPTIONS}
        value={filters.price}
        onChange={(value) => handleFilterChange('price', value)}
      />
      <div className="ml-auto">
        <FilterDropdown
          label="Sort by"
          options={SORT_OPTIONS}
          value={filters.sort}
          onChange={(value) => handleFilterChange('sort', value)}
        />
      </div>
    </div>
  );
};

export default FilterBar;
