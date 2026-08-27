const fs = require('fs');
let c = fs.readFileSync('src/components/Cart3D.jsx', 'utf8');

const startIdx = c.indexOf('// -- Camera Keyframes');
const endIdx   = c.indexOf('// Interpolate between');

// Clipping offset values computed from frustum math:
// negative at.x = cart clips RIGHT edge (camera looks left, cart pushed right)
// positive at.x = cart clips LEFT  edge (camera looks right, cart pushed left)
// negative at.y = cart clips TOP   edge
// positive at.y = cart clips BOTTOM edge
//
// Shot  Z     halfW  clip@0.6over
// 1     4.5   2.06   ±0.58  (moderate)
// 2     3.8   1.46   ±-0.02 (tight)
// 3     5.0   1.92   center
// 4     3.2   1.46   ±-0.02 (tight)
// 5     2.2   0.69   already clipping at 0 offset
// 6     3.5   1.73   ±0.25
// 7     1.8   0.50   extreme close-up
// 8     7.5   3.43   wide/safe

const newBlock = `// -- Camera Keyframes --------------------------------------------------------
// CINEMATIC CLIPPING FRAMING:
//   at.x negative = cart pushed RIGHT, clips right edge
//   at.x positive = cart pushed LEFT,  clips left edge
//   at.y negative = cart pushed DOWN,  clips bottom edge
//   at.y positive = cart pushed UP,    clips top edge
//
//   Values are tuned so the cart ACTUALLY crosses the screen edge.
const CAMERA_KF = [
  // Shot 1 - ENTRY RIGHT: cart enters from right, right half off-screen
  //   halfW=2.06, at.x=-1.3 puts right cart edge at 1.3+0.88=2.18 > 2.06 ✓
  { p: 0.00, pos: [ 0.5,  0.4, 4.5], at: [-1.3,  0.05, 0], fov: 26 },

  // Shot 2 - LEFT CLIP: camera swings far right, cart exits left edge
  //   halfW=1.46, at.x=+0.7 puts left cart edge at 0.7+0.88=1.58 > 1.46 ✓
  { p: 0.14, pos: [ 3.5,  0.2, 3.8], at: [ 0.7, -0.05, 0], fov: 22 },

  // Shot 3 - CENTERED BREATH: clean dead-center, full cart visible
  { p: 0.28, pos: [ 0.0,  0.0, 5.0], at: [ 0.0,  0.00, 0], fov: 22 },

  // Shot 4 - BOTTOM CLIP: low floor angle, top of cart clips top edge
  //   at.y=+1.2 → camera aimed high → cart pushes to bottom, top clips
  { p: 0.42, pos: [-2.5, -1.2, 3.2], at: [-0.3,  1.2,  0], fov: 26 },

  // Shot 5 - EXTREME CLOSE RIGHT: Z=2.2 halfW=0.69, cart fills 2.5× screen width
  //   at.x=-0.5 → cart is 0.5 right of center, right edge at 0.5+0.88=1.38 >> 0.69
  //   Only left ~30% of cart visible
  { p: 0.55, pos: [-1.5,  0.6, 2.2], at: [-0.5,  0.1,  0], fov: 18 },

  // Shot 6 - TOP CLIP: overhead dutch, cart slides upper-left, top clips
  //   at.y=-1.0 → camera aimed down → cart rises, top edge clips
  { p: 0.68, pos: [ 2.5,  3.5, 3.5], at: [-0.8, -1.0,  0], fov: 28 },

  // Shot 7 - CASTER FLOOR: Z=1.8 halfW=0.50, underground POV
  //   Entire cart is wider than screen, right-biased to show wheel detail
  { p: 0.80, pos: [ 0.8, -2.2, 1.8], at: [ 0.3,  0.8,  0], fov: 16 },

  // Shot 8 - GRAND FINALE: pull way back, full cart safe in frame
  { p: 0.95, pos: [ 0.0,  0.4, 7.5], at: [ 0.0,  0.0,  0], fov: 26 },
];

`;

c = c.slice(0, startIdx) + newBlock + c.slice(endIdx);
fs.writeFileSync('src/components/Cart3D.jsx', c, 'utf8');
console.log('Done. File:', c.length, 'bytes');
