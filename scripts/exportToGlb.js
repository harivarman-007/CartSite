import fs from 'fs';
import path from 'path';
import * as THREE from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';

async function exportGlb() {
  const jsonPath = path.resolve('c:/projects/cart/public/cart-geometry.json');
  if (!fs.existsSync(jsonPath)) {
    console.error('cart-geometry.json not found!');
    return;
  }

  console.log('Loading parsed CAD geometry JSON...');
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

  const scene = new THREE.Group();
  scene.name = 'Shopping_Cart_CAD_Assembly';

  // Group into named component sets
  const rootGroup = new THREE.Group();
  rootGroup.name = 'Root_Assembly';

  data.meshes.forEach((meshData, index) => {
    const geometry = new THREE.BufferGeometry();
    
    // Positions
    const posArray = new Float32Array(meshData.attributes.position.array);
    geometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    // Normals
    if (meshData.attributes.normal && meshData.attributes.normal.array.length > 0) {
      const normArray = new Float32Array(meshData.attributes.normal.array);
      geometry.setAttribute('normal', new THREE.BufferAttribute(normArray, 3));
    } else {
      geometry.computeVertexNormals();
    }

    // Indices
    if (meshData.index && meshData.index.array.length > 0) {
      const indexArray = new Uint32Array(meshData.index.array);
      geometry.setIndex(new THREE.BufferAttribute(indexArray, 1));
    }

    // Assign material and name based on part characteristics
    let partName = meshData.name || `Part_${index}`;
    let materialCategory = 'frame_steel';

    if (partName.includes('Bskt') || index === 0) {
      partName = 'basket_wire';
      materialCategory = 'basket_wire';
    } else if (partName.includes('Component') || (index >= 1 && index <= 20)) {
      partName = `caster_${index}`;
      materialCategory = 'caster_chrome';
    } else if (index === 21) {
      partName = 'panel_plastic';
      materialCategory = 'panel_plastic';
    } else if (index >= 24) {
      partName = `device_housing_${index}`;
      materialCategory = 'device_housing';
    }

    const material = new THREE.MeshStandardMaterial({
      name: materialCategory,
      roughness: 0.3,
      metalness: 0.8,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = partName;
    rootGroup.add(mesh);
  });

  // Center and normalize dimensions to ~1.8m scale
  const box = new THREE.Box3().setFromObject(rootGroup);
  const size = new THREE.Vector3();
  box.getSize(size);
  const center = new THREE.Vector3();
  box.getCenter(center);

  console.log(`Original CAD Bounding Box:`, size, `Center:`, center);

  // Center the assembly at origin
  rootGroup.position.x = -center.x;
  rootGroup.position.y = -center.y;
  rootGroup.position.z = -center.z;

  // Determine uniform scale factor (CAD often in mm, e.g. 1000mm -> 1.0m)
  const maxDim = Math.max(size.x, size.y, size.z);
  let scaleFactor = 1.0;
  if (maxDim > 10) {
    scaleFactor = 1.8 / maxDim;
  }
  
  const container = new THREE.Group();
  container.add(rootGroup);
  container.scale.set(scaleFactor, scaleFactor, scaleFactor);

  // Rotate upright if CAD is Y-up or Z-up
  // STEP CAD usually exports Z-up; rotate -90 deg on X to make Y-up in Three.js
  container.rotation.x = -Math.PI / 2;

  scene.add(container);

  console.log('Exporting scene to GLB...');
  const exporter = new GLTFExporter();
  exporter.parse(
    scene,
    (gltf) => {
      const glbPath = path.resolve('c:/projects/cart/public/shopping_cart.glb');
      const buffer = Buffer.from(gltf);
      fs.writeFileSync(glbPath, buffer);
      console.log(`Successfully generated GLB: ${glbPath} (${(buffer.length / (1024 * 1024)).toFixed(2)} MB)`);
    },
    (err) => {
      console.error('Error during GLB export:', err);
    },
    { binary: true }
  );
}

exportGlb();
