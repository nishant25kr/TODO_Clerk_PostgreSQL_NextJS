"use client";

import React, { FormEvent, useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";

function SignIn() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  if (!isLoaded) {
    return <h1>Loading...</h1>;
  }

  async function submit(e: FormEvent) {
    e.preventDefault();
    setErrorMessage("");

    try {
      const result = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/dashboard");
      } else {
        console.log(result);
      }
    } catch (error: any) {
      console.error(error);
      setErrorMessage(error.errors?.[0]?.message || "Sign in failed");
    }
  }

    return (
        <div>
            <h1>This is sign in</h1>
        </div>
    );
}

export default SignIn;
