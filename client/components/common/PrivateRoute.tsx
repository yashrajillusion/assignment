import { useAuthContext } from "@/context/auth-context";
import { AuthUserData } from "@/pages/api/types";
import { getGlobalItem } from "@/utils/local-storage";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
interface PrivateRouteProps {
  children: React.ReactElement;
}
function PrivateRoute({ children }: PrivateRouteProps) {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const { authUserData, setAuthUserData } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== "undefined") {
      const savedUserData: AuthUserData = getGlobalItem("user");
      if (!savedUserData) {
        router.replace("/login");
      }
      if (savedUserData) {
        if (!authUserData.access_token) {
          setAuthUserData(savedUserData);
        }
      }
    }
  }, [router, authUserData]);

  if (!isMounted) {
    return <></>;
  }

  if (!authUserData.access_token) {
    return <></>;
  }
  return <>{children}</>;
}

export default PrivateRoute;
