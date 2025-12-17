"use client";

import { useAuth } from "@clerk/nextjs";

export default function CallApiButton() {
  const { getToken } = useAuth();

  const callBackend = async () => {
    const token = await getToken({ template: "backend" });

    const res = await fetch("http://localhost:3001/protected", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(res);
  };

  return <button onClick={callBackend}>Call API</button>;
}
