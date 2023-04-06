import useFirestoreData from '@/hooks/useFirestoreData';
import Draggable from './Elements/Draggable';

export default function Tabs({ SelectedID }: any) {
  const length = SelectedID.length === 0;
  // animation: 'mountFadeIn .2s ease-in-out forwards';
  // animation: 'unMountFadeOut .2s ease-in-out forwards';
  return (
    <Draggable length={length} className="tabContainer">
      <>
        <div className="tabItem">All</div>
        <TabItem />
        <TabItem />
        <TabItem />
        <TabItem />
        <TabItem />
        <TabItem />
        <TabItem />
        <TabItem />
        <TabItem />
        <TabItem />
        <TabItem />
        <TabItem />
        <TabItem />
        <TabItem />
        <TabItem />
        <TabItem />
        <TabItem />
        <TabItem />
        <TabItem />
        <TabItem />
        <TabItem />
        <TabItem />
      </>
    </Draggable>
  );
}

function TabItem() {
  const { loading } = useFirestoreData();

  return (
    <div
      style={{
        animation: loading ? 'tabLoading 1s .3s ease-in-out infinite ' : '',
      }}
      className="tabItem"
    >
      {!loading && 'dfdfdsfdfdfsdfd'}
    </div>
  );
}
