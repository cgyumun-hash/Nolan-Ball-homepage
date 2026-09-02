"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";

type KakaoLatLng = object;

type KakaoMapInstance = {
  addControl: (control: object, position: unknown) => void;
  relayout: () => void;
  setCenter: (position: KakaoLatLng) => void;
};

type KakaoMaps = {
  load: (callback: () => void) => void;
  LatLng: new (latitude: number, longitude: number) => KakaoLatLng;
  Map: new (
    container: HTMLElement,
    options: { center: KakaoLatLng; level: number },
  ) => KakaoMapInstance;
  Marker: new (options: {
    map: KakaoMapInstance;
    position: KakaoLatLng;
    title: string;
  }) => object;
  ZoomControl: new () => object;
  ControlPosition: { RIGHT: unknown };
};

declare global {
  interface Window {
    kakao?: { maps?: KakaoMaps };
  }
}

type KakaoMapProps = {
  appKey: string;
  height: string;
  address: string;
  placeName: string;
  latitude: number;
  longitude: number;
  linkLabel?: string;
  loadingLabel?: string;
  errorLabel?: string;
};

export default function KakaoMap({
  appKey,
  height,
  address,
  placeName,
  latitude,
  longitude,
  linkLabel = "카카오맵에서 크게 보기",
  loadingLabel = "지도를 불러오는 중입니다.",
  errorLabel = "지도를 불러오지 못했습니다.",
}: KakaoMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const resizeFrameRef = useRef<number | null>(null);
  const initializedRef = useRef(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    appKey ? "loading" : "error",
  );

  const initializeMap = useCallback(() => {
    const container = containerRef.current;
    const maps = window.kakao?.maps;

    if (!container || !maps || initializedRef.current) return;

    maps.load(() => {
      if (!containerRef.current || initializedRef.current) return;

      const center = new maps.LatLng(latitude, longitude);
      const map = new maps.Map(containerRef.current, {
        center,
        level: 3,
      });

      new maps.Marker({ map, position: center, title: placeName });
      map.addControl(new maps.ZoomControl(), maps.ControlPosition.RIGHT);

      resizeObserverRef.current?.disconnect();
      resizeObserverRef.current = new ResizeObserver(() => {
        if (resizeFrameRef.current !== null) return;
        resizeFrameRef.current = window.requestAnimationFrame(() => {
          map.relayout();
          map.setCenter(center);
          resizeFrameRef.current = null;
        });
      });
      resizeObserverRef.current.observe(containerRef.current);

      initializedRef.current = true;
      setStatus("ready");
    });
  }, [latitude, longitude, placeName]);

  useEffect(() => {
    const container = containerRef.current;
    if (!appKey || !container) return;

    if (typeof IntersectionObserver === "undefined") {
      const frame = window.requestAnimationFrame(() => setShouldLoad(true));
      return () => window.cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShouldLoad(true);
        observer.disconnect();
      },
      { rootMargin: "400px 0px" },
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, [appKey]);

  useEffect(() => {
    if (!shouldLoad) return;
    initializeMap();

    return () => {
      resizeObserverRef.current?.disconnect();
      if (resizeFrameRef.current !== null) {
        window.cancelAnimationFrame(resizeFrameRef.current);
        resizeFrameRef.current = null;
      }
    };
  }, [initializeMap, shouldLoad]);

  const mapHeight = Number.parseInt(height, 10) || 579;
  const kakaoMapUrl = `https://map.kakao.com/link/map/${encodeURIComponent(placeName)},${latitude},${longitude}`;

  return (
    <div
      className="relative w-full overflow-hidden bg-[#eef4f8]"
      style={{ height: `${mapHeight}px` }}
      aria-label={`${placeName} 지도`}
    >
      {appKey && shouldLoad && (
        <Script
          id="kakao-map-sdk"
          src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${encodeURIComponent(appKey)}&autoload=false`}
          strategy="afterInteractive"
          onReady={initializeMap}
          onError={() => setStatus("error")}
        />
      )}

      <div ref={containerRef} className="absolute inset-0" />

      {status !== "ready" && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 px-6 text-center">
          <p className="gfont text-[18px] text-ink-900">
            {status === "loading" ? loadingLabel : errorLabel}
          </p>
          <p className="text-[15px] text-ink-600">{address}</p>
        </div>
      )}

      <a
        href={kakaoMapUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute right-4 bottom-4 z-20 rounded-full bg-white px-5 py-3 text-[14px] font-medium text-ink-900 shadow-[0_4px_18px_rgba(0,0,0,0.18)] transition-colors hover:text-blue-700"
      >
        {linkLabel}
      </a>
    </div>
  );
}
