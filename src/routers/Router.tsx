import { Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import { BackToTopProvider, LiffProvider, QueryProvider } from '@/components';
import { List, Moves, Detail } from '@/pages';

export function Router() {
  return (
    <QueryProvider>
      <BackToTopProvider>
        <LiffProvider>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              {/* 主頁 */}
              <Route index element={<List />} />
              <Route path="liffIsEscapedFromApp=true" element={<List />} />
              <Route path="moves" element={<Moves />} />
              <Route path=":link" element={<Detail />} />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </LiffProvider>
      </BackToTopProvider>
    </QueryProvider>
  );
}
