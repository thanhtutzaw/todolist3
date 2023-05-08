import { AppContext } from '@/Context/AppContext';
import { addLabel } from '@/lib/label';
import { AppContextType, labelProps, todosProps } from '@/types';
import { MouseEventHandler, RefObject, useContext, useEffect, useRef, useState } from 'react';
import { VscAdd } from 'react-icons/vsc';
import Draggable from './Elements/Draggable';
import { BiDotsVerticalRounded, BiEdit, BiTrash, BiX } from 'react-icons/bi';

interface TabsProps {
  addLabelRef: RefObject<HTMLButtonElement>;
  constraintsRef: RefObject<HTMLDivElement>;
  SelectedID: number[];
  todos: todosProps[];
}
export default function Tabs({ addLabelRef, constraintsRef, SelectedID }: TabsProps) {
  const isSelect = SelectedID.length === 0;
  const { loading, labels, setlabels } = useContext(AppContext) as AppContextType;
  const { tabRef, tab, settab, setisPrevent } = useContext(AppContext) as AppContextType;

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    const genRand = (len: number) => {
      return Math.random()
        .toString(36)
        .substring(2, len + 2);
    };
    const labelTextBox = prompt('Please enter new Label', genRand(6));
    await addLabel(labelTextBox, setlabels, labels, setisPrevent);
  };
  const homeTab = tab === '' || tab === 'all';
  const tabLoading = 'tabLoading 1s .3s ease-in-out infinite';
  const tabItemLoading = loading ? tabLoading : '';

  const activeFadein = 'activeFadein .2s ease-in-out forwards';
  const firstItemLoading = homeTab && !loading ? activeFadein : '';
  const LabelLoader = () => (
    <div
      aria-label="tabs loading"
      style={{
        animation: tabItemLoading,
      }}
      className="tabItem"
    ></div>
  );
  const tabWidth = useRef(null);
  const [ignoreClick, setIgnoreClick] = useState(false);
  return (
    <Draggable
      tabWidth={tabWidth}
      constraintsRef={constraintsRef}
      isSelect={isSelect}
      setIgnoreClick={setIgnoreClick}
      className="tabContainer"
    >
      <div ref={tabWidth} className="tabs">
        <div
          aria-selected={homeTab}
          role="tab"
          ref={homeTab ? tabRef : null}
          onClick={() => settab('all')}
          style={{
            animation: firstItemLoading,
            pointerEvents: ignoreClick ? 'none' : 'initial',
          }}
          className={`tabItem ${homeTab && !loading ? 'active' : ''}`}
        >
          All
        </div>
        {loading && <>{Array.from([1, 2, 3, 4, 5, 6].map(() => <LabelLoader />))}</>}
        {labels.map((l) => {
          const otherTab = tab === l.text;
          return (
            <TabItem
              constraintsRef={constraintsRef}
              l={l}
              tabItemLoading={tabItemLoading}
              otherTab={otherTab}
              tabRef={tabRef}
              settab={settab}
              ignoreClick={ignoreClick}
              loading={loading}
            />
          );
        })}
        <button
          ref={addLabelRef}
          aria-label="create new label"
          onClick={handleSubmit}
          className="tabItem"
        >
          <VscAdd />
        </button>
      </div>
    </Draggable>
  );
}

// function TabItem2(props: { l: labelProps; otherTab: boolean; tabRef: RefObject<HTMLDivElement> }) {
//   const { l, otherTab, tabRef } = props;
//   // const { loading } = useContext(AppContext) as AppContextType;
//   const [mounted, setMounted] = useState(false);
//   useEffect(() => {
//     if (!tabRef.current) return;
//     tabRef.current.style.height = '50px';

//     if (!otherTab) {
//       setMounted(false);
//       tabRef.current.style.color = 'red';
//     }
//   }, [otherTab]);
//   useEffect(() => {
//     if (!tabRef.current) return;
//     if (mounted) {
//       tabRef.current.style.height = '100px';
//       tabRef.current.style.color = 'green';
//     }
//   }, [mounted]);

//   return <></>;
// }

function TabItem(props: {
  l: labelProps;
  tabItemLoading: string;
  otherTab: boolean;
  constraintsRef: RefObject<HTMLDivElement>;
  tabRef: RefObject<HTMLDivElement>;
  settab: Function;
  ignoreClick: boolean;
  loading: boolean;
}) {
  const { constraintsRef, l, tabItemLoading, otherTab, tabRef, settab, ignoreClick, loading } =
    props;
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    if (!otherTab) {
      setMounted(false);
      // if (!constraintsRef.current) return;
      // constraintsRef.current.style.height = '50px';
    } else {
      if (!constraintsRef.current) return;
      constraintsRef.current.style.height = '100px';
    }
  }, [otherTab]);
  useEffect(() => {
    if (!constraintsRef.current) return;
    if (mounted) {
      constraintsRef.current.style.height = '100px';
    } else {
      setTimeout(() => {
        if (!constraintsRef.current) return;
        constraintsRef.current.style.height = '50px';
      }, 300);
    }
  }, [mounted]);

  return (
    <div
      aria-selected={otherTab}
      role="tab"
      ref={otherTab ? tabRef : null}
      onClick={() => {
        settab(l.text!);
      }}
      style={{
        height: !mounted ? '50px' : '100px',
        animation: tabItemLoading,
        pointerEvents: ignoreClick ? 'none' : 'initial',
      }}
      className={`tabItem ${otherTab ? 'active' : ''}`}
    >
      {!loading && l.text}
      <button
        style={{ pointerEvents: mounted ? 'none' : 'initial' }}
        onClick={(e) => {
          setMounted(true);
          // if (!e.currentTarget || !e.currentTarget.parentElement) return;
          // e.currentTarget.parentElement.style.height = '100px';
        }}
        className="dot"
      >
        <BiDotsVerticalRounded />
      </button>
      <div className={`labelActions ${mounted ? 'mounted' : ''}`}>
        <div>
          <button>
            <BiEdit />
          </button>
          <button>
            <BiTrash />
          </button>
        </div>
        <button
          onClick={() => {
            setMounted(false);
          }}
        >
          <BiX />
        </button>
      </div>
    </div>
  );
}
