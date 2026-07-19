const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf-8');

const views = [
  'key="new-journey-page-view"',
  'key="explore-page-view"',
  'key="track-booking-page-view"',
  'key="terms-page-view"',
  'key="bespoke-page-view"'
];

views.forEach(key => {
  const replacement = `${key}\n                initial={{ opacity: 0, y: 20 }}\n                animate={{ opacity: 1, y: 0 }}\n                exit={{ opacity: 0, y: -20 }}\n                transition={{ duration: 0.6, ease: "easeInOut" }}\n                className="w-full min-h-screen bg-black flex flex-col"\n              >\n                <ScrollToOnMount y={0} />`;
  // We need a more robust replace using regex
});
