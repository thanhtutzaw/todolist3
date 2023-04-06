import useFirestoreData from '@/hooks/useFirestoreData';
import { addLabel } from '@/lib/label';
import { AppContextType, labelProps, todosProps } from '@/types';
import { MouseEventHandler, useCallback, useContext, useEffect, useState } from 'react';
import { VscAdd } from 'react-icons/vsc';
import Draggable from './Elements/Draggable';
import { AppContext } from '@/Context/AppContext';
interface TabsProps {
  SelectedID: number[];
  todos: todosProps[];
}
export default function Tabs({ SelectedID }: TabsProps) {
  const length = SelectedID.length === 0;
  const [active, setactive] = useState('');
  const { loading, labels, setlabels } = useFirestoreData();
  const { setisPrevent } = useContext(AppContext) as AppContextType;
  useEffect(() => {
    if (active) {
      window.location.hash = active;
    }
  }, [active]);
  // const label = todos.map((t) => {
  //   console.log(t.label);
  //   return t.label;
  // });

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    await addLabel(setlabels, labels, setisPrevent);
  };

  return (
    <Draggable length={length} className="tabContainer">
      <>
        <div
          onClick={(e) => {
            setactive('');
            e?.currentTarget?.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
            });
          }}
          style={{
            animation: active == '' && !loading ? 'activeFadein .2s ease-in-out forwards' : '',
          }}
          className={`tabItem ${active == '' && !loading ? 'active' : ''}`}
        >
          All
        </div>
        {loading && (
          <div
            style={{
              animation: loading ? 'tabLoading 1s .3s ease-in-out infinite' : '',
            }}
            className={`tabItem`}
          ></div>
        )}
        {labels.map((l) => (
          <div
            onClick={(e): void => {
              setactive(l.id.toString());
              e?.currentTarget?.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
              });
            }}
            style={{
              animation: loading ? 'tabLoading 1s .3s ease-in-out infinite' : '',
            }}
            className={`tabItem ${active ? 'active' : ''}`}
          >
            <TabItem l={l} />
          </div>
        ))}

        {/* {labels.length === 0 && (
          <button onClick={handleSubmit} className="tabItem">
            <VscAdd />
          </button>
        )} */}

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
              animation: loading ? 'tabLoading 1s .3s ease-in-out infinite' : '',
            }}
            className={`tabItem ${active ? 'active' : ''}`}
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
