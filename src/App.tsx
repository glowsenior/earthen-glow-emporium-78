
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AnimatePresence } from "framer-motion";
import PageTransition from "./components/PageTransition";

// Pages
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import Search from "./pages/Search";

// New Pages
import BestSellers from "./pages/BestSellers";
import NewArrivals from "./pages/NewArrivals";
import Sales from "./pages/Sales";
import Blog from "./pages/Blog";
import Sustainability from "./pages/Sustainability";
import Careers from "./pages/Careers";
import Shipping from "./pages/Shipping";
import Returns from "./pages/Returns";
import FAQ from "./pages/FAQ";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";

// Admin Pages
import Dashboard from "./pages/Admin/Dashboard";
import ProductManagement from "./pages/Admin/ProductManagement";
import ProductForm from "./pages/Admin/ProductForm";
import Categories from "./pages/Admin/Categories";
import Inventory from "./pages/Admin/Inventory";
import Orders from "./pages/Admin/Orders";
import Shipments from "./pages/Admin/Shipments";
import Returns from "./pages/Admin/Returns";
import Customers from "./pages/Admin/Customers";
import Reviews from "./pages/Admin/Reviews";
import Newsletter from "./pages/Admin/Newsletter";
import Discounts from "./pages/Admin/Discounts";

const queryClient = new QueryClient();

// AnimatedRoutes component to handle route transitions
const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Customer Routes */}
        <Route path="/" element={<PageTransition><Index /></PageTransition>} />
        <Route path="/shop" element={<PageTransition><Shop /></PageTransition>} />
        <Route path="/product/:id" element={<PageTransition><ProductDetail /></PageTransition>} />
        <Route path="/categories/:category" element={<PageTransition><Shop /></PageTransition>} />
        <Route path="/cart" element={<PageTransition><Cart /></PageTransition>} />
        <Route path="/checkout" element={<PageTransition><Checkout /></PageTransition>} />
        <Route path="/order-success" element={<PageTransition><OrderSuccess /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
        <Route path="/auth" element={<PageTransition><Auth /></PageTransition>} />
        <Route path="/search" element={<PageTransition><Search /></PageTransition>} />
        
        {/* New Routes */}
        <Route path="/bestsellers" element={<PageTransition><BestSellers /></PageTransition>} />
        <Route path="/new-arrivals" element={<PageTransition><NewArrivals /></PageTransition>} />
        <Route path="/sales" element={<PageTransition><Sales /></PageTransition>} />
        <Route path="/blog" element={<PageTransition><Blog /></PageTransition>} />
        <Route path="/sustainability" element={<PageTransition><Sustainability /></PageTransition>} />
        <Route path="/careers" element={<PageTransition><Careers /></PageTransition>} />
        <Route path="/shipping" element={<PageTransition><Shipping /></PageTransition>} />
        <Route path="/returns" element={<PageTransition><Returns /></PageTransition>} />
        <Route path="/faq" element={<PageTransition><FAQ /></PageTransition>} />
        <Route path="/privacy-policy" element={<PageTransition><PrivacyPolicy /></PageTransition>} />
        <Route path="/terms-of-service" element={<PageTransition><TermsOfService /></PageTransition>} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<PageTransition><Dashboard /></PageTransition>} />
        <Route path="/admin/products" element={<PageTransition><ProductManagement /></PageTransition>} />
        <Route path="/admin/products/new" element={<PageTransition><ProductForm /></PageTransition>} />
        <Route path="/admin/products/edit/:id" element={<PageTransition><ProductForm /></PageTransition>} />
        <Route path="/admin/categories" element={<PageTransition><Categories /></PageTransition>} />
        <Route path="/admin/inventory" element={<PageTransition><Inventory /></PageTransition>} />
        <Route path="/admin/orders" element={<PageTransition><Orders /></PageTransition>} />
        <Route path="/admin/orders/pending" element={<PageTransition><Orders /></PageTransition>} />
        <Route path="/admin/shipments" element={<PageTransition><Shipments /></PageTransition>} />
        <Route path="/admin/returns" element={<PageTransition><Returns /></PageTransition>} />
        <Route path="/admin/customers" element={<PageTransition><Customers /></PageTransition>} />
        <Route path="/admin/reviews" element={<PageTransition><Reviews /></PageTransition>} />
        <Route path="/admin/newsletter" element={<PageTransition><Newsletter /></PageTransition>} />
        <Route path="/admin/discounts" element={<PageTransition><Discounts /></PageTransition>} />
        
        {/* Catch All Route */}
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <CartProvider>
          <AnimatedRoutes />
        </CartProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
