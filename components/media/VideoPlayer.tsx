type VideoPlayerProps = {
  src: string;
  title: string;
  mimeType?: string | null;
  poster?: string | null;
  className?: string;
};

const YOUTUBE_ID_PATTERN = /^[A-Za-z0-9_-]{6,15}$/;
const VIMEO_ID_PATTERN = /^\d+$/;

function normalizeHttpUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url : null;
  } catch {
    return null;
  }
}

/** 알려진 동영상 서비스만 iframe 주소로 변환합니다. */
export function getVideoEmbedUrl(value: string): string | null {
  const url = normalizeHttpUrl(value);
  if (!url) return null;

  const hostname = url.hostname.toLowerCase().replace(/\.$/, "");

  if (hostname === "youtu.be") {
    const id = url.pathname.split("/").filter(Boolean)[0];
    return id && YOUTUBE_ID_PATTERN.test(id)
      ? `https://www.youtube-nocookie.com/embed/${id}`
      : null;
  }

  if (
    hostname === "youtube.com"
    || hostname === "www.youtube.com"
    || hostname === "m.youtube.com"
    || hostname === "youtube-nocookie.com"
    || hostname === "www.youtube-nocookie.com"
  ) {
    const segments = url.pathname.split("/").filter(Boolean);
    const id = url.pathname === "/watch"
      ? url.searchParams.get("v")
      : segments[0] === "embed" || segments[0] === "shorts" || segments[0] === "live"
        ? segments[1]
        : null;

    return id && YOUTUBE_ID_PATTERN.test(id)
      ? `https://www.youtube-nocookie.com/embed/${id}`
      : null;
  }

  if (
    hostname === "vimeo.com"
    || hostname === "www.vimeo.com"
    || hostname === "player.vimeo.com"
  ) {
    const id = url.pathname.split("/").filter(Boolean).find((segment) => VIMEO_ID_PATTERN.test(segment));
    return id ? `https://player.vimeo.com/video/${id}` : null;
  }

  return null;
}

export default function VideoPlayer({
  src,
  title,
  mimeType,
  poster,
  className = "",
}: VideoPlayerProps) {
  const directUrl = normalizeHttpUrl(src);
  if (!directUrl) return null;

  const embedUrl = getVideoEmbedUrl(directUrl.toString());

  return (
    <div className={`aspect-video w-full overflow-hidden rounded-[20px] bg-black ${className}`}>
      {embedUrl ? (
        <iframe
          src={embedUrl}
          title={title}
          className="h-full w-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : (
        <video
          className="h-full w-full object-contain"
          controls
          playsInline
          preload="metadata"
          poster={poster ?? undefined}
        >
          <source src={directUrl.toString()} type={mimeType || undefined} />
          동영상을 재생할 수 없는 브라우저입니다.
        </video>
      )}
    </div>
  );
}
