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
    // console.log(tabRef.current);
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
  return (
    <Draggable loading={loading} length={length} className="tabContainer">
      <>
        <div
          onClick={(e) => {
            setactive('');
            e.currentTarget.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
            });
          }}
          style={{
            animation: active == '' && !loading ? activeFadein : '',
          }}
          className={`tabItem ${active == '' && !loading ? 'active' : ''}`}
        >
          All
        </div>
        {loading && (
          <>
            {Array.from(
              [1, 2, 3, 4, 5, 6].map(() => (
                <>
                  <div
                    aria-label="label loading"
                    style={{
                      animation: loading ? tabLoading : '',
                    }}
                    className={`tabItem`}
                  ></div>
                </>
              ))
            )}
          </>
        )}
        {labels.map((l) => (
          <div
            ref={active === l.text ? tabRef : null}
            onClick={(e) => {
              setactive(l.text!);
              e.currentTarget.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
              });
            }}
            style={{
              animation: loading ? tabLoading : '',
            }}
            className={`tabItem ${active === l.text ? 'active' : ''}`}
          >
            <TabItem l={l} />
          </div>
        ))}

        {/* {labels.length === 0 && ( */}
        <button onClick={handleSubmit} className="tabItem">
          <VscAdd />
        </button>

        {/* {label.map((t, index) => (
          <div
            ref={tabRef}
            onClick={(e): void => {
              // setactive(t);
              e?.currentTarget?.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
              });
            }}
            style={{
              animation: loading ? tabLoading : '',
            }}
          >
            {t?.map((l) => (
              <TabItem l={l} />
            ))}
          </div>
        ))} */}

        {/* {label.map((t , index) => (
        <TabItem active={active} key={index} t={t} setactive={setactive} />)} */}
      </>
    </Draggable>
  );
}

function TabItem(props: { l: labelProps }) {
  const { l } = props;
  const { loading } = useFirestoreData();
  return <>{!loading && l.text}</>;
}
