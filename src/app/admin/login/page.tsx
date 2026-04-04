"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Invalid email or password");
      setLoading(false);
    } else {
      router.push("/admin");
    }
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[400px] flex flex-col gap-[24px] p-[40px]"
      >
        <h1 className="font-[family-name:var(--font-instrument-serif)] text-[48px] text-black tracking-[-0.96px] leading-[52px]">
          Admin Login
        </h1>
        {error && (
          <p className="text-red-500 text-[14px] font-[family-name:var(--font-geist)]">
            {error}
          </p>
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="font-[family-name:var(--font-geist)] text-[16px] border border-[#eaecee] rounded-[12px] px-[16px] py-[12px] outline-none focus:border-primary transition-colors"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="font-[family-name:var(--font-geist)] text-[16px] border border-[#eaecee] rounded-[12px] px-[16px] py-[12px] outline-none focus:border-primary transition-colors"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-primary text-white font-[family-name:var(--font-geist)] text-[16px] tracking-[-0.32px] px-[20px] py-[12px] rounded-[44px] hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
}
