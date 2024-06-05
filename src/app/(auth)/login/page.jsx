import CircleLoader from "@/components/home/CircleLoader";
import LoginMain from "@/components/login/LoginMain";
import { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<CircleLoader />}>
      <LoginMain />
    </Suspense>
  );
};

export default page;
