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
    <section className="relative flex flex-col md:flex-row md:flex-wrap xl:flex-nowrap items-center justify-center gap-12 bg-[radial-gradient(ellipse_at_top_left,_rgba(99,19,245,0.25)_0%,_transparent_70%),_radial-gradient(ellipse_at_bottom_right,_rgba(237,117,47,0.25)_0%,_transparent_70%),_linear-gradient(to_bottom,_#0f172a_0%,_#000_100%)] min-h-[24vh] w-full px-4 py-8 md:py-12 shadow-[0_25px_40px_-10px_rgba(0,0,0,0.6)]">
      {/* Text section */}
      <div className="backdrop-blur-xl bg-white/10 ring-1 ring-white/15 rounded-3xl p-6 md:p-8 shadow-2xl md:flex-1 md:min-w-[340px] md:max-w-[640px]">
        <div className="flex flex-col items-start max-w-lg text-left space-y-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white [text-wrap:balance]">{heading}</h2>
          <p className="text-gray-200 text-lg leading-relaxed [text-wrap:balance]">{description}</p>
          {buttonText && (
            <a
              href={buttonHref}
              className={`w-full sm:w-auto text-center rounded-md px-6 py-3 font-semibold transition hover:opacity-80 ${buttonColorClass} focus-visible:ring-2 focus-visible:ring-white/40`}
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
                  className="inline-flex items-center rounded-full bg-white/10 ring-1 ring-white/15 px-3 py-1 text-xs font-medium text-white/90"
                >
                  {req}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* Image section */}
      <div className="hidden md:flex justify-center md:justify-end md:flex-1 md:min-w-[320px]">
        <img
          src={imageSrc}
          alt={heading}
          className="w-full max-w-[22rem] md:max-w-[20rem] lg:max-w-[24rem] rounded-2xl shadow-2xl ring-1 ring-white/10"
        />
      </div>
    </section>
  );
}