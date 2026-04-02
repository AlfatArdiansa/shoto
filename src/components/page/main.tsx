"use client";

import { getTitle } from "@/action/config";
import { useEffect, useState } from "react";
import { CreateLink } from "../create-link";

export const MainPage = () => {
  const [title, setTitle] = useState<string | null>(null);

  useEffect(() => {
    getTitle().then(setTitle);
  }, []);
  return (
    <div className="w-full h-screen flex items-center">
      <div className="w-1/2 mx-auto">
        <h1 className="text-center font-bold text-4xl">{title}</h1>
        <div className="mt-4">
          <CreateLink />
        </div>
      </div>
    </div>
  );
};
