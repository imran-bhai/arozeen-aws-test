"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: "Home", href: "/" },
  {
    name: "Products",
    href: "/products",
  },
  { name: "Contact Us", href: "/contact-us" },
];

export default function NavLinks() {
  const pathname = usePathname();
  console.log("pathname:", pathname);
  return (
    <>
      {links.map((link, index) => {
        const isActive =
          link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

        return (
          <ul
            key={index}
            className=" gap-5 text-sm flex md:items-center md:mr-4"
          >
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                `text-neutral-600 text-[1rem]  font-semibold underline-offset-4 hover:text-orange-600  hover:underline dark:text-neutral-400 dark:hover:text-neutral`,
                {
                  "underline text-orange-600": isActive,
                }
              )}
            >
              <p className="block">{link.name}</p>
            </Link>
          </ul>
        );
      })}
    </>
  );
}
