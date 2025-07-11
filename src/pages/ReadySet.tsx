import readyseticon from '../assets/readyset/readyseticon.svg';
import Hero from '../components/Hero';

import FeatureRow from '../components/FeatureRow';
import dumbbellIcon from '../assets/readyset/dumbbell.svg';
import dropletIcon from '../assets/readyset/droplet.svg';
import flameIcon from '../assets/readyset/flame.svg';

import exerciseShot from '../assets/readyset/exercise_screenshot.png';
import waterShot from '../assets/readyset/water_screenshot.png';
import energyShot from '../assets/readyset/energy_screenshot.png';

export default function ReadySet() {
  return (
    <>
      <Hero
        heading="Ready, Set"
        description="A fitness metric companion to track & smash personal goals."
        imageSrc={readyseticon}
        buttonText="View on the App Store"
        buttonColorClass="bg-orange-500 text-white"
        buttonHref="https://apps.apple.com/us/app/ready-set/id6484503374"
      />

      {/* Feature rows */}
      <FeatureRow
        title="Track Exercises"
        description="List out your daily exercises with sets, reps, and weight. Update sets and challenge yourself to beat your previous PR."
        iconSrc={dumbbellIcon}
        screenshotSrc={exerciseShot}
      />

      <FeatureRow
        title="Stay Hydrated"
        description="Swipe to log water consumed and view hydration trends over the last 7 days to keep yourself on track."
        iconSrc={dropletIcon}
        screenshotSrc={waterShot}
        reverse
      />

      <FeatureRow
        title="Monitor Energy"
        description="Track calorie intake and energy burned to ensure you’re meeting your daily goals."
        iconSrc={flameIcon}
        screenshotSrc={energyShot}
      />
    </>
  );
}