import { AppContext } from '@/Context/AppContext';
import useFirestoreData from '@/hooks/useFirestoreData';
import { addLabel } from '@/lib/label';
import { AppContextType, labelProps, todosProps } from '@/types';
import { MouseEventHandler, useContext, useEffect, useRef, useState } from 'react';
import Draggable from './Elements/Draggable';
import { VscAdd } from 'react-icons/vsc';
interface TabsProps {
  SelectedID: number[];
  todos: todosProps[];
}
export default function Tabs({ SelectedID }: TabsProps) {
  const length = SelectedID.length === 0;
  const { loading, labels, setlabels } = useFirestoreData();
  const { active, setactive, setisPrevent } = useContext(AppContext) as AppContextType;
  useEffect(() => {
    window.location.hash = active;
    tabRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [active]);
  // const label = todos.map((t) => {
  //   console.log(t.label);
  //   return t.label;
  // });

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    const genRand = (len: number) => {
      return Math.random()
        .toString(36)
        .substring(2, len + 2);
    };
    const labelTextBox = prompt('Please enter new Label', genRand(6));
    // if (labelTextBox == null || labelTextBox == '') {
    // } else {
    //   console.log(labelTextBox);
    // }
    await addLabel(labelTextBox, setlabels, labels, setisPrevent);
  };
  const tabLoading = 'tabLoading 1s .3s ease-in-out infinite';
  const activeFadein = 'activeFadein .2s ease-in-out forwards';
  const tabRef = useRef<HTMLDivElement>(null);
  const tabItemLoading = loading ? tabLoading : '';
  const homeTab = active === '';
  const firstItemLoading = homeTab && !loading ? activeFadein : '';
  function LabelLoader() {
    return (
      <>
        <div
          aria-label="label loading"
          style={{
            animation: tabItemLoading,
          }}
          className={`tabItem`}
        ></div>
      </>
    );
  }
  return (
    <Draggable loading={loading} length={length} className="tabContainer">
      <>
        <div
          ref={homeTab ? tabRef : null}
          onClick={() => {
            setactive('');
          }}
          style={{
            animation: firstItemLoading,
          }}
          className={`tabItem ${homeTab && !loading ? 'active' : ''}`}
        >
          All
        </div>
        {loading && <>{Array.from([1, 2, 3, 4, 5, 6].map(() => <LabelLoader />))}</>}
        {labels.map((l) => {
          const otherTab = active === l.text;
          return (
            <div
              ref={otherTab ? tabRef : null}
              onClick={() => {
                setactive(l.text!);
              }}
              style={{
                animation: tabItemLoading,
              }}
              className={`tabItem ${otherTab ? 'active' : ''}`}
            >
              <TabItem l={l} />
            </div>
          );
        })}
        <button onClick={handleSubmit} className="tabItem">
          <VscAdd />
        </button>
      </>
    </Draggable>
  );
}

function TabItem(props: { l: labelProps }) {
  const { l } = props;
  const { loading } = useFirestoreData();
  return <>{!loading && l.text}</>;
}
