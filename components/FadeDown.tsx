"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export default function FadeDown({
  children,
  className,
  duration = 0.45,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  duration?: number;
  once?: boolean;
}) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [once]);

  return (
    <div
      ref={elementRef}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: `translate3d(0, ${isVisible ? 0 : -100}px, 0)`,
        transition: `opacity ${duration}s linear, transform ${duration}s linear`,
      }}
    >
      {children}
    </div>
  );
}
