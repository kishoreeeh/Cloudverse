import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '@/components/common/Navbar';
import Sidebar from '@/components/common/Sidebar';

export default function MainLayout() {
  const location = useLocation();
  // Show global sidebar on hub and practice pages, but let technology documentation pages FULL COVER the screen
  const showSidebar = !location.pathname.startsWith('/technology');

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar />
      <div className="flex flex-1 min-h-0">
        {showSidebar && <Sidebar />}
        <main className={`flex-1 ${showSidebar ? 'md:ml-64' : 'md:ml-0'} p-4 sm:p-6 lg:p-8 w-full transition-all`}>
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
