import { getServerSession } from "next-auth";

import SignoutButton from "@/components/signoutButton";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <div>{JSON.stringify(session)}</div>
      <SignoutButton />
    </div>
  );
}
