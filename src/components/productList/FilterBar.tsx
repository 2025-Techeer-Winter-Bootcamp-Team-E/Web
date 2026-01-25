import { useState } from 'react';
import FilterDropdown from './FilterDropdown';

const SORT_OPTIONS = [
  { value: 'relevance', label: '관련순' },
  { value: 'price-asc', label: '낮은 가격순' },
  { value: 'price-desc', label: '높은 가격순' },
  { value: 'rating', label: '평점순' },
  { value: 'newest', label: '최신순' },
];

interface FilterBarProps {
  onFilterChange?: (filters: Record<string, string>) => void;
}

const FilterBar = ({ onFilterChange }: FilterBarProps) => {
  const [filters, setFilters] = useState({
    sort: 'relevance',
  });

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  return (
    <div className="flex flex-wrap items-center justify-end border-b border-gray-100 pb-4">
      <FilterDropdown
        label="정렬"
        options={SORT_OPTIONS}
        value={filters.sort}
        onChange={(value) => handleFilterChange('sort', value)}
      />
    </div>
  );
};

export default FilterBar;
