import { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import { QueryProvider } from '@/components';

const Pokedex = lazy(() => import(/* webpackChunkName: "Pokedex" */ '@/pages/Pokedex/Pokedex'));

export function Router() {
  return (
    <QueryProvider>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {/* 主頁 */}
          <Route index element={<Pokedex />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </QueryProvider>
  );
}
