import MainLayout from "@/layout/MainLayout";
import { getServerSession } from "next-auth";
import { CustomUser, authOptions } from "../api/auth/[...nextauth]/options";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = (await getServerSession(authOptions)) as { user: CustomUser };

  return <MainLayout session={session}>{children}</MainLayout>;
}
