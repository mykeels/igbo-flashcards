import { createRootRoute } from "@tanstack/react-router";

export function MemoryFlashCards() {
  return <div>MemoryFlashCards</div>;
}

export const Route = createRootRoute({
  component: MemoryFlashCards,
});
