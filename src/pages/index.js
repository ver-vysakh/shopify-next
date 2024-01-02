import { Inter } from "next/font/google";
import { useEffect } from "react";
import { BASE_URL } from "@/constants";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const response = await fetch(`${BASE_URL}api/getProducts`);
    const list = await response.json();
    console.log(list);
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <h2>Home Page</h2>
    </main>
  );
}
