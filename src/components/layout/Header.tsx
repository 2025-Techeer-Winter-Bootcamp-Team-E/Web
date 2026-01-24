import React, { useState, useEffect, useRef } from 'react';
import { Menu, Search, ShoppingCart, X, ChevronDown } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { PATH } from '@/routes/path';
import { CATEGORY } from '@/constants/category';

const Header: React.FC = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const isMainPage = location.pathname === '/';
  const isProductPage = location.pathname === '/products';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cleanup timeout on unmount
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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`${PATH.PRODUCT_LIST}?q=${encodeURIComponent(searchQuery)}`);
    }
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

  const headerBg = isMainPage
    ? isScrolled
      ? 'bg-[var(--color-dark-navy)]/90 backdrop-blur-md'
      : 'bg-transparent'
    : isScrolled
      ? 'bg-white/90 shadow-sm backdrop-blur-md'
      : 'bg-white';

  const textColor = isMainPage ? 'text-white' : 'text-gray-900';
  const subTextColor = isMainPage ? 'text-gray-300' : 'text-gray-600';
  const iconColor = isMainPage ? 'text-white' : 'text-gray-900';
  const hoverBg = isMainPage ? 'hover:bg-white/10' : 'hover:bg-gray-100';

  return (
    <header className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${headerBg}`}>
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="flex h-16 items-center justify-between gap-6">
          {/* Logo */}
          <div
            className="flex cursor-pointer items-center gap-1 transition-opacity hover:opacity-80"
            onClick={() => navigate('/')}
          >
            <span className={`text-xl font-bold tracking-tight ${textColor}`}>Compare</span>
            <span className="bg-gradient-to-r from-[var(--color-gradient-purple)] to-[var(--color-gradient-blue)] bg-clip-text text-xl font-bold text-transparent">
              AI
            </span>
          </div>

          {/* Desktop Category Navigation */}
          <nav className="hidden items-center gap-1 lg:flex">
            {CATEGORY.map((category) => (
              <div
                key={category.id}
                className="relative"
                onMouseEnter={() => handleMouseEnter(category.id)}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  onClick={() => handleCategoryClick(category.name)}
                  className={`flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${subTextColor} ${hoverBg}`}
                >
                  {category.name}
                  {category.subCategories.length > 0 && (
                    <ChevronDown className={`h-3.5 w-3.5 transition-transform ${activeCategory === category.id ? 'rotate-180' : ''}`} />
                  )}
                </button>

                {/* Dropdown */}
                {activeCategory === category.id && category.subCategories.length > 0 && (
                  <div
                    className="absolute top-full left-0 z-50 pt-2 min-w-[180px]"
                    onMouseEnter={() => handleMouseEnter(category.id)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="rounded-xl border border-gray-100 bg-white p-2 shadow-lg animate-in fade-in slide-in-from-top-2 duration-200">
                      {category.subCategories.map((sub) => (
                        <button
                          key={sub.id}
                          onClick={() => handleSubCategoryClick(category.name, sub.name)}
                          className="w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
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

          {/* Search Bar (non-main pages) */}
          {!isMainPage && !isProductPage && (
            <form onSubmit={handleSearch} className="hidden flex-1 max-w-md xl:block">
              <div className="flex items-center gap-3 rounded-full border border-gray-200 bg-gray-50 px-4 py-2">
                <Search className="h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-gray-400"
                />
              </div>
            </form>
          )}

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <button
              className={`rounded-lg p-2 transition-colors ${iconColor} ${hoverBg}`}
              onClick={() => navigate(PATH.CART)}
              aria-label="장바구니"
            >
              <ShoppingCart className="h-5 w-5" strokeWidth={2} />
            </button>
            <button
              onClick={() => navigate(PATH.LOGIN)}
              className={`hidden rounded-lg px-4 py-2 text-sm font-medium transition-colors md:block ${
                isMainPage
                  ? 'bg-white text-gray-900 hover:bg-gray-100'
                  : 'bg-gradient-to-r from-[var(--color-gradient-purple)] to-[var(--color-gradient-blue)] text-white hover:opacity-90'
              }`}
            >
              Sign In
            </button>
            <button
              className={`rounded-lg p-2 lg:hidden ${hoverBg}`}
              onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
            >
              {isMobileNavOpen ? (
                <X className={`h-5 w-5 ${iconColor}`} />
              ) : (
                <Menu className={`h-5 w-5 ${iconColor}`} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileNavOpen && (
          <nav
            className={`animate-in fade-in slide-in-from-top-4 border-t py-4 lg:hidden ${
              isMainPage ? 'border-white/10' : 'border-gray-100'
            }`}
          >
            <div className="space-y-2">
              {CATEGORY.map((category) => (
                <div key={category.id}>
                  <button
                    onClick={() => handleCategoryClick(category.name)}
                    className={`w-full rounded-lg px-3 py-2.5 text-left text-[15px] font-semibold transition-colors ${textColor} ${hoverBg}`}
                  >
                    {category.name}
                  </button>
                  {category.subCategories.length > 0 && (
                    <div className="ml-4 mt-1 space-y-1">
                      {category.subCategories.map((sub) => (
                        <button
                          key={sub.id}
                          onClick={() => handleSubCategoryClick(category.name, sub.name)}
                          className={`w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${subTextColor} ${hoverBg}`}
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
