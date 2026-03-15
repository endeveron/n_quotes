---
name: feature-setup
description: Guidelines for creating a new feature based on the project code style and structure.
---

# Feature Setup Guide

Use this guide when setting up a new feature in the project to ensure consistency with existing patterns.

## Directory Structure

All new features should be placed in `src/features/[feature-name]/`. The standard structure is:

- `actions.ts`: Server actions for the feature.
- `components/`: React components.
- `constants.ts`: Local constants.
- `models/`: Domain models or classes.
- `types.ts`: TypeScript interfaces and types.
- `util.ts`: Feature-specific utility functions.
- `validation.ts`: Zod schemas or validation logic.
- `supabase/`: Feature-specific Supabase implementation.
  - `services.ts`: Supabase services (merge rows if multiple entities).
  - `types.ts`: Merged Supabase database rows and app types.
  - `utils.ts`: Supabase mapping utilities (e.g., `mapToDb`, `mapToApp`).

## Import Guidelines

- **Absolute Imports**: Always use absolute imports starting with `@/`.
- **Ordering**:
  1. External libraries (e.g., `react`, `sonner`, `zustand`).
  2. Local imports (e.g., `@/features/...`, `@/store`, `@/utils`).
- **Spacing**: Include exactly one empty line between external library imports and local repository imports.

Example:

```tsx
import { useCallback, useEffect } from "react";

import { useSessionClient } from "@/features/auth/hooks/useSessionClient";
import { useStore } from "@/store";
```

## Server Actions (`actions.ts`)

- Always include `'use server';` at the top.
- **Naming**: Use prefixes that describe the operation: `get...Action`, `post...Action`, `delete...Action`, `update...Action`.
- **Safety**: Wrap logic in `safeAction` to handle errors gracefully.
- **Logging**: Use `logActionMessage` to record key steps (e.g., "Start", "Data fetched").
- **Retry Logic**: For critical data fetching, implement a retry loop with a maximum number of attempts and time limits.

## Zustand Slices (`src/store/[name]Slice.ts`)

- Store state and logic in independent slices within `src/store/`.
- Use `StateCreator` to define the slice.
- Handle success and error cases explicitly.
- Use `toast` for user notifications and `logWithTime` for debugging errors.

## React Components

- Use `'use client';` for interactive components that use hooks or browser APIs.
- Prefer fetching/mutating data through the Zustand store to keep logic centralized.
- **Styling**: Use Tailwind CSS classes. Use custom project-specific utility classes like `flex-center` or `anim-fade` when appropriate.
