import { Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import { BackToTopProvider, QueryProvider } from '@/components';
import { List, Moves, Detail } from '@/pages';
export function Router() {
  return (
    <QueryProvider>
      <BackToTopProvider>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            {/* 主頁 */}
            <Route index element={<List />} />
            <Route path="moves" element={<Moves />} />
            <Route path=":link" element={<Detail />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BackToTopProvider>
    </QueryProvider>
  );
}
