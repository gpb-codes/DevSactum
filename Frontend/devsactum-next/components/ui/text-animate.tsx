"use client"

import { useRef } from "react"
import { motion, useInView } from "motion/react"
import { cn } from "@/lib/utils"

type AnimationType =
  | "fadeIn"
  | "fadeInUp"
  | "popIn"
  | "shiftInUp"
  | "rollIn"
  | "whipIn"
  | "whipInUp"
  | "calmInUp"

interface TextAnimateProps {
  text: string
  type?: AnimationType
  className?: string
  once?: boolean
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const animationVariants: Record<string, any> = {
  fadeIn: {
    container: { hidden: { opacity: 0 }, visible: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } } },
    child: { visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 12, stiffness: 100 } }, hidden: { opacity: 0, y: 10 } },
  },
  fadeInUp: {
    container: { hidden: { opacity: 0 }, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } } },
    child: { visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }, hidden: { opacity: 0, y: 20 } },
  },
  popIn: {
    container: { hidden: { scale: 0 }, visible: { transition: { staggerChildren: 0.05, delayChildren: 0.2 } } },
    child: { visible: { opacity: 1, scale: 1, transition: { type: "spring", damping: 15, stiffness: 400 } }, hidden: { opacity: 0, scale: 0 } },
  },
  calmInUp: {
    container: { hidden: {}, visible: { transition: { staggerChildren: 0.01, delayChildren: 0.2 } } },
    child: { hidden: { y: "200%", transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.85 } }, visible: { y: 0, transition: { ease: [0.125, 0.92, 0.69, 0.975], duration: 0.75 } } },
  },
  shiftInUp: {
    container: { hidden: {}, visible: { transition: { staggerChildren: 0.01, delayChildren: 0.2 } } },
    child: { hidden: { y: "100%", transition: { ease: [0.75, 0, 0.25, 1], duration: 0.6 } }, visible: { y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } },
  },
  whipInUp: {
    container: { hidden: {}, visible: { transition: { staggerChildren: 0.01, delayChildren: 0.2 } } },
    child: { hidden: { y: "200%", transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.45 } }, visible: { y: 0, transition: { ease: [0.5, -0.15, 0.25, 1.05], duration: 0.75 } } },
  },
  rollIn: {
    container: { hidden: {}, visible: {} },
    child: { hidden: { opacity: 0, y: "0.25em" }, visible: { opacity: 1, y: "0em", transition: { duration: 0.65, ease: [0.65, 0, 0.75, 1] } } },
  },
  whipIn: {
    container: { hidden: {}, visible: {} },
    child: { hidden: { opacity: 0, y: "0.35em" }, visible: { opacity: 1, y: "0em", transition: { duration: 0.45, ease: [0.85, 0.1, 0.9, 1.2] } } },
  },
}

export function TextAnimate({ text, type = "whipInUp", className, once = true }: TextAnimateProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once })

  const { container, child } = animationVariants[type]

  if (type === "rollIn" || type === "whipIn") {
    return (
      <span ref={ref} className={cn("inline", className)} aria-hidden="true">
        {text.split(" ").map((word, wi) => (
          <motion.span
            key={wi}
            className="inline-block mr-[0.25em] whitespace-nowrap"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={container}
            transition={{ delayChildren: wi * 0.13, staggerChildren: 0.025 }}
          >
            {word.split("").map((char, ci) => (
              <motion.span key={ci} variants={child} className="inline-block -mr-[0.01em]">
                {char}
              </motion.span>
            ))}
          </motion.span>
        ))}
      </span>
    )
  }

  return (
    <motion.span
      ref={ref}
      className={cn("inline-flex overflow-hidden", className)}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {Array.from(text).map((letter, i) => (
        <motion.span key={i} variants={child}>
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.span>
  )
}
