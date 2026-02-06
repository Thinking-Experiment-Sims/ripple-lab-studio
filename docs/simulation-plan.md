# Simulation Plan: Ripple Lab Studio

## 1) Product objective

Build a modern, browser-based ripple tank simulator that keeps the conceptual strengths of Falstad while improving:
- visual clarity,
- student usability,
- inquiry workflow support,
- accessibility and comfort.

Primary audience:
- honors physics students running guided investigations,
- teachers leading whole-class demonstrations.

## 2) Evidence-informed design principles

The design uses common physics-education and learning-science principles (as used in research-backed simulation design, including PhET-style approaches):

1. Guided inquiry with bounded freedom
- Students start with a concept preset, then vary a small set of relevant controls.
- This lowers setup friction while preserving exploration.

2. Control of variables
- Controls are grouped and labeled by role (wave settings vs geometry).
- Presets expose only relevant geometry controls to reduce confounds.

3. Multiple representations
- Dynamic field view (crest/trough map),
- numerical readouts (predicted wavelength in each medium),
- local probe readout (position, displacement, local wave speed).

4. Fast feedback loops
- Real-time response to parameter changes,
- pause/step/clear actions for close observation,
- stable presets for repeatable comparisons.

5. Cognitive load management
- Scenario-specific prompts in the side panel,
- clear hierarchy, concise text, high-signal controls,
- consistent interaction pattern across all phenomena.

6. Accessibility and comfort
- Reduced-motion mode,
- color-theme options with high contrast,
- no flashing strobe effects by default.

## 3) UX strategy

### Information architecture

- Left panel: controls and parameters.
- Center: simulation stage.
- Right panel: conceptual framing + observation prompts + lab notes.

### Interaction model

- Choose preset.
- Run, pause, and step.
- Change one variable at a time.
- Record observations in notes panel.

### Visual language

- Distinct custom palette and non-default typography.
- Layered gradient background and glass-style panels.
- Gentle entrance animation, with reduced-motion override.

## 4) Physics model (implemented)

- 2D finite-difference wave propagation on a grid.
- Damping and edge absorption to reduce unrealistic boundary reflections.
- Obstacle mask for walls/mirrors/slits.
- Variable medium-speed map for refraction zones.
- Coherent source injection for interference patterns.

## 5) Presets (implemented)

- Diffraction through slit
- Reflection flat mirror
- Reflection diagonal mirror
- Reflection parabolic mirror (with optional focus source)
- Refraction medium boundary
- Refraction angled boundary
- Interference two sources

## 6) Build roadmap

## Phase A (done)
- Base solver and modern UI shell
- Lab-aligned presets and control panel
- Guided observation content
- Accessibility toggles and theme system

## Phase B (recommended next)
- Measurement tools (virtual ruler, angle protractor, wavelength tool)
- Snapshot and compare mode (A/B overlays)
- Time-series probe chart for amplitude vs time

## Phase C (recommended next)
- Structured assignment mode with checkpoint prompts
- Exportable lab report template (PDF/Google Docs friendly)
- Teacher controls for locked presets and paced release

## 7) Success criteria

- Students can complete all four lab topics from one interface.
- Students can quickly locate and change relevant variables.
- Students can produce observations with less setup overhead.
- Teachers can demo each phenomenon in under 30 seconds of setup.
