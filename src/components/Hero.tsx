interface HeroProps {
  heading: string;
  description: string;
  imageSrc: string;
  buttonText?: string;
  buttonColorClass?: string;
  buttonHref?: string;
  buttonDownload?: boolean;
}

export default function Hero({
  heading,
  description,
  imageSrc,
  buttonText,
  buttonColorClass = "bg-primary text-black",
  buttonHref = "#",
  buttonDownload = false,
}: HeroProps) {
  return (
    <section className="relative flex flex-col md:flex-row items-center justify-between gap-8 bg-gradient-to-b from-slate-950 to-black min-h-[40vh] w-full px-6 py-12">
      {/* Text section */}
      <div className="flex flex-col items-start max-w-lg text-left space-y-4">
        <h2 className="text-4xl font-bold text-white">{heading}</h2>
        <p className="text-gray-300">{description}</p>
        {buttonText && (
          <a
            href={buttonHref}
            className={`rounded-md px-6 py-3 font-semibold transition hover:opacity-80 ${buttonColorClass}`}
            download={buttonDownload}
          >
            {buttonText}
          </a>
        )}
      </div>

      {/* Image section */}
      <div className="flex justify-center md:justify-end w-full md:w-1/2">
        <img
          src={imageSrc}
          alt={heading}
          className="max-w-xs md:max-w-sm rounded-lg shadow-lg"
        />
      </div>
    </section>
  );
}