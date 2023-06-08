import Image from "next/image";
import { Inter } from "next/font/google";
import GoogleIcon from "@/components/Icon/GoogleIcon";
import { CgSpinnerAlt } from "react-icons/cg";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [isLoading, setLoading] = useState();
  return <div>Home</div>;
}
