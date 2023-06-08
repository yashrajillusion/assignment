import { Inter } from "next/font/google";
import { useAuthContext } from "@/context/auth-context";
import PrivateRoute from "@/components/common/PrivateRoute";
import { createOrder, getAllOrder, instance, setInstance } from "./api/api";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { CreateOrderReqData, Orders } from "./api/types";
import { CgSpinnerAlt } from "react-icons/cg";
import { commonToast } from "@/utils/helper";
import { useRouter } from "next/router";
import { clearAllGlobalItem } from "@/utils/local-storage";
import { handleLogout } from "@/utils/firebase";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { authUserData } = useAuthContext();
  const [userOrdersData, setUserOrdersData] = useState<Orders[]>([]);
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  const [createOrderData, setCreateOrderData] = useState<CreateOrderReqData>({
    user_id: authUserData?.user?._id,
    sub_total: 0,
    phone_number: authUserData?.user?.phone_number,
  });

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getAllOrder(authUserData.user._id);
        setUserOrdersData(data);
      } catch (error) {}
    })();
    setCreateOrderData({
      user_id: authUserData?.user?._id,
      sub_total: 0,
      phone_number: authUserData?.user?.phone_number,
    });
  }, [authUserData]);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setCreateOrderData({ ...createOrderData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await createOrder(createOrderData);
      setUserOrdersData([data, ...userOrdersData]);
    } catch (error: any) {
      commonToast(error?.response?.data?.message);
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <PrivateRoute>
      <div>
        <div className="flex flex-col justify-center mt-8 px-8 py-6 border border-neutral-800">
          {authUserData?.user?.name ? (
            <p className="text-15 text-neutral-300 mb-3">
              Hi, {authUserData.user.name}
            </p>
          ) : (
            <></>
          )}
          <div className="flex w-full justify-between">
            <p className="text-20 mb-3">Create Order</p>
            <button
              onClick={() => {
                clearAllGlobalItem();
                router.replace("/login");
                handleLogout();
              }}
              type="submit"
              className={`bg-neutral-50 text-neutral-950 rounded-[12px] py-3 px-5 inter-600 disabled:opacity-60 disabled:text-neutral-950 disabled:cursor-not-allowed h-[48px] hover:opacity-80 transition duration-300`}
            >
              Logout
            </button>
          </div>
          <form
            onSubmit={handleFormSubmit}
            className="flex items-end gap-[36px] mb-4"
          >
            <div className="flex flex-col relative">
              <label className="text-neutral-400 inter-400 text-14 mb-[6px]">
                Phone Number
              </label>
              <input
                value={createOrderData.phone_number ?? ""}
                onChange={handleInput}
                name="phone_number"
                autoFocus={false}
                className={`lightBgTextSelection w-full bg-inherit px-4 py-3 ${"outline-[1px] outline-neutral-750 hover:outline-[1px] hover:outline-neutral-50 focus:outline-[1.5px] focus:outline-neutral-50"}  rounded-[12px] outline-none text-neutral-50 text-16 placeholder:text-neutral-600
                transition duration-200 `}
                placeholder={"Enter Phone number"}
              />
            </div>
            <div className="flex flex-col relative">
              <label className="text-neutral-400 inter-400 text-14 mb-[6px]">
                Sub Total
              </label>
              <input
                value={createOrderData.sub_total}
                onChange={handleInput}
                name="sub_total"
                autoFocus={false}
                className={`lightBgTextSelection w-full bg-inherit px-4 py-3 ${"outline-[1px] outline-neutral-750 hover:outline-[1px] hover:outline-neutral-50 focus:outline-[1.5px] focus:outline-neutral-50"}  rounded-[12px] outline-none text-neutral-50 text-16 placeholder:text-neutral-600
                transition duration-200 `}
                placeholder={"Enter total ammount"}
              />
            </div>
            <div className="flex flex-col gap-6">
              <button
                type="submit"
                disabled={isLoading}
                className={`${
                  isLoading && "cursor-not-allowed opacity-70"
                } bg-neutral-50 text-neutral-950 rounded-[12px] py-3 px-5  w-full inter-600 disabled:opacity-60 disabled:text-neutral-950 disabled:cursor-not-allowed h-[48px] hover:opacity-80 transition duration-300`}
              >
                {isLoading ? (
                  <CgSpinnerAlt
                    className={
                      "text-neutral-950 transition-all animate-spin text-24 m-auto"
                    }
                  />
                ) : (
                  "Create Order"
                )}
              </button>
            </div>
          </form>
        </div>
        <div className="flex justify-between p-8">
          <div className="w-[100px]">SN.</div>
          <div className="flex-1">Order Id</div>
          <div className="flex-1">Phone Number</div>
          <div>Sub Total</div>
        </div>
        {userOrdersData.map((el: Orders, idx: number) => {
          return (
            <div key={el._id} className="flex justify-between p-2 px-8">
              <div className="w-[100px]">{idx + 1}</div>
              <div className="flex-1">{el._id}</div>
              <div className="flex-1">{el.phone_number}</div>
              <div>{el.sub_total}</div>
            </div>
          );
        })}
      </div>
    </PrivateRoute>
  );
}
