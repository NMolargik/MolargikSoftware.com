interface HeroProps {
  heading: string;
  description: string;
  imageSrc: string;
  buttonText?: string;
  buttonColorClass?: string;
  buttonHref?: string;
  buttonDownload?: boolean;
  systemRequirements?: string[];
}

export default function Hero({
  heading,
  description,
  imageSrc,
  buttonText,
  buttonColorClass = "bg-primary text-black",
  buttonHref = "#",
  buttonDownload = false,
  systemRequirements = [],
}: HeroProps) {
  return (
    <section
      className="relative flex flex-row items-center justify-center gap-6 bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900 min-h-[20vh] md:max-h-[40vh] w-full px-4 py-4 sm:py-6 md:py-8 shadow-[0_20px_50px_-5px_rgba(0,0,0,0.5)] overflow-hidden"
    >
      {/* Add radial overlay directly to section */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(99,19,245,0.2)_20%,_transparent_60%)] opacity-50" />

      {/* Text section */}
      <div className="relative z-10 backdrop-blur-xl bg-white/10 ring-1 ring-white/15 rounded-2xl p-4 md:p-6 shadow-lg flex-1 max-w-lg overflow-y-auto max-h-full">
        <div className="flex flex-col items-start space-y-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white [text-wrap:balance]">
            {heading}
          </h2>
          <p className="text-gray-200 text-base sm:text-lg leading-relaxed [text-wrap:balance] max-h-[10rem] overflow-y-auto">
            {description}
          </p>
          {buttonText && (
            <a
              href={buttonHref}
              className={`w-full sm:w-auto text-center rounded-md px-5 py-2 font-semibold transition hover:opacity-80 ${buttonColorClass} focus-visible:ring-2 focus-visible:ring-white/40`}
              download={buttonDownload}
            >
              {buttonText}
            </a>
          )}
          {/* System requirements pills */}
          {systemRequirements.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {systemRequirements.map((req, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center rounded-full bg-orange-500 ring-1 ring-orange-400 px-2 py-1 text-xs font-medium text-white/100"
                >
                  {req}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Image section - Always visible, shrinks with aspect ratio */}
      <div className="flex justify-end flex-1 max-w-[24rem] shrink-0">
        <img
          src={imageSrc}
          alt={heading}
          className="w-auto h-auto max-h-full max-w-[17rem] md:max-w-[22rem] rounded-xl shadow-lg ring-1 ring-white/10 object-contain"
        />
      </div>
    </section>
  );
}