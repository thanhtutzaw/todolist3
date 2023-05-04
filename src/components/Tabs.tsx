import { AppContext } from '@/Context/AppContext';
import useFirestoreData from '@/hooks/useFirestoreData';
import { addLabel } from '@/lib/label';
import { AppContextType, labelProps, todosProps } from '@/types';
import { MouseEventHandler, useContext } from 'react';
import { VscAdd } from 'react-icons/vsc';
import Draggable from './Elements/Draggable';
interface TabsProps {
  SelectedID: number[];
  todos: todosProps[];
}
export default function Tabs({ SelectedID }: TabsProps) {
  const length = SelectedID.length === 0;
  const { loading, labels, setlabels } = useFirestoreData();
  const { tabRef, active, setactive, setisPrevent } = useContext(AppContext) as AppContextType;

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
  const homeTab = active === '' || active === 'all';
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

  return (
    <Draggable loading={loading} length={length} className="tabContainer">
      <>
        <div
          aria-selected={homeTab}
          role="tab"
          ref={homeTab ? tabRef : null}
          onClick={() => setactive('all')}
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
              aria-selected={otherTab}
              role="tab"
              ref={otherTab ? tabRef : null}
              onClick={() => setactive(l.text!)}
              style={{
                animation: tabItemLoading,
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
  const { loading } = useFirestoreData();
  return <>{!loading && l.text}</>;
}
