import React, { createContext, useContext, useState } from "react";
import clsx from "clsx";
import { Menu } from "lucide-react"; // toggle icon

// --------------------------------------
// Sidebar Context
// --------------------------------------
const SidebarContext = createContext();

export function useSidebar() {
  return useContext(SidebarContext);
}

// ✅ SidebarProvider (manages expanded/collapsed state)
export function SidebarProvider({ children, defaultOpen = true }) {
  const [state, setState] = useState(defaultOpen ? "expanded" : "collapsed");

  const toggle = () => {
    setState((prev) => (prev === "collapsed" ? "expanded" : "collapsed"));
  };

  return (
    <SidebarContext.Provider value={{ state, toggle }}>
      {children}
    </SidebarContext.Provider>
  );
}

// --------------------------------------
// Sidebar Layout Components
// --------------------------------------
export function Sidebar({ children, className }) {
  const { state } = useSidebar();

  return (
    <aside
      className={clsx(
        "flex flex-col border-r border-gray-200 bg-white dark:bg-gray-900 transition-all duration-300 ease-in-out",
        state === "collapsed" ? "w-16" : "w-64",
        className
      )}
    >
      {children}
    </aside>
  );
}

export function SidebarContent({ children, className }) {
  return <div className={clsx("flex flex-col flex-1", className)}>{children}</div>;
}

export function SidebarGroup({ children, className }) {
  return <div className={clsx("flex flex-col", className)}>{children}</div>;
}

export function SidebarGroupContent({ children, className }) {
  return <div className={clsx("flex flex-col gap-1", className)}>{children}</div>;
}

export function SidebarMenu({ children, className }) {
  return <ul className={clsx("flex flex-col gap-1", className)}>{children}</ul>;
}

export function SidebarMenuItem({ children, className }) {
  return <li className={clsx("list-none", className)}>{children}</li>;
}

export function SidebarMenuButton({ children, asChild }) {
  if (asChild) return children;
  return (
    <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
      {children}
    </button>
  );
}

// --------------------------------------
// Sidebar Trigger (hamburger button)
// --------------------------------------
export function SidebarTrigger({ className }) {
  const { toggle } = useSidebar();
  return (
    <button
      onClick={toggle}
      className={clsx(
        "p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800",
        className
      )}
    >
      <Menu className="w-5 h-5" />
    </button>
  );
}
