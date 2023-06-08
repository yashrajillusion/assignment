import { toast } from "react-hot-toast";

export const commonToast = (title?: string) => {
  toast(title ? title : "Something went wrong", {
    style: {
      fontFamily: "inter, sans-serif",
      fontWeight: 400,
      borderRadius: "12px",
      background: "#2F2F32",
      color: "#E34850",
      fontSize: "14px",
      marginBottom: "64px",
      border: "1px solid #3A3A3C",
      paddingLeft: "16px",
    },
  });
};
