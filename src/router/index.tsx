import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout';
import Home from '../pages/Home';
import About from '../pages/About';
import LibraryList from '../pages/LibraryList';
import LibraryDetail from '../pages/LibraryDetail';
import LibraryProfile from '../pages/LibraryProfile';
import Login from '../pages/Login';
import LibrarianRegistration from '../pages/LibrarianRegistration';
import AddBooks from '../pages/AddBooks';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/libraries',
        element: <LibraryList />,
      },
      {
        path: '/libraries/:id',
        element: <LibraryDetail />,
      },
      {
        path: '/library-profile',
        element: <LibraryProfile />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <LibrarianRegistration />,
      },
      {
        path: '/add-books',
        element: <AddBooks />,
      },
    ],
  },
]);

export default router; 