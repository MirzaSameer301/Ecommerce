import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Toast = ({ message, openToast, setOpenToast }) => {
  const toastRef = useRef(null);
  useGSAP(() => {
    if (toastRef.current) {
      if (openToast) {
        gsap.fromTo(
          toastRef.current,
          { x: "100%", opacity: 0 },
          { x: "0%", opacity: 1, duration: 0.5, ease: "power2.out" }
        );
      } else {
        gsap.to(toastRef.current, {
          x: "100%",
          opacity: 0,
          duration: 0,
        });
      }
    }
  }, [openToast]);

  return (
    <div
      ref={toastRef}
      className={`bg-red-600 font-semibold text-white text-sm w-1/6 top-10 p-6 rounded-2xl fixed right-2
    }`}
    >
      {message}
      <button
        onClick={() => setOpenToast(false)}
        className="text-white absolute right-4 top-1 p-1 rounded w-6 h-6 items-center justify-center flex hover:opacity-85 "
      >
        x
      </button>
    </div>
  );
};

export default Toast;
