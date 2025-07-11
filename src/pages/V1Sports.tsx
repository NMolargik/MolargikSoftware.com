import v1icon from '../assets/v1sports/v1icon.svg';
import comingsoonIcon from '../assets/comingsoonicon.svg';
import Hero from '../components/Hero';

export default function V1Sports() {
  return (
    <>
    <Hero
      heading="Employment - V1 Sports"
      description="Pair with a coach or athlete, analyze your swing, and improve with video & data."
      imageSrc={v1icon}
      buttonText="View on the App Store"
      buttonColorClass="bg-orange-500 text-white"
      buttonHref="https://apps.apple.com/us/app/v1-coach-video-analysis-app/id6476321492"
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