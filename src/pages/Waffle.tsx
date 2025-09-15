import waffleicon from '../assets/waffle/waffleicon.png';
import Hero from '../components/Hero';

import FeatureRow from '../components/FeatureRow';

import bigGridShot from '../assets/waffle/bigGridShot.png';
import fullScreenShot from '../assets/waffle/fullScreenShot.png';
import gridShot from '../assets/waffle/gridShot.png';
import menuShot from '../assets/waffle/menuShot.png';
import popOutShot from '../assets/waffle/popOutShot.png';

export default function Waffle() {
  return (
    <>
      <Hero
        heading="Waffle"
        description="Webpage multitasking made easy on iPad."
        imageSrc={waffleicon}
        buttonText="View on the App Store"
        buttonColorClass="bg-orange-500 text-white"
        buttonHref="https://apps.apple.com/us/app/waffle-browser/id6751783473"
      />

      {/* Feature rows */}
      <FeatureRow
        title="Interactive Webpage Grids"
        description="Easily create and manage grids of webpages, allowing you to view multiple sites simultaneously."
        iconSrc={null}
        screenshotSrc={gridShot}
      />

      <FeatureRow
        title="New iPad Windowing Features"
        description="PopOut webpages to take full advantage of iPadOS 26's new windowing features."
        iconSrc={null}
        screenshotSrc={popOutShot}
        reverse
      />

      <FeatureRow
        title="FullScreen Mode"
        description="Need to focus? Place a cell into fullscreen mode to eliminate distractions."
        iconSrc={null}
        screenshotSrc={fullScreenShot}
      />

      <FeatureRow
        title="Preset Waffles"
        description="Got a favorite waffle setup? Save it as a preset for immediate access later."
        iconSrc={null}
        screenshotSrc={menuShot}
        reverse
      />

        <FeatureRow
        title="Up to 4x4 Grids"
        description="Create grids with up to 16 webpages, perfect for research, comparison shopping, stock trading, and more."
        iconSrc={null}
        screenshotSrc={bigGridShot}
      />
    </>
  );
}