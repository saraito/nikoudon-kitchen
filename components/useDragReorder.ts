"use client";

import { useEffect, useRef, useState } from "react";

interface Sortable {
  id: string;
}

export interface DragHandleProps {
  onPointerDown: (e: React.PointerEvent) => void;
  style: {
    touchAction: "none";
    WebkitUserSelect: "none";
    userSelect: "none";
    WebkitTouchCallout: "none";
  };
}

/**
 * Pointer-based drag-to-reorder for a single list. Call getHandleProps(item.id)
 * on the drag-handle element and setItemRef(item.id, el) on each row's root element.
 * Render `order` instead of the original `items` array.
 */
export function useDragReorder<T extends Sortable>(
  items: T[],
  onPersist: (reordered: T[]) => void
) {
  const [order, setOrder] = useState<T[]>(items);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const itemRefs = useRef<Map<string, HTMLElement>>(new Map());
  const dragOrderRef = useRef<T[]>(items);
  const draggingRef = useRef(false);

  useEffect(() => {
    if (!draggingRef.current) setOrder(items);
  }, [items]);

  function setItemRef(id: string, el: HTMLElement | null) {
    if (el) itemRefs.current.set(id, el);
    else itemRefs.current.delete(id);
  }

  function getHandleProps(id: string): DragHandleProps {
    return {
      onPointerDown: (e: React.PointerEvent) => {
        e.preventDefault();
        const handle = e.currentTarget as HTMLElement;
        try {
          handle.setPointerCapture(e.pointerId);
        } catch {
          // ignore — unsupported pointer type, falls back to document listeners
        }
        draggingRef.current = true;
        setDraggingId(id);
        dragOrderRef.current = order;

        function preventSelect(ev: Event) {
          ev.preventDefault();
        }
        const prevBodyUserSelect = document.body.style.userSelect;
        const prevBodyWebkitUserSelect = (document.body.style as any).webkitUserSelect;
        document.body.style.userSelect = "none";
        (document.body.style as any).webkitUserSelect = "none";
        document.addEventListener("selectstart", preventSelect);

        function onMove(ev: PointerEvent) {
          ev.preventDefault();
          const y = ev.clientY;
          const current = dragOrderRef.current;
          const dragged = current.find((i) => i.id === id);
          if (!dragged) return;
          const others = current.filter((i) => i.id !== id);
          let toIndex = 0;
          for (const other of others) {
            const el = itemRefs.current.get(other.id);
            if (!el) continue;
            const mid = el.getBoundingClientRect().top + el.getBoundingClientRect().height / 2;
            if (y > mid) toIndex++;
          }
          const next = [...others];
          next.splice(toIndex, 0, dragged);
          dragOrderRef.current = next;
          setOrder(next);
        }

        function onUp() {
          document.removeEventListener("pointermove", onMove);
          document.removeEventListener("pointerup", onUp);
          document.removeEventListener("pointercancel", onUp);
          document.removeEventListener("selectstart", preventSelect);
          document.body.style.userSelect = prevBodyUserSelect;
          (document.body.style as any).webkitUserSelect = prevBodyWebkitUserSelect;
          try {
            handle.releasePointerCapture(e.pointerId);
          } catch {
            // already released
          }
          draggingRef.current = false;
          setDraggingId(null);
          onPersist(dragOrderRef.current);
        }

        document.addEventListener("pointermove", onMove);
        document.addEventListener("pointerup", onUp);
        document.addEventListener("pointercancel", onUp);
      },
      style: {
        touchAction: "none" as const,
        WebkitUserSelect: "none" as const,
        userSelect: "none" as const,
        WebkitTouchCallout: "none" as const,
      },
    };
  }

  return { order, draggingId, setItemRef, getHandleProps };
}
