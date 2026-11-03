// ============================================================
// SPACE EXPLORER — PROCEDURAL CELESTIAL TEXTURE GENERATOR
// Produces high-fidelity planetary surface, cloud & ring maps
// ============================================================

import * as THREE from 'three';

const textureCache = new Map<string, THREE.CanvasTexture>();

// Simplex/Perlin-inspired smooth procedural noise
function pseudoNoise(x: number, y: number, seed: number = 0): number {
  const n = Math.sin(x * 12.9898 + y * 78.233 + seed) * 43758.5453;
  return n - Math.floor(n);
}

function smoothNoise(x: number, y: number, seed: number = 0): number {
  const i = Math.floor(x);
  const j = Math.floor(y);
  const fx = x - i;
  const fy = y - j;
  const sx = fx * fx * (3 - 2 * fx);
  const sy = fy * fy * (3 - 2 * fy);

  const n00 = pseudoNoise(i, j, seed);
  const n10 = pseudoNoise(i + 1, j, seed);
  const n01 = pseudoNoise(i, j + 1, seed);
  const n11 = pseudoNoise(i + 1, j + 1, seed);

  const nx0 = n00 * (1 - sx) + n10 * sx;
  const nx1 = n01 * (1 - sx) + n11 * sx;
  return nx0 * (1 - sy) + nx1 * sy;
}

function fbm(x: number, y: number, octaves: number = 4, seed: number = 0): number {
  let val = 0;
  let amp = 0.5;
  let freq = 1;
  for (let o = 0; o < octaves; o++) {
    val += smoothNoise(x * freq, y * freq, seed + o * 10) * amp;
    freq *= 2;
    amp *= 0.5;
  }
  return val;
}

export function getCelestialTexture(type: string): THREE.CanvasTexture {
  if (textureCache.has(type)) {
    return textureCache.get(type)!;
  }

  const canvas = document.createElement('canvas');
  const size = 1024;
  canvas.width = size;
  canvas.height = size / 2; // 2:1 equirectangular spherical map
  const ctx = canvas.getContext('2d')!;

  const width = canvas.width;
  const height = canvas.height;
  const imgData = ctx.createImageData(width, height);
  const data = imgData.data;

  if (type === 'earth') {
    // Photorealistic Earth: Vibrant sapphire oceans, continental shelves, green biomes, arid deserts & ice caps
    for (let y = 0; y < height; y++) {
      const lat = (y / height) * Math.PI - Math.PI / 2;
      for (let x = 0; x < width; x++) {
        const lon = (x / width) * Math.PI * 2;
        const nx = Math.cos(lat) * Math.cos(lon) * 2;
        const ny = Math.cos(lat) * Math.sin(lon) * 2;
        const nz = Math.sin(lat) * 2;

        const elev = fbm(nx + 10, ny + nz, 6, 42);
        const idx = (y * width + x) * 4;

        if (elev < 0.48) {
          // Deep Ocean (Vibrant oceanic blue)
          data[idx] = 16;
          data[idx + 1] = 58;
          data[idx + 2] = 142;
        } else if (elev < 0.52) {
          // Coastal Shelf (Cyan turquoise shelf)
          data[idx] = 34;
          data[idx + 1] = 125;
          data[idx + 2] = 195;
        } else if (elev < 0.65) {
          // Lowland Forests & Grasslands (Lush green)
          data[idx] = 52 + Math.floor(elev * 35);
          data[idx + 1] = 142 + Math.floor(elev * 30);
          data[idx + 2] = 58;
        } else if (elev < 0.78) {
          // Arid Highlands & Deserts (Warm ochre sand)
          data[idx] = 192;
          data[idx + 1] = 158;
          data[idx + 2] = 105;
        } else {
          // Alpine Mountain Snow
          data[idx] = 238;
          data[idx + 1] = 242;
          data[idx + 2] = 250;
        }

        // Polar ice caps (North & South)
        if (Math.abs(lat) > 1.18) {
          const iceEdge = (Math.abs(lat) - 1.18) / 0.39;
          if (iceEdge > fbm(nx * 4, ny * 4, 3, 99)) {
            data[idx] = 248;
            data[idx + 1] = 252;
            data[idx + 2] = 255;
          }
        }
        data[idx + 3] = 255;
      }
    }
  } else if (type === 'earth_clouds') {
    // Dynamic swirling weather fronts, cyclone spirals & trade wind belts
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const u = (x / width) * 6;
        const v = (y / height) * 3;
        const swirl = Math.sin(u * 2 + fbm(u, v, 4, 15) * 4);
        const cloudDensity = fbm(u + swirl * 0.4, v, 5, 23);
        const idx = (y * width + x) * 4;

        if (cloudDensity > 0.52) {
          const alpha = Math.min(255, Math.floor((cloudDensity - 0.52) * 580));
          data[idx] = 255;
          data[idx + 1] = 255;
          data[idx + 2] = 255;
          data[idx + 3] = alpha;
        } else {
          data[idx + 3] = 0;
        }
      }
    }
  } else if (type === 'mars') {
    // Rusty iron oxide deserts, dark basaltic volcanic plains & polar dry-ice caps
    for (let y = 0; y < height; y++) {
      const lat = (y / height) * Math.PI - Math.PI / 2;
      for (let x = 0; x < width; x++) {
        const lon = (x / width) * Math.PI * 2;
        const nx = Math.cos(lat) * Math.cos(lon) * 2;
        const ny = Math.cos(lat) * Math.sin(lon) * 2;
        const nz = Math.sin(lat) * 2;

        const elev = fbm(nx + 20, ny + nz, 5, 77);
        const idx = (y * width + x) * 4;

        if (elev < 0.44) {
          // Dark basalt volcanic lowlands (Acidalia Planitia)
          data[idx] = 148;
          data[idx + 1] = 68;
          data[idx + 2] = 45;
        } else if (elev < 0.72) {
          // Oxidized red rust dust plains (Chryse Planitia)
          data[idx] = 212;
          data[idx + 1] = 98;
          data[idx + 2] = 58;
        } else {
          // Bright ochre highlands (Tharsis volcanic plateau)
          data[idx] = 238;
          data[idx + 1] = 138;
          data[idx + 2] = 85;
        }

        // Polar ice caps
        if (Math.abs(lat) > 1.32) {
          data[idx] = 250;
          data[idx + 1] = 248;
          data[idx + 2] = 252;
        }
        data[idx + 3] = 255;
      }
    }
  } else if (type === 'jupiter') {
    // Dynamic atmospheric belts, ammonia zones & the Great Red Spot
    for (let y = 0; y < height; y++) {
      const v = (y / height);
      for (let x = 0; x < width; x++) {
        const u = (x / width);
        const band = Math.sin(v * 28 + fbm(u * 8, v * 2, 4, 33) * 2.5);
        const turb = fbm(u * 12, v * 6, 4, 55);
        const idx = (y * width + x) * 4;

        let r = 218 + band * 32 + turb * 20;
        let g = 168 + band * 25;
        let b = 125 + band * 18;

        // Great Red Spot at lat -22° (v = 0.63), lon u ~ 0.46
        const gdx = (u - 0.46) * 3.5;
        const gdy = (v - 0.63) * 9.0;
        const spotDist = gdx * gdx + gdy * gdy;
        if (spotDist < 0.08) {
          r = 228 + (1 - spotDist * 10) * 35;
          g = 82 + turb * 20;
          b = 64 + turb * 10;
        }

        data[idx] = Math.min(255, Math.max(0, Math.floor(r)));
        data[idx + 1] = Math.min(255, Math.max(0, Math.floor(g)));
        data[idx + 2] = Math.min(255, Math.max(0, Math.floor(b)));
        data[idx + 3] = 255;
      }
    }
  } else if (type === 'saturn') {
    // Pale golden ammonia haze bands & northern hexagon polar vortex
    for (let y = 0; y < height; y++) {
      const v = (y / height);
      for (let x = 0; x < width; x++) {
        const u = (x / width);
        const band = Math.sin(v * 36 + fbm(u * 4, v * 2, 3, 11) * 1.2);
        const idx = (y * width + x) * 4;

        data[idx] = Math.floor(232 + band * 18);
        data[idx + 1] = Math.floor(208 + band * 16);
        data[idx + 2] = Math.floor(152 + band * 22);
        data[idx + 3] = 255;
      }
    }
  } else if (type === 'venus') {
    // Dense opaque sulfuric acid cloud deck in warm amber cream
    for (let y = 0; y < height; y++) {
      const v = (y / height);
      for (let x = 0; x < width; x++) {
        const u = (x / width);
        const band = Math.sin(v * 16 + fbm(u * 5, v * 3, 4, 8) * 2.0);
        const idx = (y * width + x) * 4;

        data[idx] = Math.floor(236 + band * 15);
        data[idx + 1] = Math.floor(205 + band * 20);
        data[idx + 2] = Math.floor(148 + band * 25);
        data[idx + 3] = 255;
      }
    }
  } else if (type === 'mercury') {
    // Heavily cratered silicate regolith & impact ray basins
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const u = (x / width) * 8;
        const v = (y / height) * 4;
        const craters = fbm(u * 3, v * 3, 5, 21);
        const idx = (y * width + x) * 4;
        const tone = Math.floor(168 + craters * 70);

        data[idx] = tone;
        data[idx + 1] = tone;
        data[idx + 2] = Math.floor(tone * 1.02);
        data[idx + 3] = 255;
      }
    }
  } else if (type === 'uranus') {
    // Pale cyan-aquamarine methane atmosphere with subtle atmospheric bands
    for (let y = 0; y < height; y++) {
      const v = (y / height);
      for (let x = 0; x < width; x++) {
        const band = Math.sin(v * 12);
        const idx = (y * width + x) * 4;

        data[idx] = Math.floor(138 + band * 12);
        data[idx + 1] = Math.floor(212 + band * 15);
        data[idx + 2] = Math.floor(224 + band * 18);
        data[idx + 3] = 255;
      }
    }
  } else if (type === 'neptune') {
    // Vivid cobalt and azure blue atmosphere with white methane cirrus streaks
    for (let y = 0; y < height; y++) {
      const v = (y / height);
      for (let x = 0; x < width; x++) {
        const u = (x / width);
        const band = Math.sin(v * 20 + fbm(u * 6, v * 2, 3, 44) * 1.5);
        const storm = fbm(u * 8, v * 4, 4, 19);
        const idx = (y * width + x) * 4;

        let r = 52 + band * 15;
        let g = 105 + band * 22;
        let b = 232 + band * 20;

        if (storm > 0.68) {
          // White cirrus methane clouds
          r += 75; g += 75; b += 20;
        }

        data[idx] = Math.min(255, Math.floor(r));
        data[idx + 1] = Math.min(255, Math.floor(g));
        data[idx + 2] = Math.min(255, Math.floor(b));
        data[idx + 3] = 255;
      }
    }
  } else if (type === 'sun') {
    // Dynamic solar convective granulation & coronal flares
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const u = (x / width) * 10;
        const v = (y / height) * 10;
        const granule = fbm(u, v, 5, 88);
        const idx = (y * width + x) * 4;

        data[idx] = 255;
        data[idx + 1] = Math.floor(175 + granule * 75);
        data[idx + 2] = Math.floor(granule * 45);
        data[idx + 3] = 255;
      }
    }
  } else if (type === 'moon') {
    // Cratered lunar regolith & dark basaltic maria
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const u = (x / width) * 8;
        const v = (y / height) * 4;
        const maria = fbm(u, v, 3, 44);
        const craters = fbm(u * 3, v * 3, 5, 12);
        const idx = (y * width + x) * 4;

        let tone = 165 + craters * 70;
        if (maria < 0.42) {
          tone = 95 + craters * 35;
        }

        data[idx] = Math.floor(tone);
        data[idx + 1] = Math.floor(tone * 0.98);
        data[idx + 2] = Math.floor(tone * 0.96);
        data[idx + 3] = 255;
      }
    }
  } else {
    // Generic rocky / icy celestial sphere
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const u = (x / width) * 6;
        const v = (y / height) * 3;
        const n = fbm(u, v, 4, 1);
        const idx = (y * width + x) * 4;
        const val = Math.floor(155 + n * 80);
        data[idx] = val;
        data[idx + 1] = val;
        data[idx + 2] = val;
        data[idx + 3] = 255;
      }
    }
  }

  ctx.putImageData(imgData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.needsUpdate = true;
  textureCache.set(type, texture);
  return texture;
}

// Generate high-resolution concentric Saturn rings alpha texture
export function getSaturnRingsTexture(): THREE.CanvasTexture {
  const cacheKey = 'saturn_rings_alpha';
  if (textureCache.has(cacheKey)) {
    return textureCache.get(cacheKey)!;
  }

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 32;
  const ctx = canvas.getContext('2d')!;

  const grad = ctx.createLinearGradient(0, 0, canvas.width, 0);
  grad.addColorStop(0.0, 'rgba(0,0,0,0)');
  grad.addColorStop(0.08, 'rgba(185, 160, 115, 0.35)'); // C Ring (crepe ring)
  grad.addColorStop(0.22, 'rgba(225, 195, 145, 0.9)');  // B Ring (densest, brightest)
  grad.addColorStop(0.55, 'rgba(240, 215, 160, 0.95)');
  grad.addColorStop(0.60, 'rgba(10, 10, 15, 0.05)');    // Cassini Division
  grad.addColorStop(0.66, 'rgba(205, 180, 135, 0.8)');  // A Ring
  grad.addColorStop(0.86, 'rgba(185, 160, 120, 0.7)');
  grad.addColorStop(0.89, 'rgba(0,0,0,0)');             // Encke Gap
  grad.addColorStop(0.92, 'rgba(170, 150, 115, 0.5)');
  grad.addColorStop(1.0, 'rgba(0,0,0,0)');              // Outer edge

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.needsUpdate = true;
  textureCache.set(cacheKey, texture);
  return texture;
}
