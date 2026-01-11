# Storybook Patterns (CSF3)

## Basic Story

```typescript
import type { Meta, StoryObj } from "@storybook/react";
import { ComponentName } from "./ComponentName";

const meta = {
  title: "Path/ComponentName",
  component: ComponentName,
  tags: ["autodocs"],
} satisfies Meta<typeof ComponentName>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithProps: Story = {
  args: {
    variant: "primary",
    disabled: false,
  },
};
```

## With Actions

```typescript
import { fn } from "@storybook/test";

const meta = {
  title: "Path/ComponentName",
  component: ComponentName,
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof ComponentName>;
```

## With Decorators

```typescript
const meta = {
  title: "Path/ComponentName",
  component: ComponentName,
  decorators: [
    (Story) => (
      <div style={{ padding: "1rem" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ComponentName>;
```

## Story Variants

```typescript
export const Primary: Story = {
  args: { variant: "primary" },
};

export const Secondary: Story = {
  args: { variant: "secondary" },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Loading: Story = {
  args: { isLoading: true },
};
```

## Title Organization

```
Components/
├── Atoms/Button
├── Atoms/Input
├── Molecules/SearchBar
└── Organisms/Header
```
