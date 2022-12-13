import { Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import { List } from '@/pages';
import { BackToTopProvider } from '@/components';

export function Router() {
  return (
    <BackToTopProvider>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {/* 主頁 */}
          <Route index element={<List />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BackToTopProvider>
  );
}
