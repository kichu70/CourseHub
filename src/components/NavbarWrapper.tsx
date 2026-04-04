"use client";

import { usePathname } from "next/navigation";
import Navbar from "./navbar/Navbar";

const NavbarWrapper = () => {
  const pathname = usePathname();

  const hideNavbar =
    pathname === "/login" || pathname === "/register";

  if (hideNavbar) return null;

  return <Navbar />;
};

export default NavbarWrapper;

// this is used to make the navbar hide for login and register but currently i need nave so this file is now useless