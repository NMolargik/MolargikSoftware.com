import mygraicon from '../assets/mygra/mygraicon.png';
import Hero from '../components/Hero';

import FeatureRow from '../components/FeatureRow';

import insightsShot from '../assets/mygra/insightsShot.png';
import entryShot from '../assets/mygra/entryShot.png';
import quickBitsShot from '../assets/mygra/quickBitsShot.png';

export default function Mygra() {
  return (
    <>
      <Hero
        heading="Mygra"
        description="Migraines logged, intelligent insights generated!"
        imageSrc={mygraicon}
        buttonText="View on the App Store"
        buttonColorClass="bg-orange-500 text-white"
        buttonHref="https://apps.apple.com/us/app/mygra/id6747298583"
      />

      {/* Feature rows */}
      <FeatureRow
        title="Your Migraine Dashboard"
        description="See local weather, log consumption, and view intelligent Quick Bits related to your migraine triggers."
        iconSrc={null}
        screenshotSrc={insightsShot}
      />

      <FeatureRow
        title="Log Migraine Entries"
        description="Keep track of your migraines in great detail, including weather conditions, metrics from Apple Health, and potential triggers."
        iconSrc={null}
        screenshotSrc={entryShot}
        reverse
      />

      <FeatureRow
        title="Address your Quick Bits"
        description="Quick Bits are intelligent insights generated from your migraine history. They help you identify and address potential triggers."
        iconSrc={null}
        screenshotSrc={quickBitsShot}
      />
    </>
  );
}