import { Suspense } from "react";
import PublicProfileClient from "./ProfileClient";

export default function PublicProfilePage() {
  return (
    <Suspense fallback={<div className="glass-card p-6 text-center text-gray-400">Loading profile...</div>}>
      <PublicProfileClient />
    </Suspense>
  );
}
