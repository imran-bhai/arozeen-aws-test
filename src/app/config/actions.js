// serverActions.js
"use server";
import { cookies } from "next/headers";
// import jwt from "jsonwebtoken";

import axios from "axios";

export const getToken = async () => {
  const cookieStore = cookies();
  const token = await cookieStore.get("token");

  if (!token) {
    return null;
  }

  return token.value;

  // const decodedToken = await jwt.verify(token.value, process.env.TOKEN_SECRET);
  // return decodedToken;
};

export const getUserId = async () => {
  const cookieStore = cookies();
  const userId = await cookieStore.get("userId");
  if (!userId) {
    return null;
  }
  return userId.value;
};

export const getUserPicture = async () => {
  const cookieStore = cookies();
  const userPicture = await cookieStore.get("profilePicture");
  if (!userPicture) {
    return null;
  }
  return userPicture.value;
};

export const setUserPicture = async () => {
  const userId = await getUserId();
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}customer/${userId}`
  );
  const data = await response.data;
  const profilePicture = data.data.profile_picture;

  const cookieStore = cookies();
  cookieStore.set("profilePicture", profilePicture, {
    maxAge: 60 * 60 * 24,
    path: "/",
  });
};

export const logout = async () => {
  try {
    const token = await getToken();

    if (token) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}logout-customer`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      const cookieStore = cookies();
      cookieStore.set("token", "", {
        path: "/",
        maxAge: -1,
      });
      cookieStore.set("userId", "", {
        path: "/",
        maxAge: -1,
      });
      cookieStore.set("profilePicture", "", {
        path: "/",
        maxAge: -1,
      });

      return data;
    }
  } catch (error) {
    console.error("Logout Error:", error);
  }
};

export default async function loginUser(email, password) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}login-customer`,
      { email, password }
    );
    

    const expiryTime = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now
    if (response.data.status == "success") {
      cookies().set({
        name: "token",
        value: response.data.token,
        expires: expiryTime,
        httpOnly: true,
        sameSite: "Lax", // Or 'Strict' for enhanced security
      });

      cookies().set({
        name: "userId",
        value: response.data.data.id,
        expires: expiryTime,
        httpOnly: true,
        sameSite: "Lax", // Or 'Strict' for enhanced security
      });

      cookies().set({
        name: "profilePicture",
        value: response.data.data.profile_picture,
        expires: expiryTime,
        httpOnly: true,
        sameSite: "Lax", // Or 'Strict' for enhanced security
      });

      return response.data;
    } else {
      console.log("error");
      return response.data.message;
    }
  } catch (error) {
    console.error("Login Error:", error);
    // Handle the error appropriately, potentially return an error response
    throw error; // Or re-throw to allow for centralized error handling
  }
}

export async function registerUser(data) {

  const expiryTime = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}register-customer`,
      data
    );
   
    if (response.data.status == "success") {
      cookies().set({
        name: "token",
        value: response.data.token,
        expires: expiryTime,
        httpOnly: true,
        sameSite: "Lax", // Or 'Strict' for enhanced security
      });

      cookies().set({
        name: "userId",
        value: response.data.data.id,
        expires: expiryTime,
        httpOnly: true,
        sameSite: "Lax", // Or 'Strict' for enhanced security
      });

      
      return response.data;
    } else {
      return response.data.message;
    }
  } catch (error) {
    console.error("Register Error:", error);
    // Handle the error appropriately, potentially return an error response
    throw error; // Or re-throw to allow for centralized error handling
  }
}
