---
name: design-system
description: Design guidelines for distinctive UI. Auto-loads when building components, styling interfaces, or making design decisions.
---

Design guidelines for creating distinctive interfaces that avoid generic AI aesthetics.

---

## Design Thinking

Before coding, commit to a **bold aesthetic direction**:

| Direction | Character |
|-----------|-----------|
| Brutally minimal | Stark, purposeful emptiness |
| Maximalist | Rich, layered, abundant |
| Retro-futuristic | Nostalgic tech meets tomorrow |
| Luxury/refined | Subtle, premium, considered |
| Playful | Energetic, unexpected, fun |
| Editorial | Magazine-inspired, typographic |
| Industrial | Raw, functional, utilitarian |

---

## Typography

Choose fonts that are **distinctive**, not defaults:

**Avoid:**
- Arial, Helvetica
- Inter, Roboto
- System defaults

**Do:**
- Pair display + body fonts intentionally
- Use variable fonts for flexibility
- Consider the emotional weight of type

---

## Color & Theme

- Use CSS variables for theming
- Dominant color with decisive accents
- Avoid generic blue (#3B82F6) everywhere
- Consider dark mode from the start

```css
:root {
  --color-primary: #...;
  --color-accent: #...;
  --color-background: #...;
  --color-text: #...;
}
```

---

## Motion & Animation

- High-impact animations on **key moments**
- CSS transitions and scroll-triggered effects
- Hover states with personality
- Page load reveals for maximum impact

```css
.element {
  transition: transform 0.2s ease-out;
}

.element:hover {
  transform: translateY(-2px);
}
```

---

## Spatial Composition

- Use unexpected layouts
- Embrace asymmetry
- Consider overlap and diagonal flow
- Break the predictable grid when appropriate

---

## Anti-Patterns to Avoid

| Don't | Why |
|-------|-----|
| Default framework colors | Every AI uses them |
| Inter/Roboto everywhere | Zero character |
| Symmetric card grids | Predictable, boring |
| Blue buttons on white | Cookie-cutter |
| Generic gradients | Overused, bland |
| Stock illustration style | Instantly recognizable as AI |

---

## Visual Details

Create atmosphere through:
- Gradients with intention
- Textures and patterns
- Contextual effects
- Micro-interactions
- Considered shadows

---

## Component Patterns

### Server vs Client Components

- Use Server Components by default (no directive)
- Add `"use client"` only when needed (hooks, interactivity, browser APIs)
- Keep client components as small as possible

### Accessibility

- Use semantic HTML elements
- Include proper ARIA attributes
- Ensure keyboard navigation works
- Test with screen readers

---

## Design Mindset

- **Be intentional** - Every decision should have a reason
- **Be distinctive** - Stand out from AI-generated sameness
- **Be consistent** - Build a cohesive system
- **Be bold** - Commit to your aesthetic direction
- **Match complexity to vision** - Maximalist designs need elaborate implementation; minimal designs need restraint
