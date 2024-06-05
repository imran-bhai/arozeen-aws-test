"use client";
import { getToken, getUserId, setUserPicture } from "@/app/config/actions";

import { updateProfileImage } from "@/app/store/slice/cartSlice";
import CalendarIcon from "@/components/iconSVG/CalendarIcon";
import Gender from "@/components/iconSVG/Gender";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const EditProfile = () => {
  const [isEditingImage, setIsEditingImage] = useState(false);
  const [newImageFile, setNewImageFile] = useState(null);
  const [customerInfo, setCustomerInfo] = useState({});
  const [refetchCustomerInfo, setRefetchCustomerInfo] = useState(false);
  const [userId, setUserId] = useState();
  const [token, setToken] = useState();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    gender: "",
    dob: "",
    profile_picture: "",
  });

  const [editMode, setEditMode] = useState({
    firstname: false,
    lastname: false,
    phone: false,
    gender: false,
    dob: false,
    profile_picture: false,
  });

  const dispatch = useDispatch();
  const router = useRouter();

  // Handle toggle edit mode for a specific field
  const toggleEditMode = (field) => {
    setEditMode({ ...editMode, [field]: !editMode[field] });
  };

  const handleImageEditClick = () => {
    document.querySelector('input[type="file"]').click();
  };

  const handleImageChange = (e) => {
    setNewImageFile(e.target.files[0]);
  };

  // In the handleInputChange function, update the state correctly
  const handleInputChange = (field, value) => {
    // Optimistic Update
    setCustomerInfo((prevInfo) => ({
      ...prevInfo,
      [field]: value,
    }));
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  useEffect(() => {
    const fetchCustomerInfo = async () => {
      const id = await getUserId();
      setUserId(id);

      try {
        const token = await getToken();

        if (!token) {
          throw new Error("Token not found");
        } else {
          setToken(token);
        }

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}customer`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCustomerInfo(response.data.data);
        setFormData({
          firstname: response.data.data.firstname,
          lastname: response.data.data.lastname,
          phone: response.data.data.phone,
          gender: response.data.data.gender,
          dob: response.data.data.dob,
          profile_picture: response.data.data.profile_picture,
        });
      } catch (error) {
        console.error("Error fetching customer info:", error);
      }
    };

    fetchCustomerInfo();
  }, [refetchCustomerInfo]);

  const handleUpdate = async () => {
    try {
      // Create a new FormData object
      const updatedFormData = new FormData();

      // Append all form data fields to the FormData object
      for (const key in formData) {
        updatedFormData.append(key, formData[key]);
      }

      // If there's a new image file, append it to the FormData object
      if (newImageFile) {
        updatedFormData.append("profile_picture", newImageFile);
      }

      // Make the API request using the FormData object
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}update-customer/${userId}`,
        updatedFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.code === 200) {
        toast.success("Profile updated successfully");
        setUserPicture();

        dispatch(
          updateProfileImage({
            product_id: response.data.id,
            profilePicture: response.data.data.profilePicture,
          })
        );

        // Refetch customer info after successful update
        setRefetchCustomerInfo(!refetchCustomerInfo);
      } else {
        toast.error("Profile update failed");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("An error occurred while updating the profile");
    }
  };

  const handleGenderChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, gender: value });
  };

  const handleDateOfBirthChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, dob: value });
  };

  const currentDate = new Date().toISOString().split("T")[0]; // Get current date in 'yyyy-mm-dd' format

  return (
    <MaxWidthWrapper>
      <div className="w-full font-grotesk gap-x-6 flex flex-col md:flex-row">
        <div className="w-full  md:w-[30%] rounded-lg bg-gray-100 flex flex-col py-5 justify-center items-center ">
          <div className="">
            <div className="relative">
              <div className="relative">
                <Image
                  src={
                    newImageFile
                      ? URL.createObjectURL(newImageFile)
                      : `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}CustomerProfile/${customerInfo.profile_picture}`
                  }
                  alt="Profile Picture"
                  width={50}
                  height={50}
                  className="rounded-full w-24 h-24 object-cover"
                />
                <button onClick={handleImageEditClick}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 absolute top-16 right-0"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                    />
                  </svg>
                </button>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center py-3">
            <h3 className="text-xl font-semibold ">
              {customerInfo.firstname} {customerInfo.lastname}
            </h3>
            <h5 className="text-gray-500 ">{customerInfo.email}</h5>
          </div>
        </div>
        <div className="relative w-full md:w-[70%] rounded-lg bg-gray-100 flex flex-col px-8 py-5">
          <h3 className="text-xl text-blue-600 ">Personal Details</h3>
          <div className="flex flex-wrap mb-4 gap-x-2 py-5">
            <div className="w-full md:w-[48%]">
              <label
                className="text-black font-normal text-sm my-1"
                htmlFor="firstname"
              >
                First Name
              </label>
              <div className="relative mt-1">
                <Input
                  className=" border-0 border-b-[1px] border-gray-800  focus:border-0 rounded-none focus:rounded
                            placeholder:text-gray-400 mb-1"
                  id="firstname"
                  placeholder="first name"
                  type="text"
                  minLength="3"
                  maxLength="20"
                  value={
                    editMode.firstname
                      ? formData.firstname
                      : customerInfo.firstname
                  }
                  onClick={() => toggleEditMode("firstname")} // Call toggleEditMode with the field name
                  onChange={(e) =>
                    handleInputChange("firstname", e.target.value)
                  }
                />
                {errors.firstname && (
                  <p className="text-red-500 text-xs ">{errors.firstname}</p>
                )}
              </div>
            </div>

            <div className="w-full md:w-[48%]">
              <label
                className="text-black font-normal text-sm my-1"
                htmlFor="lastname"
              >
                Last Name
              </label>
              <div className="relative mt-1">
                <Input
                  className=" border-0 border-b-[1px] border-gray-800  focus:border-0 rounded-none focus:rounded
                placeholder:text-gray-400 mb-1"
                  id="lastname"
                  placeholder="last name"
                  type="text"
                  value={
                    editMode.lastname
                      ? formData.lastname
                      : customerInfo.lastname
                  }
                  onClick={() => toggleEditMode("lastname")} // Call toggleEditMode with the field name
                  onChange={(e) =>
                    handleInputChange("lastname", e.target.value)
                  }
                />
                {errors.lastname && (
                  <p className="text-red-500 text-xs ">{errors.lastname}</p>
                )}
              </div>
            </div>
            <div className="w-full md:w-[48%] py-5">
              <label
                className="text-black font-normal text-sm my-1"
                htmlFor="email"
              >
                Email
              </label>
              <div className="relative mt-1">
                <Input
                  className=" border-0 border-b-[1px] border-gray-800  focus:border-0 rounded-none focus:rounded
           placeholder:text-gray-400 mb-1"
                  id="email"
                  placeholder="Email@gmail.com"
                  type="text"
                  value={customerInfo.email}
                  disabled
                />
                <p className="text-red-500 text-xs ">Non changeable</p>
                {errors.email && (
                  <p className="text-red-500 text-xs ">{errors.email}</p>
                )}
              </div>
            </div>
            <div className="w-full md:w-[48%] py-5">
              <label
                className="text-black font-normal text-sm my-1"
                htmlFor="phone"
              >
                Phone Number
              </label>
              <div className="relative mt-1">
                <Input
                  className=" border-0 border-b-[1px] border-gray-800  focus:border-0 rounded-none focus:rounded
           placeholder:text-gray-400 mb-1"
                  id="phone"
                  placeholder="Phone Number"
                  type="text"
                  minLength="10"
                  maxLength="14"
                  value={editMode.phone ? formData.phone : customerInfo.phone}
                  onClick={() => toggleEditMode("phone")} // Call toggleEditMode with the field name
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs ">{errors.phone}</p>
                )}
              </div>
            </div>

            <div className="w-full md:w-[48%] ">
              <label
                className=" text-black font-normal text-sm my-1"
                htmlFor="gender"
              >
                Gender
              </label>
              <div className="relative mt-1">
                <Gender className="absolute left-3 top-5 transform -translate-y-1/2 text-gray-400" />
                {editMode.gender ? (
                  <select
                    value={formData.gender}
                    onChange={handleGenderChange}
                    className="pl-10 flex h-10 w-full  bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 border-0 border-b-[1px] border-gray-800 rounded-none focus-visible:rounded focus-visible:border-hidden focus-visible:ring-offset-3 placeholder:text-gray-600 mb-4"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                ) : (
                  <select
                    value={customerInfo.gender}
                    onChange={handleGenderChange}
                    onClick={() => toggleEditMode("gender")}
                    className="pl-10 flex h-10 w-full  bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 border-0 border-b-[1px] border-gray-800 rounded-none focus-visible:rounded focus-visible:border-hidden focus-visible:ring-offset-3 placeholder:text-gray-600 mb-4"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                )}
              </div>
            </div>

            <div className="w-full md:w-[48%]">
              <label
                className="text-black font-normal text-sm my-1"
                htmlFor="date-of-birth"
              >
                Date of Birth
              </label>
              <div className="relative mt-1">
                <CalendarIcon className="absolute left-3 top-5 transform -translate-y-1/2 text-gray-400" />
                {editMode.dob ? (
                  <Input
                    className="pl-10 border-0 border-b-[1px] border-gray-800  focus:border-0 rounded-none focus:rounded
                              placeholder:text-gray-400 mb-1"
                    id="date-of-birth"
                    placeholder="Enter your date of birthday"
                    type="date"
                    value={formData.dob}
                    max={currentDate}
                    onChange={handleDateOfBirthChange}
                  />
                ) : (
                  <Input
                    className="pl-10 border-0 border-b-[1px] border-gray-800  focus:border-0 rounded-none focus:rounded
                    placeholder:text-gray-400 mb-1"
                    id="date-of-birth"
                    placeholder="Enter your date of birthday"
                    type="date"
                    value={customerInfo.dob}
                    onClick={() => toggleEditMode("dob")}
                    max={currentDate}
                  />
                )}
              </div>
            </div>
          </div>

          <div className=" md:absolute  space-x-2  end-12 bottom-4">
            <Button onClick={handleUpdate} className="w-full ">
              Update
            </Button>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default EditProfile;
