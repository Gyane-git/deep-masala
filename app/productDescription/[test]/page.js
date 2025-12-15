"use client";

import { useParams } from "next/navigation";

export default function Page() {
  const { test } = useParams();
  return (
    <div>
      <h1>Product Code: {test}</h1>
    </div>
  );
}
