import { forwardRef, ReactElement, MouseEventHandler } from 'react';
interface DialogProps {
  id?: string;
  children: ReactElement;
  onClick?: MouseEventHandler<HTMLDialogElement>;
}
// type DialogProps = PropsWithoutRef<HTMLDialogElement>;
const Dialog = forwardRef<HTMLDialogElement, DialogProps>((props, ref) => {
  const { children, id, onClick } = props;
  return (
    <dialog onClick={onClick} id={id} ref={ref}>
      {children}
    </dialog>
  );
});

export default Dialog;
