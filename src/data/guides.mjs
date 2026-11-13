// Tesla light show guides (/guides and /guides/<slug>).
//
// Plain ESM so the React pages, src/seo/routes.mjs, and the post-build script
// can all read it. Every technical statement about Tesla's requirements comes
// from Tesla's official repository (github.com/teslamotors/light-show, README)
// or from the Maestro source (docs/CHANNELS.md, DriveDoctor, MultiCar). When a
// detail could not be confirmed it is left out. No prices belong in this file.
//
// Body blocks: a string is a paragraph, { ul: [...] } a bullet list, and
// { ol: [...] } a numbered list. Inline links use [label](/path) and are only
// for internal paths.

import { SITE_URL } from './catalog.mjs';

export { SITE_URL };

export const GUIDES_CHECKED = 'November 12, 2026';
export const GUIDES_CHECKED_ISO = '2026-11-12';

const NOT_AFFILIATED =
  'Maestro is an independent app from Molargik Software and is not affiliated with or endorsed by Tesla, Inc. Tesla, Model S, Model 3, Model X, Model Y, and Cybertruck are trademarks of Tesla, Inc.';

export const guides = [
  // ---------------------------------------------------------------- 1
  {
    slug: 'how-to-make-a-tesla-light-show',
    short: 'How to make a custom Tesla light show',
    title: 'How to Make a Custom Tesla Light Show (xLights or Maestro)',
    h1: 'How to make a custom Tesla light show',
    description:
      'What a Tesla light show is, the two files the car needs, and two ways to make your own: xLights by hand, or Maestro to generate one from a song. Plain steps.',
    summary: 'The two files Tesla needs, and the two main ways to make them.',
    intro: [
      'A Tesla light show is a short performance your car plays from a USB drive: the lights flash in time with music, and on some models the mirrors, windows, doors, and charge port move too. The music plays through the cabin speakers. You do not need to modify the car or install anything on it.',
      'Making one is less mysterious than it looks. The car needs two files, and there are two common ways to produce them. This guide covers both honestly, so you can pick the one that fits your patience.',
    ],
    sections: [
      {
        h2: 'The two files Tesla needs',
        body: [
          'Tesla’s own instructions describe a custom show as a pair of files. The sequence data lives in a .fseq file. The music is a separate .mp3 or .wav file, and Tesla recommends WAV.',
          'The two files must share the same name apart from the extension. For example, show1.fseq goes with show1.wav. Both go in a folder called LightShow at the top level of a USB drive. The [USB drive guide](/guides/tesla-light-show-usb-drive) covers the exact layout.',
          'A single show is not tied to one model. Tesla says a show can be shared and run on any supported vehicle.',
        ],
      },
      {
        h2: 'What you need before you start',
        body: [
          {
            ul: [
              'A supported car: Model S (2021 or later), Model 3, Model X (2021 or later), Model Y, or Cybertruck.',
              'Vehicle software v11.0 (2021.44.25) or newer.',
              'A USB drive formatted as exFAT or FAT32 (Tesla also lists ext3 and ext4; NTFS is not supported).',
              'A way to get the two files, which is what the rest of this guide is about.',
            ],
          },
        ],
      },
      {
        h2: 'Option 1: download a finished show',
        body: [
          'Tesla’s repository points to community sites that share finished shows, including XLightShows and TeslaLightShare.io, and to the r/TeslaLightShow community on Reddit. Because shows are not model-specific, a downloaded show should run on your car. This is the quickest route if you just want something playing this weekend.',
        ],
      },
      {
        h2: 'Option 2: build one by hand in xLights',
        body: [
          'xLights is free sequencing software, and Tesla publishes a ready-made project folder for it. It gives you full control over every light and closure, frame by frame. It is also a real time commitment: Tesla’s guide covers the Tesla-specific setup and then tells you to use existing online resources for the general xLights workflow.',
          'These are the setup steps from Tesla’s guide:',
          {
            ol: [
              'Download and install xLights from xlights.org.',
              'Download and unzip tesla_xlights_show_folder.zip from Tesla’s repository. Keep its folder structure as it is.',
              'In xLights, open File, Preferences, Sequences, and set FSEQ Version to V2 Uncompressed.',
              'Choose File, Select Show Folder, and pick the unzipped project folder.',
              'On the Layout tab, turn on the 3D preview. The Model S plus Cybertruck layout includes every light and closure used by supported cars.',
              'Choose File, New Sequence, Musical Sequence, then select your audio file.',
              'In the wizard, choose Custom and set the frame interval to 20 ms. Tesla accepts 15 to 100 ms but recommends 20.',
              'Select Quick Start, then build your effects on the timeline.',
            ],
          },
          'Tesla also offers a validator script that checks a sequence without a car. Run it with python3 validator.py yourshow.fseq (or python validator.py on Windows). It reports the frame count, step time, and total duration, and it flags problems.',
        ],
      },
      {
        h2: 'Option 3: generate one from a song with Maestro',
        body: [
          'Maestro is an app for iPhone, iPad, and Mac that turns any song into a Tesla light show in seconds. You drop in a song, preview the show on a model of your car, and export the .fseq and audio pair. It supports every Tesla model that supports light shows. On the Mac you can also edit the show channel by channel and use Install to USB, which checks the drive first.',
          'The trade-off is control. Maestro makes the creative choices for you, then lets you change them in the editor. If you want to place every flash yourself, xLights is the tool. If you want a good show from a song tonight, Maestro is built for that. There is a [side-by-side comparison](/guides/maestro-vs-xlights) if you are undecided.',
        ],
      },
      {
        h2: 'Put it on the drive and start it',
        body: [
          'Whichever route you took, the finish is the same. Put both files in the LightShow folder, plug the drive into a front USB port, then open Toybox, choose Light Show, and tap Schedule Show. If something does not appear, the [troubleshooting checklist](/guides/tesla-light-show-not-working) walks through the usual causes.',
        ],
      },
    ],
    steps: [
      { name: 'Get a sequence and audio pair', text: 'Download a finished show, build one in xLights, or generate one from a song with an app such as Maestro. You need a .fseq file and a .wav or .mp3 file with the same base name.' },
      { name: 'Check the audio', text: 'Use 44.1 kHz audio. Tesla says 48 kHz files will not sync properly.' },
      { name: 'Prepare a USB drive', text: 'Format the drive as exFAT or FAT32 and create a top-level folder named LightShow.' },
      { name: 'Copy both files into the LightShow folder', text: 'Keep the .fseq and audio file names identical apart from the extension.' },
      { name: 'Start the show in the car', text: 'Plug the drive into a front USB port, wait a few seconds, open Toybox, choose Light Show, then tap Schedule Show.' },
    ],
    howTo: { name: 'How to make and play a custom Tesla light show' },
    faq: [
      { q: 'Do I need xLights to make a Tesla light show?', a: 'No. xLights is one way to build the .fseq file by hand. You can also download a finished show or generate one from a song with an app such as Maestro. The car only cares that the .fseq and audio files meet Tesla’s requirements.' },
      { q: 'Will a show made for one Tesla work on another?', a: 'Tesla says a single show can be shared and run on any supported vehicle, because shows are not model-specific. Lights a given car does not have are simply skipped. See the guide on which lights each Tesla can use.' },
      { q: 'How long can a custom show be?', a: 'Tesla’s limit is 4 hours, and the old limit on the number of commands during a show has been removed. Closures such as doors and windows still have their own per-show command limits.' },
    ],
    related: ['tesla-light-show-usb-drive', 'maestro-vs-xlights', 'tesla-light-show-lights-by-model'],
  },

  // ---------------------------------------------------------------- 2
  {
    slug: 'tesla-light-show-usb-drive',
    short: 'How to set up a USB drive for a Tesla light show',
    title: 'How to Set Up a USB Drive for a Tesla Light Show',
    h1: 'How to set up a USB drive for a Tesla light show',
    description:
      'Format, folder name, file names, audio format and sample rate, which port to use, and how to start the show from the screen. Plus why the car may not see your show.',
    summary: 'Format, folder, file names, audio, ports, and starting the show.',
    intro: [
      'Most light shows that fail to appear in the car fail because of the drive, not the show. The rules are short, and they are strict. This guide gives you the layout Tesla expects, step by step.',
    ],
    sections: [
      {
        h2: 'Step 1: format the drive',
        body: [
          'Tesla accepts these formats: exFAT, FAT32 (called MS-DOS FAT in Mac Disk Utility), ext3, and ext4. NTFS is not supported. For most people that means exFAT or FAT32.',
          'Formatting erases everything on the drive, so copy off anything you want to keep first. Do not format a drive you also use for something important.',
        ],
      },
      {
        h2: 'Step 2: create the LightShow folder',
        body: [
          'Create a folder named LightShow at the top level of the drive. Tesla specifies the name exactly, with a capital L and a capital S, and says it is case sensitive. Lightshow and lightshow will not work.',
          'The files go inside the folder, not loose on the drive.',
        ],
      },
      {
        h2: 'Step 3: add the two files',
        body: [
          'The LightShow folder needs at least two files: a show .fseq file and a show .mp3 or .wav file. Tesla recommends WAV.',
          'The names must match. If the sequence is show1.fseq, the audio must be show1.wav or show1.mp3. Match the capitalization too. Maestro’s drive check treats a name that differs only by capitalization as a problem.',
          'You can keep several shows on one drive, for example show1.fseq with show1.wav and show2.fseq with show2.mp3. Tesla says multiple shows per drive need vehicle software 2023.44.25 or newer.',
          'Keep file names simple. Maestro’s drive check recommends plain letters, numbers, spaces, dashes, and underscores, because they survive every USB filesystem and the car’s file picker. This is a safe habit rather than a rule Tesla publishes.',
        ],
      },
      {
        h2: 'Audio format and sample rate',
        body: [
          'Use MP3 or WAV, encoded at 44.1 kHz. Tesla warns that less common 48 kHz files will not sync properly with the lights. If your audio came from a video or a studio export, check its sample rate before copying it over.',
          'Maestro writes its audio as a 44.1 kHz 16-bit WAV, so exports from the app already meet the rate.',
        ],
      },
      {
        h2: 'Keep the drive clean',
        body: [
          'Tesla says the drive must not contain a top-level TeslaCam folder, and must not contain map update or firmware update files. If you use the same drive for dashcam or Sentry recordings, use a second drive for light shows.',
        ],
      },
      {
        h2: 'Step 4: plug it in and start the show',
        body: [
          {
            ol: [
              'Insert the drive into one of the front USB or USB-C ports, or the glovebox USB port, then wait a few seconds.',
              'On the touchscreen, open Toybox and select Light Show.',
              'Tap Schedule Show. If the drive meets the requirements, your shows appear in the drop-down menu.',
              'Pick the show and start it.',
            ],
          },
        ],
      },
      {
        h2: 'How to tell if the car accepted the drive',
        body: [
          'Look at the title of the popup. If it says Custom Light Show, the car found valid files. If it says only Light Show, the drive formatting, the folder, or the files do not meet the requirements. Tesla also says the car shows an error message when the right files exist but there is a problem with the sequence file.',
          'If the title says Light Show, work through the [troubleshooting checklist](/guides/tesla-light-show-not-working).',
        ],
      },
      {
        h2: 'Common reasons the car does not see the show',
        body: [
          {
            ul: [
              'The drive is formatted as NTFS.',
              'The folder is named Lightshow, lightshow, or anything other than LightShow.',
              'The files are in the root of the drive instead of inside LightShow.',
              'The .fseq and audio file names do not match.',
              'The audio is 48 kHz.',
              'A TeslaCam folder, or map or firmware update files, are on the same drive.',
              'More than one show is on the drive, but the car software is older than 2023.44.25.',
            ],
          },
          'Maestro on the Mac has an Install to USB sheet that checks for each of these and writes the files with the right layout. It is one convenient option, and the steps above work without it.',
        ],
      },
    ],
    steps: [
      { name: 'Format the drive', text: 'Format the USB drive as exFAT or FAT32. NTFS is not supported by Tesla.' },
      { name: 'Create the LightShow folder', text: 'Create a top-level folder named LightShow, with a capital L and capital S. The name is case sensitive.' },
      { name: 'Copy the show files into it', text: 'Add a .fseq file and a .wav or .mp3 file with the same base name. Use 44.1 kHz audio.' },
      { name: 'Keep the drive clean', text: 'Make sure there is no TeslaCam folder and no map or firmware update files at the top level of the drive.' },
      { name: 'Plug into a front USB port', text: 'Use a front USB or USB-C port or the glovebox USB port, then wait a few seconds.' },
      { name: 'Start the show', text: 'Open Toybox, select Light Show, tap Schedule Show, choose your show from the drop-down, and start it.' },
    ],
    howTo: { name: 'How to set up a USB drive for a Tesla light show' },
    faq: [
      { q: 'What is the exact folder name?', a: 'LightShow, with a capital L and a capital S, at the top level of the drive. Tesla says the name is case sensitive.' },
      { q: 'Can I use an MP3 instead of a WAV?', a: 'Yes. Tesla accepts both and recommends WAV. Either way the audio should be encoded at 44.1 kHz.' },
      { q: 'Can I use my dashcam drive?', a: 'Not if it has a top-level TeslaCam folder. Tesla says the drive must not contain one. Use a separate drive for light shows.' },
    ],
    related: ['tesla-light-show-not-working', 'how-to-make-a-tesla-light-show', 'tesla-light-show-multiple-cars'],
  },

  // ---------------------------------------------------------------- 3
  {
    slug: 'tesla-light-show-not-working',
    short: 'Tesla light show not working: a troubleshooting checklist',
    title: 'Tesla Light Show Not Working? A Troubleshooting Checklist',
    h1: 'Tesla light show not working: a troubleshooting checklist',
    description:
      'The car does not list your show, the audio is out of sync, or the show stops partway. Work through this checklist in order, based on Tesla’s own requirements.',
    summary: 'Work down the list: the popup title, the drive, the files, the audio.',
    intro: [
      'When a custom light show does not work, the cause is almost always one of a handful of things. Work through this list from the top. It is ordered so the quickest checks come first.',
    ],
    sections: [
      {
        h2: 'Start here: read the popup title',
        body: [
          'Plug the drive in, wait a few seconds, then open Toybox, Light Show, Schedule Show. Tesla says that if the popup title is Light Show instead of Custom Light Show, the requirements are not being met for the drive formatting, the folder, or the files.',
          'Tesla also says error messages appear when the required files exist but there is a problem with the sequence file. If you see an error, read it. It is pointing at the .fseq.',
        ],
      },
      {
        h2: 'The car does not list my show',
        body: [
          {
            ol: [
              'Check the car. Supported vehicles are Model S (2021 or later), Model 3, Model X (2021 or later), Model Y, and Cybertruck, on software v11.0 (2021.44.25) or newer.',
              'Check the format. exFAT, FAT32, ext3, and ext4 work. NTFS does not.',
              'Check the folder name. It must be LightShow at the top level, with a capital L and a capital S.',
              'Check that the files are inside that folder, not beside it.',
              'Check that the .fseq file and the audio file have the same name apart from the extension, including capitalization.',
              'Look for a TeslaCam folder, or map or firmware update files, at the top level. Tesla says the drive must not contain them.',
              'Plugged into the right place? Use a front USB or USB-C port or the glovebox port, and give the car a few seconds.',
              'Several shows on one drive need vehicle software 2023.44.25 or newer.',
            ],
          },
          'If you copied files from a Mac, hidden files beginning with ._ may appear next to your show files. Tesla does not list them as a cause, but they serve no purpose on the drive, and Maestro removes the ones it creates.',
        ],
      },
      {
        h2: 'The audio is out of sync with the lights',
        body: [
          'Check the sample rate. Tesla says audio must be encoded at 44.1 kHz, and that less common 48 kHz files will not sync properly. Re-export the audio at 44.1 kHz and keep the same name as the .fseq.',
          'If you built the show in xLights, confirm FSEQ Version is set to V2 Uncompressed in File, Preferences, Sequences, as Tesla instructs.',
        ],
      },
      {
        h2: 'The car shows an error about the sequence',
        body: [
          'Run Tesla’s validator on the .fseq without a car. Tesla provides validator.py, plus validator-windows.exe and a macOS build for people without Python. The command is python3 validator.py yourshow.fseq on macOS, or python validator.py on other systems. It prints the frame count, step time, and total duration, and reports problems it finds.',
        ],
      },
      {
        h2: 'Closures misbehave, or the show stops partway',
        body: [
          {
            ul: [
              'Closures such as doors, windows, mirrors, and the charge port have command limits per show, and only Open, Close, and Dance count toward them. Tesla says commands spaced very close together cause little visible movement and use up the limits quickly.',
              'Closures can only dance for a limited time before reaching thermal limits. If that happens, the closure stops moving until it cools down. Tesla recommends dancing for about 30 seconds or less per show.',
              'Tesla notes that moving the windows while Model X doors are moving can cause false pinch detections, which stop the light show.',
              'The charge port door closes automatically 2 minutes after it opens, whatever the show says.',
            ],
          },
        ],
      },
      {
        h2: 'Some lights never turn on',
        body: [
          'Not every car has every light. Tesla lists several cases: front fog lights are not installed on the Model 3 Standard Range Plus, aux park lights are not installed on that car either, and side markers are only installed in North America. Tesla also says a car without a given light does not substitute another light for it.',
          'The [guide to which lights each Tesla can use](/guides/tesla-light-show-lights-by-model) goes through each model.',
        ],
      },
      {
        h2: 'Still stuck',
        body: [
          'Try the drive in a second front port or the glovebox port, and try a different drive if you have one. Tesla points to r/TeslaLightShow on Reddit as a community for light show questions. If you use Maestro and have a problem, the developer replies to email at the address on the [support page](/support).',
        ],
      },
    ],
    faq: [
      { q: 'Why does the popup say Light Show instead of Custom Light Show?', a: 'Tesla says this means the drive does not meet the requirements for formatting, the LightShow folder, or the required files. Check the format, the folder name and capitalization, the file names, and that no TeslaCam folder is on the drive.' },
      { q: 'Why is my music out of sync?', a: 'The usual cause is 48 kHz audio. Tesla says audio should be encoded at 44.1 kHz, and that 48 kHz files will not sync properly.' },
      { q: 'Can I test a show without the car?', a: 'You can check the sequence file with Tesla’s validator.py script, which reports problems without needing a vehicle. It does not check your USB drive layout.' },
    ],
    related: ['tesla-light-show-usb-drive', 'tesla-light-show-lights-by-model', 'how-to-make-a-tesla-light-show'],
  },

  // ---------------------------------------------------------------- 4
  {
    slug: 'tesla-light-show-lights-by-model',
    short: 'Which lights each Tesla can use in a light show',
    title: 'Which Lights Can Each Tesla Use in a Light Show?',
    h1: 'Which lights can each Tesla use in a light show?',
    description:
      'Model S, Model 3, Model X, Model Y, and Cybertruck compared: ramping and on-off lights, Cybertruck light bars, closures, and how newer and older bodies differ.',
    summary: 'Ramping, on-off, light bars, and closures on every supported Tesla.',
    intro: [
      'A single light show can run on any supported Tesla. Tesla designed it that way: the sequence addresses a superset of lights, and each car plays the ones it has. This guide explains what that means for each model.',
    ],
    sections: [
      {
        h2: 'Which cars support light shows',
        body: [
          'Tesla lists Model S (2021 or later), Model 3, Model X (2021 or later), Model Y, and Cybertruck, running software v11.0 (2021.44.25) or newer.',
        ],
      },
      {
        h2: 'Two kinds of light: on-off and ramping',
        body: [
          'Most lights are boolean: they turn fully on or fully off, instantly. Some lights can ramp, meaning they fade on or off over 500, 1000, or 2000 ms. Cybertruck has a few lights with full brightness control.',
          'Tesla’s table of how each light behaves:',
          {
            ul: [
              'Outer main beam: ramping on LED reflector headlights, boolean on LED projector headlights (Model S, X, 3, Y). Ramping on Cybertruck.',
              'Inner main beam: ramping on all five.',
              'Signature: boolean on Model S and X, ramping on Model 3 and Y, not present on Cybertruck.',
              'Channels 4 to 6: ramping on Model S, X, 3, and Y. Not present on Cybertruck.',
              'Front turn: boolean on Model S and X, ramping on Model 3, Y, and Cybertruck.',
              'Front side markers: boolean on Model S, X, 3, and Y, ramping on Cybertruck.',
              'Brake light and rear turn: boolean on Model S, X, 3, and Y, full brightness control on Cybertruck.',
            ],
          },
        ],
      },
      {
        h2: 'Model S and Model X',
        body: [
          'On both, channels 4 to 6 can be switched on and off individually, but they share one ramp duration, set by channel 4. On the Model S, the side markers and aux park lights work together but keep independent left and right control.',
          'Closures: both can use liftgate, mirrors, charge port, and windows. Model S can also use door handles. Model X can use front doors and falcon doors, and the falcon doors can dance.',
        ],
      },
      {
        h2: 'Model 3 and Model Y',
        body: [
          'Channels 4 to 6 are combined into a single output, so the light is on if any of the three is on, and channel 4 sets the ramp duration. For a visible flash, all three need blank time between pulses. Side markers and aux park lights all operate together.',
          'Tesla notes these details for specific builds. Front fog lights are not installed on the Model 3 Standard Range Plus, nor are aux park lights. On Model 3 built before October 2020, the left tail, right tail, and license plate lights operate together. Liftgate movement works only on vehicles with a power liftgate.',
        ],
      },
      {
        h2: 'How refresh generations differ',
        body: [
          'Tesla’s published guide groups the Model 3 and Model Y together and does not describe the newer Model 3 or Model Y bodies separately. Maestro’s developer measured one 2026 Model Y Premium by firing each channel alone and recording what the car did. That is a single car, not a Tesla statement, but it is worth knowing:',
          {
            ul: [
              'The signature, front fog, aux park, and side marker channels produced no light.',
              'Channels 4 and 6 drove sections of the front light bar, and channel 5 drove amber headlamp elements.',
              'The side repeater, rear turn, and reverse channels responded as on-off lights.',
            ],
          },
          'The practical lesson: a show tuned for older bodies may look different on a newer car, and one that leans on a single light may go dark on a car without it. Beat-synced effects are safest on lights every car has.',
        ],
      },
      {
        h2: 'Cybertruck',
        body: [
          'Cybertruck has the most lighting control. Its front light bar has 60 individually controllable LEDs and its rear bar has 52, and these, along with the brake lights and rear turn signals, can run at any brightness you choose. An off-road light bar is an optional upgrade that most trucks will not have. Bed lights always ramp over 500 ms, even when commanded instantly.',
          'Older shows are remapped to suit the truck. Per Tesla, reverse lights follow the left and right tail lights, and the rear side markers follow the side repeaters. All five cars can move the mirrors, charge port, and windows. On Cybertruck, the liftgate channel moves the frunk.',
        ],
      },
      {
        h2: 'Tips for shows that work everywhere',
        body: [
          'Tesla advises using lights installed on all vehicles for effects synced to the beat, and leaving shared blank time on every channel of a combined group so the light visibly flashes. Tesla also recommends avoiding closing the windows during a show so the music stays more audible, since the music plays through the cabin speakers only.',
          'Maestro is built around this idea. Its preview plays a show on each supported body style. If you plan to make shows by hand instead, the [overview guide](/guides/how-to-make-a-tesla-light-show) covers xLights.',
        ],
      },
    ],
    faq: [
      { q: 'Can I run the same show on a Model 3 and a Cybertruck?', a: 'Yes. Tesla says shows are not model-specific. Each car plays the lights it has, and some effects, such as Cybertruck light bar animations, only appear on trucks.' },
      { q: 'Which lights do all Teslas have?', a: 'Tesla advises using lights installed on all vehicles for beat-synced effects, and notes that front fog, aux park, side markers, and rear fog lights vary by model, trim, and region.' },
      { q: 'Does a 2021 or later Model S or X matter?', a: 'Yes. Tesla lists Model S and Model X from 2021 onward as supported, on software v11.0 (2021.44.25) or newer.' },
    ],
    related: ['how-to-make-a-tesla-light-show', 'tesla-light-show-multiple-cars', 'tesla-light-show-not-working'],
  },

  // ---------------------------------------------------------------- 5
  {
    slug: 'tesla-light-show-multiple-cars',
    short: 'Running one light show on several Teslas at once',
    title: 'Run One Light Show on Several Teslas at Once',
    h1: 'Running one light show on several Teslas at once',
    description:
      'How to play the same Tesla light show on more than one car: one drive per car, starting together, and how Maestro’s multi-car export builds a folder for each car.',
    summary: 'One drive per car, starting together, and Maestro’s multi-car export.',
    intro: [
      'A row of Teslas playing the same show is a crowd pleaser. The idea is simple, and the practical details are about drives and timing. This guide covers both, with and without Maestro.',
    ],
    sections: [
      {
        h2: 'The basic idea: one drive per car',
        body: [
          'Every car reads its own USB drive. So for three cars you need three drives, each with its own LightShow folder containing a .fseq and audio pair. Set each drive up the way the [USB drive guide](/guides/tesla-light-show-usb-drive) describes: exFAT or FAT32, a top-level LightShow folder, matching file names, 44.1 kHz audio.',
          'Tesla says a show is not model-specific, so you can copy the same two files onto every drive and run them on a Model Y, a Model 3, and a Cybertruck. Each car plays the lights it has. The [lights by model guide](/guides/tesla-light-show-lights-by-model) explains the differences.',
        ],
      },
      {
        h2: 'How to start the cars together',
        body: [
          'On each car, plug in the drive, wait a few seconds, then open Toybox, Light Show, and Schedule Show, and select the show. Then start them at the same moment.',
          'Tesla’s published light show guide does not describe a synchronized start, so treat this as manual. Agree on a cue, such as a count from three, and have someone at each car. Starting by hand will not be perfect to the frame, so a small offset between cars is normal.',
          'Each car plays its audio through its own cabin speakers, so identical files on every car will sound slightly out of step if the start times differ.',
        ],
      },
      {
        h2: 'Why the same show on every car can look flat',
        body: [
          'If every car plays an identical show, you get unison, which is striking but never changes. Some people prefer a show where the cars take turns, with the cars answering each other. That needs a different file for each car, which is hard to build by hand.',
        ],
      },
      {
        h2: 'Maestro’s multi-car export',
        body: [
          'On the Mac, Maestro has an Export for Multiple Cars option. You choose from 2 to 8 vehicles, pick each model, and Maestro writes one folder per car, named by position, for example Car1_ModelY_Left, with a LightShow folder inside each. It offers two modes:',
          {
            ul: [
              'Sync: every car plays the whole show, tailored to its model.',
              'Duet: call and response. The cars take turns, with the neighbouring car answering, while the big moments, such as drops and the final ring-out, play on every car together.',
            ],
          },
          'Channels a particular car cannot answer are removed from its file. Closures such as doors and liftgates are never split between cars, so a door that opens in one car’s file also closes in it.',
          'You then copy each car’s LightShow folder to its own USB drive. Maestro’s drive check can inspect each one. Then start the show on every car at the same time, as above.',
        ],
      },
      {
        h2: 'Planning the row',
        body: [
          'Decide the order before you export, because the folders are named by position. For two cars Maestro uses Left and Right, for three it adds Center, and for four and five it adds Far Left and Far Right. Beyond five the positions are numbered slots.',
          'Mixed rows work. If one car is a Cybertruck and the others are Model Ys, tell Maestro, and each car’s file is tailored to what that car can do. Each row also has an Older body switch for Model 3 and Model Y cars from before the refreshes, because their lights respond differently.',
          'Keep the drives and the folders tidy. Copy only one car’s LightShow folder onto each drive, and keep the name LightShow, since the car looks for exactly that.',
        ],
      },
      {
        h2: 'A short checklist for the day',
        body: [
          {
            ol: [
              'Label each drive with its car.',
              'Test each drive in its car beforehand. The popup should say Custom Light Show.',
              'Leave time for the cars to read the drives after you plug them in.',
              'Pick the show on every car, then start together on your cue.',
            ],
          },
        ],
      },
    ],
    faq: [
      { q: 'Can one USB drive run two cars?', a: 'No. Each car reads its own drive, so each car needs a drive with a LightShow folder. Copy the same files to each if you want identical shows.' },
      { q: 'Do all cars have to be the same model?', a: 'No. Tesla says shows are not model-specific. A mixed row works, and each car plays the lights it has.' },
      { q: 'Is the multi-car export on iPhone?', a: 'Multi-car export is a Mac feature in Maestro.' },
    ],
    related: ['tesla-light-show-usb-drive', 'tesla-light-show-lights-by-model', 'maestro-vs-xlights'],
  },

  // ---------------------------------------------------------------- 6
  {
    slug: 'maestro-vs-xlights',
    short: 'Maestro vs xLights for Tesla light shows',
    title: 'Maestro vs xLights for Tesla Light Shows: Which Should You Use?',
    h1: 'Maestro vs xLights for Tesla light shows',
    description:
      'A fair comparison of xLights and Maestro for making Tesla light shows: cost, control, speed, platforms, and who should use which. Both produce files the car plays.',
    summary: 'A fair comparison, and who should use which.',
    intro: [
      'There are two main ways to make a custom Tesla light show: sequence it yourself in xLights, or generate it from a song with Maestro. Maestro is made by Molargik Software, the publisher of this site, so weigh this accordingly. This comparison tries to be fair, because each tool is the better choice for some people.',
      'Both produce the same thing: a .fseq file and an audio file that you put in a LightShow folder on a USB drive. The car does not know or care which tool made them.',
    ],
    sections: [
      {
        h2: 'xLights',
        body: [
          'xLights is free sequencing software, and Tesla publishes a project folder that sets it up for Tesla vehicles. It includes a 3D preview, example sequences, and a layout covering every light and closure on every supported car.',
          'Strengths:',
          {
            ul: [
              'Free, and it is the tool Tesla’s own instructions are written for.',
              'Total control. You place every effect on every channel, down to individual LEDs on the Cybertruck light bars.',
              'Large community. Tesla links to shows and communities, and plenty of general xLights tutorials exist.',
            ],
          },
          'Costs:',
          {
            ul: [
              'It is manual. Tesla’s guide covers the Tesla-specific setup and then points you to online resources for the general sequencing workflow. Expect a learning curve.',
              'A good show takes time, because you build it effect by effect.',
              'You manage the details yourself: FSEQ version, frame interval, audio sample rate, and the closure command limits.',
            ],
          },
        ],
      },
      {
        h2: 'Maestro',
        body: [
          'Maestro is an app for iPhone, iPad, and Mac. You give it a song and it writes a complete show in seconds by analyzing the music on your device. It supports every Tesla model that supports light shows, and it is free to try, with a one-time unlock and no subscription or account.',
          'Strengths:',
          {
            ul: [
              'Fast. A finished show from any song, without learning a sequencer.',
              'It follows Tesla’s published rules for you, including 44.1 kHz audio, and it validates the sequence.',
              'On the Mac, Install to USB checks the drive and writes the correct folder layout, and Export for Multiple Cars builds a show for each car in a row.',
              'You can edit what it makes. The Mac version has a channel-level editor, and you can reroll a take you do not like.',
            ],
          },
          'Costs:',
          {
            ul: [
              'Less control than a manual sequencer. Maestro makes the creative choices first, and you adjust afterward.',
              'It runs on Apple devices only.',
              'It is paid beyond the free trial. Check the App Store page for current terms.',
            ],
          },
        ],
      },
      {
        h2: 'Side by side',
        body: [
          {
            ul: [
              'Cost: xLights is free. Maestro is free to try, with a one-time unlock.',
              'Time to a first show: Maestro takes seconds from a song. xLights takes as long as you spend sequencing.',
              'Control: xLights gives you every channel. Maestro gives you a finished show you can edit.',
              'Platforms: Maestro runs on iPhone, iPad, and Mac. For xLights, see xlights.org.',
              'Output: both make a .fseq and audio pair for the LightShow folder.',
              'Multi-car: xLights needs a separate file per car, made by hand. Maestro’s Mac export builds one per car.',
            ],
          },
        ],
      },
      {
        h2: 'Who should use which',
        body: [
          'Use xLights if you enjoy detailed sequencing, want to design every moment yourself, or already know it. It costs nothing but time, and the control is unmatched.',
          'Use Maestro if you want a good show from a song without learning a sequencer, you have several songs to do before the holidays, or you want to light up a row of cars.',
          'Use both if you like. Because the output files are the same kind, nothing stops you from generating a show with Maestro and comparing it with one you built by hand. Start with the [overview guide](/guides/how-to-make-a-tesla-light-show) for the full process, and the [USB drive guide](/guides/tesla-light-show-usb-drive) for the finish.',
        ],
      },
    ],
    faq: [
      { q: 'Is xLights free?', a: 'Yes. xLights is free sequencing software, and Tesla’s light show instructions use it. You download it from xlights.org.' },
      { q: 'Is Maestro made by Tesla?', a: 'No. Maestro is an independent app and is not affiliated with or endorsed by Tesla, Inc.' },
      { q: 'Can I use both?', a: 'Yes. Both tools produce a .fseq and audio pair that the car reads from a LightShow folder, so you can mix shows from either on the same drive.' },
    ],
    related: ['how-to-make-a-tesla-light-show', 'tesla-light-show-usb-drive', 'tesla-light-show-multiple-cars'],
  },
];

export const guideNotice = NOT_AFFILIATED;

/** @param {string} slug */
export function findGuide(slug) {
  return guides.find((g) => g.slug === slug);
}

export const guidePath = (slug) => `/guides/${slug}`;
export const guideChannel = (slug) => `guide_${slug}`;

const plain = (s) => s.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1');

/** schema.org JSON-LD objects for a guide: Article, FAQPage, and HowTo where honest. */
export function guideJsonLd(guide) {
  const url = `${SITE_URL}${guidePath(guide.slug)}`;
  const out = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: guide.h1,
      description: guide.description,
      url,
      mainEntityOfPage: url,
      dateModified: GUIDES_CHECKED_ISO,
      inLanguage: 'en',
      author: { '@type': 'Organization', name: 'Molargik Software', url: SITE_URL },
      publisher: { '@type': 'Organization', name: 'Molargik Software', url: SITE_URL },
    },
  ];
  if (guide.howTo && guide.steps?.length) {
    out.push({
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: guide.howTo.name,
      description: guide.description,
      step: guide.steps.map((s, i) => ({
        '@type': 'HowToStep',
        position: i + 1,
        name: s.name,
        text: s.text,
      })),
    });
  }
  if (guide.faq?.length) {
    out.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: guide.faq.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: plain(f.a) },
      })),
    });
  }
  return out;
}
