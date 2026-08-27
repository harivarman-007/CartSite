const fs = require('fs');
let c = fs.readFileSync('src/components/Cart3D.jsx', 'utf8');

// colorway prop default: cream → light, cobalt → dark
c = c.replace(/colorway = "cream"/g, 'colorway = "light"');
c = c.replace(/colorway === "cobalt"/g, 'colorway === "dark"');

// isCobalt → isDark
c = c.replace(/const isCobalt\s+=\s+colorway === "dark";/g, 'const isDark = colorway === "dark";');
c = c.replace(/isCobalt/g, 'isDark');

// Material palette: ocean-breeze colors
c = c.replace(
  'mk(isDark ? "#C8D4E8" : "#6B6862", 0.94, 0.24)',
  'mk(isDark ? "#8A9AB8" : "#6B7280", 0.94, 0.24)'
);
c = c.replace(
  'mk(isDark ? "#E8ECF4" : "#B8B4AE", 0.55, 0.48)',
  'mk(isDark ? "#C8D4E8" : "#B0B8C8", 0.55, 0.48)'
);
c = c.replace(
  'mk(isDark ? "#D0D8E8" : "#A0A09A", 0.96, 0.18)',
  'mk(isDark ? "#C0CCDC" : "#9AA0AC", 0.96, 0.18)'
);
c = c.replace(
  'mk(isDark ? "#C0CAD8" : "#888882", 0.88, 0.28)',
  'mk(isDark ? "#A8B4C8" : "#828A98", 0.88, 0.28)'
);
c = c.replace(
  'mk(isDark ? "#D8E0EC" : "#9A9690", 0.82, 0.32)',
  'mk(isDark ? "#B0BCD0" : "#90969C", 0.82, 0.32)'
);
c = c.replace(
  'mk(isDark ? "#B8C4D8" : "#787470", 0.90, 0.20)',
  'mk(isDark ? "#98A8BC" : "#70787C", 0.90, 0.20)'
);

// Highlight: sage green instead of cobalt blue
c = c.replace(
  'color: "#3B60C5", emissive: "#3B60C5", emissiveIntensity: 1.2,',
  'color: "#4CAF7A", emissive: "#3FA068", emissiveIntensity: 0.9,'
);

// dim_line
c = c.replace(
  'color: isDark ? "#FDF2DE" : "#3B60C5"',
  'color: isDark ? "#CACFE0" : "#4CAF7A"'
);

// ContactShadows
c = c.replace(
  'color={colorway === "dark" ? "#000000" : "#221F1A"}',
  'color={colorway === "dark" ? "#060810" : "#2A2D3E"}'
);

// Ambient/directional light intensity kept (already uses colorway === "dark")
fs.writeFileSync('src/components/Cart3D.jsx', c, 'utf8');
console.log('Cart3D.jsx patched. Length:', c.length);
