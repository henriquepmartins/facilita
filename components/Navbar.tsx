"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Receipt,
  Settings,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { UserButton, useUser } from "@clerk/nextjs";
import { ThemeSwitcherBtn } from "./ThemeSwitcherBtn";
import Logo from "./Logo";
import { usePathname } from "next/navigation";

const navigationItems = {
  main: {
    label: "Principal",
    items: [
      {
        title: "Dashboard",
        href: "/",
        icon: LayoutDashboard,
      },
    ],
  },
  finance: {
    label: "Financeiro",
    items: [
      {
        title: "Transações",
        href: "/transacoes",
        icon: Receipt,
      },
    ],
  },
  settings: {
    label: "Sistema",
    items: [
      {
        title: "Gerenciamento",
        href: "/gerenciamento",
        icon: Settings,
      },
    ],
  },
};

export function AppSidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();
  const { user } = useUser();

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed left-2 top-2 z-50 p-1 text-muted-foreground opacity-40 transition-opacity hover:opacity-100 lg:hidden",
          isOpen && "hidden"
        )}
      >
        <ChevronRight className="h-4 w-4" />
      </button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 h-screen flex-shrink-0 border-r bg-background transition-all duration-300 lg:sticky lg:top-0",
          isOpen
            ? "w-64 translate-x-0 lg:w-72"
            : "-translate-x-full lg:translate-x-0 lg:w-24 lg:flex lg:flex-col lg:items-center"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4">
            {isOpen && (
              <div className={cn("transition-all")}>
                <Logo />
              </div>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="rounded-lg border p-2 hover:bg-muted"
            >
              {isOpen ? (
                <ChevronLeft className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>
          </div>

          {/* Search */}
          <div className="px-4 pb-4">
            <button
              className={cn(
                "flex items-center gap-2 rounded-lg border bg-background text-sm text-muted-foreground",
                isOpen ? "px-3 py-2 w-full" : "justify-center p-2"
              )}
              onClick={() => {}}
            >
              <Search className="h-4 w-4" />
              {isOpen && <span className="ml-1">Buscar...</span>}
            </button>
          </div>

          {/* Navigation */}
          <nav
            className={cn(
              "flex-1 px-2 overflow-y-auto mt-4",
              isOpen ? "space-y-6" : "flex flex-col items-center gap-4"
            )}
          >
            {Object.entries(navigationItems).map(([key, section]) => (
              <div key={key} className="w-full">
                {isOpen && (
                  <h4 className="px-2 text-xs font-semibold text-muted-foreground">
                    {section.label}
                  </h4>
                )}

                {section.items.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center rounded-lg text-sm font-medium hover:bg-muted",
                      isOpen ? "gap-3 px-2 py-2" : "justify-center p-2 w-full",
                      pathname === item.href && "bg-muted"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    {isOpen && <span className="flex-1">{item.title}</span>}
                  </a>
                ))}
              </div>
            ))}
          </nav>

          {/* Footer */}
          <div
            className={cn(
              "border-t p-4",
              isOpen
                ? "flex items-center gap-4"
                : "flex flex-col items-center gap-4"
            )}
          >
            {isOpen ? (
              <>
                <UserButton afterSignOutUrl="/" />
                <div className="flex flex-col min-w-0">
                  <p className="truncate text-sm font-medium">
                    {user?.firstName}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {user?.emailAddresses?.[0]?.emailAddress}
                  </p>
                </div>
                <ThemeSwitcherBtn />
              </>
            ) : (
              <>
                <ThemeSwitcherBtn />
                <div className="mt-2">
                  <UserButton afterSignOutUrl="/" />
                </div>
              </>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
