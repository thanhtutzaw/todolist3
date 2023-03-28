import { VscAdd } from 'react-icons/vsc';
import Button from './Elements/Button/Button';
import { FormEventHandler, RefObject } from 'react';

export default function Footer(props: {
  SelectModalMounted: boolean;
  inputRef: RefObject<HTMLInputElement>;
  handleSubmit: FormEventHandler<HTMLFormElement>;
  selectCount: boolean;
}) {
  const { SelectModalMounted, inputRef, handleSubmit, selectCount } = props;
  return (
    <footer className="nav" style={{ pointerEvents: selectCount ? 'none' : 'initial' }}>
      <form onSubmit={handleSubmit}>
        <input
          tabIndex={!SelectModalMounted ? 1 : -1}
          ref={inputRef}
          className="input-text"
          type="text"
        />

        <Button tabIndex={!SelectModalMounted ? 1 : -1} type="submit" className="add-btn-parent">
          <VscAdd className="add-btn" />
        </Button>
      </form>
    </footer>
  );
}
