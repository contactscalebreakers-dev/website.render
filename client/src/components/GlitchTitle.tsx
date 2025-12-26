interface GlitchTitleProps {
  text: string;
  className?: string;
}

export default function GlitchTitle({ text, className = "" }: GlitchTitleProps) {
  return (
    <h1 className={`text-4xl md:text-6xl font-bold relative ${className}`}>
      <span className="relative inline-block">
        {text}
        <span className="absolute top-0 left-0 -translate-x-[2px] text-red-500 opacity-70 animate-pulse" aria-hidden="true">
          {text}
        </span>
        <span className="absolute top-0 left-0 translate-x-[2px] text-blue-500 opacity-70 animate-pulse" aria-hidden="true">
          {text}
        </span>
      </span>
    </h1>
  );
}
