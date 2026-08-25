import { createBrowserRouter, Navigate } from 'react-router-dom';
import RootLayout from '@/layouts/RootLayout';
import MainLayout from '@/layouts/MainLayout';
import DashboardPage from '@/pages/DashboardPage';
import TechnologyPage from '@/pages/TechnologyPage';
import QuizzesPage from '@/pages/QuizzesPage';
import BookmarksPage from '@/pages/BookmarksPage';
import NotFoundPage from '@/pages/NotFoundPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="/dashboard" replace />
          },
          {
            path: 'dashboard',
            element: <DashboardPage />
          },
          {
            path: 'technology/:slug',
            element: <TechnologyPage />
          },
          {
            path: 'quizzes',
            element: <QuizzesPage />
          },
          {
            path: 'quizzes/:slug',
            element: <QuizzesPage />
          },
          {
            path: 'bookmarks',
            element: <BookmarksPage />
          }
        ]
      },
      {
        path: '*',
        element: <NotFoundPage />
      }
    ]
  }
]);
