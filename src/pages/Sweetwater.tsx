import sweetwatericon from '../assets/sweetwater/sweetwatericon.svg';
import Hero from '../components/Hero';

export default function Sweetwater() {
  return (
    <Hero
      heading="Previous Employment - Sweetwater"
      description="Application development with a focus on user-facing experiences and intuitive design."
      imageSrc={sweetwatericon}
      buttonText="View on the App Store"
      buttonColorClass="bg-orange-500 text-white"
      buttonHref="https://apps.apple.com/us/app/sweetwater-music-audio-gear/id1448496608"
    />
  );
}