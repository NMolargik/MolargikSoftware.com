// src/pages/About.tsx
import nickheadshot from '../assets/nickheadshot.svg';
import whitelogo from '../assets/whitelogo.png';
import Hero from '../components/Hero';

export default function About() {
  return (
    <>
    <Hero
      heading="Nick Molargik"
      description="Welcome to my mobile application development portfolio! I specialize in
        Swift&nbsp;/ SwiftUI, Kotlin&nbsp;/ Compose, Flutter, plus backend tech like SQL,
        .NET and Python. My passion is crafting delightful user experiences."
      imageSrc={nickheadshot}
      buttonText="Download Resume"
      buttonColorClass="bg-orange-500 text-white"
      buttonHref="/resume.pdf"
      buttonDownload
    />
    
    <Hero
      heading="Molargik Software LLC"
      description="Molargik Software LLC was founded in 2025 to accelerate my goal of delivering feature-rich mobile applications."
      imageSrc={whitelogo}
      buttonDownload
    />
    </>
  );
}