'use client'

import { authClient } from "@/lib/auth-client";
import { Button, Form, Input, TextField, Label, FieldError } from "@heroui/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";

const RegisterPage = () => {
const [loading, setLoading] = useState(false)
  const onSubmit = async (e) => {
    e.preventDefault()
      setLoading(true) 
    const formData = new FormData(e.currentTarget)
    const user = Object.fromEntries(formData.entries())

    const { data, error } = await authClient.signUp.email({
      email: user.email,
      image: user.image,
      name: user.name,
      password: user.password,
    })
      setLoading(false)
    if (data) redirect("/")
   if (error) alert(error.message)
  }

  

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-16">
      {/* Card */}
      <div className="w-full max-w-md bg-[#111318] border border-white/5 rounded-2xl p-8 shadow-xl">

        {/* Logo + Title */}
        <div className="flex flex-col items-center mb-8">
          <Image src="/images/logo.png" alt="HireLoop" width={130} height={36} priority />
          <h1 className="text-white text-2xl font-bold mt-6">Create an account</h1>
          <p className="text-gray-400 text-sm mt-1">Join HireLoop and find your dream job</p>
        </div>

        {/* Form */}
        <Form onSubmit={onSubmit} className="flex flex-col gap-5">

          {/* Name */}
          <TextField isRequired name="name" type="text" className="w-full">
            <Label className="text-sm text-gray-300 mb-1 block">Full Name</Label>
            <Input
              placeholder="John Doe"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-violet-500 transition-colors"
            />
            <FieldError className="text-red-400 text-xs mt-1" />
          </TextField>

          {/* Email */}
          <TextField isRequired name="email" type="email" className="w-full">
            <Label className="text-sm text-gray-300 mb-1 block">Email Address</Label>
            <Input
              placeholder="you@example.com"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-violet-500 transition-colors"
            />
            <FieldError className="text-red-400 text-xs mt-1" />
          </TextField>

          {/* Photo URL */}
          <TextField name="image" type="url" className="w-full">
            <Label className="text-sm text-gray-300 mb-1 block">Photo URL <span className="text-gray-500">(optional)</span></Label>
            <Input
              placeholder="https://..."
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-violet-500 transition-colors"
            />
            <FieldError className="text-red-400 text-xs mt-1" />
          </TextField>

          {/* Password */}
          <TextField
            isRequired
            name="password"
            type="password"
            minLength={6}
            validate={(value) => {
              if (value.length < 6) return "Password must be at least 6 characters";
              if (!/[A-Z]/.test(value)) return "Must contain at least one uppercase letter";
              if (!/[a-z]/.test(value)) return "Must contain at least one lowercase letter";
              return null;
            }}
            className="w-full"
          >
            <Label className="text-sm text-gray-300 mb-1 block">Password</Label>
            <Input
              placeholder="Min. 6 characters"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-violet-500 transition-colors"
            />
            <FieldError className="text-red-400 text-xs mt-1" />
          </TextField>

          {/* Submit */}
          <button
            type="submit"
            className="w-full mt-2 py-2.5 rounded-xl bg-[#6D28D9] hover:bg-[#7C3AED] text-white text-sm font-semibold transition-colors shadow-[0_0_20px_rgba(109,40,217,0.35)]"
            
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-1">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-gray-500 text-xs">OR</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Google */}
          <button
            type="button"
        
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white text-sm font-medium transition-colors"
          >
            <FcGoogle className="w-5 h-5" />
            Continue with Google
          </button>

          {/* Login link */}
          <p className="text-center text-gray-400 text-sm">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-violet-400 hover:text-violet-300 font-semibold">
              Sign In
            </Link>
          </p>

        </Form>
      </div>
    </div>
  );
};

export default RegisterPage;