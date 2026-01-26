import React, { useState, useEffect, useRef } from 'react';
import { Menu, ShoppingCart, X, ChevronDown, User } from 'lucide-react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PATH } from '@/routes/path';
import { CATEGORY } from '@/constants/category';
import FilterDropdown from '@/components/productList/FilterDropdown';
import { useNavigation } from '@/contexts/NavigationContext';

const SORT_OPTIONS = [
  { value: 'popular', label: '인기순' },
  { value: 'price_low', label: '낮은 가격순' },
  { value: 'price_high', label: '높은 가격순' },
];

const Header: React.FC = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const timeoutRef = useRef<number | null>(null);
  const { navigateWithAnimation } = useNavigation();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  // Check login status
  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    setIsLoggedIn(!!accessToken);
  }, [location]);

  const isProductListPage = location.pathname === '/products';
  const mainCat = searchParams.get('main_cat') || '';
  const subCat = searchParams.get('sub_cat') || '';
  const sort = searchParams.get('sort') || 'popular';
  const currentPage = Number(searchParams.get('page')) || 1;
  const totalPages = 10; // This should come from API response, using placeholder for now

  const handlePageChange = (page: number) => {
    const params = Object.fromEntries(searchParams.entries());
    params.page = String(page);
    setSearchParams(params, { replace: true });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSortChange = (value: string) => {
    const params = Object.fromEntries(searchParams.entries());
    params.sort = value;
    setSearchParams(params, { replace: true });
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = (categoryId: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setActiveCategory(categoryId);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = window.setTimeout(() => {
      setActiveCategory(null);
    }, 150);
  };

  const handleCategoryClick = (categoryName: string) => {
    navigateWithAnimation(`${PATH.PRODUCT_LIST}?main_cat=${encodeURIComponent(categoryName)}`);
    setActiveCategory(null);
    setIsMobileNavOpen(false);
  };

  const handleSubCategoryClick = (categoryName: string, subCategoryName: string) => {
    navigateWithAnimation(`${PATH.PRODUCT_LIST}?main_cat=${encodeURIComponent(categoryName)}&sub_cat=${encodeURIComponent(subCategoryName)}`);
    setActiveCategory(null);
    setIsMobileNavOpen(false);
  };

  const headerBg = isScrolled ? 'bg-white/95 backdrop-blur-sm' : 'bg-white';

  return (
    <header className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${headerBg} ${isScrolled ? 'border-b border-gray-100' : ''}`}>
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="relative flex h-16 items-center justify-between">
          {/* Logo */}
          <div
            className="ml-2 flex cursor-pointer items-center transition-opacity hover:opacity-60"
            onClick={() => navigateWithAnimation('/')}
          >
            <img
              src="/videos/logo.png"
              alt="WYW"
              className="h-7 w-auto"
            />
          </div>

          {/* Desktop Category Navigation - Always Centered */}
          <nav className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-6 lg:flex">
            {CATEGORY.map((category) => (
              <div
                key={category.id}
                className="relative"
                onMouseEnter={() => handleMouseEnter(category.id)}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  onClick={() => handleCategoryClick(category.name)}
                  className="flex items-center gap-1 py-2 text-sm font-light tracking-wide text-gray-600 transition-colors hover:text-black"
                >
                  {category.name}
                  {category.subCategories.length > 0 && (
                    <ChevronDown className={`h-3 w-3 transition-transform ${activeCategory === category.id ? 'rotate-180' : ''}`} strokeWidth={1.5} />
                  )}
                </button>

                {/* Dropdown */}
                {activeCategory === category.id && category.subCategories.length > 0 && (
                  <div
                    className="absolute top-full left-0 z-50 pt-2 min-w-[160px]"
                    onMouseEnter={() => handleMouseEnter(category.id)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="border border-gray-100 bg-white py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                      {category.subCategories.map((sub) => (
                        <button
                          key={sub.id}
                          onClick={() => handleSubCategoryClick(category.name, sub.name)}
                          className="w-full px-4 py-2 text-left text-sm font-light text-gray-600 transition-colors hover:bg-gray-50 hover:text-black"
                        >
                          {sub.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <button
              className="p-2 text-black transition-opacity hover:opacity-60"
              onClick={() => navigateWithAnimation(PATH.CART)}
              aria-label="장바구니"
            >
              <ShoppingCart className="h-5 w-5" strokeWidth={1.5} />
            </button>
            {isLoggedIn ? (
              <button
                onClick={() => navigateWithAnimation(PATH.MY_PAGE)}
                className="hidden p-2 text-black transition-opacity hover:opacity-60 md:block"
                aria-label="마이페이지"
              >
                <User className="h-5 w-5" strokeWidth={1.5} />
              </button>
            ) : (
              <button
                onClick={() => navigateWithAnimation(PATH.LOGIN)}
                className="hidden rounded-full border border-black px-5 py-2 text-sm font-light text-black transition-all hover:bg-black hover:text-white md:block"
              >
                Sign In
              </button>
            )}
            <button
              className="p-2 lg:hidden"
              onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
            >
              {isMobileNavOpen ? (
                <X className="h-5 w-5 text-black" strokeWidth={1.5} />
              ) : (
                <Menu className="h-5 w-5 text-black" strokeWidth={1.5} />
              )}
            </button>
          </div>
        </div>

        {/* Product List Filter Bar - Second Row */}
        <AnimatePresence>
          {isProductListPage && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              className="overflow-hidden"
            >
              <div className="flex items-center justify-between border-t border-gray-100 py-3">
            {/* Category Tag - Left */}
            <div className="flex items-center min-w-[200px]">
              {mainCat && (
                <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700">
                  {mainCat}
                  {subCat && ` > ${subCat}`}
                </div>
              )}
            </div>

            {/* Pagination - Center */}
            <div className="flex items-center gap-1">
              {(() => {
                const pages: (number | string)[] = [];
                const showPages = 5;
                let startPage = Math.max(1, currentPage - Math.floor(showPages / 2));
                let endPage = Math.min(totalPages, startPage + showPages - 1);

                if (endPage - startPage + 1 < showPages) {
                  startPage = Math.max(1, endPage - showPages + 1);
                }

                if (startPage > 1) {
                  pages.push(1);
                  if (startPage > 2) pages.push('...');
                }

                for (let i = startPage; i <= endPage; i++) {
                  pages.push(i);
                }

                if (endPage < totalPages) {
                  if (endPage < totalPages - 1) pages.push('...');
                  pages.push(totalPages);
                }

                return pages.map((page, idx) =>
                  typeof page === 'string' ? (
                    <span key={`ellipsis-${idx}`} className="px-1 text-sm text-gray-400">{page}</span>
                  ) : (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`flex h-8 w-8 items-center justify-center text-sm transition-colors ${
                        currentPage === page
                          ? 'font-semibold text-black'
                          : 'font-light text-gray-400 hover:text-black'
                      }`}
                    >
                      {page}
                    </button>
                  )
                );
              })()}
            </div>

            {/* Sort Dropdown - Right */}
            <div className="flex items-center justify-end min-w-[200px]">
              <FilterDropdown
                label="정렬"
                options={SORT_OPTIONS}
                value={sort}
                onChange={handleSortChange}
              />
            </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Navigation */}
        {isMobileNavOpen && (
          <nav className="animate-in fade-in slide-in-from-top-4 border-t border-gray-100 py-6 lg:hidden">
            <div className="space-y-4">
              {CATEGORY.map((category) => (
                <div key={category.id}>
                  <button
                    onClick={() => handleCategoryClick(category.name)}
                    className="w-full py-2 text-left text-sm font-light tracking-wide text-black"
                  >
                    {category.name}
                  </button>
                  {category.subCategories.length > 0 && (
                    <div className="ml-4 mt-2 space-y-2">
                      {category.subCategories.map((sub) => (
                        <button
                          key={sub.id}
                          onClick={() => handleSubCategoryClick(category.name, sub.name)}
                          className="w-full py-1 text-left text-sm font-light text-gray-500 hover:text-black"
                        >
                          {sub.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
