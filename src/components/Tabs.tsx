import { AppContext } from '@/Context/AppContext';
import { addLabel, updateLabel } from '@/lib/label';
import { AppContextType, labelProps, todosProps } from '@/types';
import { MouseEventHandler, RefObject, useContext, useEffect, useRef, useState } from 'react';
import { VscAdd } from 'react-icons/vsc';
import Draggable from './Elements/Draggable';
import { BiDotsVerticalRounded, BiEdit, BiTrash, BiX } from 'react-icons/bi';
import { deletLabel } from '@/lib/firestore';

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
          }}
          className={`tabItem ${homeTab && !loading ? 'active' : ''} ${
            ignoreClick ? 'ignoreClick' : ''
          }`}
        >
          All
        </div>
        {loading && (
          <>{Array.from([1, 2, 3, 4, 5, 6].map((index) => <LabelLoader key={index} />))}</>
        )}
        {labels.map((l) => {
          const otherTab = tab === l.text;
          return (
            <TabItem
              key={l?.id}
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
//       tabRef.current.style.height = '90px';
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
      // constraintsRef.current.style.height = '90px';
    }
  }, [otherTab]);
  useEffect(() => {
    if (!constraintsRef.current) return;
    if (mounted) {
      constraintsRef.current.style.height = '90px';
    } else {
      setTimeout(() => {
        if (!constraintsRef.current) return;
        constraintsRef.current.style.height = '50px';
      }, 300);
    }
  }, [mounted]);
  function editHandle(id: string) {
    alert(id);
  }
  // function deleteHandle(id: string) {
  //   // alert(id);
  //   deletLabel(id);
  // }
  // function deletLabel(id: string) {
  //   console.log(id);
  //   throw new Error('Function not implemented.');
  // }
  const { setisPrevent, labels, setlabels } = useContext(AppContext) as AppContextType;
  return (
    <div
      aria-selected={otherTab}
      role="tab"
      ref={otherTab ? tabRef : null}
      onClick={() => {
        settab(l.text!);
      }}
      style={{
        height: !mounted ? '50px' : '90px',
        animation: tabItemLoading,
      }}
      className={`tabItem ${otherTab ? 'active' : ''} ${ignoreClick ? 'ignoreClick' : ''}`}
    >
      {!loading && l.text}
      <button
        style={{ pointerEvents: mounted ? 'none' : 'initial' }}
        onClick={(e) => {
          setMounted(true);
          // if (!e.currentTarget || !e.currentTarget.parentElement) return;
          // e.currentTarget.parentElement.style.height = '90px';
        }}
        className="dot"
      >
        <BiDotsVerticalRounded />
      </button>
      <div className={`labelActions ${mounted ? 'mounted' : ''}`}>
        <div>
          <button
            onClick={async () => {
              // editHandle(l.id?.toString());
              const labelTextBox = prompt('Update Label', l.text);
              await updateLabel(l.id?.toString(), labelTextBox, l, setisPrevent, settab);
            }}
          >
            <BiEdit />
          </button>
          <button
            onClick={(e) => {
              // if (tab === l.text) {
              deletLabel(l.id?.toString(), settab);

              // }
            }}
          >
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
