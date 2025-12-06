# Kayra Robotics Landing Page

A modern, high-conversion landing page for Kayra Robotics - showcasing autonomous Unmanned Surface Vehicles (USV/IDA).

## Tech Stack

- **Framework:** Next.js 14 (React)
- **Styling:** Tailwind CSS with custom design system
- **Animations:** Framer Motion
- **UI:** Glassmorphism & Bento Grid Layout
- **Carousel:** Embla Carousel
- **Icons:** Lucide React

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── globals.css      # Global styles & Tailwind imports
│   ├── layout.tsx       # Root layout with metadata
│   └── page.tsx         # Main landing page
├── components/
│   ├── Navbar.tsx       # Fixed glassmorphism navbar
│   ├── HeroSection.tsx  # Split-screen hero with floating boat
│   ├── TechSpecsBento.tsx  # Interactive bento grid specs
│   ├── ProductShowcase.tsx # Interactive hotspot explorer
│   ├── MissionScenarios.tsx # Carousel mission cards
│   └── Footer.tsx       # Minimal tech footer
```

## Design System

### Colors
- Primary Navy: `#0B1C3E`
- Metallic Silver: `#D1D5DB`
- Ocean Blue: `#0077BE`
- Highlight Cyan: `#00F0FF`
- Dark Contrast: `#050A14`

### Typography
- Headings: Exo 2 / Rajdhani
- Body: Inter / Roboto

## Features

- Glassmorphism UI effects
- Scroll-triggered animations
- Interactive boat hotspots
- Responsive bento grid
- Smooth carousel navigation
- Newsletter signup
- Mobile-optimized

## Adding USV Image

Replace the placeholder boat SVG in `HeroSection.tsx` and `ProductShowcase.tsx` with your actual USV image:

```tsx
import Image from 'next/image'

<Image
  src="/usv-boat.png"
  alt="Kayra USV"
  width={600}
  height={400}
  className="object-contain"
/>
```

Place your image in the `public/` folder.
