"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * 원본 서브페이지의 AOS 를 대체합니다.
 *
 *   <div data-aos="fade-up" data-aos-anchor-placement="top-center">
 *   <body data-aos-duration="400" data-aos-easing="ease">
 *
 * AOS 의 fade-up 은 translateY(100px) + opacity 0 에서 시작합니다.
 * 기본 지속시간은 body 의 400ms 이고, 요소에 data-aos-duration 이 있으면
 * 그 값이 우선합니다. (sub15 의 지도는 3000ms)
 *
 * 메인 페이지에는 data-aos 속성이 하나도 없어 효과가 없지만,
 * 서브페이지에는 실제로 적용되어 있어 거기서만 씁니다.
 */
export default function FadeUp({
  children,
  className,
  duration = 0.4,
}: {
  children: ReactNode;
  className?: string;
  /** 초 단위. 원본 data-aos-duration 을 1000 으로 나눈 값 */
  duration?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}
