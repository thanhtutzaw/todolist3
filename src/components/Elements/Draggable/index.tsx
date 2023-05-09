import { motion } from 'framer-motion';
import { ReactElement, RefObject, useEffect, useState } from 'react';
interface DraggableProps {
  tabWidth: RefObject<HTMLDivElement>;
  constraintsRef: RefObject<HTMLDivElement>;
  setIgnoreClick: Function;
  isSelect: boolean;
  className: string;
  children: ReactElement;
}
export default function Draggable({
  tabWidth,
  constraintsRef,
  setIgnoreClick,
  isSelect,
  className,
  children,
}: DraggableProps) {
  const [draggable, setDraggable] = useState(false);
  const [mounted, setMounted] = useState(true);
  // let mouseX = useMotionValue(0);
  // const { labels } = useContext(AppContext) as AppContextType;

  // function dragStart(e: PointerEvent<HTMLDivElement>) {
  //   setDraggable(true);
  //   e.currentTarget.style.userSelect = 'none';
  // }
  // function dragging(e: PointerEvent | MouseEvent<HTMLDivElement>) {
  //   // if (draggable) {
  //   //   console.log('dragging');
  //   // }
  //   mouseX.set(e.pageX);
  // }
  // function dragStop(e: PointerEvent) {
  //   console.log('dragStop');
  //   setDraggable(false);
  // }
  useEffect(() => {
    let timeout: string | number | NodeJS.Timeout | undefined;
    if (isSelect && !mounted) {
      timeout = setTimeout(() => {
        setMounted(true);
      }, 200);
    }
    return () => clearTimeout(timeout);
  }, [isSelect]);

  // function zoom(e: WheelEvent<HTMLDivElement>) {
  //   console.log((e.deltaY * -0.01).toString());
  // }
  useEffect(() => {
    function handleIngore(this: Window, ev: MouseEvent) {
      if (!draggable) return;
      setIgnoreClick(false);
      setDraggable(false);
      throw new Error('Function not implemented.');
    }
    window.addEventListener('pointerup', handleIngore);
    return () => {
      window.removeEventListener('pointerup', handleIngore);
    };
  }, [draggable]);

  return mounted ? (
    <motion.div
      // onWheel={(e) => {
      //   zoom(e);
      // }}
      onAnimationEnd={() => {
        if (!isSelect) {
          setMounted(false);
        }
      }}
      style={{
        // overflow: loading && !draggable ? 'hidden' : 'auto',
        animation: isSelect
          ? 'mountFadeIn .2s ease-in-out'
          : 'unMountFadeOut .2s forwards ease-in-out ',
        // x: mouseX,
      }}
      // onPointerDown={dragStart}
      // // onMouseMove={dragging}
      // onMouseMove={(e) => {
      //   if (draggable) {
      //     mouseX.set(e.clientX);
      //   }
      // }}
      drag="x"
      dragConstraints={{
        right: 0,
        left: constraintsRef.current?.clientWidth! - tabWidth.current?.clientWidth! - 20,
      }}
      dragElastic={0.2}
      dragDirectionLock={true}
      onPointerMove={() => {
        if (draggable) {
          setIgnoreClick(true);
          // const childElements = Array.from(e.currentTarget.childNodes) as HTMLElement[];
          // childElements.forEach((element) => {
          //   element.style.pointerEvents = 'none';
          // });
        } else {
          setIgnoreClick(false);
          // const childElements = Array.from(e.currentTarget.childNodes) as HTMLElement[];
          // childElements.forEach((element) => {
          //   element.style.pointerEvents = 'initial';
          // });
        }
      }}
      onPointerDown={(e) => {
        setDraggable(true);
      }}
      onPointerUp={(e) => {
        setDraggable(false);
      }}
      // whileHover={{ scale: 1.1 }}
      // whileTap={{ scale: 0.9 }}
      // onPointerUp={dragStop}
      className={className}
    >
      {children}
    </motion.div>
  ) : (
    <></>
  );

  // function newFunction(): WheelEventHandler<HTMLDivElement> | undefined {
  //   return (e) => zoom(e);
  // }
}
