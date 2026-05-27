# iPhone 14 Pro Emulator — High-Fidelity Spec

**Source**: Specialized Mobile Prototype Engineer subagent (2026-05-27)
**Goal**: Highest possible visual and interactive fidelity for the Yeki VPN UI Kit showcase.

## Physical Reference
- Device: iPhone 14 Pro
- Logical content area: 390 × 844 pt (we use 375 × 812 for our app frames to match Figma exactly)
- Outer corner radius: ~58-60 px (scaled)
- Dynamic Island: ~126-128 px wide × 29-30 px tall pill

## Required Visual Layers (from Figma reference + real device)
1. **Frame / Bezel**
   - Multi-layer metallic gradients (space black / titanium / silver options)
   - Bevel highlights + brushed texture simulation
   - Antenna segmentation bands (subtle horizontal lines on sides)

2. **Glass + Reflections**
   - Layered specular highlights driven by device tilt angle
   - Inner inset shadow for glass depth

3. **Dynamic Island**
   - Accurate pill shape with camera lens dot + speaker/sensor slit
   - Positioned correctly relative to status bar "ears"

4. **Hardware Buttons**
   - Left: Silent switch (small, top) + two volume buttons
   - Right: Longer power button
   - Subtle press/depth feedback on interactive mode

5. **Rear Camera Module** (visible on strong tilt)
   - 3-lens cluster + flash
   - Should appear via 3D transform when device is tilted

6. **Status Bar**
   - Configurable (live clock, signal strength 0-4, Wi-Fi, battery %)
   - Proper SF Pro style typography simulation

7. **Home Indicator**
   - Thin rounded bar at bottom

## Interactive Features (for Prototype Lab)
- **3D Tilt**: Mouse drag / touch with smooth lerp (60 fps)
- Perspective: ~1600 px
- Real-time specular angle update via CSS custom property
- Optional static default tilt for marketing screenshots

## Current Implementation Status in Project
- We have a solid working `PhoneFrame.tsx` (CSS-based, good tilt, Dynamic Island, side buttons).
- The advanced spec above (with full metallic layering, camera bump on tilt, advanced reflections, live clock status bar) was designed by the subagent.
- For stability we are incrementally merging the best ideas into the existing `PhoneFrame` rather than replacing it wholesale.

## Recommended Future Upgrades (when time allows)
- Extract the advanced version as `iPhone14Pro` component (with separate .css)
- Add `frameColor` prop: 'space-black' | 'titanium' | 'silver'
- Add `showCameraModule` and realistic 3D camera transform on tilt
- Make status bar icons (signal bars, battery) pure CSS + small SVGs for crispness
- Support for "live clock" that actually ticks

This document + the reference image `reference/iphone14pro-figma.png` should be used for any future fidelity improvements.
