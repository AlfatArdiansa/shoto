"use client";

import { initiateAPI } from "@/lib/eden";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

enum Status {
  idle = "idle",
  fetching = "fetching",
  redirecting = "redirecting",
  error = "error",
}

export const Redirector = ({ slug }: { slug: string }) => {
  const [countDown, setCountDown] = useState(5);

  const [status, setStatus] = useState<Status>(Status.idle);

  const [linkData, setLinkData] = useState<any>(null);

  const fetchData = async () => {
    const linkData = await initiateAPI(window.location.origin).v1.link.get({
      query: { slug: slug },
    });

    if (linkData.status === 200) {
      setLinkData(linkData.data);

      setStatus(Status.redirecting);
    } else {
      console.log(linkData);
      setStatus(Status.error);
    }
  };

  useEffect(() => {
    setStatus(Status.fetching);

    fetchData();
  }, []);

  useEffect(() => {
    if (status !== Status.redirecting) return;
    const countDownInterval = setInterval(() => {
      console.log("counting");
      if (countDown > 0) {
        setCountDown(countDown - 1);
      }

      if (countDown === 0) {
        window.location.href = linkData.url;
        clearInterval(countDownInterval);
      }
    }, 1000);

    return () => clearInterval(countDownInterval);
  }, [status, countDown]);

  return (
    <div className="w-full h-screen flex items-center">
      <div className="w-1/2 mx-auto">
        <h1 className="text-center font-bold text-4xl">
          {(() => {
            switch (status) {
              case Status.idle:
                return "Idle";
              case Status.fetching:
                return "Fetching";
              case Status.redirecting:
                return `Redirecting ${countDown > 0 ? countDown : ""}`;
              case Status.error:
                return "Target URL not found";
            }
          })()}
        </h1>
        {status === Status.redirecting && (
          <Button
            className="w-full mt-4"
            onClick={() => (window.location.href = linkData.url)}
          >
            If you are not redirected, click here
          </Button>
        )}
      </div>
    </div>
  );
};
