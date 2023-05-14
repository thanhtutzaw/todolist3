import { AppContext } from '@/Context/AppContext';
import { AppContextType } from '@/types';
import { FormEventHandler, RefObject, memo, useContext, useState } from 'react';
import { VscAdd } from 'react-icons/vsc';
import Button from './Elements/Button/Button';

const Footer = memo(
  (props: {
    addLabelRef: RefObject<HTMLButtonElement>;
    setlabel: Function;
    SelectModalMounted: boolean;
    inputRef: RefObject<HTMLInputElement>;
    handleSubmit: FormEventHandler<HTMLFormElement>;
    selectCount: boolean;
    label: string | null;
  }) => {
    const { labels } = useContext(AppContext) as AppContextType;
    const {
      label,
      addLabelRef,
      setlabel,
      SelectModalMounted,
      inputRef,
      handleSubmit,
      selectCount,
    } = props;
    // const getLabel = labels.find((l) => l.id === todo?.label);
    const [selectMounted, setSelectMounted] = useState(false);
    return (
      <footer className="nav" style={{ pointerEvents: selectCount ? 'none' : 'initial' }}>
        <form onSubmit={handleSubmit}>
          <select
            value={label ?? ''}
            style={{
              opacity: selectMounted ? '1' : '0',
              visibility: selectMounted ? 'visible' : 'hidden',
            }}
            onChange={(e) => {
              const value = e.target.value;
              if (value !== '') {
                setlabel(e.target.value);
              } else if (value === '' && !SelectModalMounted) {
                setlabel(null);
              }
              if (value === 'add') {
                setTimeout(() => {
                  addLabelRef?.current?.click();
                }, 100);
              }
            }}
          >
            <option key="default" value="">
              Select Label
            </option>
            {labels.map((l) => (
              <option
                // selected={l.id.toString() === getLabel?.id}
                // value={l.id.toString() === getLabel?.id ? l.id.toString() : ""}
                value={l.id?.toString()}
                key={l.id?.toString()}
              >
                {/* <option selected={l.id.toString() === getLabel?.id} value={l.id.toString()}> */}
                {l.text}
              </option>
            ))}
            <option value={'add'}>Create New</option>
            {/* <option value={'add'}>{createNew ? 'input' : '+ Create New'}</option> */}
          </select>
          <input
            // onFocus={() => {
            //   setSelectMounted(true);
            // }}
            onClick={() => {
              setSelectMounted((prev) => !prev);
            }}
            // onBlur={() => {
            //   setSelectMounted(false);
            // }}
            aria-label="todo input"
            tabIndex={!SelectModalMounted ? 0 : -1}
            ref={inputRef}
            className="input-text"
            type="text"
          />

          <Button
            aria-label="create new todo"
            tabIndex={!SelectModalMounted ? 0 : -1}
            type="submit"
            className="add-btn-parent"
          >
            <VscAdd className="add-btn" />
          </Button>
        </form>
      </footer>
    );
  }
);
export default Footer;
