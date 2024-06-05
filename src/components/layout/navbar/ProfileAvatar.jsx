"use client";
import { getToken } from "@/app/config/actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { useEffect, useState } from "react";

export function ProfileAvatar({ src, alt }) {
  const [isToken, setIsToken] = useState();
  useEffect(() => {
    try {
      const fetchToken = async () => {
        const token = await getToken();
        if (token) {
          setIsToken(token);
        }
      };
      fetchToken();
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <Avatar>
      <AvatarImage src={src} alt={alt} />

      <AvatarFallback>
        {isToken ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-user"
          >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        ) : (
          <AvatarFallback>CN</AvatarFallback>
        )}
      </AvatarFallback>
    </Avatar>
  );
}
