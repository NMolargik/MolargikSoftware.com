import logo from '../assets/whitelogo.png';
import resumePDF from '../assets/nickmolargikresume.pdf';

export default function HomeHero() {
  return (
    <section className="relative flex flex-col md:flex-row items-center justify-between gap-8 bg-gradient-to-b from-slate-950 to-black min-h-[40vh] w-full px-6 py-12">
      {/* Text content */}
      <div className="flex flex-col items-start max-w-lg text-left space-y-4">
        <h2 className="text-4xl font-bold text-white">
          Mobile Software Development
        </h2>
        <p className="text-gray-300">
          "Application development with a focus on user‑facing experiences and intuitive design" — Nick Molargik, Founder
        </p>

        {/* Button group */}
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href="https://github.com/NMolargik"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md bg-gray-700 px-6 py-3 text-center font-semibold text-white transition hover:bg-gray-600"
          >
            GitHub
          </a>

          <a
            href="https://linkedin.com/in/nicholas-molargik"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md bg-[#0A66C2] px-6 py-3 text-center font-semibold text-white transition hover:bg-[#085aab]"
          >
            LinkedIn
          </a>

          <a
            href={resumePDF}
            download
            className="rounded-md bg-orange-500 px-6 py-3 text-center font-semibold text-white transition hover:bg-orange-400"
          >
            Download Résumé
          </a>
        </div>
      </div>

      {/* Image */}
      <div className="hidden md:flex justify-center md:justify-end md:w-1/2">
        <img
          src={logo}
          alt="Mobile Software Development"
          className="max-w-xs md:max-w-sm rounded-lg shadow-lg"
        />
      </div>
    </section>
  );
}