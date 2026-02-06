# Ripple Lab Studio

A modern, lab-ready ripple tank simulation built as a replacement for the Falstad ripple tank interface.

This project is designed around your original activity flow:
- Diffraction
- Diffraction around an obstacle wall
- Reflection (flat, diagonal, parabolic)
- Refraction (boundary and angled boundary)
- Interference (two coherent sources)

## Why this version is better for class use

- Modern visual design with high-contrast themes and responsive layout.
- Guided observation prompts aligned to each physics concept.
- Preset scenarios so students focus on the intended phenomenon first.
- Control-of-variables friendly UI with clear, labeled sliders.
- Accessibility options including reduced motion mode and calmer color themes.
- Quantitative readouts (local displacement/speed, predicted wavelength estimates).
- Optional absorbing boundaries so edge reflections are off by default.
- In-canvas amplitude probe tool for point measurements.
- Worksheet response panel with DOCX export for completed student work.

## Quick start

No dependencies are required.

1. Open a terminal in this repo.
2. Run a local static server:

```bash
python3 -m http.server 8000
```

3. Open [http://localhost:8000/src/index.html](http://localhost:8000/src/index.html).

## Controls

- `Preset`: switches between lab phenomena.
- `Pause / Step / Clear Waves / Reset Preset`: structured exploration workflow.
- `Frequency, Amplitude, Damping Loss (0% allowed), Simulation Speed`: wave behavior controls.
- `Wave Type`: plane, point, dual in-phase/out-of-phase, and angled plane sources.
- Geometry controls appear only when relevant to the selected preset (including movable/resizable obstacle box in wall diffraction).
- Direct manipulation: drag on-canvas handles to move and resize mirrors, slit openings, boundaries, and sources.
- `View Mode`: top-down field view or 3D surface view.
- `Edge Behavior`: absorbing edges (default, no end-wall reflections) or reflective walls.
- `Enable amplitude probe`: place/drag a probe and read local amplitude + peak.
- `Show estimated node lines`: highlights stable destructive-interference bands.
- `Reduced motion mode`: lowers visual intensity and frame rate.
- `Save Screenshot`: downloads a PNG of the current simulation frame.
- `Download Notes DOCX`: downloads a `.docx` document with screenshot, settings, worksheet responses, and student notes.

Keyboard shortcuts:
- `Space`: Play/pause
- `R`: Clear waves
- `S`: Save screenshot

Startup behavior:
- The simulation starts paused by default; waves begin only after pressing `Play`.

## Repository structure

- `/Users/vladimir.lopez/Documents/Projects/AI/Ripple Tank Sim/src/index.html` - UI layout and control panels
- `/Users/vladimir.lopez/Documents/Projects/AI/Ripple Tank Sim/src/styles.css` - visual system and responsive styling
- `/Users/vladimir.lopez/Documents/Projects/AI/Ripple Tank Sim/src/main.js` - ripple solver, presets, and interaction logic
- `/Users/vladimir.lopez/Documents/Projects/AI/Ripple Tank Sim/docs/simulation-plan.md` - implementation plan and roadmap
- `/Users/vladimir.lopez/Documents/Projects/AI/Ripple Tank Sim/docs/lab-alignment.md` - mapping from your lab steps to simulator presets

## Next build targets

- Measurement tools (angle ruler, wavelength ruler, live probe graph).
- Optional challenge mode with prediction checkpoints.
- Teacher dashboard for preset locking and class pacing.
