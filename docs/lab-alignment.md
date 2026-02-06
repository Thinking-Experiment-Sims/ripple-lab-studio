# Lab Alignment: Original Activity to New Simulator

This map translates your original "Virtual Ripple Tank" worksheet flow into Ripple Lab Studio presets and controls.

## Part 1: Diffraction

Original task focus:
- wave behavior behind obstacles and slits,
- frequency vs wavelength,
- gap size vs diffraction and shadow.

Use in simulator:
- Preset: `Diffraction Through a Slit`
- Controls: `Frequency`, `Slit Width`, `Clear Waves`

Suggested sequence:
1. Start with low frequency and default slit width.
2. Increase frequency in steps and clear waves between runs.
3. Increase slit width and compare shadow regions.

Expected observation pattern:
- Higher frequency (shorter wavelength) gives weaker spreading.
- Wider slit gives weaker diffraction and sharper shadow zones.

## Part 2: Reflection

### Flat mirror

Use in simulator:
- Preset: `Reflection: Flat Mirror`
- Controls: `Pause`, `Step`, `Clear Waves`

Expected observation:
- Reflected fronts preserve spacing and mirror incident direction.

### Diagonal mirror

Use in simulator:
- Preset: `Reflection: Diagonal Mirror`
- Controls: `Mirror Angle`, `Pause`, `Step`

Expected observation:
- As wall angle changes, reflected direction changes consistently with angle-in equals angle-out.

### Parabolic mirror

Use in simulator:
- Preset: `Reflection: Parabolic Mirror`
- Controls: `Use Focus Source` toggle

Expected observation:
- Plane-wave input reflects toward a focal region.
- Focus source reflects into near-parallel outgoing fronts.

## Part 3: Refraction

### Medium change

Use in simulator:
- Preset: `Refraction: Medium Change`
- Controls: `Shallow Medium Ratio`, `Frequency`

Expected observation:
- Lower wave speed in shallow region.
- Wavelength changes with medium; source frequency remains fixed.

### Medium at an angle

Use in simulator:
- Preset: `Refraction: Angled Boundary`
- Controls: `Boundary Angle`, `Shallow Medium Ratio`

Expected observation:
- Wave direction bends at the interface.
- Stronger speed contrast gives stronger bending.

## Part 4: Interference

Original task focus:
- two coherent sources,
- stable nodes,
- effects of frequency and source spacing.

Use in simulator:
- Preset: `Interference: Two Sources`
- Controls: `Frequency`, `Source Separation`, `Show estimated node lines`

Suggested sequence:
1. Start at frequency 4 and identify node lines.
2. Try frequency 2, then 6; compare node density.
3. Move sources close together, then far apart.

Expected observation pattern:
- Higher frequency creates denser node/antinode spacing.
- Changing source separation alters number and spacing of nodes.
