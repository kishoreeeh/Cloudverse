import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import SearchModal from '@/features/search/SearchModal';

export default function RootLayout() {
  return (
    <>
      <Outlet />
      <Toaster 
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#12121a',
            color: '#e2e8f0',
            border: '1px solid #1e1e2e',
          },
        }}
      />
      <SearchModal />
    </>
  );
}
