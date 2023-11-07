import { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import { QueryProvider } from '@/components';
import { PokemonListProvider, BackToTopProvider } from '@/newComponents/contexts';

const Pokedex = lazy(() => import(/* webpackChunkName: "Pokedex" */ '@/pages/Pokedex/Pokedex'));
const Pokemon = lazy(() => import(/* webpackChunkName: "Pokemon" */ '@/pages/Pokemon/Pokemon'));
const MoveDex = lazy(() => import(/* webpackChunkName: "MoveDex" */ '@/pages/MoveDex/MoveDex'));

export function Router() {
  return (
    <QueryProvider>
      <PokemonListProvider>
        <BackToTopProvider>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              {/* 主頁 */}
              <Route index element={<Pokedex />} />
              <Route path="pokedex" element={<Pokedex />} />
              <Route path="pokedex/:nameId" element={<Pokemon />} />
              <Route path="movedex" element={<MoveDex />} />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BackToTopProvider>
      </PokemonListProvider>
    </QueryProvider>
  );
}
