"use client";

import { getTitle } from "@/action/title";
import { CreateLink } from "@/components/create-link";
import { useEffect, useState } from "react";

export default function Home() {
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
}
