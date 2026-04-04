"use client";

import gsap from "gsap";
import {
  type PointerEvent,
  type RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type Point = { x: number; y: number };
type Bounds = { minX: number; maxX: number; minY: number; maxY: number };
type CardRect = { x: number; y: number; width: number; height: number };

type UseOverviewDragProps = {
  enabled: boolean;
  viewportRef: RefObject<HTMLDivElement | null>;
  trackRef: RefObject<HTMLDivElement | null>;
  cards: CardRect[];
  focusedIndex: number;
};

const FIELD_WIDTH = 1760;
const FIELD_HEIGHT = 1260;
const DRAG_THRESHOLD = 10;

export function useOverviewDrag({
  enabled,
  viewportRef,
  trackRef,
  cards,
  focusedIndex,
}: UseOverviewDragProps) {
  const [position, setPosition] = useState<Point>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragMovedRef = useRef(false);
  const pointerIdRef = useRef<number | null>(null);
  const dragStartRef = useRef<Point>({ x: 0, y: 0 });
  const originRef = useRef<Point>({ x: 0, y: 0 });

  const bounds = useMemo<Bounds>(() => {
    const viewport = viewportRef.current;
    const viewportWidth = viewport?.clientWidth ?? 1024;
    const viewportHeight = viewport?.clientHeight ?? 720;

    return {
      minX: Math.min(0, viewportWidth - FIELD_WIDTH),
      maxX: 0,
      minY: Math.min(0, viewportHeight - FIELD_HEIGHT),
      maxY: 0,
    };
  }, [viewportRef, cards.length]);

  const clampPoint = useCallback(
    (value: Point) => ({
      x: Math.min(bounds.maxX, Math.max(bounds.minX, value.x)),
      y: Math.min(bounds.maxY, Math.max(bounds.minY, value.y)),
    }),
    [bounds],
  );

  const animateTo = useCallback(
    (next: Point, duration = 0.55) => {
      const clamped = clampPoint(next);
      setPosition(clamped);

      if (!trackRef.current) return;

      gsap.to(trackRef.current, {
        x: clamped.x,
        y: clamped.y,
        duration,
        ease: "power3.out",
      });
    },
    [clampPoint, trackRef],
  );

  const centerOnIndex = useCallback(
    (index: number) => {
      const viewport = viewportRef.current;
      const card = cards[index];

      if (!viewport || !card) return;

      const targetX = viewport.clientWidth / 2 - (card.x + card.width / 2);
      const targetY = viewport.clientHeight / 2 - (card.y + card.height / 2);

      animateTo({ x: targetX, y: targetY });
    },
    [animateTo, cards, viewportRef],
  );

  useEffect(() => {
    if (!enabled || isDragging) return;
    centerOnIndex(focusedIndex);
  }, [enabled, focusedIndex, isDragging, centerOnIndex]);

  useEffect(() => {
    if (!trackRef.current) return;
    gsap.set(trackRef.current, { x: position.x, y: position.y });
  }, [position, trackRef]);

  const onPointerDown = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (!enabled) return;

      event.preventDefault();
      pointerIdRef.current = event.pointerId;
      dragMovedRef.current = false;
      setIsDragging(false);
      dragStartRef.current = { x: event.clientX, y: event.clientY };
      originRef.current = position;
      document.body.style.cursor = "grabbing";
      event.currentTarget.setPointerCapture(event.pointerId);
    },
    [enabled, position],
  );

  const onPointerMove = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (!enabled || pointerIdRef.current !== event.pointerId) return;

      event.preventDefault();
      const deltaX = event.clientX - dragStartRef.current.x;
      const deltaY = event.clientY - dragStartRef.current.y;

      if (
        !dragMovedRef.current &&
        Math.hypot(deltaX, deltaY) > DRAG_THRESHOLD
      ) {
        dragMovedRef.current = true;
        setIsDragging(true);
      }

      if (!dragMovedRef.current) return;

      const next = clampPoint({
        x: originRef.current.x + deltaX,
        y: originRef.current.y + deltaY,
      });

      setPosition(next);

      if (trackRef.current) {
        gsap.set(trackRef.current, { x: next.x, y: next.y });
      }
    },
    [clampPoint, enabled, trackRef],
  );

  const finishDrag = useCallback((pointerId?: number) => {
    if (pointerIdRef.current !== null && pointerId === pointerIdRef.current) {
      pointerIdRef.current = null;
    }

    document.body.style.cursor = "";
    window.setTimeout(() => {
      setIsDragging(false);
      dragMovedRef.current = false;
    }, 40);
  }, []);

  const onPointerUp = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (enabled && event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }
      finishDrag(event.pointerId);
    },
    [enabled, finishDrag],
  );

  const onPointerCancel = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (enabled && event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }
      finishDrag(event.pointerId);
    },
    [enabled, finishDrag],
  );

  return {
    isDragging,
    dragMovedRef,
    centerOnIndex,
    fieldSize: { width: FIELD_WIDTH, height: FIELD_HEIGHT },
    bind: {
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel,
      onPointerLeave: onPointerCancel,
    },
  };
}
