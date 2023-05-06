import { AppContext } from '@/Context/AppContext';
import { AppContextType } from '@/types';
import { useMotionValue, motion } from 'framer-motion';
import {
  MouseEventHandler,
  PointerEvent,
  ReactElement,
  RefObject,
  useContext,
  useEffect,
  useState,
} from 'react';
interface DraggableProps {
  constraintsRef: RefObject<HTMLDivElement>;
  setIgnoreClick: Function;
  loading: boolean;
  isSelect: boolean;
  className: string;
  children: ReactElement;
}
export default function Draggable({
  constraintsRef,
  setIgnoreClick,
  loading,
  isSelect,
  className,
  children,
}: DraggableProps) {
  const [draggable, setDraggable] = useState(false);
  const [mounted, setMounted] = useState(true);
  let mouseX = useMotionValue(0);
  const { labels } = useContext(AppContext) as AppContextType;

  function dragStart(e: PointerEvent<HTMLDivElement>) {
    setDraggable(true);
    e.currentTarget.style.userSelect = 'none';
  }
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
  return mounted ? (
    <motion.div
      // onWheel={(e) => {
      //   zoom(e);
      // }}
      // role="tablist"
      // onAnimationEnd={() => {
      //   if (!isSelect) {
      //     setMounted(false);
      //   }
      // }}
      style={
        {
          // overflow: loading ? 'hidden' : 'auto',
          // animation: isSelect
          //   ? 'mountFadeIn .2s ease-in-out'
          //   : 'unMountFadeOut .2s forwards ease-in-out ',
          // x: mouseX,
        }
      }
      // onPointerDown={dragStart}
      // // onMouseMove={dragging}
      // onMouseMove={(e) => {
      //   if (draggable) {
      //     mouseX.set(e.clientX);
      //   }
      // }}
      drag="x"
      // drag
      // dragConstraints={{ right: 0, left: 0 }}
      // dragConstraints={{ right: 0, left: -20, top: 0, bottom: 0 }}
      // dragConstraints={{ top: 0, bottom: 0 }}
      // dragConstraints={constraintsRef}
      // dragConstraints={{ right: 20, left: -20, top: 5, bottom: 5 }}
      // dragConstraints={{ right: 20, left: -20, top: 5, bottom: 5 }}
      dragConstraints={{ right: 0, left: -380 }}
      dragElastic={0.2}
      dragDirectionLock={true}
      onMouseMove={(e) => {
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
      // onDragEnd={}
      onPointerDown={(e) => {
        setDraggable(true);
      }}
      onPointerUp={(e) => {
        setDraggable(false);
      }}
      onDrag={(e) => {
        // e.stopPropagation();
        // e.preventDefault();
        // e.stopImmediatePropagation();
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
