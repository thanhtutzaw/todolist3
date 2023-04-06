import useFirestoreData from '@/hooks/useFirestoreData';
import Draggable from './Elements/Draggable';
import { MouseEventHandler, useRef, useState } from 'react';

export default function Tabs({ SelectedID }: any) {
  const length = SelectedID.length === 0;
  // animation: 'mountFadeIn .2s ease-in-out forwards';
  // animation: 'unMountFadeOut .2s ease-in-out forwards';
  const [active, setactive] = useState<number | null>(null);
  const { loading } = useFirestoreData();
  return (
    <Draggable length={length} className="tabContainer">
      <>
        <div
          onClick={(e) => { 
            setactive(null);
            e?.currentTarget?.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
            });
          }}
          style={{
            animation: active === null && !loading ? 'activeFadein .2s ease-in-out forwards' : '',
          }}
          className={`tabItem ${active === null && !loading ? 'active' : ''}`}
        >
          All
        </div>
        {Array.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).map((t) => (
          <TabItem active={active} key={t.toString()} t={t} setactive={setactive} />
        ))}
      </>
    </Draggable>
  );
}

function TabItem(props: { active: number | null; setactive: Function; t: number }) {
  const { active, t, setactive } = props;
  const { loading } = useFirestoreData();
  const tabRef = useRef(null);
  return (
    <div
      ref={tabRef}
      onClick={(e): void => {
        setactive(t);
        // if (e.currentTarget.nextElementSibling) {
        e?.currentTarget?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
        // }
      }}
      style={{
        animation: loading ? 'tabLoading 1s .3s ease-in-out infinite' : '',
      }}
      className={`tabItem ${active === t ? 'active' : ''}`}
    >
      {!loading && 'dfdfdsfdfdfsdfd'}
    </div>
  );
}
