import fs from 'fs';
import path from 'path';
import initOpenCascade from 'occt-import-js';

async function convert() {
  console.log('Loading OpenCASCADE WASM...');
  const occt = await initOpenCascade();
  console.log('OpenCASCADE initialized.');

  const stepPath = path.resolve('c:/projects/cart/Shopping _Cart v1.step');
  const fileBuffer = fs.readFileSync(stepPath);
  console.log(`Read STEP file (${(fileBuffer.length / (1024 * 1024)).toFixed(2)} MB). Parsing geometry...`);

  const fileData = new Uint8Array(fileBuffer);
  const result = occt.ReadStepFile(fileData, null);

  console.log('STEP parsed successfully!');
  console.log(`Meshes count: ${result.meshes.length}`);
  
  // Log sample mesh metadata
  result.meshes.forEach((mesh, index) => {
    console.log(`Mesh ${index}: name="${mesh.name}", vertices=${mesh.attributes.position.array.length / 3}, triangles=${mesh.index.array.length / 3}`);
  });

  // Save the complete geometry JSON into public/cart-geometry.json
  const outDir = path.resolve('c:/projects/cart/public');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const jsonPath = path.join(outDir, 'cart-geometry.json');
  fs.writeFileSync(jsonPath, JSON.stringify(result));
  console.log(`Saved full CAD geometry to ${jsonPath} (${(fs.statSync(jsonPath).size / (1024 * 1024)).toFixed(2)} MB)`);
}

convert().catch(err => {
  console.error('Error during STEP conversion:', err);
});
