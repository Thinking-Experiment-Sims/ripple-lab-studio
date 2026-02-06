const GRID_WIDTH = 240;
const GRID_HEIGHT = 160;
const TWO_PI = Math.PI * 2;

const PRESETS = {
  diffraction: {
    name: 'Diffraction Through a Slit',
    concept:
      'Waves spread after passing through an opening. The spreading is strongest when wavelength is close to slit width.',
    goal:
      'Change frequency and slit width, then compare shadow size and curvature behind the wall.',
    observations: [
      'As frequency increases, wavelength decreases. How does spreading change?',
      'Increase slit width. Is diffraction stronger or weaker?',
      'Look for shadow zones behind the wall edges.'
    ],
    controls: ['slit'],
    defaults: {
      frequency: 2.8,
      amplitude: 0.95,
      damping: 0.004,
      speed: 1,
      slitWidth: 28,
      angleControl: 26,
      mediumRatio: 0.62,
      separation: 28,
      wallRadius: 18,
      viewMode: 'top',
      showNodes: false
    }
  },
  diffractionWall: {
    name: 'Diffraction Around a Wall',
    concept:
      'Waves bend around obstacle edges and create shadow regions with curved wavefronts behind the barrier.',
    goal: 'Move and resize the wall and compare shadow width versus wave frequency.',
    observations: [
      'Look directly behind the wall and identify shadow and edge-bending regions.',
      'Increase frequency and compare how far the wave wraps around the obstacle.',
      'Drag the wall radius larger and smaller to compare diffraction strength.'
    ],
    controls: ['wall'],
    defaults: {
      frequency: 2.8,
      amplitude: 0.95,
      damping: 0.004,
      speed: 1,
      slitWidth: 28,
      angleControl: 26,
      mediumRatio: 0.62,
      separation: 28,
      wallRadius: 18,
      viewMode: 'top',
      showNodes: false
    }
  },
  reflectionFlat: {
    name: 'Reflection: Flat Mirror',
    concept:
      'Incident wavefronts reflect from a flat barrier and preserve spacing in the same medium.',
    goal: 'Pause the simulation and compare incident and reflected directions.',
    observations: [
      'The reflected fronts mirror the incident fronts.',
      'Check if wave spacing changes after reflection.',
      'Use step mode to inspect the bounce frame by frame.'
    ],
    controls: [],
    defaults: {
      frequency: 3.2,
      amplitude: 0.88,
      damping: 0.004,
      speed: 1,
      slitWidth: 28,
      angleControl: 26,
      mediumRatio: 0.62,
      separation: 28,
      wallRadius: 18,
      viewMode: 'top',
      showNodes: false
    }
  },
  reflectionDiagonal: {
    name: 'Reflection: Diagonal Mirror',
    concept:
      'Changing mirror angle rotates reflected direction. Incident angle and reflected angle match around the normal.',
    goal: 'Sweep mirror angle and test the angle-in equals angle-out pattern.',
    observations: [
      'Use a few mirror angles and compare reflected direction each time.',
      'Record incident and reflected arrows at one frozen frame.',
      'Look for a consistent angular rule relative to the wall normal.'
    ],
    controls: ['angle'],
    defaults: {
      frequency: 3.1,
      amplitude: 0.88,
      damping: 0.004,
      speed: 1,
      slitWidth: 28,
      angleControl: 24,
      mediumRatio: 0.62,
      separation: 28,
      wallRadius: 18,
      viewMode: 'top',
      showNodes: false
    }
  },
  reflectionParabolic: {
    name: 'Reflection: Parabolic Mirror',
    concept:
      'A parabolic boundary focuses parallel incoming waves to a focal region, and can collimate waves emitted at the focus.',
    goal: 'Compare plane-wave focusing with point-source emission at the focus.',
    observations: [
      'Run with top line source: where do reflected waves converge?',
      'Switch to focus source: do reflected waves become nearly parallel?',
      'Pause at peak clarity and annotate incident/reflected geometry.'
    ],
    controls: ['focus'],
    defaults: {
      frequency: 2.7,
      amplitude: 0.9,
      damping: 0.003,
      speed: 1,
      slitWidth: 28,
      angleControl: 24,
      mediumRatio: 0.62,
      separation: 28,
      wallRadius: 18,
      viewMode: 'top',
      showNodes: false
    }
  },
  refractionBoundary: {
    name: 'Refraction: Medium Change',
    concept:
      'Crossing into a slower medium shortens wavelength while frequency stays fixed by the source.',
    goal: 'Observe wave speed and spacing change across the medium boundary.',
    observations: [
      'Watch crest spacing before and after entering shallow region.',
      'Decrease medium ratio to make the effect more visible.',
      'Track what happens when waves re-enter the deeper region.'
    ],
    controls: ['medium'],
    defaults: {
      frequency: 2.5,
      amplitude: 0.9,
      damping: 0.004,
      speed: 1,
      slitWidth: 28,
      angleControl: 24,
      mediumRatio: 0.6,
      separation: 28,
      wallRadius: 18,
      viewMode: 'top',
      showNodes: false
    }
  },
  refractionAngled: {
    name: 'Refraction: Angled Boundary',
    concept:
      'When waves hit a medium boundary at an angle, direction bends toward the slower side.',
    goal: 'Change boundary angle and medium ratio, then compare bend direction and amount.',
    observations: [
      'Look at the incoming direction versus transmitted direction.',
      'Reduce medium ratio and check if bending increases.',
      'Compare normal incidence to oblique incidence.'
    ],
    controls: ['medium', 'angle'],
    defaults: {
      frequency: 2.9,
      amplitude: 0.9,
      damping: 0.004,
      speed: 1,
      slitWidth: 28,
      angleControl: 18,
      mediumRatio: 0.58,
      separation: 28,
      wallRadius: 18,
      viewMode: 'top',
      showNodes: false
    }
  },
  interference: {
    name: 'Interference: Two Sources',
    concept:
      'Two coherent sources create stable constructive and destructive interference regions (antinodes and nodes).',
    goal: 'Change frequency and source spacing to compare node count and pattern density.',
    observations: [
      'Use node overlay and identify dark stable nodal bands.',
      'Raise frequency. How does node spacing change?',
      'Move sources closer and farther apart, then compare node count.'
    ],
    controls: ['separation'],
    defaults: {
      frequency: 4,
      amplitude: 0.92,
      damping: 0.003,
      speed: 1,
      slitWidth: 28,
      angleControl: 24,
      mediumRatio: 0.62,
      separation: 34,
      wallRadius: 18,
      viewMode: 'top',
      showNodes: true
    }
  }
};

const THEMES = {
  atlantic: {
    name: 'Atlantic',
    bgDeep: [3, 16, 24],
    bgShallow: [20, 58, 81],
    crest: [247, 185, 100],
    trough: [77, 177, 255],
    wall: [226, 236, 241],
    node: [224, 250, 252],
    line: 'rgba(247, 185, 100, 0.95)',
    point: 'rgba(126, 225, 215, 0.95)'
  },
  ember: {
    name: 'Ember Lab',
    bgDeep: [19, 12, 8],
    bgShallow: [62, 41, 24],
    crest: [253, 199, 88],
    trough: [102, 190, 205],
    wall: [245, 229, 206],
    node: [255, 241, 214],
    line: 'rgba(253, 199, 88, 0.95)',
    point: 'rgba(102, 190, 205, 0.95)'
  },
  slate: {
    name: 'Slate Contrast',
    bgDeep: [12, 16, 20],
    bgShallow: [40, 52, 62],
    crest: [242, 204, 142],
    trough: [128, 193, 219],
    wall: [229, 233, 236],
    node: [245, 250, 252],
    line: 'rgba(242, 204, 142, 0.95)',
    point: 'rgba(128, 193, 219, 0.95)'
  }
};

const EDIT_MARGIN = 6;
const HANDLE_RADIUS_PX = 9;
const MIN_SLIT_HEIGHT = 6;
const MIN_SEGMENT_LENGTH = 10;

function createLineFromCenterAngle(centerX, centerY, halfLength, angleDeg) {
  const angle = (angleDeg * Math.PI) / 180;
  return {
    x0: centerX - Math.cos(angle) * halfLength,
    y0: centerY - Math.sin(angle) * halfLength,
    x1: centerX + Math.cos(angle) * halfLength,
    y1: centerY + Math.sin(angle) * halfLength
  };
}

function segmentMidpoint(segment) {
  return {
    x: (segment.x0 + segment.x1) / 2,
    y: (segment.y0 + segment.y1) / 2
  };
}

function segmentLength(segment) {
  return Math.hypot(segment.x1 - segment.x0, segment.y1 - segment.y0);
}

function segmentAngleDegrees(segment) {
  return (Math.atan2(segment.y1 - segment.y0, segment.x1 - segment.x0) * 180) / Math.PI;
}

function clampSegmentToBounds(segment, margin = EDIT_MARGIN) {
  return {
    x0: clamp(segment.x0, margin, GRID_WIDTH - 1 - margin),
    y0: clamp(segment.y0, margin, GRID_HEIGHT - 1 - margin),
    x1: clamp(segment.x1, margin, GRID_WIDTH - 1 - margin),
    y1: clamp(segment.y1, margin, GRID_HEIGHT - 1 - margin)
  };
}

function moveSegmentWithinBounds(segment, dx, dy, margin = EDIT_MARGIN) {
  const minX = Math.min(segment.x0, segment.x1);
  const maxX = Math.max(segment.x0, segment.x1);
  const minY = Math.min(segment.y0, segment.y1);
  const maxY = Math.max(segment.y0, segment.y1);

  const clampedDx = clamp(dx, margin - minX, GRID_WIDTH - 1 - margin - maxX);
  const clampedDy = clamp(dy, margin - minY, GRID_HEIGHT - 1 - margin - maxY);

  return {
    x0: segment.x0 + clampedDx,
    y0: segment.y0 + clampedDy,
    x1: segment.x1 + clampedDx,
    y1: segment.y1 + clampedDy
  };
}

function deepCopy(value) {
  return JSON.parse(JSON.stringify(value));
}

function getMaxParabolaSpan(geometry) {
  const xLimit = Math.min(geometry.centerX - EDIT_MARGIN, GRID_WIDTH - 1 - EDIT_MARGIN - geometry.centerX);
  const yLimit = Math.sqrt(Math.max(0, geometry.vertexY / geometry.curvature));
  return Math.max(16, Math.min(xLimit, yLimit));
}

function createDefaultGeometryForPreset(presetId, defaults) {
  switch (presetId) {
    case 'diffraction': {
      const centerY = Math.round(GRID_HEIGHT / 2);
      const halfGap = Math.floor(defaults.slitWidth / 2);
      return {
        wallX: Math.round(GRID_WIDTH * 0.47),
        slitTopY: centerY - halfGap,
        slitBottomY: centerY + halfGap
      };
    }
    case 'diffractionWall':
      return {
        wall: {
          x: GRID_WIDTH * 0.56,
          y: GRID_HEIGHT * 0.5,
          radius: defaults.wallRadius
        }
      };
    case 'reflectionFlat':
      return {
        line: {
          x0: 22,
          y0: Math.round(GRID_HEIGHT * 0.58),
          x1: GRID_WIDTH - 22,
          y1: Math.round(GRID_HEIGHT * 0.58)
        }
      };
    case 'reflectionDiagonal':
      return {
        line: createLineFromCenterAngle(GRID_WIDTH * 0.54, GRID_HEIGHT * 0.62, GRID_WIDTH * 0.33, defaults.angleControl)
      };
    case 'reflectionParabolic':
      return {
        centerX: GRID_WIDTH * 0.52,
        vertexY: GRID_HEIGHT * 0.78,
        curvature: 0.004,
        halfSpan: GRID_WIDTH * 0.42
      };
    case 'refractionBoundary':
      return { boundaryX: Math.round(GRID_WIDTH * 0.56) };
    case 'refractionAngled':
      return {
        boundary: createLineFromCenterAngle(
          GRID_WIDTH * 0.56,
          GRID_HEIGHT * 0.52,
          GRID_WIDTH * 0.65,
          defaults.angleControl
        )
      };
    case 'interference': {
      const centerY = GRID_HEIGHT * 0.5;
      return {
        source1: { x: GRID_WIDTH * 0.3, y: centerY - defaults.separation / 2 },
        source2: { x: GRID_WIDTH * 0.3, y: centerY + defaults.separation / 2 }
      };
    }
    default:
      return {};
  }
}

class RippleTank {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.size = width * height;
    this.baseSpeed = 0.34;
    this.dampingLoss = 0.004;
    this.time = 0;

    this.prev = new Float32Array(this.size);
    this.curr = new Float32Array(this.size);
    this.next = new Float32Array(this.size);
    this.avgAbs = new Float32Array(this.size);
    this.medium = new Float32Array(this.size);
    this.obstacle = new Uint8Array(this.size);
    this.edgeMask = new Float32Array(this.size);
    this.sources = [];

    this.buildEdgeMask();
    this.setAllMedium(this.baseSpeed);
  }

  index(x, y) {
    return y * this.width + x;
  }

  isInside(x, y) {
    return x >= 0 && x < this.width && y >= 0 && y < this.height;
  }

  buildEdgeMask() {
    const margin = 14;
    for (let y = 0; y < this.height; y += 1) {
      for (let x = 0; x < this.width; x += 1) {
        const edgeDistance = Math.min(x, y, this.width - 1 - x, this.height - 1 - y);
        const i = this.index(x, y);
        if (edgeDistance >= margin) {
          this.edgeMask[i] = 1;
        } else {
          const t = edgeDistance / margin;
          this.edgeMask[i] = 0.85 + 0.15 * clamp(t, 0, 1);
        }
      }
    }
  }

  clearWaves() {
    this.prev.fill(0);
    this.curr.fill(0);
    this.next.fill(0);
    this.avgAbs.fill(0);
    this.time = 0;
  }

  clearEnvironment() {
    this.obstacle.fill(0);
    this.setAllMedium(this.baseSpeed);
    this.sources.length = 0;
  }

  setAllMedium(speed) {
    const c2 = speed * speed;
    this.medium.fill(c2);
  }

  setMediumRect(x0, y0, x1, y1, speed) {
    const c2 = speed * speed;
    const minX = clamp(Math.min(x0, x1), 0, this.width - 1);
    const maxX = clamp(Math.max(x0, x1), 0, this.width - 1);
    const minY = clamp(Math.min(y0, y1), 0, this.height - 1);
    const maxY = clamp(Math.max(y0, y1), 0, this.height - 1);

    for (let y = minY; y <= maxY; y += 1) {
      const row = y * this.width;
      for (let x = minX; x <= maxX; x += 1) {
        this.medium[row + x] = c2;
      }
    }
  }

  setMediumHalfPlane(pointX, pointY, normalX, normalY, speed) {
    const c2 = speed * speed;
    for (let y = 0; y < this.height; y += 1) {
      const row = y * this.width;
      for (let x = 0; x < this.width; x += 1) {
        const side = (x - pointX) * normalX + (y - pointY) * normalY;
        if (side >= 0) {
          this.medium[row + x] = c2;
        }
      }
    }
  }

  setObstacleDisk(centerX, centerY, radius) {
    const r = Math.max(0.5, radius);
    const r2 = r * r;
    const minX = Math.floor(centerX - r);
    const maxX = Math.ceil(centerX + r);
    const minY = Math.floor(centerY - r);
    const maxY = Math.ceil(centerY + r);
    for (let y = minY; y <= maxY; y += 1) {
      for (let x = minX; x <= maxX; x += 1) {
        if (!this.isInside(x, y)) {
          continue;
        }
        const dx = x - centerX;
        const dy = y - centerY;
        if (dx * dx + dy * dy <= r2) {
          this.obstacle[this.index(x, y)] = 1;
        }
      }
    }
  }

  drawLineObstacle(x0, y0, x1, y1, thickness = 1) {
    const points = this.collectLineIndices(x0, y0, x1, y1, thickness);
    for (let i = 0; i < points.length; i += 1) {
      this.obstacle[points[i]] = 1;
    }
  }

  drawParabolaObstacle(centerX, vertexY, curvature, minX, maxX, thickness = 1) {
    for (let x = minX; x <= maxX; x += 1) {
      const dx = x - centerX;
      const y = Math.round(-curvature * dx * dx + vertexY);
      if (this.isInside(x, y)) {
        this.setObstacleDisk(x, y, thickness);
      }
    }
  }

  collectDiskIndices(centerX, centerY, radius) {
    const out = [];
    const r2 = radius * radius;
    for (let y = centerY - radius; y <= centerY + radius; y += 1) {
      for (let x = centerX - radius; x <= centerX + radius; x += 1) {
        if (!this.isInside(x, y)) {
          continue;
        }
        const dx = x - centerX;
        const dy = y - centerY;
        if (dx * dx + dy * dy <= r2) {
          out.push(this.index(x, y));
        }
      }
    }
    return out;
  }

  collectLineIndices(x0, y0, x1, y1, thickness = 0) {
    const indices = new Set();
    const dx = x1 - x0;
    const dy = y1 - y0;
    const length = Math.hypot(dx, dy);
    const samples = Math.max(1, Math.ceil(length * 2));
    const brushRadius = Math.max(0.5, thickness);
    const ir = Math.ceil(brushRadius);

    for (let s = 0; s <= samples; s += 1) {
      const t = s / samples;
      const cx = x0 + dx * t;
      const cy = y0 + dy * t;

      for (let oy = -ir; oy <= ir; oy += 1) {
        for (let ox = -ir; ox <= ir; ox += 1) {
          if (ox * ox + oy * oy > brushRadius * brushRadius) {
            continue;
          }
          const x = Math.round(cx + ox);
          const y = Math.round(cy + oy);
          if (this.isInside(x, y)) {
            indices.add(this.index(x, y));
          }
        }
      }
    }

    return Array.from(indices);
  }

  addPointSource({ x, y, radius = 1, frequency = 3, amplitude = 1, phase = 0, relativeAmplitude = 1 }) {
    const indices = this.collectDiskIndices(Math.round(x), Math.round(y), radius);
    this.sources.push({
      kind: 'point',
      indices,
      frequency,
      amplitude,
      phase,
      relativeAmplitude,
      cellScale: 1,
      marker: { x, y, size: 3 }
    });
  }

  addLineSource({ x0, y0, x1, y1, thickness = 1, frequency = 3, amplitude = 1, phase = 0, relativeAmplitude = 1 }) {
    const indices = this.collectLineIndices(x0, y0, x1, y1, thickness);
    const cellScale = indices.length > 0 ? 2 / Math.sqrt(indices.length) : 1;
    this.sources.push({
      kind: 'line',
      indices,
      frequency,
      amplitude,
      phase,
      relativeAmplitude,
      cellScale,
      marker: { x0, y0, x1, y1 }
    });
  }

  setSourceFrequency(frequency) {
    for (let i = 0; i < this.sources.length; i += 1) {
      this.sources[i].frequency = frequency;
    }
  }

  setSourceAmplitude(globalAmplitude) {
    for (let i = 0; i < this.sources.length; i += 1) {
      const source = this.sources[i];
      source.amplitude = globalAmplitude * source.relativeAmplitude;
    }
  }

  injectSources() {
    const t = this.time;
    for (let s = 0; s < this.sources.length; s += 1) {
      const source = this.sources[s];
      const sample = source.amplitude * Math.sin(TWO_PI * source.frequency * t + source.phase) * source.cellScale;
      for (let i = 0; i < source.indices.length; i += 1) {
        this.curr[source.indices[i]] += sample;
      }
    }
  }

  enforceObstaclesAndAverages() {
    const blend = 0.008;
    const invBlend = 1 - blend;

    for (let i = 0; i < this.size; i += 1) {
      if (this.obstacle[i]) {
        this.curr[i] = 0;
        this.prev[i] = 0;
        this.avgAbs[i] = 0;
      } else {
        this.avgAbs[i] = this.avgAbs[i] * invBlend + Math.abs(this.curr[i]) * blend;
      }
    }
  }

  step(dt) {
    const width = this.width;
    const height = this.height;
    const prev = this.prev;
    const curr = this.curr;
    const next = this.next;
    const medium = this.medium;
    const obstacle = this.obstacle;
    const edgeMask = this.edgeMask;
    const damping = clamp(1 - this.dampingLoss, 0, 1);

    for (let y = 1; y < height - 1; y += 1) {
      const row = y * width;
      for (let x = 1; x < width - 1; x += 1) {
        const i = row + x;
        if (obstacle[i]) {
          next[i] = 0;
          continue;
        }

        const laplacian = curr[i - 1] + curr[i + 1] + curr[i - width] + curr[i + width] - 4 * curr[i];
        const value = (2 * curr[i] - prev[i] + medium[i] * laplacian) * damping * edgeMask[i];
        next[i] = value;
      }
    }

    for (let x = 0; x < width; x += 1) {
      next[x] = 0;
      next[(height - 1) * width + x] = 0;
    }

    for (let y = 0; y < height; y += 1) {
      next[y * width] = 0;
      next[y * width + width - 1] = 0;
    }

    this.prev = curr;
    this.curr = next;
    this.next = prev;

    this.injectSources();
    this.enforceObstaclesAndAverages();
    this.time += dt;
  }
}

const elements = {
  presetSelect: document.getElementById('presetSelect'),
  playBtn: document.getElementById('playBtn'),
  stepBtn: document.getElementById('stepBtn'),
  clearBtn: document.getElementById('clearBtn'),
  resetBtn: document.getElementById('resetBtn'),
  frequency: document.getElementById('frequency'),
  frequencyValue: document.getElementById('frequencyValue'),
  amplitude: document.getElementById('amplitude'),
  amplitudeValue: document.getElementById('amplitudeValue'),
  damping: document.getElementById('damping'),
  dampingValue: document.getElementById('dampingValue'),
  speed: document.getElementById('speed'),
  speedValue: document.getElementById('speedValue'),
  slitWidth: document.getElementById('slitWidth'),
  slitWidthValue: document.getElementById('slitWidthValue'),
  angleControl: document.getElementById('angleControl'),
  angleValue: document.getElementById('angleValue'),
  angleText: document.getElementById('angleText'),
  mediumRatio: document.getElementById('mediumRatio'),
  mediumRatioValue: document.getElementById('mediumRatioValue'),
  separation: document.getElementById('separation'),
  separationValue: document.getElementById('separationValue'),
  wallRadius: document.getElementById('wallRadius'),
  wallRadiusValue: document.getElementById('wallRadiusValue'),
  focusSourceBtn: document.getElementById('focusSourceBtn'),
  themeSelect: document.getElementById('themeSelect'),
  viewMode: document.getElementById('viewMode'),
  showNodes: document.getElementById('showNodes'),
  reducedMotion: document.getElementById('reducedMotion'),
  saveScreenshotBtn: document.getElementById('saveScreenshotBtn'),
  saveReportBtn: document.getElementById('saveReportBtn'),
  metricDeep: document.getElementById('metricDeep'),
  metricShallow: document.getElementById('metricShallow'),
  statusLine: document.getElementById('statusLine'),
  guideTitle: document.getElementById('guideTitle'),
  guideConcept: document.getElementById('guideConcept'),
  guideGoal: document.getElementById('guideGoal'),
  guideObservations: document.getElementById('guideObservations'),
  tankCanvas: document.getElementById('tankCanvas'),
  labNotes: document.getElementById('labNotes')
};

const controlGroups = Array.from(document.querySelectorAll('.control-group'));
const tank = new RippleTank(GRID_WIDTH, GRID_HEIGHT);
const canvasCtx = elements.tankCanvas.getContext('2d', { alpha: false });
const offscreen = document.createElement('canvas');
offscreen.width = GRID_WIDTH;
offscreen.height = GRID_HEIGHT;
const offscreenCtx = offscreen.getContext('2d', { alpha: false });
const imageData = offscreenCtx.createImageData(GRID_WIDTH, GRID_HEIGHT);

const state = {
  preset: 'diffraction',
  theme: 'atlantic',
  viewMode: 'top',
  running: true,
  showNodes: false,
  reducedMotion: false,
  focusSourceMode: false,
  overlayLines: [],
  overlayPoints: [],
  overlayCircles: [],
  editHandles: [],
  hoveredHandleId: null,
  geometry: {},
  drag: null,
  pointer: null,
  needsRebuild: false,
  lastFrameTime: 0
};

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function formatNumber(value, places = 2) {
  return Number(value).toFixed(places);
}

function normalizeAngle(degrees) {
  return (degrees * Math.PI) / 180;
}

function createTimestampParts() {
  const now = new Date();
  const iso = now.toISOString();
  const slug = iso.replace(/[:]/g, '-').replace(/\..+/, '').replace('T', '_');
  const readable = now.toLocaleString();
  return { now, slug, readable };
}

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function downloadBlob(filename, blob) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function getCanvasDataUrl() {
  return elements.tankCanvas.toDataURL('image/png');
}

function saveScreenshot() {
  const { slug } = createTimestampParts();
  const dataUrl = getCanvasDataUrl();
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = `ripple-screenshot-${slug}.png`;
  document.body.appendChild(link);
  link.click();
  link.remove();
}

function buildSettingsList() {
  const rows = [
    `Preset: ${PRESETS[state.preset].name}`,
    `View: ${state.viewMode === 'surface3d' ? '3D Surface' : 'Top View'}`,
    `Frequency: ${elements.frequency.value} Hz`,
    `Amplitude: ${elements.amplitude.value}`,
    `Damping loss: ${(Number(elements.damping.value) * 100).toFixed(1)}%`,
    `Simulation speed: ${elements.speed.value}x`,
    `Theme: ${THEMES[state.theme].name}`
  ];

  if (state.preset === 'diffraction') {
    rows.push(`Slit width: ${elements.slitWidth.value}px`);
  }
  if (state.preset === 'diffractionWall') {
    rows.push(`Wall radius: ${elements.wallRadius.value}px`);
  }
  if (state.preset === 'reflectionDiagonal' || state.preset === 'refractionAngled') {
    rows.push(`Angle: ${elements.angleControl.value}deg`);
  }
  if (state.preset === 'refractionBoundary' || state.preset === 'refractionAngled') {
    rows.push(`Shallow medium ratio: ${elements.mediumRatio.value}`);
  }
  if (state.preset === 'interference') {
    rows.push(`Source separation: ${elements.separation.value}px`);
  }

  return rows;
}

function saveNotesReport() {
  const notes = elements.labNotes.value.trim();
  const screenshot = getCanvasDataUrl();
  const { slug, readable } = createTimestampParts();
  const settingsItems = buildSettingsList().map((item) => `<li>${escapeHtml(item)}</li>`).join('');
  const notesHtml = notes ? escapeHtml(notes).replace(/\n/g, '<br />') : '<em>No notes entered.</em>';

  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Ripple Lab Report</title>
    <style>
      body { font-family: Arial, sans-serif; margin: 1.5rem; color: #1f2933; }
      h1, h2 { margin: 0 0 0.6rem; }
      p, li { line-height: 1.45; }
      .meta { color: #52606d; margin-bottom: 1rem; }
      .shot { max-width: 100%; border: 1px solid #cbd2d9; border-radius: 10px; margin: 0.5rem 0 1rem; }
      .card { border: 1px solid #d9e2ec; border-radius: 12px; padding: 0.9rem 1rem; margin-bottom: 1rem; }
      ul { margin: 0.3rem 0 0; }
    </style>
  </head>
  <body>
    <h1>Ripple Lab Studio Notes</h1>
    <p class="meta">Generated: ${escapeHtml(readable)}</p>
    <div class="card">
      <h2>Screenshot</h2>
      <img class="shot" src="${screenshot}" alt="Ripple simulation screenshot" />
    </div>
    <div class="card">
      <h2>Settings</h2>
      <ul>${settingsItems}</ul>
    </div>
    <div class="card">
      <h2>Student Notes</h2>
      <p>${notesHtml}</p>
    </div>
  </body>
</html>`;

  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  downloadBlob(`ripple-lab-report-${slug}.html`, blob);
}

function getPresetGeometry(presetId = state.preset) {
  if (!state.geometry[presetId]) {
    state.geometry[presetId] = createDefaultGeometryForPreset(presetId, PRESETS[presetId].defaults);
  }
  return state.geometry[presetId];
}

function resetGeometryForPreset(presetId) {
  state.geometry[presetId] = createDefaultGeometryForPreset(presetId, PRESETS[presetId].defaults);
}

function setSegmentAngleAroundMidpoint(segment, angleDeg) {
  const midpoint = segmentMidpoint(segment);
  const halfLength = Math.max(MIN_SEGMENT_LENGTH / 2, segmentLength(segment) / 2);
  const rotated = clampSegmentToBounds(createLineFromCenterAngle(midpoint.x, midpoint.y, halfLength, angleDeg));
  segment.x0 = rotated.x0;
  segment.y0 = rotated.y0;
  segment.x1 = rotated.x1;
  segment.y1 = rotated.y1;
}

function setDiffractionSlitWidth(geometry, slitWidth) {
  const centerY = (geometry.slitTopY + geometry.slitBottomY) / 2;
  const halfGap = Math.max(MIN_SLIT_HEIGHT / 2, slitWidth / 2);
  const minCenter = EDIT_MARGIN + halfGap;
  const maxCenter = GRID_HEIGHT - 1 - EDIT_MARGIN - halfGap;
  const clampedCenter = clamp(centerY, minCenter, maxCenter);
  geometry.slitTopY = Math.round(clampedCenter - halfGap);
  geometry.slitBottomY = Math.round(clampedCenter + halfGap);
}

function syncGeometryFromControls() {
  const geometry = getPresetGeometry();
  switch (state.preset) {
    case 'diffraction': {
      const slitWidth = Number(elements.slitWidth.value);
      setDiffractionSlitWidth(geometry, slitWidth);
      geometry.wallX = clamp(Math.round(geometry.wallX), EDIT_MARGIN + 8, GRID_WIDTH - 1 - EDIT_MARGIN - 8);
      break;
    }
    case 'diffractionWall':
      geometry.wall.radius = clamp(
        Number(elements.wallRadius.value),
        Number(elements.wallRadius.min),
        Number(elements.wallRadius.max)
      );
      break;
    case 'reflectionDiagonal':
      setSegmentAngleAroundMidpoint(geometry.line, Number(elements.angleControl.value));
      break;
    case 'refractionAngled':
      setSegmentAngleAroundMidpoint(geometry.boundary, Number(elements.angleControl.value));
      break;
    case 'interference': {
      const sep = Number(elements.separation.value);
      const midpointY = (geometry.source1.y + geometry.source2.y) / 2;
      const halfSep = sep / 2;
      const minMid = EDIT_MARGIN + halfSep;
      const maxMid = GRID_HEIGHT - 1 - EDIT_MARGIN - halfSep;
      const clampedMid = clamp(midpointY, minMid, maxMid);
      geometry.source1.y = clampedMid - halfSep;
      geometry.source2.y = clampedMid + halfSep;
      break;
    }
    default:
      break;
  }
}

function syncControlsFromGeometry() {
  const geometry = getPresetGeometry();

  if (state.preset === 'diffraction') {
    const slitWidth = clamp(
      Math.round(geometry.slitBottomY - geometry.slitTopY),
      Number(elements.slitWidth.min),
      Number(elements.slitWidth.max)
    );
    elements.slitWidth.value = slitWidth;
  }

  if (state.preset === 'reflectionDiagonal') {
    const angle = clamp(
      Math.round(segmentAngleDegrees(geometry.line)),
      Number(elements.angleControl.min),
      Number(elements.angleControl.max)
    );
    elements.angleControl.value = angle;
  }

  if (state.preset === 'refractionAngled') {
    const angle = clamp(
      Math.round(segmentAngleDegrees(geometry.boundary)),
      Number(elements.angleControl.min),
      Number(elements.angleControl.max)
    );
    elements.angleControl.value = angle;
  }

  if (state.preset === 'interference') {
    const separation = clamp(
      Math.round(Math.hypot(geometry.source2.x - geometry.source1.x, geometry.source2.y - geometry.source1.y)),
      Number(elements.separation.min),
      Number(elements.separation.max)
    );
    elements.separation.value = separation;
  }

  if (state.preset === 'diffractionWall') {
    const wallRadius = clamp(
      Math.round(geometry.wall.radius),
      Number(elements.wallRadius.min),
      Number(elements.wallRadius.max)
    );
    elements.wallRadius.value = wallRadius;
  }

  updateRangeLabels();
}

function addEditHandle(handle) {
  state.editHandles.push({
    hitRadius: HANDLE_RADIUS_PX,
    ...handle
  });
}

function addLineEditHandles(idPrefix, segment) {
  const midpoint = segmentMidpoint(segment);
  addEditHandle({ id: `${idPrefix}-a`, role: `${idPrefix}-a`, x: segment.x0, y: segment.y0 });
  addEditHandle({ id: `${idPrefix}-b`, role: `${idPrefix}-b`, x: segment.x1, y: segment.y1 });
  addEditHandle({ id: `${idPrefix}-move`, role: `${idPrefix}-move`, x: midpoint.x, y: midpoint.y });
}

function populateSelects() {
  const presetEntries = Object.entries(PRESETS);
  for (let i = 0; i < presetEntries.length; i += 1) {
    const [id, preset] = presetEntries[i];
    const option = document.createElement('option');
    option.value = id;
    option.textContent = preset.name;
    elements.presetSelect.appendChild(option);
  }

  const themeEntries = Object.entries(THEMES);
  for (let i = 0; i < themeEntries.length; i += 1) {
    const [id, theme] = themeEntries[i];
    const option = document.createElement('option');
    option.value = id;
    option.textContent = theme.name;
    elements.themeSelect.appendChild(option);
  }
}

function updateRangeLabels() {
  elements.frequencyValue.textContent = `${formatNumber(elements.frequency.value, 1)} Hz`;
  elements.amplitudeValue.textContent = formatNumber(elements.amplitude.value, 2);
  elements.dampingValue.textContent = `${formatNumber(Number(elements.damping.value) * 100, 1)}%`;
  elements.speedValue.textContent = `${formatNumber(elements.speed.value, 2)}x`;
  elements.slitWidthValue.textContent = `${elements.slitWidth.value} px`;
  elements.angleValue.textContent = `${elements.angleControl.value}°`;
  elements.mediumRatioValue.textContent = `${Math.round(Number(elements.mediumRatio.value) * 100)}%`;
  elements.separationValue.textContent = `${elements.separation.value} px`;
  elements.wallRadiusValue.textContent = `${elements.wallRadius.value} px`;
}

function updateGuidePanel() {
  const preset = PRESETS[state.preset];
  elements.guideTitle.textContent = preset.name;
  elements.guideConcept.textContent = preset.concept;
  elements.guideGoal.textContent = preset.goal;

  elements.guideObservations.textContent = '';
  for (let i = 0; i < preset.observations.length; i += 1) {
    const item = document.createElement('li');
    item.textContent = preset.observations[i];
    elements.guideObservations.appendChild(item);
  }
}

function updateControlVisibility() {
  const enabledControls = PRESETS[state.preset].controls;
  for (let i = 0; i < controlGroups.length; i += 1) {
    const group = controlGroups[i];
    const controlKey = group.dataset.control;
    group.style.display = enabledControls.includes(controlKey) ? '' : 'none';
  }

  if (state.preset === 'refractionAngled') {
    elements.angleText.textContent = 'Boundary Angle';
  } else {
    elements.angleText.textContent = 'Mirror Angle';
  }

  if (state.preset !== 'reflectionParabolic') {
    state.focusSourceMode = false;
    elements.focusSourceBtn.classList.remove('is-active');
    elements.focusSourceBtn.textContent = 'Use Focus Source';
  }
}

function updateMetrics() {
  const frequency = Number(elements.frequency.value);
  const deepSpeed = tank.baseSpeed;
  const deepWavelength = deepSpeed / Math.max(0.1, frequency);
  elements.metricDeep.textContent = `Deep medium: v=${formatNumber(deepSpeed, 3)} | lambda=${formatNumber(deepWavelength, 3)}`;

  if (state.preset === 'refractionBoundary' || state.preset === 'refractionAngled') {
    const ratio = Number(elements.mediumRatio.value);
    const shallowSpeed = deepSpeed * ratio;
    const shallowWavelength = shallowSpeed / Math.max(0.1, frequency);
    elements.metricShallow.textContent = `Shallow medium: v=${formatNumber(shallowSpeed, 3)} | lambda=${formatNumber(shallowWavelength, 3)}`;
  } else {
    elements.metricShallow.textContent = 'Single medium active in this preset';
  }
}

function updateStatus() {
  const stateText = state.running ? 'running' : 'paused';
  const modeText = state.viewMode === 'surface3d' ? '3D' : 'top';
  const editState =
    state.viewMode === 'surface3d'
      ? ' | 3D view (switch to top view to edit geometry)'
      : state.drag
        ? ` | editing: ${state.drag.role}`
        : state.hoveredHandleId
          ? ' | drag handles to move/resize'
          : '';
  const base = `${PRESETS[state.preset].name} | ${stateText} | ${modeText}${editState}`;
  if (!state.pointer) {
    elements.statusLine.textContent = base;
    return;
  }

  const { x, y } = state.pointer;
  const index = tank.index(x, y);
  const displacement = tank.curr[index];
  const localSpeed = Math.sqrt(tank.medium[index]);
  elements.statusLine.textContent = `${base} | x=${x}, y=${y}, u=${formatNumber(displacement, 3)}, v=${formatNumber(localSpeed, 3)}`;
}

function rebuildPresetGeometry() {
  const frequency = Number(elements.frequency.value);
  const amplitude = Number(elements.amplitude.value);

  tank.clearEnvironment();
  tank.clearWaves();
  tank.dampingLoss = Number(elements.damping.value);

  state.overlayLines = [];
  state.overlayPoints = [];
  state.overlayCircles = [];
  state.editHandles = [];

  syncGeometryFromControls();

  switch (state.preset) {
    case 'diffraction':
      setupDiffractionPreset(frequency, amplitude);
      break;
    case 'diffractionWall':
      setupDiffractionWallPreset(frequency, amplitude);
      break;
    case 'reflectionFlat':
      setupReflectionFlatPreset(frequency, amplitude);
      break;
    case 'reflectionDiagonal':
      setupReflectionDiagonalPreset(frequency, amplitude);
      break;
    case 'reflectionParabolic':
      setupParabolicPreset(frequency, amplitude);
      break;
    case 'refractionBoundary':
      setupRefractionBoundaryPreset(frequency, amplitude);
      break;
    case 'refractionAngled':
      setupRefractionAngledPreset(frequency, amplitude);
      break;
    case 'interference':
      setupInterferencePreset(frequency, amplitude);
      break;
    default:
      setupDiffractionPreset(frequency, amplitude);
  }

  tank.setSourceFrequency(frequency);
  tank.setSourceAmplitude(amplitude);
  syncControlsFromGeometry();
  if (state.hoveredHandleId && !getHandleById(state.hoveredHandleId)) {
    state.hoveredHandleId = null;
  }
  updateMetrics();
  updateStatus();
}

function setupDiffractionPreset(frequency, amplitude) {
  const geometry = getPresetGeometry();
  const wallX = clamp(Math.round(geometry.wallX), EDIT_MARGIN + 8, GRID_WIDTH - 1 - EDIT_MARGIN - 8);
  const slitTopY = clamp(
    Math.round(Math.min(geometry.slitTopY, geometry.slitBottomY)),
    EDIT_MARGIN + 1,
    GRID_HEIGHT - 1 - EDIT_MARGIN - MIN_SLIT_HEIGHT
  );
  const slitBottomY = clamp(
    Math.round(Math.max(geometry.slitTopY, geometry.slitBottomY)),
    slitTopY + MIN_SLIT_HEIGHT,
    GRID_HEIGHT - 1 - EDIT_MARGIN
  );

  geometry.wallX = wallX;
  geometry.slitTopY = slitTopY;
  geometry.slitBottomY = slitBottomY;

  for (let y = 6; y < GRID_HEIGHT - 6; y += 1) {
    if (y >= slitTopY && y <= slitBottomY) {
      continue;
    }
    tank.setObstacleDisk(wallX, y, 1);
  }

  tank.addLineSource({
    x0: 6,
    y0: 6,
    x1: 6,
    y1: GRID_HEIGHT - 7,
    thickness: 1,
    frequency,
    amplitude,
    relativeAmplitude: 1
  });

  state.overlayLines.push({
    x0: wallX,
    y0: 6,
    x1: wallX,
    y1: slitTopY,
    style: 'boundary'
  });
  state.overlayLines.push({
    x0: wallX,
    y0: slitBottomY,
    x1: wallX,
    y1: GRID_HEIGHT - 7,
    style: 'boundary'
  });

  addEditHandle({
    id: 'diffraction-wall',
    role: 'diffraction-wall',
    x: wallX,
    y: (slitTopY + slitBottomY) / 2
  });
  addEditHandle({
    id: 'diffraction-slit-top',
    role: 'diffraction-slit-top',
    x: wallX,
    y: slitTopY
  });
  addEditHandle({
    id: 'diffraction-slit-bottom',
    role: 'diffraction-slit-bottom',
    x: wallX,
    y: slitBottomY
  });
}

function setupDiffractionWallPreset(frequency, amplitude) {
  const geometry = getPresetGeometry();
  const wall = geometry.wall;
  wall.x = clamp(wall.x, EDIT_MARGIN + 10, GRID_WIDTH - 1 - EDIT_MARGIN - 10);
  wall.y = clamp(wall.y, EDIT_MARGIN + 10, GRID_HEIGHT - 1 - EDIT_MARGIN - 10);
  wall.radius = clamp(wall.radius, Number(elements.wallRadius.min), Number(elements.wallRadius.max));

  tank.setObstacleDisk(wall.x, wall.y, wall.radius);

  tank.addLineSource({
    x0: 6,
    y0: 6,
    x1: 6,
    y1: GRID_HEIGHT - 7,
    thickness: 1,
    frequency,
    amplitude,
    relativeAmplitude: 1
  });

  state.overlayCircles.push({
    x: wall.x,
    y: wall.y,
    radius: wall.radius,
    style: 'boundary'
  });

  addEditHandle({
    id: 'diffraction-wall-center',
    role: 'diffraction-wall-center',
    x: wall.x,
    y: wall.y
  });
  addEditHandle({
    id: 'diffraction-wall-radius',
    role: 'diffraction-wall-radius',
    x: wall.x + wall.radius,
    y: wall.y
  });
}

function setupReflectionFlatPreset(frequency, amplitude) {
  const geometry = getPresetGeometry();
  const line = clampSegmentToBounds(geometry.line);
  geometry.line = line;
  tank.drawLineObstacle(line.x0, line.y0, line.x1, line.y1, 1);

  tank.addLineSource({
    x0: 10,
    y0: 9,
    x1: GRID_WIDTH - 11,
    y1: 9,
    thickness: 1,
    frequency,
    amplitude,
    relativeAmplitude: 1
  });

  state.overlayLines.push({
    x0: line.x0,
    y0: line.y0,
    x1: line.x1,
    y1: line.y1,
    style: 'mirror'
  });

  addLineEditHandles('reflection-flat-line', line);
}

function setupReflectionDiagonalPreset(frequency, amplitude) {
  const geometry = getPresetGeometry();
  const line = clampSegmentToBounds(geometry.line);
  geometry.line = line;

  tank.drawLineObstacle(line.x0, line.y0, line.x1, line.y1, 1);
  tank.addLineSource({
    x0: 10,
    y0: 9,
    x1: GRID_WIDTH - 11,
    y1: 9,
    thickness: 1,
    frequency,
    amplitude,
    relativeAmplitude: 1
  });

  state.overlayLines.push({ x0: line.x0, y0: line.y0, x1: line.x1, y1: line.y1, style: 'mirror' });
  addLineEditHandles('reflection-diagonal-line', line);
}

function setupParabolicPreset(frequency, amplitude) {
  const geometry = getPresetGeometry();
  const curvature = geometry.curvature;
  geometry.centerX = clamp(geometry.centerX, EDIT_MARGIN + 22, GRID_WIDTH - 1 - EDIT_MARGIN - 22);
  geometry.vertexY = clamp(geometry.vertexY, EDIT_MARGIN + 14, GRID_HEIGHT - 1 - EDIT_MARGIN - 4);
  geometry.halfSpan = clamp(geometry.halfSpan, 16, getMaxParabolaSpan(geometry));

  const centerX = geometry.centerX;
  const vertexY = geometry.vertexY;
  const minX = Math.round(centerX - geometry.halfSpan);
  const maxX = Math.round(centerX + geometry.halfSpan);

  tank.drawParabolaObstacle(centerX, vertexY, curvature, minX, maxX, 1);

  const focusY = Math.round(vertexY - 1 / (4 * curvature));
  if (state.focusSourceMode) {
    tank.addPointSource({
      x: centerX,
      y: focusY,
      radius: 1,
      frequency,
      amplitude,
      relativeAmplitude: 1
    });
  } else {
    tank.addLineSource({
      x0: 10,
      y0: 9,
      x1: GRID_WIDTH - 11,
      y1: 9,
      thickness: 1,
      frequency,
      amplitude,
      relativeAmplitude: 1
    });
  }

  state.overlayPoints.push({ x: centerX, y: focusY, style: 'focus' });
  addEditHandle({ id: 'parabola-move', role: 'parabola-move', x: centerX, y: vertexY });
  addEditHandle({
    id: 'parabola-width-right',
    role: 'parabola-width-right',
    x: centerX + geometry.halfSpan,
    y: Math.round(-curvature * geometry.halfSpan * geometry.halfSpan + vertexY)
  });
  addEditHandle({
    id: 'parabola-width-left',
    role: 'parabola-width-left',
    x: centerX - geometry.halfSpan,
    y: Math.round(-curvature * geometry.halfSpan * geometry.halfSpan + vertexY)
  });

  let previous = null;
  for (let x = minX; x <= maxX; x += 1) {
    const dx = x - centerX;
    const y = Math.round(-curvature * dx * dx + vertexY);
    if (y < 0 || y >= GRID_HEIGHT) {
      continue;
    }
    if (previous) {
      state.overlayLines.push({ x0: previous.x, y0: previous.y, x1: x, y1: y, style: 'mirror' });
    }
    previous = { x, y };
  }
}

function setupRefractionBoundaryPreset(frequency, amplitude) {
  const geometry = getPresetGeometry();
  geometry.boundaryX = clamp(Math.round(geometry.boundaryX), EDIT_MARGIN + 8, GRID_WIDTH - 1 - EDIT_MARGIN - 8);
  const boundaryX = geometry.boundaryX;
  const ratio = Number(elements.mediumRatio.value);
  const shallowSpeed = tank.baseSpeed * ratio;

  tank.setMediumRect(boundaryX, 0, GRID_WIDTH - 1, GRID_HEIGHT - 1, shallowSpeed);
  tank.addLineSource({
    x0: 8,
    y0: 6,
    x1: 8,
    y1: GRID_HEIGHT - 7,
    thickness: 1,
    frequency,
    amplitude,
    relativeAmplitude: 1
  });

  state.overlayLines.push({
    x0: boundaryX,
    y0: 0,
    x1: boundaryX,
    y1: GRID_HEIGHT - 1,
    style: 'mediumBoundary'
  });

  addEditHandle({
    id: 'refraction-boundary-move',
    role: 'refraction-boundary-move',
    x: boundaryX,
    y: GRID_HEIGHT / 2
  });
}

function setupRefractionAngledPreset(frequency, amplitude) {
  const geometry = getPresetGeometry();
  const ratio = Number(elements.mediumRatio.value);
  const shallowSpeed = tank.baseSpeed * ratio;
  const boundary = clampSegmentToBounds(geometry.boundary);
  geometry.boundary = boundary;

  const midpoint = segmentMidpoint(boundary);
  const dirLength = Math.max(1, segmentLength(boundary));
  const dirX = (boundary.x1 - boundary.x0) / dirLength;
  const dirY = (boundary.y1 - boundary.y0) / dirLength;
  const normalX = -dirY;
  const normalY = dirX;

  tank.setMediumHalfPlane(midpoint.x, midpoint.y, normalX, normalY, shallowSpeed);
  tank.addLineSource({
    x0: 8,
    y0: 8,
    x1: 8,
    y1: GRID_HEIGHT - 9,
    thickness: 1,
    frequency,
    amplitude,
    relativeAmplitude: 1
  });

  state.overlayLines.push({
    x0: boundary.x0,
    y0: boundary.y0,
    x1: boundary.x1,
    y1: boundary.y1,
    style: 'mediumBoundary'
  });

  addLineEditHandles('refraction-angled-line', boundary);
}

function setupInterferencePreset(frequency, amplitude) {
  const geometry = getPresetGeometry();
  geometry.source1.x = clamp(geometry.source1.x, EDIT_MARGIN + 4, GRID_WIDTH - 1 - EDIT_MARGIN - 4);
  geometry.source1.y = clamp(geometry.source1.y, EDIT_MARGIN + 4, GRID_HEIGHT - 1 - EDIT_MARGIN - 4);
  geometry.source2.x = clamp(geometry.source2.x, EDIT_MARGIN + 4, GRID_WIDTH - 1 - EDIT_MARGIN - 4);
  geometry.source2.y = clamp(geometry.source2.y, EDIT_MARGIN + 4, GRID_HEIGHT - 1 - EDIT_MARGIN - 4);

  const x1 = geometry.source1.x;
  const y1 = geometry.source1.y;
  const x2 = geometry.source2.x;
  const y2 = geometry.source2.y;

  tank.addPointSource({
    x: x1,
    y: y1,
    radius: 1,
    frequency,
    amplitude,
    phase: 0,
    relativeAmplitude: 1
  });
  tank.addPointSource({
    x: x2,
    y: y2,
    radius: 1,
    frequency,
    amplitude,
    phase: 0,
    relativeAmplitude: 1
  });

  state.overlayPoints.push({ x: x1, y: y1, style: 'source' });
  state.overlayPoints.push({ x: x2, y: y2, style: 'source' });

  addEditHandle({ id: 'interference-source-1', role: 'interference-source-1', x: x1, y: y1 });
  addEditHandle({ id: 'interference-source-2', role: 'interference-source-2', x: x2, y: y2 });
}

function applyPreset(presetId) {
  state.preset = presetId;
  const preset = PRESETS[presetId];
  const defaults = preset.defaults;
  resetGeometryForPreset(presetId);
  state.drag = null;
  state.hoveredHandleId = null;

  elements.presetSelect.value = presetId;
  elements.frequency.value = defaults.frequency;
  elements.amplitude.value = defaults.amplitude;
  elements.damping.value = defaults.damping;
  elements.speed.value = defaults.speed;
  elements.slitWidth.value = defaults.slitWidth;
  elements.angleControl.value = defaults.angleControl;
  elements.mediumRatio.value = defaults.mediumRatio;
  elements.separation.value = defaults.separation;
  elements.wallRadius.value = defaults.wallRadius;
  elements.showNodes.checked = defaults.showNodes;
  elements.viewMode.value = defaults.viewMode || 'top';

  state.showNodes = defaults.showNodes;
  state.viewMode = defaults.viewMode || 'top';
  state.focusSourceMode = false;
  elements.focusSourceBtn.classList.remove('is-active');
  elements.focusSourceBtn.textContent = 'Use Focus Source';

  updateRangeLabels();
  updateGuidePanel();
  updateControlVisibility();
  rebuildPresetGeometry();
}

function updateCanvasSize() {
  const rect = elements.tankCanvas.getBoundingClientRect();
  const pixelRatio = window.devicePixelRatio || 1;
  const width = Math.max(1, Math.round(rect.width * pixelRatio));
  const height = Math.max(1, Math.round(rect.height * pixelRatio));

  if (elements.tankCanvas.width !== width || elements.tankCanvas.height !== height) {
    elements.tankCanvas.width = width;
    elements.tankCanvas.height = height;
  }
}

function renderField() {
  const theme = THEMES[state.theme];
  if (state.viewMode === 'surface3d') {
    render3DSurface(theme);
    return;
  }

  const data = imageData.data;
  const current = tank.curr;
  const medium = tank.medium;
  const obstacle = tank.obstacle;
  const avgAbs = tank.avgAbs;
  const baseSpeed = tank.baseSpeed;

  const deepR = theme.bgDeep[0];
  const deepG = theme.bgDeep[1];
  const deepB = theme.bgDeep[2];
  const shallowR = theme.bgShallow[0];
  const shallowG = theme.bgShallow[1];
  const shallowB = theme.bgShallow[2];
  const crestR = theme.crest[0];
  const crestG = theme.crest[1];
  const crestB = theme.crest[2];
  const troughR = theme.trough[0];
  const troughG = theme.trough[1];
  const troughB = theme.trough[2];
  const wallR = theme.wall[0];
  const wallG = theme.wall[1];
  const wallB = theme.wall[2];
  const nodeR = theme.node[0];
  const nodeG = theme.node[1];
  const nodeB = theme.node[2];

  const gain = 7.4;
  let j = 0;

  for (let i = 0; i < tank.size; i += 1) {
    let r;
    let g;
    let b;

    if (obstacle[i]) {
      r = wallR;
      g = wallG;
      b = wallB;
    } else {
      const localSpeed = Math.sqrt(medium[i]);
      const mediumMix = clamp((baseSpeed - localSpeed) / (baseSpeed * 0.62), 0, 1);

      r = deepR + (shallowR - deepR) * mediumMix;
      g = deepG + (shallowG - deepG) * mediumMix;
      b = deepB + (shallowB - deepB) * mediumMix;

      const waveValue = current[i] * gain;
      if (waveValue >= 0) {
        const a = clamp(waveValue, 0, 1);
        r += (crestR - r) * a;
        g += (crestG - g) * a;
        b += (crestB - b) * a;
      } else {
        const a = clamp(-waveValue, 0, 1);
        r += (troughR - r) * a;
        g += (troughG - g) * a;
        b += (troughB - b) * a;
      }

      if (state.showNodes && state.preset === 'interference' && avgAbs[i] < 0.012) {
        r += (nodeR - r) * 0.72;
        g += (nodeG - g) * 0.72;
        b += (nodeB - b) * 0.72;
      }
    }

    data[j] = r;
    data[j + 1] = g;
    data[j + 2] = b;
    data[j + 3] = 255;
    j += 4;
  }

  offscreenCtx.putImageData(imageData, 0, 0);
  canvasCtx.imageSmoothingEnabled = false;
  canvasCtx.drawImage(offscreen, 0, 0, elements.tankCanvas.width, elements.tankCanvas.height);
  renderOverlay(theme);
}

function toCanvasX(gridX) {
  return ((gridX + 0.5) / GRID_WIDTH) * elements.tankCanvas.width;
}

function toCanvasY(gridY) {
  return ((gridY + 0.5) / GRID_HEIGHT) * elements.tankCanvas.height;
}

function project3DPoint(gridX, gridY, zValue = 0) {
  const w = elements.tankCanvas.width;
  const h = elements.tankCanvas.height;
  const depthT = clamp(gridY / (GRID_HEIGHT - 1), 0, 1);
  const perspective = 0.28 + depthT * 1.05;
  const centerX = w * 0.5;
  const horizon = h * 0.16;
  const depth = h * 0.78;
  const amplitudeScale = h * 0.13 * (1 - depthT * 0.35);

  return {
    x: centerX + ((gridX - GRID_WIDTH * 0.5) / GRID_WIDTH) * w * perspective,
    y: horizon + depth * depthT - zValue * amplitudeScale
  };
}

function render3DSurface(theme) {
  const w = elements.tankCanvas.width;
  const h = elements.tankCanvas.height;
  const current = tank.curr;

  const gradient = canvasCtx.createLinearGradient(0, 0, 0, h);
  gradient.addColorStop(0, 'rgba(3, 13, 19, 1)');
  gradient.addColorStop(0.42, `rgba(${theme.bgDeep[0]}, ${theme.bgDeep[1]}, ${theme.bgDeep[2]}, 1)`);
  gradient.addColorStop(1, `rgba(${theme.bgShallow[0]}, ${theme.bgShallow[1]}, ${theme.bgShallow[2]}, 1)`);
  canvasCtx.fillStyle = gradient;
  canvasCtx.fillRect(0, 0, w, h);

  canvasCtx.save();
  canvasCtx.lineCap = 'round';
  canvasCtx.lineJoin = 'round';

  for (let y = 0; y < GRID_HEIGHT; y += 2) {
    const t = y / (GRID_HEIGHT - 1);
    const alpha = 0.12 + t * 0.62;
    const mix = 0.2 + t * 0.7;
    const lineColorR = theme.trough[0] + (theme.crest[0] - theme.trough[0]) * mix;
    const lineColorG = theme.trough[1] + (theme.crest[1] - theme.trough[1]) * mix;
    const lineColorB = theme.trough[2] + (theme.crest[2] - theme.trough[2]) * mix;
    canvasCtx.strokeStyle = `rgba(${Math.round(lineColorR)}, ${Math.round(lineColorG)}, ${Math.round(lineColorB)}, ${alpha})`;
    canvasCtx.lineWidth = 0.8 + t * 1.3;

    canvasCtx.beginPath();
    let hasPoint = false;
    for (let x = 0; x < GRID_WIDTH; x += 2) {
      const z = current[tank.index(x, y)] * 1.2;
      const p = project3DPoint(x, y, z);
      if (!hasPoint) {
        canvasCtx.moveTo(p.x, p.y);
        hasPoint = true;
      } else {
        canvasCtx.lineTo(p.x, p.y);
      }
    }
    canvasCtx.stroke();
  }

  for (let x = 0; x < GRID_WIDTH; x += 8) {
    const top = project3DPoint(x, 0, 0);
    const bottom = project3DPoint(x, GRID_HEIGHT - 1, 0);
    canvasCtx.strokeStyle = 'rgba(155, 207, 224, 0.08)';
    canvasCtx.lineWidth = 1;
    canvasCtx.beginPath();
    canvasCtx.moveTo(top.x, top.y);
    canvasCtx.lineTo(bottom.x, bottom.y);
    canvasCtx.stroke();
  }

  canvasCtx.restore();

  renderOverlay(theme);
}

function toGridX(canvasX) {
  return clamp((canvasX / elements.tankCanvas.width) * GRID_WIDTH - 0.5, 0, GRID_WIDTH - 1);
}

function toGridY(canvasY) {
  return clamp((canvasY / elements.tankCanvas.height) * GRID_HEIGHT - 0.5, 0, GRID_HEIGHT - 1);
}

function getCanvasPointerPosition(event) {
  const rect = elements.tankCanvas.getBoundingClientRect();
  const scaleX = elements.tankCanvas.width / rect.width;
  const scaleY = elements.tankCanvas.height / rect.height;
  const canvasX = (event.clientX - rect.left) * scaleX;
  const canvasY = (event.clientY - rect.top) * scaleY;
  const gridX = toGridX(canvasX);
  const gridY = toGridY(canvasY);
  const cellX = clamp(Math.floor((canvasX / elements.tankCanvas.width) * GRID_WIDTH), 0, GRID_WIDTH - 1);
  const cellY = clamp(Math.floor((canvasY / elements.tankCanvas.height) * GRID_HEIGHT), 0, GRID_HEIGHT - 1);

  return { canvasX, canvasY, gridX, gridY, cellX, cellY };
}

function getHandleById(handleId) {
  for (let i = 0; i < state.editHandles.length; i += 1) {
    if (state.editHandles[i].id === handleId) {
      return state.editHandles[i];
    }
  }
  return null;
}

function findEditHandleAtCanvas(canvasX, canvasY) {
  let bestHandle = null;
  let bestDistance = Infinity;

  for (let i = 0; i < state.editHandles.length; i += 1) {
    const handle = state.editHandles[i];
    const hx = toCanvasX(handle.x);
    const hy = toCanvasY(handle.y);
    const dx = canvasX - hx;
    const dy = canvasY - hy;
    const dist2 = dx * dx + dy * dy;
    const hitRadius = handle.hitRadius || HANDLE_RADIUS_PX;

    if (dist2 <= hitRadius * hitRadius && dist2 < bestDistance) {
      bestDistance = dist2;
      bestHandle = handle;
    }
  }

  return bestHandle;
}

function assignSegment(target, source) {
  target.x0 = source.x0;
  target.y0 = source.y0;
  target.x1 = source.x1;
  target.y1 = source.y1;
}

function updateSegmentFromDrag(targetSegment, startSegment, role, gridX, gridY, dx, dy) {
  let candidate = { ...targetSegment };

  if (role.endsWith('-move')) {
    candidate = moveSegmentWithinBounds(startSegment, dx, dy);
  } else if (role.endsWith('-a')) {
    candidate = {
      x0: clamp(gridX, EDIT_MARGIN, GRID_WIDTH - 1 - EDIT_MARGIN),
      y0: clamp(gridY, EDIT_MARGIN, GRID_HEIGHT - 1 - EDIT_MARGIN),
      x1: startSegment.x1,
      y1: startSegment.y1
    };
  } else if (role.endsWith('-b')) {
    candidate = {
      x0: startSegment.x0,
      y0: startSegment.y0,
      x1: clamp(gridX, EDIT_MARGIN, GRID_WIDTH - 1 - EDIT_MARGIN),
      y1: clamp(gridY, EDIT_MARGIN, GRID_HEIGHT - 1 - EDIT_MARGIN)
    };
  }

  if (segmentLength(candidate) >= MIN_SEGMENT_LENGTH) {
    assignSegment(targetSegment, candidate);
  }
}

function applyGeometryDrag(gridX, gridY) {
  if (!state.drag || state.drag.preset !== state.preset) {
    return;
  }

  const geometry = getPresetGeometry();
  const start = state.drag.startGeometry;
  const dx = gridX - state.drag.startGridX;
  const dy = gridY - state.drag.startGridY;
  const role = state.drag.role;

  if (role === 'diffraction-wall') {
    const width = start.slitBottomY - start.slitTopY;
    const halfGap = width / 2;
    geometry.wallX = clamp(Math.round(start.wallX + dx), EDIT_MARGIN + 8, GRID_WIDTH - 1 - EDIT_MARGIN - 8);
    const centerY = (start.slitTopY + start.slitBottomY) / 2;
    const clampedCenter = clamp(centerY + dy, EDIT_MARGIN + halfGap, GRID_HEIGHT - 1 - EDIT_MARGIN - halfGap);
    geometry.slitTopY = Math.round(clampedCenter - halfGap);
    geometry.slitBottomY = Math.round(clampedCenter + halfGap);
  } else if (role === 'diffraction-slit-top') {
    geometry.wallX = clamp(Math.round(start.wallX + dx), EDIT_MARGIN + 8, GRID_WIDTH - 1 - EDIT_MARGIN - 8);
    geometry.slitBottomY = start.slitBottomY;
    geometry.slitTopY = clamp(Math.round(start.slitTopY + dy), EDIT_MARGIN + 1, start.slitBottomY - MIN_SLIT_HEIGHT);
  } else if (role === 'diffraction-slit-bottom') {
    geometry.wallX = clamp(Math.round(start.wallX + dx), EDIT_MARGIN + 8, GRID_WIDTH - 1 - EDIT_MARGIN - 8);
    geometry.slitTopY = start.slitTopY;
    geometry.slitBottomY = clamp(
      Math.round(start.slitBottomY + dy),
      start.slitTopY + MIN_SLIT_HEIGHT,
      GRID_HEIGHT - 1 - EDIT_MARGIN
    );
  } else if (role === 'diffraction-wall-center') {
    geometry.wall.x = clamp(start.wall.x + dx, EDIT_MARGIN + start.wall.radius, GRID_WIDTH - 1 - EDIT_MARGIN - start.wall.radius);
    geometry.wall.y = clamp(start.wall.y + dy, EDIT_MARGIN + start.wall.radius, GRID_HEIGHT - 1 - EDIT_MARGIN - start.wall.radius);
  } else if (role === 'diffraction-wall-radius') {
    const nextRadius = Math.hypot(gridX - start.wall.x, gridY - start.wall.y);
    geometry.wall.radius = clamp(nextRadius, Number(elements.wallRadius.min), Number(elements.wallRadius.max));
    geometry.wall.x = clamp(start.wall.x, EDIT_MARGIN + geometry.wall.radius, GRID_WIDTH - 1 - EDIT_MARGIN - geometry.wall.radius);
    geometry.wall.y = clamp(start.wall.y, EDIT_MARGIN + geometry.wall.radius, GRID_HEIGHT - 1 - EDIT_MARGIN - geometry.wall.radius);
  } else if (role.startsWith('reflection-flat-line-')) {
    updateSegmentFromDrag(geometry.line, start.line, role, gridX, gridY, dx, dy);
  } else if (role.startsWith('reflection-diagonal-line-')) {
    updateSegmentFromDrag(geometry.line, start.line, role, gridX, gridY, dx, dy);
  } else if (role.startsWith('refraction-angled-line-')) {
    updateSegmentFromDrag(geometry.boundary, start.boundary, role, gridX, gridY, dx, dy);
  } else if (role === 'refraction-boundary-move') {
    geometry.boundaryX = clamp(Math.round(start.boundaryX + dx), EDIT_MARGIN + 8, GRID_WIDTH - 1 - EDIT_MARGIN - 8);
  } else if (role === 'parabola-move') {
    geometry.centerX = clamp(start.centerX + dx, EDIT_MARGIN + 22, GRID_WIDTH - 1 - EDIT_MARGIN - 22);
    geometry.vertexY = clamp(start.vertexY + dy, EDIT_MARGIN + 14, GRID_HEIGHT - 1 - EDIT_MARGIN - 4);
    geometry.halfSpan = clamp(start.halfSpan, 16, getMaxParabolaSpan(geometry));
  } else if (role === 'parabola-width-right') {
    geometry.halfSpan = clamp(start.halfSpan + dx, 16, getMaxParabolaSpan(start));
  } else if (role === 'parabola-width-left') {
    geometry.halfSpan = clamp(start.halfSpan - dx, 16, getMaxParabolaSpan(start));
  } else if (role === 'interference-source-1') {
    geometry.source1.x = clamp(gridX, EDIT_MARGIN + 4, GRID_WIDTH - 1 - EDIT_MARGIN - 4);
    geometry.source1.y = clamp(gridY, EDIT_MARGIN + 4, GRID_HEIGHT - 1 - EDIT_MARGIN - 4);
  } else if (role === 'interference-source-2') {
    geometry.source2.x = clamp(gridX, EDIT_MARGIN + 4, GRID_WIDTH - 1 - EDIT_MARGIN - 4);
    geometry.source2.y = clamp(gridY, EDIT_MARGIN + 4, GRID_HEIGHT - 1 - EDIT_MARGIN - 4);
  }

  syncControlsFromGeometry();
  state.needsRebuild = true;
}

function renderOverlay(theme) {
  const is3D = state.viewMode === 'surface3d';
  const mapPoint = (gx, gy) => {
    if (is3D) {
      const z = tank.curr[tank.index(clamp(Math.round(gx), 0, GRID_WIDTH - 1), clamp(Math.round(gy), 0, GRID_HEIGHT - 1))];
      return project3DPoint(gx, gy, z);
    }
    return { x: toCanvasX(gx), y: toCanvasY(gy) };
  };

  canvasCtx.save();
  canvasCtx.imageSmoothingEnabled = true;
  canvasCtx.lineCap = 'round';
  canvasCtx.lineJoin = 'round';
  const baseLineWidth = Math.max(1, elements.tankCanvas.width / 430);

  for (let i = 0; i < state.overlayLines.length; i += 1) {
    const line = state.overlayLines[i];
    const a = mapPoint(line.x0, line.y0);
    const b = mapPoint(line.x1, line.y1);

    if (line.style === 'mirror') {
      canvasCtx.strokeStyle = 'rgba(228, 239, 246, 0.92)';
      canvasCtx.lineWidth = baseLineWidth * 3.2;
      canvasCtx.shadowColor = 'rgba(228, 239, 246, 0.4)';
      canvasCtx.shadowBlur = is3D ? 4 : 7;
      canvasCtx.beginPath();
      canvasCtx.moveTo(a.x, a.y);
      canvasCtx.lineTo(b.x, b.y);
      canvasCtx.stroke();

      canvasCtx.shadowBlur = 0;
      canvasCtx.strokeStyle = 'rgba(126, 225, 215, 0.82)';
      canvasCtx.lineWidth = baseLineWidth * 1.2;
      canvasCtx.beginPath();
      canvasCtx.moveTo(a.x, a.y);
      canvasCtx.lineTo(b.x, b.y);
      canvasCtx.stroke();
      continue;
    }

    canvasCtx.shadowBlur = 0;
    canvasCtx.lineWidth = baseLineWidth * (line.style === 'mediumBoundary' ? 2 : 2.4);
    canvasCtx.strokeStyle = line.style === 'mediumBoundary' ? 'rgba(126, 225, 215, 0.95)' : theme.line;
    canvasCtx.beginPath();
    canvasCtx.moveTo(a.x, a.y);
    canvasCtx.lineTo(b.x, b.y);
    canvasCtx.stroke();
  }

  for (let i = 0; i < state.overlayCircles.length; i += 1) {
    const circle = state.overlayCircles[i];
    const center = mapPoint(circle.x, circle.y);
    const edge = mapPoint(circle.x + circle.radius, circle.y);
    const radius = Math.max(2, Math.hypot(edge.x - center.x, edge.y - center.y));

    canvasCtx.strokeStyle = theme.line;
    canvasCtx.lineWidth = baseLineWidth * 2.2;
    canvasCtx.beginPath();
    canvasCtx.arc(center.x, center.y, radius, 0, TWO_PI);
    canvasCtx.stroke();
  }

  for (let i = 0; i < state.overlayPoints.length; i += 1) {
    const point = state.overlayPoints[i];
    const mapped = mapPoint(point.x, point.y);
    const x = mapped.x;
    const y = mapped.y;

    if (point.style === 'focus') {
      canvasCtx.strokeStyle = 'rgba(255, 125, 110, 0.92)';
      canvasCtx.beginPath();
      canvasCtx.moveTo(x - 6, y);
      canvasCtx.lineTo(x + 6, y);
      canvasCtx.moveTo(x, y - 6);
      canvasCtx.lineTo(x, y + 6);
      canvasCtx.stroke();
    } else {
      canvasCtx.fillStyle = theme.point;
      canvasCtx.beginPath();
      canvasCtx.arc(x, y, 3.2, 0, TWO_PI);
      canvasCtx.fill();
    }
  }

  if (is3D) {
    canvasCtx.restore();
    return;
  }

  for (let i = 0; i < state.editHandles.length; i += 1) {
    const handle = state.editHandles[i];
    const x = toCanvasX(handle.x);
    const y = toCanvasY(handle.y);
    const isActive = state.drag && state.drag.handleId === handle.id;
    const isHover = !isActive && state.hoveredHandleId === handle.id;
    const radius = isActive ? 7.2 : isHover ? 6.5 : 5.6;

    canvasCtx.fillStyle = isActive ? 'rgba(255, 125, 110, 0.95)' : isHover ? 'rgba(255, 239, 181, 0.96)' : 'rgba(126, 225, 215, 0.9)';
    canvasCtx.strokeStyle = 'rgba(3, 16, 24, 0.9)';
    canvasCtx.lineWidth = 1.4;

    canvasCtx.beginPath();
    canvasCtx.arc(x, y, radius, 0, TWO_PI);
    canvasCtx.fill();
    canvasCtx.stroke();
  }

  canvasCtx.restore();
}

function runSimulationStep() {
  const speed = Number(elements.speed.value);
  const substeps = Math.max(1, Math.round(speed * 2));
  const dt = (1 / 60) * (speed / substeps);

  for (let i = 0; i < substeps; i += 1) {
    tank.step(dt);
  }
}

function animationLoop(time) {
  requestAnimationFrame(animationLoop);

  const fpsTarget = state.reducedMotion ? 24 : 60;
  const frameInterval = 1000 / fpsTarget;

  if (time - state.lastFrameTime < frameInterval) {
    return;
  }

  if (state.needsRebuild) {
    state.needsRebuild = false;
    rebuildPresetGeometry();
  }

  if (state.running) {
    runSimulationStep();
  }

  renderField();
  updateStatus();
  state.lastFrameTime = time;
}

function bindEvents() {
  elements.presetSelect.addEventListener('change', () => {
    applyPreset(elements.presetSelect.value);
  });

  elements.themeSelect.addEventListener('change', () => {
    state.theme = elements.themeSelect.value;
  });

  elements.viewMode.addEventListener('change', () => {
    if (state.drag && elements.tankCanvas.hasPointerCapture(state.drag.pointerId)) {
      elements.tankCanvas.releasePointerCapture(state.drag.pointerId);
    }
    state.viewMode = elements.viewMode.value;
    state.drag = null;
    state.hoveredHandleId = null;
    elements.tankCanvas.style.cursor = state.viewMode === 'surface3d' ? 'default' : 'crosshair';
  });

  elements.playBtn.addEventListener('click', () => {
    state.running = !state.running;
    elements.playBtn.textContent = state.running ? 'Pause' : 'Play';
    updateStatus();
  });

  elements.stepBtn.addEventListener('click', () => {
    if (state.running) {
      state.running = false;
      elements.playBtn.textContent = 'Play';
    }
    runSimulationStep();
    renderField();
    updateStatus();
  });

  elements.clearBtn.addEventListener('click', () => {
    tank.clearWaves();
    updateStatus();
  });

  elements.resetBtn.addEventListener('click', () => {
    applyPreset(state.preset);
  });

  elements.frequency.addEventListener('input', () => {
    updateRangeLabels();
    tank.setSourceFrequency(Number(elements.frequency.value));
    updateMetrics();
  });

  elements.amplitude.addEventListener('input', () => {
    updateRangeLabels();
    tank.setSourceAmplitude(Number(elements.amplitude.value));
  });

  elements.damping.addEventListener('input', () => {
    updateRangeLabels();
    tank.dampingLoss = Number(elements.damping.value);
  });

  elements.speed.addEventListener('input', () => {
    updateRangeLabels();
  });

  elements.slitWidth.addEventListener('input', () => {
    updateRangeLabels();
    state.needsRebuild = true;
  });

  elements.angleControl.addEventListener('input', () => {
    updateRangeLabels();
    state.needsRebuild = true;
  });

  elements.mediumRatio.addEventListener('input', () => {
    updateRangeLabels();
    updateMetrics();
    state.needsRebuild = true;
  });

  elements.separation.addEventListener('input', () => {
    updateRangeLabels();
    state.needsRebuild = true;
  });

  elements.wallRadius.addEventListener('input', () => {
    updateRangeLabels();
    state.needsRebuild = true;
  });

  elements.showNodes.addEventListener('change', () => {
    state.showNodes = elements.showNodes.checked;
  });

  elements.reducedMotion.addEventListener('change', () => {
    state.reducedMotion = elements.reducedMotion.checked;
  });

  elements.saveScreenshotBtn.addEventListener('click', () => {
    saveScreenshot();
  });

  elements.saveReportBtn.addEventListener('click', () => {
    saveNotesReport();
  });

  elements.focusSourceBtn.addEventListener('click', () => {
    if (state.preset !== 'reflectionParabolic') {
      return;
    }

    state.focusSourceMode = !state.focusSourceMode;
    elements.focusSourceBtn.classList.toggle('is-active', state.focusSourceMode);
    elements.focusSourceBtn.textContent = state.focusSourceMode ? 'Use Top Line Source' : 'Use Focus Source';
    state.needsRebuild = true;
  });

  window.addEventListener('resize', () => {
    updateCanvasSize();
  });

  elements.tankCanvas.addEventListener('pointerdown', (event) => {
    const pointer = getCanvasPointerPosition(event);
    state.pointer = { x: pointer.cellX, y: pointer.cellY };
    if (state.viewMode === 'surface3d') {
      state.hoveredHandleId = null;
      return;
    }

    const handle = findEditHandleAtCanvas(pointer.canvasX, pointer.canvasY);
    state.hoveredHandleId = handle ? handle.id : null;

    if (handle) {
      state.drag = {
        pointerId: event.pointerId,
        preset: state.preset,
        handleId: handle.id,
        role: handle.role,
        startGridX: pointer.gridX,
        startGridY: pointer.gridY,
        startGeometry: deepCopy(getPresetGeometry())
      };
      elements.tankCanvas.setPointerCapture(event.pointerId);
      elements.tankCanvas.style.cursor = 'grabbing';
      event.preventDefault();
    }
  });

  elements.tankCanvas.addEventListener('pointermove', (event) => {
    const pointer = getCanvasPointerPosition(event);
    state.pointer = { x: pointer.cellX, y: pointer.cellY };

    if (state.viewMode === 'surface3d') {
      state.hoveredHandleId = null;
      elements.tankCanvas.style.cursor = 'default';
      return;
    }

    if (state.drag && state.drag.pointerId === event.pointerId) {
      applyGeometryDrag(pointer.gridX, pointer.gridY);
      elements.tankCanvas.style.cursor = 'grabbing';
      return;
    }

    const handle = findEditHandleAtCanvas(pointer.canvasX, pointer.canvasY);
    state.hoveredHandleId = handle ? handle.id : null;
    elements.tankCanvas.style.cursor = handle ? 'grab' : 'crosshair';
  });

  const stopDrag = (event) => {
    if (!state.drag || state.drag.pointerId !== event.pointerId) {
      return;
    }

    if (elements.tankCanvas.hasPointerCapture(event.pointerId)) {
      elements.tankCanvas.releasePointerCapture(event.pointerId);
    }
    state.drag = null;
    elements.tankCanvas.style.cursor = state.hoveredHandleId ? 'grab' : 'crosshair';
  };

  elements.tankCanvas.addEventListener('pointerup', stopDrag);
  elements.tankCanvas.addEventListener('pointercancel', stopDrag);

  elements.tankCanvas.addEventListener('pointerleave', () => {
    if (!state.drag) {
      state.pointer = null;
      state.hoveredHandleId = null;
      elements.tankCanvas.style.cursor = 'default';
      updateStatus();
    }
  });

  window.addEventListener('keydown', (event) => {
    const tag = document.activeElement ? document.activeElement.tagName : '';
    if (tag === 'TEXTAREA' || tag === 'INPUT' || tag === 'SELECT') {
      return;
    }

    if (event.code === 'Space') {
      event.preventDefault();
      state.running = !state.running;
      elements.playBtn.textContent = state.running ? 'Pause' : 'Play';
      updateStatus();
    }

    if (event.key.toLowerCase() === 'r') {
      tank.clearWaves();
      updateStatus();
    }

    if (event.key.toLowerCase() === 's') {
      saveScreenshot();
    }
  });
}

function init() {
  populateSelects();
  bindEvents();

  state.theme = 'atlantic';
  elements.themeSelect.value = state.theme;

  updateCanvasSize();
  elements.tankCanvas.style.cursor = 'crosshair';
  applyPreset(state.preset);
  requestAnimationFrame(animationLoop);
}

init();
