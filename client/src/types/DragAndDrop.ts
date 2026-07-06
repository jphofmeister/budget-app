import { DragEvent } from "react";

export type DragAndDrop<T> = {
  draggedFrom: number | null;
  draggedTo: number | null;
  isDragging: boolean;
  originalOrder: T[];
  updatedOrder: T[];
};

export type HandleDragStart<T> = (event: DragEvent<HTMLElement>, originalArray: T[]) => void;
export type HandleDragOver = (event: DragEvent<HTMLElement>) => void;
export type HandleDrop = () => void;
export type OnDragLeave = () => void;
export type HandleManualMove<T> = (index: number, direction: number, originalArray: T[]) => void;
