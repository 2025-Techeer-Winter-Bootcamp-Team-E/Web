import FilterDropdown from '@/components/productList/FilterDropdown';

const SORT_OPTIONS = [
  { value: 'popular', label: '인기순' },
  { value: 'price_low', label: '낮은 가격순' },
  { value: 'price_high', label: '높은 가격순' },
];

interface SortControlProps {
  currentSort: string;
  onSortChange: (value: string) => void;
}

const SortControl = ({ currentSort, onSortChange }: SortControlProps) => {
  return (
    <div className="flex items-center justify-end">
      <FilterDropdown
        label="정렬"
        options={SORT_OPTIONS}
        value={currentSort}
        onChange={onSortChange}
      />
    </div>
  );
};

export default SortControl;
