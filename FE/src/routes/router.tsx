import { createBrowserRouter } from 'react-router-dom';
import App from '../App.tsx';
import { ProtectedRoute } from './ProtectedRoute.tsx';
import { AdminRoute } from './AdminRoute.tsx';
import { LoginPage } from '../views/LoginPage.tsx';
import { AnimeListPage } from '../views/anime/AnimeListPage.tsx';
import { AnimeDetailPage } from '../views/anime/AnimeDetailPage.tsx';
import { CharactersPage } from '../views/characters/CharactersPage.tsx';
import { UsersPage } from '../views/users/UsersPage.tsx';

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: '/login', element: <LoginPage /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: '/', element: <AnimeListPage /> },
          { path: '/anime', element: <AnimeListPage /> },
          { path: '/anime/:id', element: <AnimeDetailPage /> },
          { path: '/characters', element: <CharactersPage /> },
          {
            element: <AdminRoute />,
            children: [{ path: '/users', element: <UsersPage /> }],
          },
        ],
      },
    ],
  },
]);
