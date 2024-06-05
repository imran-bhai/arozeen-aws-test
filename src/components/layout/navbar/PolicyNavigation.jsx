"use client";
import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { usePathname } from "next/navigation";

const components = [
  {
    title: " Privacy Policy",
    href: "/privacy-policy",
  },
  {
    title: "Refund Policy",
    href: "/refund-policy",
  },
  {
    title: "Shipping Policy",
    href: "/shipping-policy",
  },
  {
    title: "Terms of Services",
    href: "/terms-of-services",
  },
];

export function PolicyNavigation() {
  const pathname = usePathname();
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={`font-grotesk text-neutral-600  text-[1rem] font-semibold underline-offset-4 hover:text-orange-600 hover:underline dark:text-neutral-400 dark:hover:text-neutral-300 ${
              pathname === "/refund-policy" ? "underline text-orange-600" : ""
            }`}
          >
            Policies
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className=" grid w-[400px] gap-1 p-1 md:w-44 ">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = ({ className, title, children, ...props }) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          className={cn(
            "font-grotesk  text-neutral-600 text-[1rem] block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground  ",
            className
          )}
          {...props}
        >
          <div className="text-sm hover:text-orange-600  font-medium leading-none">
            {title}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
};
ListItem.displayName = "ListItem";
