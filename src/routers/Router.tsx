import { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import { LiffProvider, QueryProvider } from '@/components';
import { List, Moves, Detail } from '@/pages';
import { PokemonListProvider, BackToTopProvider } from '@/newComponents/contexts';

const Pokedex = lazy(() => import(/* webpackChunkName: "Pokedex" */ '@/pages/Pokedex/Pokedex'));
const Pokemon = lazy(() => import(/* webpackChunkName: "Pokemon" */ '@/pages/Pokemon/Pokemon'));

export function Router() {
  return (
    <QueryProvider>
      <PokemonListProvider>
        <BackToTopProvider>
          <LiffProvider>
            <Routes>
              <Route path="/" element={<MainLayout />}>
                {/* 主頁 */}
                <Route index element={<List />} />
                <Route path="liffIsEscapedFromApp=true" element={<List />} />
                <Route path="moves" element={<Moves />} />
                <Route path="pm/:link" element={<Detail />} />

                <Route path="pokedex" element={<Pokedex />} />
                <Route path="pokedex/:link" element={<Pokemon />} />
              </Route>
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </LiffProvider>
        </BackToTopProvider>
      </PokemonListProvider>
    </QueryProvider>
  );
}
