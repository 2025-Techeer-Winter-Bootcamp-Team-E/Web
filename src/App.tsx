import RootRoute from '@/routes/RootRoute';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/api/queryClient';
import { NavigationProvider } from '@/contexts/NavigationContext';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <NavigationProvider>
          <RootRoute />
        </NavigationProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
