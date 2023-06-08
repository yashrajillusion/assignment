import { Inter } from "next/font/google";
import { useAuthContext } from "@/context/auth-context";
import PrivateRoute from "@/components/common/PrivateRoute";
import { instance, setInstance } from "./api/api";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { authUserData, setAuthUserData } = useAuthContext();

  return (
    <PrivateRoute>
      <div>Home</div>
    </PrivateRoute>
  );
}
