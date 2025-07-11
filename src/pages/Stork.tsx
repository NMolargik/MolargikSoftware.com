import storkIcon from '../assets/stork/storkicon.svg';
import Hero from '../components/Hero';

import FeatureRow from '../components/FeatureRow';
import blueball from '../assets/stork/blueball.svg';
import pinkball from '../assets/stork/pinkball.svg';
import purpleball from '../assets/stork/purpleball.svg';

import jarShot from '../assets/stork/jar_screenshot.png';
import deliveryListShot from '../assets/stork/delivery_list_screenshot.png';
import hospitalListShot from '../assets/stork/hospital_list_screenshot.png';
import musterShot from '../assets/stork/muster_screenshot.png';


export default function Stork() {
  return (
    <>
      <Hero
        heading="Stork - Delivery Stats"
        description="Visual statistics for labor & delivery nurses."
        imageSrc={storkIcon}
        buttonText="View on the App Store"
        buttonColorClass="bg-orange-500 text-white"
        buttonHref="https://apps.apple.com/us/app/stork-delivery-stats/id6740038476"
      />

      {/* Feature rows */}
        <FeatureRow
          title="Marble Jar"
          description="Keep track of deliveries in the form of a monthly marble jar. Look into detailed statistics over the last 6 months."
          iconSrc={blueball}
          screenshotSrc={jarShot}
        />

        <FeatureRow
          title="Track Deliveries"
          description="Look back at previous deliveries in great detail. All of your history is available."
          iconSrc={pinkball}
          screenshotSrc={deliveryListShot}
          reverse
        />

        <FeatureRow
          title="View Hospitals"
          description="View detail-rich information about nearby hospitals, including their delivery stats."
          iconSrc={purpleball}
          screenshotSrc={hospitalListShot}
        />


        <FeatureRow
          title="Muster Up"
          description="Muster Up! Join your peers to share a marble jar, check contribution distribution, and look at combined stats."
          iconSrc={blueball}
          screenshotSrc={musterShot}
          reverse
        />
    </>
  );
}