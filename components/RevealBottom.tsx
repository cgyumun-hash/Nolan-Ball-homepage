"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * 원본 sub.css 의 커스텀 AOS 애니메이션을 그대로 옮겼습니다.
 *
 *   [data-aos="reveal-bottom"]              { clip-path: polygon(0 0, 100% 0, 100% 0,   0 0) }
 *   [data-aos="reveal-bottom"].aos-animate  { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%) }
 *
 * 위에서 아래로 커튼이 걷히듯 글자가 드러납니다.
 * body 의 data-aos-duration="400" · easing "ease" 를 따릅니다.
 */
export default function RevealBottom({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
      whileInView={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}
