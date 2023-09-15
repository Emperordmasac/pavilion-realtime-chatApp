import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import * as React from "react";

interface pageProps {}

const Page: React.FC<pageProps> = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div>
      Dashboard Page
      <pre>{JSON.stringify(session)}</pre>
    </div>
  );
};

export default Page;
