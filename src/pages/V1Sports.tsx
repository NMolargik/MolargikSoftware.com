import v1icon from '../assets/v1sports/v1icon.svg';
import Hero from '../components/Hero';

export default function V1Sports() {
  return (
    <Hero
      heading="Employment - V1 Sports"
      description="Analyze your swing and improve with video & data."
      imageSrc={v1icon}
      buttonText="View on the App Store"
      buttonColorClass="bg-orange-500 text-white"
      buttonHref="https://apps.apple.com/us/app/v1-coach-video-analysis-app/id6476321492"
    />
  );
}