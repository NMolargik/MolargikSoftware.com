// Where each app's marketing assets live, relative to the Apps directory
// (sibling of the Websites directory by default; override with APPS_DIR).
//
// `screens` lists source folders in the order their screenshots should appear
// on the site. Only files directly inside each folder are used (sub-folders are
// ignored), sorted naturally (Screen2 before Screen10).
//
// Run `npm run assets` (all apps) or `npm run assets -- stork maestro`.

export const APPS_DIR_DEFAULT = '../../Apps';

/** @type {Array<{ app: string; source: string; icon: string; screens: string[] }>} */
export default [
  {
    app: 'maestro',
    source: 'Maestro',
    icon: 'AppIcon-iOS-Default-1024@1x.png',
    screens: [
      'docs/AppStore/Screenshots/macOS',
      'docs/AppStore/Screenshots/iPhone',
      'docs/AppStore/Screenshots/iPad',
    ],
  },
  {
    app: 'opalite',
    source: 'Opalite',
    icon: 'Icons/AppIcon.png',
    screens: [
      'Screenshots/Professional/iPhone',
      'Screenshots/Professional/iPad',
      'Screenshots/Professional/Vision Pro',
      'Screenshots/Professional/TV',
      'Screenshots/Professional/Watch',
    ],
  },
  {
    app: 'setdeck',
    source: 'SetDeck',
    icon: 'Icons/AppIcon.png',
    screens: [
      'Screenshots/Professional/iPhone',
      'Screenshots/Professional/iPad',
      'Screenshots/Professional/Watch',
    ],
  },
  {
    app: 'mygra',
    source: 'Mygra',
    icon: 'Icons/AppIcon.png',
    screens: [
      'Screenshots/Professional/iPhone',
      'Screenshots/Professional/iPad',
      'Screenshots/Professional/Watch',
    ],
  },
  {
    app: 'stork',
    source: 'Stork',
    icon: 'Icons/AppIcon.png',
    screens: [
      'Screenshots/Professional/iPhone',
      'Screenshots/Professional/iPad',
      'Screenshots/Professional/Watch',
    ],
  },
  {
    app: 'waffle',
    source: 'Waffle',
    icon: 'Icons/AppIcon.png',
    screens: ['Screenshots/Professional/iPad'],
  },
];
