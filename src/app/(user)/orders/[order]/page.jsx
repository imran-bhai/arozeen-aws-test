
import BreadcrumbCustome from "@/components/BreadcrumbCustome";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import OrderStatus from "@/components/orders/OrderStatus";

const page = () => {
  return (
    <MaxWidthWrapper>
      <div className="py-5">
        <BreadcrumbCustome />
        <div className="text-center">
          <h5 className="text-xl font-semibold text-gray-700">
            Thank You &#127881;
          </h5>
          <h4 className="text-2xl font-semibold leading-loose text-primary">
            Your Order is Processing
          </h4>

          <OrderStatus />
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default page;
