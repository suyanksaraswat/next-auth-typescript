import { getServerSession } from "next-auth";

import SignoutButton from "@/components/signoutButton";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className="h-full">
      <div className="container">
        <div className="px-10 lg:px-80">
          <h1 className="text-4xl">Hi Bro</h1>
          {JSON.stringify(session)}
        </div>
      </div>
      <SignoutButton />
    </main>
  );
}
