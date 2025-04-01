import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Layout from './component/Layout/Layout';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Home from './component/Page/Home';
import About from './component/Page/About';
import Contact from './component/Page/Contact';
import Product from './component/Page/Service';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ProductDetail from './component/Page/PreoductInfo'

// ✅ Create an instance of QueryClient
const queryClient = new QueryClient();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
      <Route path="product" element={<Product/>} />
      <Route path="/product/:id" element={<ProductDetail />} />
    </Route>
  )
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>  {/* ✅ Fixed */}
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
