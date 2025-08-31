"use client";
import React, { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function page() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState("");

  const router = useRouter();

  if (!isLoaded) {
    return <h1>Loading...</h1>;
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!isLoaded) {
      return <h1>Loading...</h1>;
    }

    try {
      await signUp.create({
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });
      setPendingVerification(true);
    } catch (error: any) {
      console.log(JSON.stringify(error, null, 2));
      setError(error.errors[0].message);
    }
  }

  async function onPressverify(e: React.FormEvent) {
    e.preventDefault();

    if (!isLoaded) {
      return 
    }

    try {
        const completesignup = await signUp.attemptEmailAddressVerification({code})
        if(completesignup.status !== "complete"){
            console.log(JSON.stringify(completesignup,null,2))
        }
        if(completesignup.status === "complete"){
            await setActive({session: completesignup.createdSessionId})
            router.push('/dashboard')
        }
    } catch (error:any) {
        console.log(JSON.stringify(error,null,2))
        setError(error.errors[0].message)
    }

  }

  return 
}

export default page;
