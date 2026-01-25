import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface NavigationContextType {
  isExiting: boolean;
  navigateWithAnimation: (to: string) => void;
}

const NavigationContext = createContext<NavigationContextType | null>(null);

export const NavigationProvider = ({ children }: { children: ReactNode }) => {
  const [isExiting, setIsExiting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navigateWithAnimation = useCallback((to: string) => {
    const isMainPage = location.pathname === '/';

    if (isMainPage && to !== '/') {
      // 메인 페이지에서 나갈 때: 애니메이션 먼저, 그 다음 네비게이션
      setIsExiting(true);
      setTimeout(() => {
        setIsExiting(false);
        navigate(to);
      }, 1200);
    } else {
      // 다른 경우: 바로 네비게이션
      navigate(to);
    }
  }, [location.pathname, navigate]);

  return (
    <NavigationContext.Provider value={{ isExiting, navigateWithAnimation }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within NavigationProvider');
  }
  return context;
};
