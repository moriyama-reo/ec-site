"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // ログイン関数
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError("メールアドレスまたはパスワードが間違っています");
    } else if (res?.ok) {
      location.href = "/products";
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 mt-4 max-w-sm mx-auto"
      >
        <div className="w-full">
          <div>
            <label
              className="mb-1 mt-2 block text-xs font-medium text-gray-900"
              htmlFor="email"
            >
              メールアドレス
            </label>
            <input
              className="block w-full rounded-md border border-gray-200 py-[9px] px-3 text-sm outline-2 placeholder:text-gray-500"
              id="email"
              type="email"
              name="email"
              placeholder="メールアドレス"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="w-full">
          <label
            className="mb-1 mt-2 block text-xs font-medium text-gray-900"
            htmlFor="password"
          >
            パスワード
          </label>
          <input
            className="block w-full rounded-md border border-gray-200 py-[9px] px-3 text-sm outline-2 placeholder:text-gray-500"
            id="password"
            type="password"
            name="password"
            placeholder="パスワード"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          ログイン
        </button>
        <div className="flex h-8 items-end space-x-1">
          {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
        </div>
      </form>
    </>
  );
}
