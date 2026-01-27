import React, { useState, useEffect, useRef } from 'react';
import { Menu, ShoppingCart, X, ChevronDown, User } from 'lucide-react';
import { PATH } from '@/routes/path';
import { CATEGORY } from '@/constants/category';
import { useNavigation } from '@/contexts/NavigationContext';
import useAuth from '@/hooks/useAuth';

const Header: React.FC = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const { navigateWithAnimation } = useNavigation();

  const { isAuthenticated } = useAuth();

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

  const handleMouseEnter = (categoryId: number) => {
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

  const handleCategoryClick = (categoryId: number) => {
    navigateWithAnimation(`${PATH.PRODUCT_LIST}?main_cat=${categoryId}`);
    setActiveCategory(null);
    setIsMobileNavOpen(false);
  };

  const handleSubCategoryClick = (categoryId: number, subCategoryName: number) => {
    navigateWithAnimation(`${PATH.PRODUCT_LIST}?main_cat=${categoryId}&sub_cat=${subCategoryName}`);
    setActiveCategory(null);
    setIsMobileNavOpen(false);
  };

  const headerBg = isScrolled ? 'bg-white/95 backdrop-blur-sm' : 'bg-white';

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${headerBg} ${isScrolled ? 'border-b border-gray-100' : ''}`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="relative flex h-16 items-center justify-between">
          {/* Logo */}
          <div
            className="ml-2 flex cursor-pointer items-center transition-opacity hover:opacity-60"
            onClick={() => navigateWithAnimation('/')}
          >
            <img src="/logo.png" alt="modulo" className="h-7 w-auto" />
          </div>

          {/* Desktop Category Navigation - Always Centered */}
          <nav className="absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-6 lg:flex">
            {CATEGORY.map((category) => (
              <div
                key={category.id}
                className="relative"
                onMouseEnter={() => handleMouseEnter(category.id)}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  onClick={() => handleCategoryClick(category.id)}
                  className="flex items-center gap-1 py-2 text-sm font-light tracking-wide text-gray-600 transition-colors hover:text-black"
                >
                  {category.name}
                  {category.subCategories.length > 0 && (
                    <ChevronDown
                      className={`h-3 w-3 transition-transform ${activeCategory === category.id ? 'rotate-180' : ''}`}
                      strokeWidth={1.5}
                    />
                  )}
                </button>

                {/* Dropdown */}
                {activeCategory === category.id && category.subCategories.length > 0 && (
                  <div
                    className="absolute top-full left-0 z-50 min-w-40 pt-2"
                    onMouseEnter={() => handleMouseEnter(category.id)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="animate-in fade-in slide-in-from-top-2 border border-gray-100 bg-white py-2 duration-200">
                      {category.subCategories.map((sub) => (
                        <button
                          key={sub.id}
                          onClick={() => handleSubCategoryClick(category.id, sub.id)}
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

          <div className="flex items-center gap-4">
            {isAuthenticated && (
              <button
                className="p-2 text-black transition-opacity hover:opacity-60"
                onClick={() => navigateWithAnimation(PATH.CART)}
                aria-label="장바구니"
              >
                <ShoppingCart className="h-5 w-5" strokeWidth={1.5} />
              </button>
            )}

            {isAuthenticated ? (
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
            <button className="p-2 lg:hidden" onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}>
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
                    onClick={() => handleCategoryClick(category.id)}
                    className="w-full py-2 text-left text-sm font-light tracking-wide text-black"
                  >
                    {category.name}
                  </button>
                  {category.subCategories.length > 0 && (
                    <div className="mt-2 ml-4 space-y-2">
                      {category.subCategories.map((sub) => (
                        <button
                          key={sub.id}
                          onClick={() => handleSubCategoryClick(category.id, sub.id)}
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
