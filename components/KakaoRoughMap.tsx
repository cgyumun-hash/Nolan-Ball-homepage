"use client";

import { useEffect, useRef } from "react";

/**
 * 카카오맵 "지도 퍼가기"(roughmap) 임베드.
 *
 * 원본 /sub/sub15.php 은 이렇게 넣습니다.
 *   <div id="daumRoughmapContainer{timestamp}" class="root_daum_roughmap root_daum_roughmap_landing">
 *   <script src="https://ssl.daumcdn.net/dmaps/map_js_init/roughmapLoader.js">
 *   new daum.roughmap.Lander({ timestamp, key, mapWidth:"", mapHeight:"579" }).render()
 *
 * React 에서는 스크립트를 직접 넣을 수 없으므로 useEffect 안에서 로드한 뒤
 * Lander 가 준비되면 render() 를 호출합니다.
 * 로드에 실패하면 아래 대체 화면(주소 + 카카오맵 링크)이 그대로 보입니다.
 */

type Lander = { render: () => void };
declare global {
  interface Window {
    daum?: {
      roughmap?: {
        Lander?: new (opts: {
          timestamp: string;
          key: string;
          mapWidth: string;
          mapHeight: string;
        }) => Lander;
      };
    };
  }
}

const LOADER_SRC = "https://ssl.daumcdn.net/dmaps/map_js_init/roughmapLoader.js";

export default function KakaoRoughMap({
  timestamp,
  mapKey,
  height,
  address,
  placeName,
  latitude,
  longitude,
}: {
  timestamp: string;
  mapKey: string;
  height: string;
  /** 지도가 안 뜰 때 보여줄 주소 */
  address: string;
  placeName: string;
  latitude: number;
  longitude: number;
}) {
  const rendered = useRef(false);

  useEffect(() => {
    const tryRender = () => {
      if (rendered.current) return true;
      const Lander = window.daum?.roughmap?.Lander;
      if (!Lander) return false;
      rendered.current = true;
      new Lander({
        timestamp,
        key: mapKey,
        mapWidth: "",
        mapHeight: height,
      }).render();
      return true;
    };

    if (tryRender()) return;

    // 스크립트는 페이지당 한 번만 넣습니다
    if (!document.querySelector(`script[src="${LOADER_SRC}"]`)) {
      const script = document.createElement("script");
      script.src = LOADER_SRC;
      script.charset = "UTF-8";
      script.async = true;
      document.head.appendChild(script);
    }

    // 로더가 daum.roughmap 을 비동기로 준비하므로 잠깐 기다립니다
    const timer = setInterval(() => {
      if (tryRender()) clearInterval(timer);
    }, 100);
    const giveUp = setTimeout(() => clearInterval(timer), 10000);

    return () => {
      clearInterval(timer);
      clearTimeout(giveUp);
    };
  }, [timestamp, mapKey, height]);

  return (
    <div
      className="relative w-full overflow-hidden bg-[#eef4f8]"
      style={{ minHeight: `${height}px` }}
    >
      {/* 지도가 로드되면 이 위를 덮습니다 */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
        <p className="gfont text-[18px] text-ink-900">{address}</p>
        <a
          href={`https://map.kakao.com/link/map/${encodeURIComponent(placeName)},${latitude},${longitude}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[14px] text-ink-500 underline"
        >
          카카오맵에서 열기
        </a>
      </div>

      <div
        id={`daumRoughmapContainer${timestamp}`}
        className="root_daum_roughmap root_daum_roughmap_landing relative"
        style={{ width: "100%" }}
      />
    </div>
  );
}
