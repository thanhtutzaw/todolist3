export default function UpdatingModal() {
  return (
    <div
      className="updatingModal"
      style={{ textAlign: 'center', display: 'flex', flexDirection: 'column' }}
    >
      <div style={{ fontWeight: '500', fontSize: '22px' }}>
        {/* <span role="img" aria-label="updating">
          🌟
        </span> */}
        <img src="cat-spinner.gif" alt="" />
        <h4>Updating...</h4>
      </div>
    </div>
  );
}
