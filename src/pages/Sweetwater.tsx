import comingsoonIcon from '../assets/comingsoonicon.svg';
import sweetwatericon from '../assets/sweetwater/sweetwatericon.svg';
import Hero from '../components/Hero';

export default function Sweetwater() {
  return (
    <>
      <Hero
        heading="Previous Employment - Sweetwater"
        description="The Sweetwater Sound app is a mobile storefront that lets musicians browse, demo-listen to, and purchase Sweetwater’s full catalog of instruments and pro-audio gear with personalized gear advice, order tracking, and tech support built in."
        imageSrc={sweetwatericon}
        buttonText="View on the App Store"
        buttonColorClass="bg-orange-500 text-white"
        buttonHref="https://apps.apple.com/us/app/sweetwater-music-audio-gear/id1448496608"
      />

      {/* Coming soon badge */}
      <div className="mt-8 flex justify-center">
        <img
          src={comingsoonIcon}
          alt="Coming Soon"
          className="w-32 md:w-40"
        />
      </div>
    </>
  );
}