"use client";

import * as Headless from "@headlessui/react";
import clsx from "clsx";
import { motion } from "framer-motion";
import React, { Fragment, forwardRef, useId, useState } from "react";
import { TouchTarget } from "./button";
import Link from "next/link";

export function Sidebar({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"nav">) {
  return (
    <nav
      {...props}
      className={clsx(className, "flex h-full min-h-0 flex-col")}
    />
  );
}

export function SidebarHeader({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      {...props}
      className={clsx(
        className,
        "flex flex-col border-b border-zinc-950/5 p-4 dark:border-white/5 [&>[data-slot=section]+[data-slot=section]]:mt-2.5"
      )}
    />
  );
}

export function SidebarNav({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"nav">) {
  return (
    <nav
      {...props}
      className={clsx(
        className,
        "flex-1 overflow-y-auto p-4 [&>[data-slot=section]+[data-slot=section]]:mt-8"
      )}
    />
  );
}

export function SidebarFooter({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      {...props}
      className={clsx(
        className,
        "flex flex-col border-t border-zinc-950/5 p-4 dark:border-white/5 [&>[data-slot=section]+[data-slot=section]]:mt-2.5"
      )}
    />
  );
}

export function SidebarSection({
  className,
  title,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"div"> & { title?: string }) {
  return (
    <div data-slot="section" {...props}>
      {title && (
        <div className="mb-2 px-2 text-xs font-semibold text-zinc-500 dark:text-zinc-400">
          {title}
        </div>
      )}
      <div
        className={clsx(
          className,
          "relative [&>[data-slot=link]+[data-slot=link]]:mt-1"
        )}
      >
        {children}
      </div>
    </div>
  );
}

export const SidebarLink = forwardRef<
  React.ElementRef<typeof Link>,
  { children: React.ReactNode } & React.ComponentPropsWithoutRef<typeof Link>
>(function SidebarLink({ className, children, ...props }, ref) {
  return (
    <Link
      ref={ref}
      data-slot="link"
      className={clsx(
        className,
        "group relative flex rounded-lg px-2 py-1.5 text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
      )}
      {...props}
    >
      <span className="absolute inset-0 rounded-lg bg-zinc-50 opacity-0 transition-opacity group-hover:opacity-100 dark:bg-white/5" />
      <span className="relative">{children}</span>
    </Link>
  );
});

export function SidebarMenu({
  label,
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Headless.Disclosure> & {
  label: string;
}) {
  const id = useId();

  return (
    <Headless.Disclosure
      as="div"
      data-slot="link"
      className={clsx(className, "relative")}
      {...props}
    >
      {({ open }) => (
        <>
          <Headless.Disclosure.Button
            className="group flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-left text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
            aria-labelledby={id}
          >
            <span className="absolute inset-0 rounded-lg bg-zinc-50 opacity-0 transition-opacity group-hover:opacity-100 dark:bg-white/5" />
            <span className="relative" id={id}>
              {label}
            </span>
            <TouchTarget>
              <motion.span
                className="relative ml-1 flex h-4 w-4 items-center justify-center"
                initial={false}
                animate={{
                  rotate: open ? "180deg" : "0deg",
                }}
              >
                <svg
                  viewBox="0 0 8 6"
                  aria-hidden="true"
                  className="h-[6px] w-2 stroke-zinc-400 group-hover:stroke-zinc-600 dark:group-hover:stroke-zinc-300"
                >
                  <path
                    d="M1.75 1.75 4 4.25l2.25-2.5"
                    fill="none"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.span>
            </TouchTarget>
          </Headless.Disclosure.Button>
          <Headless.Disclosure.Panel
            as={motion.div}
            className="mt-1 space-y-1 pl-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {children}
          </Headless.Disclosure.Panel>
        </>
      )}
    </Headless.Disclosure>
  );
}

export function SidebarMobileNav({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Headless.Dialog
      as={Fragment}
      open={isOpen}
      onClose={() => setIsOpen(false)}
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <Headless.Dialog.Panel className="fixed inset-0 z-50 flex items-start overflow-y-auto bg-white pr-10 dark:bg-zinc-900 lg:hidden">
        {children}
      </Headless.Dialog.Panel>
    </Headless.Dialog>
  );
}
