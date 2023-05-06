import { AppContext } from '@/Context/AppContext';
import { addLabel } from '@/lib/label';
import { AppContextType, labelProps, todosProps } from '@/types';
import { MouseEventHandler, RefObject, useContext, useState } from 'react';
import { VscAdd } from 'react-icons/vsc';
import Draggable from './Elements/Draggable';
interface TabsProps {
  constraintsRef: RefObject<HTMLDivElement>;
  SelectedID: number[];
  todos: todosProps[];
}
export default function Tabs({ constraintsRef, SelectedID }: TabsProps) {
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
  const [ignoreClick, setIgnoreClick] = useState(false);
  return (
    <Draggable
      constraintsRef={constraintsRef}
      loading={loading}
      isSelect={isSelect}
      setIgnoreClick={setIgnoreClick}
      className="tabContainer"
    >
      <>
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
            <div
              aria-selected={otherTab}
              role="tab"
              ref={otherTab ? tabRef : null}
              onClick={(e) => {
                // e.stopPropagation();
                // e.preventDefault();
                settab(l.text!);
              }}
              style={{
                animation: tabItemLoading,
                pointerEvents: ignoreClick ? 'none' : 'initial',
              }}
              className={`tabItem ${otherTab ? 'active' : ''}`}
            >
              <TabItem l={l} />
            </div>
          );
        })}
        <button aria-label="create new label" onClick={handleSubmit} className="tabItem">
          <VscAdd />
        </button>
      </>
    </Draggable>
  );
}

function TabItem(props: { l: labelProps }) {
  const { l } = props;
  const { loading } = useContext(AppContext) as AppContextType;
  return <>{!loading && l.text}</>;
}
