import { Route, Switch, Router as WouterRouter } from 'wouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { setBaseUrl } from '@workspace/api-client-react';
import { ThemeManager } from '@/components/layout/ThemeManager';

if (import.meta.env.VITE_API_URL) {
  setBaseUrl(import.meta.env.VITE_API_URL);
}

import Home from '@/pages/home';
import About from '@/pages/about';
import Founder from '@/pages/founder';
import Services from '@/pages/services';
import Products from '@/pages/products';
import Portfolio from '@/pages/portfolio';
import Industries from '@/pages/industries';
import Careers from '@/pages/careers';
import Contact from '@/pages/contact';
import Blog from '@/pages/blog';
import BlogPost from '@/pages/blog-post';
import AdminLogin from '@/pages/admin-login';
import AdminDashboard from '@/pages/admin-dashboard';
import NotFound from '@/pages/not-found';

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/founder" component={Founder} />
      <Route path="/services" component={Services} />
      <Route path="/products" component={Products} />
      <Route path="/portfolio" component={Portfolio} />
      <Route path="/industries" component={Industries} />
      <Route path="/careers" component={Careers} />
      <Route path="/contact" component={Contact} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug" component={BlogPost} />
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/admin/dashboard" component={AdminDashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeManager />
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
