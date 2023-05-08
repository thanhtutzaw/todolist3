import { AppContext } from '@/Context/AppContext';
import { AppContextType } from '@/types';
import { MouseEventHandler, useContext, useEffect, useState } from 'react';

export default function SelectAllBtn(props: {
  selectAll: MouseEventHandler<HTMLButtonElement>;
  clearSelect: MouseEventHandler<HTMLButtonElement>;
  SelectedID: number[];
  selectCount: boolean;
}) {
  const { clearSelect, selectAll, SelectedID, selectCount } = props;
  const { filter } = useContext(AppContext) as AppContextType;
  const selectOneItem = SelectedID.length === 1 && selectCount;
  const selectMoreThanOne = SelectedID.length >= 2 || filter.length === 1;
  const selectAllAnimation = selectOneItem
    ? 'mountFadeIn .2s ease-in-out'
    : 'unMountFadeOut .2s forwards ease-in-out ';
  const deSelectAnimation = selectMoreThanOne
    ? 'mountFadeIn .2s ease-in'
    : 'unMountFadeOut .2s forwards ease-in-out ';
  const [selectAllmounted, setselectAllMounted] = useState(false);
  const [deselectAllmounted, setdeselectAllMounted] = useState(false);
  useEffect(() => {
    let mount: string | number | NodeJS.Timeout | undefined;
    if (selectOneItem && !selectAllmounted) {
      if (filter.length === 1) return;
      setTimeout(() => {
        setselectAllMounted(true);
      }, 200);
    }
    return () => {
      clearTimeout(mount);
    };
  }, [selectOneItem, filter]);
  useEffect(() => {
    let mount: string | number | NodeJS.Timeout | undefined;
    if (!!deselectAllmounted) return;
    if (selectMoreThanOne) {
      // if (filter.length s 1) return;
      setTimeout(() => {
        setdeselectAllMounted(true);
      }, 200);
    }
    return () => {
      clearTimeout(mount);
    };
  }, [selectMoreThanOne, filter]);
  const handleUnmount = () => !selectOneItem && selectAllmounted && setselectAllMounted(false);

  return (
    <>
      {selectAllmounted && (
        <div
          onAnimationEnd={handleUnmount}
          style={{
            animation: selectAllAnimation,
          }}
          className="selectionContainer"
        >
          <button tabIndex={-1} onClick={selectAll}>
            Select All
            {/* {filter.length} */}
          </button>
        </div>
      )}

      {!selectAllmounted && selectMoreThanOne && SelectedID.length !== 0 && (
        <div
          style={{
            animation: deSelectAnimation,
          }}
          className="selectionContainer"
        >
          <button tabIndex={-1} onClick={clearSelect}>
            Deselect All
          </button>
        </div>
      )}
    </>
  );
}
