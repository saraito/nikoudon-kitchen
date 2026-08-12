"use client";

import { useEffect, useRef, useState } from "react";

interface Sortable {
  id: string;
}

export interface DragHandleProps {
  onPointerDown: (e: React.PointerEvent) => void;
  style: { touchAction: "none" };
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
        draggingRef.current = true;
        setDraggingId(id);
        dragOrderRef.current = order;

        function onMove(ev: PointerEvent) {
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
          draggingRef.current = false;
          setDraggingId(null);
          onPersist(dragOrderRef.current);
        }

        document.addEventListener("pointermove", onMove);
        document.addEventListener("pointerup", onUp);
      },
      style: { touchAction: "none" as const },
    };
  }

  return { order, draggingId, setItemRef, getHandleProps };
}
