import { Toaster, toast } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";

import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import BudgetPlanner from "./pages/BudgetPlanner";
import SmartSuggestions from "./pages/SmartSuggestions";
import TeamSharing from "./pages/TeamSharing";
import BankIntegration from "./pages/BankIntegration";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// ✅ Private Route wrapper
const PrivateRoute = () => {
  const isLoggedIn = localStorage.getItem("token"); // token is stored at login
  if (!isLoggedIn) {
    toast.error("Please login first!");
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        {/* ✅ UI providers */}
        <Toaster />

        {/* ✅ Routes */}
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/budget" element={<BudgetPlanner />} />
            <Route path="/suggestions" element={<SmartSuggestions />} />
            <Route path="/team" element={<TeamSharing />} />
            <Route path="/banks" element={<BankIntegration />} />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
