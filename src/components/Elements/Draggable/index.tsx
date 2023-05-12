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
  // const centerX = useTransform(x, (value) => (isCentered ? window.innerWidth / 2 : value));

  // const x = useMotionValue(0);
  // const centerX = useTransform(x, (value) => (tab === 'all' ? window.innerWidth / 2 : value));
  const [disableConstraints, setDisableConstraints] = useState(false);

  const handleDragStart = () => {
    setDisableConstraints(true);
  };

  const handleDragEnd = () => {
    setDisableConstraints(false);
  };
  // useEffect(() => {
  //   // Adjust the right constraint based on the size of the container
  //   const containerWidth = constraintsRef?.current?.clientWidth!;
  //   const tabWidth2 = tabWidth?.current?.clientWidth!;
  //   const rightConstraint = containerWidth - tabWidth2 - 20;
  //   setRightConstraint(rightConstraint);
  // }, []);
  const [rightConstraint, setRightConstraint] = useState(0);
  return mounted ? (
    <motion.div
      // onWheel={(e) => {
      //   zoom(e);
      // }}
      drag="x"
      dragConstraints={{
        right: 0,
        left:
          tabWidth.current?.clientWidth! > constraintsRef.current?.clientWidth!
            ? constraintsRef.current?.clientWidth! - tabWidth.current?.clientWidth! - 20
            : 0,
      }}
      dragElastic={0.2}
      onAnimationEnd={() => {
        if (!isSelect) {
          setMounted(false);
        }
      }}
      style={{
        // x,
        // overflow: loading && !draggable ? 'hidden' : 'auto',
        animation: isSelect
          ? 'mountFadeIn .2s ease-in-out'
          : 'unMountFadeOut .2s forwards ease-in-out ',
      }}
      onPointerMove={() => {
        if (draggable) {
          setIgnoreClick(true);
        } else {
          setIgnoreClick(false);
          // const childElements = Array.from(e.currentTarget.childNodes) as HTMLElement[];
          // childElements.forEach((element) => {
          //   element.style.pointerEvents = 'initial';
          // });
        }
      }}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onPointerDown={(e) => {
        setDraggable(true);
      }}
      onPointerUp={(e) => {
        setDraggable(false);
      }}
      // onPointerUp={dragStop}
      className={className}
    >
      {children}
    </motion.div>
  ) : (
    <></>
  );
}
