import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const BackgroundGradient = ({
  children,
  className,
  containerClassName,
  animate = true,
}) => {
  const variants = {
    initial: {
      backgroundPosition: "0 50%",
    },
    animate: {
      backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
    },
  };
  return (
    <div className={cn("relative p-[1px] group", containerClassName)}>
      <motion.div
        variants={animate ? variants : undefined}
        initial={animate ? "initial" : undefined}
        animate={animate ? "animate" : undefined}
        transition={
          animate
            ? {
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
              }
            : undefined
        }
        style={{
          backgroundSize: animate ? "400% 400%" : undefined,
        }}
        className={cn(
          "absolute inset-0 rounded-sm z-[1] opacity-30 group-hover:opacity-50 blur-xl  transition duration-500 will-change-transform",
          " bg-[radial-gradient(circle_farthest-side_at_0_50%,#F97316,transparent),radial-gradient(circle_farthest-side_at_50%_0,#F97316,transparent),radial-gradient(circle_farthest-side_at_0_50%,#F97316,transparent),radial-gradient(circle_farthest-side_at_50%_0,#F97316,transparent)]"
        )}
      />
      <motion.div
        variants={animate ? variants : undefined}
        initial={animate ? "initial" : undefined}
        animate={animate ? "animate" : undefined}
        transition={
          animate
            ? {
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
              }
            : undefined
        }
        style={{
          backgroundSize: animate ? "400% 400%" : undefined,
        }}
        className={cn(
          "absolute inset-0 rounded-sm z-[1] will-change-transform",
          "bg-[radial-gradient(circle_farthest-side_at_0_100%,#F97316,transparent),radial-gradient(circle_farthest-side_at_100%_0,#F97316,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#ffc414,transparent),radial-gradient(circle_farthest-side_at_0_0,#1ca0fb,#F97316)]"
        )}
      />

      <div className={cn("relative z-10", className)}>{children}</div>
    </div>
  );
};
