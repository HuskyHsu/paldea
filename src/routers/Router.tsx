import { Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import { BackToTopProvider } from '@/components';
import { List, Detail } from '@/pages';

export function Router() {
  return (
    <BackToTopProvider>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {/* 主頁 */}
          <Route index element={<List />} />
          <Route path=":link" element={<Detail />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BackToTopProvider>
  );
}
