"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SearchBox() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const router = useRouter();

  // デバウンス
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  // 検索
  useEffect(() => {
    if (debouncedSearch.trim() === "") {
      router.replace("/products");
      return;
    }
    router.replace(`/products?search=${debouncedSearch.trim()}`);
  }, [debouncedSearch, router]);

  return (
    <div className="mt-4 flex items-center justify-between gap-2 md:mt-4">
      <input
        id="search"
        name="search"
        type="text"
        placeholder="商品を検索..."
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}
