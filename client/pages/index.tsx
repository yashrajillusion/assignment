import Image from "next/image";
import { Inter } from "next/font/google";
import GoogleIcon from "@/components/Icon/GoogleIcon";
import { CgSpinnerAlt } from "react-icons/cg";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [isLoading, setLoading] = useState();
  return (
    <div className="h-[100vh] w-full flex justify-center items-center bg-neutral-925">
      <div className="flex flex-col gap-12 max-w-[400px] w-full mx-auto">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <div className="text-neutral-50 inter-600 text-32">
              Welcome to Voosh
            </div>
          </div>
          <div className="text-neutral-400 inter-400 text-16">Log in</div>
        </div>
        <form className="flex flex-col gap-[36px]">
          <div className="flex flex-col relative">
            <label className="text-neutral-400 inter-400 text-14 mb-[6px]">
              Phone Number
            </label>
            <input
              autoFocus={true}
              className={`lightBgTextSelection w-full bg-inherit px-4 py-3 ${"outline-[1px] outline-neutral-750 hover:outline-[1px] hover:outline-neutral-50 focus:outline-[1.5px] focus:outline-neutral-50"}  rounded-[12px] outline-none text-neutral-50 text-16 placeholder:text-neutral-600
                transition duration-200 `}
              placeholder={"Enter Phone number"}
            />
          </div>
          <div className="flex flex-col relative">
            <label className="text-neutral-400 inter-400 text-14 mb-[6px]">
              Password
            </label>
            <input
            type="password"
              autoFocus={true}
              className={`lightBgTextSelection w-full bg-inherit px-4 py-3 ${"outline-[1px] outline-neutral-750 hover:outline-[1px] hover:outline-neutral-50 focus:outline-[1.5px] focus:outline-neutral-50"}  rounded-[12px] outline-none text-neutral-50 text-16 placeholder:text-neutral-600
                transition duration-200 `}
              placeholder={"Enter Your password"}
            />
          </div>
          <div className="flex flex-col gap-6">
            <div className="text-14 text-neutral-400 inter-400">
              By continuing you accept Voosh{" "}
              <span className="text-neutral-50 inter-600 cursor-pointer">
                Terms &amp; Conditions
              </span>{" "}
              and{" "}
              <span className="text-neutral-50 inter-600 cursor-pointer">
                Privacy Policy
              </span>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className={`${
                false && "cursor-not-allowed opacity-70"
              } bg-neutral-50 text-neutral-950 rounded-[12px] py-3 px-5  w-full inter-600 disabled:opacity-60 disabled:text-neutral-950 disabled:cursor-not-allowed h-[48px] hover:opacity-80 transition duration-300`}
            >
              {false ? (
                <CgSpinnerAlt
                  className={
                    "text-neutral-950 transition-all animate-spin text-24 m-auto"
                  }
                />
              ) : (
                "Send"
              )}
            </button>
          </div>
        </form>
        <div className=" flex flex-col gap-12 max-w-[400px] w-full mx-auto">
          <button
            type="submit"
            className={`flex justify-center items-center space-x-2 bg-neutral-750 text-neutral-50 text-16 inter-600 rounded-[12px] py-3 px-5  w-full inter-600 disabled:opacity-60 disabled:text-neutral-950 disabled:cursor-not-allowed h-[48px] hover:opacity-80 transition duration-300`}
          >
            <span>
              <GoogleIcon />
            </span>
            <span>{"Continue With Google"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
