import Draggable from './Elements/Draggable';

export default function Tabs({ SelectedID }: any) {
  const length = SelectedID.length === 0;
  // animation: 'tabMount .2s ease-in-out forwards';
  // animation: 'tabUnmount .2s ease-in-out forwards';
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
  return <div className="tabItem">dfdfdsfdfdfsdfd</div>;
}
