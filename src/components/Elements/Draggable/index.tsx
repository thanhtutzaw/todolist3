import { PointerEvent, ReactElement, useEffect, useState } from 'react';
interface DraggableProps {
  length: boolean;
  className: string;
  children: ReactElement;
}
export default function Draggable({ length, className, children }: DraggableProps) {
  const [draggable, setDraggable] = useState(false);
  const [mounted, setMounted] = useState(true);
  function dragStart(e: PointerEvent<HTMLDivElement>) {
    setDraggable(true);
    e.currentTarget.style.userSelect = 'none';
  }
  function dragging(e: PointerEvent) {
    if (draggable) {
      console.log('dragging');
    }
  }
  function dragStop(e: PointerEvent) {
    console.log('dragStop');
    setDraggable(false);
  }
  useEffect(() => {
    let mount: string | number | NodeJS.Timeout | undefined;
    if (length && !mounted) {
      mount = setTimeout(() => {
        setMounted(true);
      }, 200);
    }
    return () => {
      clearTimeout(mount);
    };
  }, [length]);

  return mounted ? (
    <div
      onAnimationEnd={() => {
        if (!length) {
          setMounted(false);
        }
      }}
      style={{
        animation: length
          ? 'mountFadeIn .2s ease-in-out'
          : 'unMountFadeOut .2s forwards ease-in-out ',
      }}
      onPointerDown={dragStart}
      onPointerMove={dragging}
      onPointerUp={dragStop}
      className={className}
    >
      {children}
    </div>
  ) : (
    <></>
  );
}
