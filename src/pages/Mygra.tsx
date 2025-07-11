import comingsoonicon from '../assets/comingsoonicon.svg';
import Hero from '../components/Hero';

export default function Mygra() {
  return (
    <Hero
      heading="Mygra"
      description="Coming soon – migraine insights and predictions powered by on‑device AI."
      imageSrc={comingsoonicon}
      // buttonText="Download Resume"
      // buttonColorClass="bg-orange-500 text-white"
      // buttonHref="/resume.pdf"
    />
  );
}