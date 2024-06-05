"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ProfileAvatar } from "./ProfileAvatar";
import { getToken, getUserPicture, logout } from "@/app/config/actions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  removeCart,
  removeWish,
  removeWishlist,
  updateCart,
  updateWishlist,
} from "@/app/store/slice/cartSlice";

export function ProfileDropDown() {
  const [token, setToken] = useState("");
  const [picture, setPicture] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const handleLogout = async () => {
    await logout();
    dispatch(removeCart(true));
    dispatch(removeWishlist(true));
    toast.success("Logged out successfully");
    router.push("/");
    router.refresh();
  };

  const handleLogin = () => {
    router.push("/login");
  };

  useEffect(() => {
    const accessToken = async () => {
      const Token = await getToken();
      const picture = await getUserPicture();

      if (picture) {
        setPicture(picture);
      } else {
        setPicture(null);
      }
      const token = Token;
      if (token) {
        setToken(token);
      } else {
        setToken(null);
      }
    };
    accessToken();
  }, [handleLogout, cart]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="rounded-full h-10 w-10 ml-2">
          <ProfileAvatar
            src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}CustomerProfile/${picture}`}
            alt="profile"
            className="focus:outline-none "
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href="/edit-profile">
            <DropdownMenuItem>
              Profile
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuGroup>
          <Link href="/orders">
            <DropdownMenuItem>
              View Orders
              <DropdownMenuShortcut>⇧⌘O</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>

        {token ? (
          <DropdownMenuItem onClick={handleLogout}>
            <span>Log out</span>
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem onClick={handleLogin}>
            Login
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
