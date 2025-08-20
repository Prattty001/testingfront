// import React from 'react';
// import { SidebarTrigger } from '@/components/ui/sidebar';
// import { Button } from '@/components/ui/button';
// import { Avatar, AvatarFallback } from '@/components/ui/avatar';
// import { CreditCard, Bell, Settings } from 'lucide-react';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu';

// export const Navbar = () => {
//   return (
//     <header className="h-16 flex items-center justify-between px-6 border-b bg-card shadow-soft">
//       {/* Left Section */}
//       <div className="flex items-center gap-4">
//         <SidebarTrigger />
//         <div className="flex items-center gap-2">
//           <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
//             <CreditCard className="w-4 h-4 text-primary-foreground" />
//           </div>
//           <h1 className="text-xl font-bold gradient-primary bg-clip-text text-transparent">
//             AutoSplit
//           </h1>
//         </div>
//       </div>

//       {/* Right Section */}
//       <div className="flex items-center gap-3">
//         {/* Notifications */}
//         <Button variant="ghost" size="icon" className="relative">
//           <Bell className="w-5 h-5" />
//           <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full"></span>
//         </Button>

//         {/* User Dropdown */}
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="ghost" className="p-0 h-auto">
//               <Avatar className="w-8 h-8">
//                 <AvatarFallback className="bg-primary text-primary-foreground text-sm font-medium">
//                   JD
//                 </AvatarFallback>
//               </Avatar>
//             </Button>
//           </DropdownMenuTrigger>

//           <DropdownMenuContent align="end" className="w-56">
//             <DropdownMenuItem>
//               <Settings className="w-4 h-4 mr-2" />
//               Settings
//             </DropdownMenuItem>
//             <DropdownMenuSeparator />
//             <DropdownMenuItem className="text-destructive">
//               Sign out
//             </DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </div>
//     </header>
//   );
// };
import React from "react";
import { useNavigate } from "react-router-dom";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { CreditCard, Bell, Settings, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Navbar = () => {
  const navigate = useNavigate();

  // 🔹 Safely parse user
  const storedUser = localStorage.getItem("user");
  let user = {};
  try {
    user = storedUser ? JSON.parse(storedUser) : {};
  } catch (err) {
    console.error("Invalid user JSON in localStorage:", err);
    user = {};
  }

  const name = user?.name || user?.email || "User";

  // 🔹 Get initials
  const getInitials = (str) => {
    if (!str) return "U";
    const parts = str.trim().split(" ");
    if (parts.length > 1) {
      return parts[0][0] + parts[1][0];
    }
    return str[0];
  };
  const initials = getInitials(name).toUpperCase();

  // 🔹 Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="h-16 flex items-center justify-between px-6 border-b bg-card shadow-soft">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <CreditCard className="w-4 h-4 text-primary-foreground" />
          </div>
<h1 className="text-xl font-bold text-gray-800">
  AutoSplit
</h1>

        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full"></span>
        </Button>

        {/* User Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="p-0 h-auto">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-primary text-primary-foreground text-sm font-medium">
                  {initials}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem>
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              className="text-destructive cursor-pointer"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
