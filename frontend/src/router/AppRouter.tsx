import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import ProtectedRoute from './ProtectedRoute';
import PageLoader from '../components/shared/PageLoader';

const Home       = lazy(() => import('../pages/Home/Home'));
const About      = lazy(() => import('../pages/About/About'));
const Skills     = lazy(() => import('../pages/Skills/Skills'));
const Projects   = lazy(() => import('../pages/Projects/Projects'));
const Experience = lazy(() => import('../pages/Experience/Experience'));
const Services   = lazy(() => import('../pages/Services/Services'));
const Testimonials = lazy(() => import('../pages/Testimonials/Testimonials'));
const Blog       = lazy(() => import('../pages/Blog/Blog'));
const BlogPost   = lazy(() => import('../pages/Blog/BlogPost'));
const Contact    = lazy(() => import('../pages/Contact/Contact'));
const NotFound   = lazy(() => import('../pages/NotFound/NotFound'));
const AdminLogin     = lazy(() => import('../pages/Admin/AdminLogin'));
const AdminDashboard = lazy(() => import('../pages/Admin/AdminDashboard'));
const AdminProjects  = lazy(() => import('../pages/Admin/AdminProjects'));
const AdminBlog      = lazy(() => import('../pages/Admin/AdminBlog'));
const AdminTestimonials = lazy(() => import('../pages/Admin/AdminTestimonials'));
const AdminContacts  = lazy(() => import('../pages/Admin/AdminContacts'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'skills', element: <Skills /> },
      { path: 'projects', element: <Projects /> },
      { path: 'experience', element: <Experience /> },
      { path: 'services', element: <Services /> },
      { path: 'testimonials', element: <Testimonials /> },
      { path: 'blog', element: <Blog /> },
      { path: 'blog/:slug', element: <BlogPost /> },
      { path: 'contact', element: <Contact /> },
    ],
  },
  {
    path: '/admin/login',
    element: <Suspense fallback={<PageLoader />}><AdminLogin /></Suspense>,
  },
  {
    path: '/admin',
    element: <ProtectedRoute />,
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: 'projects', element: <AdminProjects /> },
      { path: 'blog', element: <AdminBlog /> },
      { path: 'testimonials', element: <AdminTestimonials /> },
      { path: 'contacts', element: <AdminContacts /> },
    ],
  },
  { path: '*', element: <NotFound /> },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
