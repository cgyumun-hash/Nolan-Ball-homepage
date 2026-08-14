"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * 원본 sub30.php 의 AOS 설정을 그대로 옮겼습니다.
 *
 *   data-aos="fade-down" data-aos-easing="linear" data-aos-duration="1500"
 *
 * AOS 의 fade-down 은 translateY(-100px) + opacity 0 에서 시작해
 * 위에서 아래로 내려오며 나타납니다. (fade-up 과 방향이 반대)
 */
export default function FadeDown({
  children,
  className,
  duration = 1.5,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  /** 초 단위. 원본 data-aos-duration 을 1000 으로 나눈 값 */
  duration?: number;
  once?: boolean;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: -100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.2 }}
      /* 원본 data-aos-easing="linear" */
      transition={{ duration, ease: "linear" }}
    >
      {children}
    </motion.div>
  );
}
