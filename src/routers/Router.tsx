import { Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import { QueryProvider } from '@/components';
import { List, Pokedex } from '@/pages';

export function Router() {
  return (
    <QueryProvider>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {/* 主頁 */}
          <Route index element={<List />} />
          <Route path="home" element={<Pokedex />} />

          {/* <Route path="moves" element={<Moves />} />
          <Route path="pm/:link" element={<Detail />} /> */}
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </QueryProvider>
  );
}
