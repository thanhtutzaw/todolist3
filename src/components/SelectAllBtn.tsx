import { MouseEventHandler, useEffect, useState } from 'react';

export function SelectAllBtn(props: {
  selectAll: MouseEventHandler<HTMLButtonElement>;
  clearSelect: MouseEventHandler<HTMLButtonElement>;
  SelectedID: number[];
  selectCount: boolean;
}) {
  const { clearSelect, selectAll, SelectedID, selectCount } = props;
  const selectOneItem = SelectedID.length === 1 && selectCount;
  const selectMoreThanOne = SelectedID.length >= 2;
  const [selectAllmounted, setselectAllMounted] = useState(false);
  const [deselectAllmounted, setdeselectAllMounted] = useState(false);
  useEffect(() => {
    let mount: string | number | NodeJS.Timeout | undefined;
    if (selectOneItem && !selectAllmounted) {
      setTimeout(() => {
        setselectAllMounted(true);
      }, 200);
    }
    return () => {
      clearTimeout(mount);
    };
  }, [selectOneItem]);
  useEffect(() => {
    let mount: string | number | NodeJS.Timeout | undefined;
    if (selectMoreThanOne && !deselectAllmounted) {
      setTimeout(() => {
        setdeselectAllMounted(true);
      }, 200);
    }
    return () => {
      clearTimeout(mount);
    };
  }, [selectMoreThanOne]);

  // useEffect(() => {
  //   if (selectMoreThanOne && !deselectAllmounted) {
  //     setdeselectAllMounted(true);
  //   }
  // }, [deselectAllmounted]);

  return (
    <>
      {selectAllmounted && (
        <div
          onAnimationEnd={() => {
            if (!selectOneItem && selectAllmounted) {
              setselectAllMounted(false);
            }
          }}
          style={{
            animation: selectOneItem
              ? 'mountFadeIn .2s ease-in-out'
              : 'unMountFadeOut .2s forwards ease-in-out ',
          }}
          className="selectionContainer"
        >
          <button tabIndex={-1} onClick={selectAll}>
            Select All
          </button>
        </div>
      )}

      {!selectAllmounted && selectMoreThanOne && (
        <div
          // onAnimationEnd={() => {
          //   if (!selectMoreThanOne && deselectAllmounted) {
          //     setdeselectAllMounted(false);
          //   }
          // }}
          style={{
            animation: selectMoreThanOne
              ? 'mountFadeIn .2s ease-in'
              : 'unMountFadeOut .2s forwards ease-in-out ',
          }}
          className="selectionContainer"
        >
          <button onClick={clearSelect}>Deselect All</button>
        </div>
      )}
    </>
  );
}
