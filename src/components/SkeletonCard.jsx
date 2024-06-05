import { Skeleton } from "./ui/skeleton";

export function SkeletonCard({ lenght }) {
  // Create an array with 10 elements to map over
  const cards = Array.from({ length: lenght }, (_, index) => index);

  return (
    <div className="flex justify-center items-center mx-auto">
      <div
        className={`my-7  font-grotesk grid grid-cols-1  md:grid-cols-3  xl:grid-cols-4 gap-4`}
      >
        {/* Map over the array and render SkeletonCard for each element */}
        {cards.map((cardIndex) => (
          <div key={cardIndex} className="flex flex-col  space-y-3 ">
            <Skeleton className="h-[150px] w-[220px] rounded-xl " />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[230px]" />
              <Skeleton className="h-4 w-[180px]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
