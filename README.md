# Ripple Lab Studio

A modern, lab-ready ripple tank simulation built as a replacement for the Falstad ripple tank interface.

This project is designed around your original activity flow:
- Diffraction
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
- `Frequency, Amplitude, Damping, Simulation Speed`: wave behavior controls.
- Geometry controls appear only when relevant to the selected preset.
- Direct manipulation: drag on-canvas handles to move and resize mirrors, slit openings, boundaries, and sources.
- `Show estimated node lines`: highlights stable destructive-interference bands.
- `Reduced motion mode`: lowers visual intensity and frame rate.

Keyboard shortcuts:
- `Space`: Play/pause
- `R`: Clear waves

## Repository structure

- `/Users/vladimir.lopez/Documents/Projects/AI/Ripple Tank Sim/src/index.html` - UI layout and control panels
- `/Users/vladimir.lopez/Documents/Projects/AI/Ripple Tank Sim/src/styles.css` - visual system and responsive styling
- `/Users/vladimir.lopez/Documents/Projects/AI/Ripple Tank Sim/src/main.js` - ripple solver, presets, and interaction logic
- `/Users/vladimir.lopez/Documents/Projects/AI/Ripple Tank Sim/docs/simulation-plan.md` - implementation plan and roadmap
- `/Users/vladimir.lopez/Documents/Projects/AI/Ripple Tank Sim/docs/lab-alignment.md` - mapping from your lab steps to simulator presets

## Next build targets

- Student worksheet mode with embedded prompts and export.
- Measurement tools (angle ruler, wavelength ruler, probe graphs).
- Optional challenge mode with prediction checkpoints.
- Teacher dashboard for preset locking and class pacing.
