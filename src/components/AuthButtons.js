"use client";
import React, { useState, useRef, useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

const AuthButtons = () => {
  const { data: session } = useSession();
  const [modalOpen, setModalOpen] = useState(false);
  const modalRef = useRef(null);

  const handleToggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setModalOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (session && session.user) {
    return (
      <button
      onClick={() => signOut()}
      className="btn"
    >
      Sign Out
    </button>
      // <div className="relative flex gap-4 ml-auto items-center">
      //   <div className="relative" ref={modalRef}>
      //     <Image
      //       src={session.user.image ?? ""}
      //       alt={session.user.name ?? ""}
      //       className="rounded-full cursor-pointer"
      //       width={32}
      //       height={32}
      //       onClick={handleToggleModal}
      //     />
      //     {modalOpen && (
      //       <div className="absolute right-0 mt-2 text-left w-56 rounded shadow-lg p-4 z-10">
      //         <button
      //           onClick={() => signOut()}
      //           className="btn"
      //         >
      //           Sign Out
      //         </button>
      //       </div>
      //     )}
      //   </div>
      // </div>
    );
  }

  return (
    <button
      className="btn "
      onClick={() => {
        signIn("google", {
          callbackUrl: "/",
        });
      }}
    >
      Sign In
    </button>
  );
};

export default AuthButtons
