import { useSearchParams } from 'react-router-dom';
import ProductGrid from '@/components/productList/ProductGrid';
import useProductListQuery from '@/hooks/queries/useProductListQuery';
import Pagination from '@/components/layout/Pagination';
import { PriceRangeFilter } from '@/components/productList';
import SortControl from '@/components/productList/Sortcontrol';

const ProductListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const minPrice = searchParams.get('min_price') || '';
  const maxPrice = searchParams.get('max_price') || '';
  const sort = searchParams.get('sort') || 'popular';
  const page = Number(searchParams.get('page')) || 1;

  const handleApplyPriceRange = (min: string, max: string) => {
    updateURL({
      min_price: min || undefined,
      max_price: max || undefined,
      page: 1,
    });
  };

  const updateURL = (newParams: Record<string, string | number | undefined>) => {
    const params = Object.fromEntries(searchParams.entries());

    Object.entries(newParams).forEach(([key, value]) => {
      if (value === undefined || value === '') {
        delete params[key];
      } else {
        params[key] = String(value);
      }
    });

    setSearchParams(params, { replace: true });
  };

  const queryParams = {
    main_cat: searchParams.get('main_cat') || undefined,
    sub_cat: searchParams.get('sub_cat') || undefined,
    min_price: searchParams.get('min_price') ? Number(searchParams.get('min_price')) : undefined,
    max_price: searchParams.get('max_price') ? Number(searchParams.get('max_price')) : undefined,
    sort: (searchParams.get('sort') || 'popular') as 'price_low' | 'price_high' | 'popular',
    page: Number(searchParams.get('page')) || 1,
    page_size: 20,
  };

  const { data, isLoading } = useProductListQuery(queryParams);

  const products = data?.products || [];

  const totalPages = data?.pagination.total_pages ?? 1;

  const handlePageChange = (newPage: number) => {
    updateURL({ page: newPage });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSortChange = (newSort: string) => {
    const params = Object.fromEntries(searchParams.entries());
    params.sort = newSort;
    params.page = '1';
    setSearchParams(params);
  };

  return (
    <div className="flex min-h-screen bg-[#f5f5f7]">
      <div className="flex-1">
        <div className="mx-auto max-w-7xl px-6 pt-4 pb-6 lg:px-12">
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="shrink-0">
              <PriceRangeFilter
                initialMin={minPrice}
                initialMax={maxPrice}
                onApply={handleApplyPriceRange}
              />
            </div>

            <div className="flex justify-end md:block">
              <SortControl currentSort={sort} onSortChange={handleSortChange} />
            </div>
          </div>

          <ProductGrid products={products} isLoading={isLoading} />
          {data && data.pagination.count > 0 && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductListPage;
