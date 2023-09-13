"use client";

import * as React from "react";

import { toast } from "@/components/ui/use-toast";
import { buttonVariants } from "./ui/button";
import { signIn } from "next-auth/react";
import { cn } from "@/lib/utils";
import { Icons } from "./icons";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function loginWithGoogle() {
    setIsLoading(true);
    try {
      throw new Error("bullshit");
      await signIn("google");
    } catch (error) {
      return toast({
        title: "Something went wrong.",
        description: `Your sign in request failed. Please try again.`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      // return toast({
      //   title: "Check your email",
      //   description:
      //     "We sent you a login link. Be sure to check your spam too.",
      // });
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t"></span>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            continue with
          </span>
        </div>
      </div>
      <button
        type="button"
        className={cn(buttonVariants({ variant: "default" }))}
        onClick={() => {
          setIsLoading(true);
          loginWithGoogle();
        }}
        disabled={isLoading}
      >
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}{" "}
        Google
      </button>
    </div>
  );
}
