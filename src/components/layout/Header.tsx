import React, { useState, useEffect, useRef } from 'react';
import { Menu, ShoppingCart, X, ChevronDown } from 'lucide-react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { PATH } from '@/routes/path';
import { CATEGORY } from '@/constants/category';

const Header: React.FC = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const isProductPage = location.pathname === '/products';
  const mainCat = searchParams.get('main_cat') || '';
  const subCat = searchParams.get('sub_cat') || '';

  const clearCategory = () => {
    const params = Object.fromEntries(searchParams.entries());
    delete params.main_cat;
    delete params.sub_cat;
    params.page = '1';
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
    navigate(`${PATH.PRODUCT_LIST}?main_cat=${encodeURIComponent(categoryName)}`);
    setActiveCategory(null);
    setIsMobileNavOpen(false);
  };

  const handleSubCategoryClick = (categoryName: string, subCategoryName: string) => {
    navigate(`${PATH.PRODUCT_LIST}?main_cat=${encodeURIComponent(categoryName)}&sub_cat=${encodeURIComponent(subCategoryName)}`);
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
            className="flex cursor-pointer items-center transition-opacity hover:opacity-60"
            onClick={() => navigate('/')}
          >
            <span className="text-lg font-light tracking-[0.1em] text-black uppercase">
              Compare AI
            </span>
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

          {/* Breadcrumb - Centered between Category Nav and Cart */}
          {isProductPage && mainCat && (
            <div className="absolute right-[12%] top-1/2 hidden -translate-y-1/2 items-center lg:flex">
              <div className="flex items-center gap-2 border border-gray-200 px-3 py-1.5">
                <span className="text-sm font-light text-black">
                  {mainCat}
                  {subCat && ` > ${subCat}`}
                </span>
                <button
                  onClick={clearCategory}
                  className="p-0.5 text-gray-400 transition-colors hover:text-black"
                >
                  <X className="h-3.5 w-3.5" strokeWidth={1.5} />
                </button>
              </div>
            </div>
          )}

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <button
              className="p-2 text-black transition-opacity hover:opacity-60"
              onClick={() => navigate(PATH.CART)}
              aria-label="장바구니"
            >
              <ShoppingCart className="h-5 w-5" strokeWidth={1.5} />
            </button>
            <button
              onClick={() => navigate(PATH.LOGIN)}
              className="hidden border border-black px-5 py-2 text-sm font-light text-black transition-all hover:bg-black hover:text-white md:block"
            >
              Sign In
            </button>
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
