import {
  PointerEvent,
  ReactElement,
  WheelEvent,
  WheelEventHandler,
  useEffect,
  useState,
} from 'react';
interface DraggableProps {
  loading: boolean;
  length: boolean;
  className: string;
  children: ReactElement;
}
export default function Draggable({ loading, length, className, children }: DraggableProps) {
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

  function zoom(e: WheelEvent<HTMLDivElement>) {
    console.log((e.deltaY * -0.01).toString());
  }

  return mounted ? (
    <div
      onWheel={(e) => {
        zoom(e);
      }}
      // role="tablist"
      onAnimationEnd={() => {
        if (!length) {
          setMounted(false);
        }
      }}
      style={{
        overflow: loading ? 'hidden' : 'auto',
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

  function newFunction(): WheelEventHandler<HTMLDivElement> | undefined {
    return (e) => zoom(e);
  }
}
