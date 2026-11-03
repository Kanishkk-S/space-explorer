// ============================================================
// SPACE EXPLORER — PROCEDURAL CELESTIAL TEXTURE GENERATOR
// Produces high-fidelity planetary surface, cloud & ring maps
// ============================================================

import * as THREE from 'three';

const textureCache = new Map<string, THREE.CanvasTexture>();

// Simplex/Perlin-inspired noise helper
function pseudoNoise(x: number, y: number, seed: number = 0): number {
  const n = Math.sin(x * 12.9898 + y * 78.233 + seed) * 43758.5453;
  return n - Math.floor(n);
}

function smoothNoise(x: number, y: number, seed: number = 0): number {
  const i = Math.floor(x);
  const j = Math.floor(y);
  const fx = x - i;
  const fy = y - j;
  // smoothstep
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
  canvas.height = size / 2; // 2:1 equirectangular map
  const ctx = canvas.getContext('2d')!;

  const width = canvas.width;
  const height = canvas.height;
  const imgData = ctx.createImageData(width, height);
  const data = imgData.data;

  if (type === 'earth') {
    // Continents, deep oceans, shallow coastal shelves, and green/desert biomes
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
          // Deep ocean
          data[idx] = 12;      // R
          data[idx + 1] = 35;  // G
          data[idx + 2] = 85;  // B
        } else if (elev < 0.52) {
          // Shallow shelf
          data[idx] = 25;
          data[idx + 1] = 95;
          data[idx + 2] = 160;
        } else if (elev < 0.65) {
          // Lowland vegetation / forest
          data[idx] = 45 + Math.floor(elev * 40);
          data[idx + 1] = 110 + Math.floor(elev * 30);
          data[idx + 2] = 55;
        } else if (elev < 0.78) {
          // Highlands / desert / arid plateau
          data[idx] = 165;
          data[idx + 1] = 135;
          data[idx + 2] = 85;
        } else {
          // Mountain alpine snow
          data[idx] = 230;
          data[idx + 1] = 235;
          data[idx + 2] = 245;
        }

        // Polar ice caps
        if (Math.abs(lat) > 1.2) {
          const ice = (Math.abs(lat) - 1.2) / 0.37;
          if (ice > fbm(nx * 4, ny * 4, 3, 99)) {
            data[idx] = 240;
            data[idx + 1] = 248;
            data[idx + 2] = 255;
          }
        }
        data[idx + 3] = 255; // Alpha
      }
    }
  } else if (type === 'earth_clouds') {
    // Dynamic swirling weather fronts, cyclone bands and tropical convective clouds
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const u = (x / width) * 6;
        const v = (y / height) * 3;
        const swirl = Math.sin(u * 2 + fbm(u, v, 4, 15) * 4);
        const cloudDensity = fbm(u + swirl * 0.4, v, 5, 23);
        const idx = (y * width + x) * 4;

        if (cloudDensity > 0.54) {
          const alpha = Math.min(255, Math.floor((cloudDensity - 0.54) * 550));
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
    // Crimson rust, volcanic basalt basins, ochre plateaus, and polar dry-ice caps
    for (let y = 0; y < height; y++) {
      const lat = (y / height) * Math.PI - Math.PI / 2;
      for (let x = 0; x < width; x++) {
        const lon = (x / width) * Math.PI * 2;
        const nx = Math.cos(lat) * Math.cos(lon) * 2;
        const ny = Math.cos(lat) * Math.sin(lon) * 2;
        const nz = Math.sin(lat) * 2;

        const elev = fbm(nx + 20, ny + nz, 5, 77);
        const idx = (y * width + x) * 4;

        if (elev < 0.45) {
          // Dark basalt volcanic lowlands (Acidalia Planitia)
          data[idx] = 135;
          data[idx + 1] = 60;
          data[idx + 2] = 38;
        } else if (elev < 0.72) {
          // Rusty oxidized iron highlands
          data[idx] = 195;
          data[idx + 1] = 85;
          data[idx + 2] = 52;
        } else {
          // Bright ochre dust deserts (Tharsis)
          data[idx] = 225;
          data[idx + 1] = 120;
          data[idx + 2] = 75;
        }

        // Polar CO2 / water ice cap
        if (Math.abs(lat) > 1.35) {
          data[idx] = 245;
          data[idx + 1] = 240;
          data[idx + 2] = 245;
        }
        data[idx + 3] = 255;
      }
    }
  } else if (type === 'jupiter') {
    // Alternating ammonia zones, tawny belts, turbulent eddies, and Great Red Spot
    for (let y = 0; y < height; y++) {
      const v = (y / height);
      for (let x = 0; x < width; x++) {
        const u = (x / width);
        // Jet stream bands
        const band = Math.sin(v * 28 + fbm(u * 8, v * 2, 4, 33) * 2.5);
        const turb = fbm(u * 12, v * 6, 4, 55);
        const idx = (y * width + x) * 4;

        // Base band color interpolation between tawny brown, ochre, and pale cream
        let r = 210 + band * 30 + turb * 20;
        let g = 160 + band * 25;
        let b = 115 + band * 15;

        // Great Red Spot at lat -22° (approx v = 0.62), lon u ~ 0.45
        const gdx = (u - 0.45) * 3.5;
        const gdy = (v - 0.63) * 9.0;
        const spotDist = gdx * gdx + gdy * gdy;
        if (spotDist < 0.08) {
          r = 215 + (1 - spotDist * 10) * 35;
          g = 70 + turb * 20;
          b = 55 + turb * 10;
        }

        data[idx] = Math.min(255, Math.max(0, Math.floor(r)));
        data[idx + 1] = Math.min(255, Math.max(0, Math.floor(g)));
        data[idx + 2] = Math.min(255, Math.max(0, Math.floor(b)));
        data[idx + 3] = 255;
      }
    }
  } else if (type === 'saturn') {
    // Subtle butterscotch and golden ammonia haze bands with north polar hexagon tint
    for (let y = 0; y < height; y++) {
      const v = (y / height);
      for (let x = 0; x < width; x++) {
        const u = (x / width);
        const band = Math.sin(v * 36 + fbm(u * 4, v * 2, 3, 11) * 1.2);
        const idx = (y * width + x) * 4;

        data[idx] = Math.floor(225 + band * 15);
        data[idx + 1] = Math.floor(198 + band * 18);
        data[idx + 2] = Math.floor(138 + band * 20);
        data[idx + 3] = 255;
      }
    }
  } else if (type === 'sun') {
    // Dynamic solar granulation, coronal flares and magnetic sunspots
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const u = (x / width) * 10;
        const v = (y / height) * 10;
        const granule = fbm(u, v, 5, 88);
        const idx = (y * width + x) * 4;

        data[idx] = 255;
        data[idx + 1] = Math.floor(160 + granule * 80);
        data[idx + 2] = Math.floor(granule * 45);
        data[idx + 3] = 255;
      }
    }
  } else if (type === 'moon') {
    // Heavily cratered lunar regolith and dark basaltic maria
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const u = (x / width) * 8;
        const v = (y / height) * 4;
        const maria = fbm(u, v, 3, 44);
        const craters = fbm(u * 3, v * 3, 5, 12);
        const idx = (y * width + x) * 4;

        let tone = 160 + craters * 70;
        if (maria < 0.42) {
          tone = 90 + craters * 35; // Dark lunar sea
        }

        data[idx] = Math.floor(tone);
        data[idx + 1] = Math.floor(tone * 0.98);
        data[idx + 2] = Math.floor(tone * 0.96);
        data[idx + 3] = 255;
      }
    }
  } else {
    // Generic fallback rocky/icy body
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const u = (x / width) * 6;
        const v = (y / height) * 3;
        const n = fbm(u, v, 4, 1);
        const idx = (y * width + x) * 4;
        const val = Math.floor(140 + n * 80);
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
  // Transparent inner
  grad.addColorStop(0.0, 'rgba(0,0,0,0)');
  grad.addColorStop(0.08, 'rgba(180, 155, 110, 0.3)'); // C Ring (crepe ring)
  grad.addColorStop(0.22, 'rgba(215, 185, 135, 0.85)'); // B Ring (densest, brightest)
  grad.addColorStop(0.55, 'rgba(235, 205, 150, 0.95)');
  grad.addColorStop(0.60, 'rgba(10, 10, 15, 0.05)');    // Cassini Division
  grad.addColorStop(0.66, 'rgba(195, 170, 125, 0.75)'); // A Ring
  grad.addColorStop(0.86, 'rgba(175, 150, 110, 0.65)');
  grad.addColorStop(0.89, 'rgba(0,0,0,0)');             // Encke Gap
  grad.addColorStop(0.92, 'rgba(160, 140, 105, 0.45)');
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
