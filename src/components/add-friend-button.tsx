"use client";

import * as React from "react";

import { addFriendValidator } from "@/lib/validations/add-friend";
import axios, { AxiosError } from "axios";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Toast } from "@radix-ui/react-toast";

type FormData = z.infer<typeof addFriendValidator>;

const AddFriendButton: React.FC = () => {
  const [showSucessState, setShowSucessState] = React.useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(addFriendValidator),
  });

  const addFriend = async (email: string) => {
    try {
      const validatedEmail = addFriendValidator.parse({ email });

      await axios.post("/api/friends/add", {
        email: validatedEmail,
      });

      setShowSucessState(true);
    } catch (error) {
      if (error instanceof z.ZodError) {
        setError("email", { message: error.message });
        return;
      }

      if (error instanceof AxiosError) {
        setError("email", { message: error.response?.data });
        return;
      }

      setError("email", { message: "something went Wrong" });
    }
  };

  const onSubmit = (data: FormData) => {
    addFriend(data.email);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm">
      <label
        htmlFor="email"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Add Friend by Email
      </label>
      <div className="mt-2 flex flex-col gap-4">
        <input
          {...register("email")}
          type="text"
          placeholder="you@example.com"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        {errors?.email && (
          <p className="px-1 text-xs text-red-600">{errors.email.message}</p>
        )}
        <Button>Add</Button>
        {showSucessState ? (
          <p className="px-1 text-xs text-red-600">Friend Request sent</p>
        ) : null}
      </div>
    </form>
  );
};

export default AddFriendButton;
