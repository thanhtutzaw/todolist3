import { VscAdd } from 'react-icons/vsc';
import Button from './Elements/Button/Button';
import { FormEventHandler, RefObject } from 'react';

export default function BottomNav(props: {
  inputRef: RefObject<HTMLInputElement>;
  handleSubmit: FormEventHandler<HTMLFormElement>;
  selectCount: boolean;
}) {
  const { inputRef, handleSubmit, selectCount } = props;
  return (
    <nav className="nav" style={{ pointerEvents: selectCount ? 'none' : 'initial' }}>
      <form onSubmit={handleSubmit}>
        <input ref={inputRef} className="input-text" type="text" />

        <Button type="submit" className="add-btn-parent">
          <VscAdd className="add-btn" />
        </Button>
      </form>
    </nav>
  );
}
