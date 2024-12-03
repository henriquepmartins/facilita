"use client";

import React from "react";
import Logo, { LogoMobile } from "@/components/Logo";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "./ui/button";
import { UserButton } from "@clerk/nextjs";
import { ThemeSwitcherBtn } from "./ThemeSwitcherBtn";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Menu } from "lucide-react";

const items = [
  { label: "Dashboard", href: "/" },
  { label: "Transações", href: "/transacoes" },
  { label: "Gerenciamento", href: "/gerenciamento" },
];

function NavbarItem({
  link,
  label,
  clickCallback,
}: {
  link: string;
  label: string;
  clickCallback?: () => void;
}) {
  const pathname = usePathname();
  const isActive = pathname === link;

  return (
    <div className="relative flex items-center px-4">
      <Link
        href={link}
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "w-full justify-start text-lg text-muted-foreground hover:text-foreground",
          isActive && "text-foreground"
        )}
        onClick={() => {
          if (clickCallback) {
            clickCallback();
          }
        }}
      >
        {label}
      </Link>
      {isActive && (
        <div className="absolute -bottom-[2px] left-1/2 hidden h-[2px] w-[80%] -translate-x-1/2 rounded-xl bg-foreground md:block"></div>
      )}
    </div>
  );
}

function DesktopNavbar() {
  return (
    <div className="hidden border-separate border-b bg-background md:block">
      <nav className="container flex items-center justify-between px-8">
        <div className="flex h-[80px] min-h-[60px] items-center gap-x-4">
          <Logo />
          <div className="flex h-full">
            {items.map((item) => (
              <NavbarItem
                key={item.label}
                link={item.href}
                label={item.label}
              />
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ThemeSwitcherBtn />
          <UserButton afterSignOutUrl="/sign-in" />
        </div>
      </nav>
    </div>
  );
}

function MobileNavbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="block border-separate bg-background md:hidden">
      <nav className="container mt-4 flex items-center justify-between px-8">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[400px] sm:w-[540px]" side="left">
            <SheetTitle className="text-lg font-semibold">Menu</SheetTitle>
            <div className="mt-6 flex flex-col gap-4">
              <Logo />
              <div className="flex flex-col gap-1">
                {items.map((item) => (
                  <NavbarItem
                    key={item.label}
                    link={item.href}
                    label={item.label}
                    clickCallback={() => setIsOpen((prev) => !prev)}
                  />
                ))}
              </div>
            </div>
          </SheetContent>
        </Sheet>
        <div className="absolute left-1/2 -translate-x-1/2">
          <LogoMobile />
        </div>
        <div className="flex items-center gap-x-4">
          <ThemeSwitcherBtn />
          <UserButton afterSignOutUrl="/sign-in" />
        </div>
      </nav>
    </div>
  );
}

function Navbar() {
  return (
    <>
      <DesktopNavbar />
      <MobileNavbar />
    </>
  );
}

export default Navbar;
