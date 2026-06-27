'use client'

import { authClient } from "@/lib/auth-client";
import { Form, Input, TextField, Label, FieldError } from "@heroui/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";

const LoginPage = () => {
const [loading, setLoading] = useState(false)
  const onSubmit = async (e) => {
    e.preventDefault()
     setLoading(true)
    const formData = new FormData(e.currentTarget)
    const user = Object.fromEntries(formData.entries())

    const { data, error } = await authClient.signIn.email({
      email: user.email,
      password: user.password,
    })
      setLoading(false)
    if (data) redirect("/")
    if (error) alert("Invalid email or password")
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md bg-[#111318] border border-white/5 rounded-2xl p-8 shadow-xl">

        {/* Logo + Title */}
        <div className="flex flex-col items-center mb-8">
          <Image src="/images/logo.png" alt="HireLoop" width={130} height={36} priority />
          <h1 className="text-white text-2xl font-bold mt-6">Welcome back</h1>
          <p className="text-gray-400 text-sm mt-1">Sign in to your HireLoop account</p>
        </div>

        {/* Form */}
        <Form onSubmit={onSubmit} className="flex flex-col gap-5">

          {/* Email */}
          <TextField isRequired name="email" type="email" className="w-full">
            <Label className="text-sm text-gray-300 mb-1 block">Email Address</Label>
            <Input
              placeholder="you@example.com"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-violet-500 transition-colors"
            />
            <FieldError className="text-red-400 text-xs mt-1" />
          </TextField>

          {/* Password */}
          <TextField isRequired name="password" type="password" className="w-full">
            <Label className="text-sm text-gray-300 mb-1 block">Password</Label>
            <Input
              placeholder="Enter your password"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-violet-500 transition-colors"
            />
            <FieldError className="text-red-400 text-xs mt-1" />
          </TextField>

          {/* Submit */}
          <button
            type="submit"
            className="w-full mt-2 py-2.5 rounded-xl bg-[#6D28D9] hover:bg-[#7C3AED] text-white text-sm font-semibold transition-colors shadow-[0_0_20px_rgba(109,40,217,0.35)]"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-1">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-gray-500 text-xs">OR</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Google — static only */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white text-sm font-medium transition-colors"
          >
            <FcGoogle className="w-5 h-5" />
            Continue with Google
          </button>

          {/* Register link */}
          <p className="text-center text-gray-400 text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/get-started" className="text-violet-400 hover:text-violet-300 font-semibold">
              Register
            </Link>
          </p>

        </Form>
      </div>
    </div>
  );
};

export default LoginPage;