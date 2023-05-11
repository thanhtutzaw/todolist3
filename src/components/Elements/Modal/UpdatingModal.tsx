import { RefObject } from 'react';
import Dialog from './Dialog';

export default function UpdatingModal(props: { UpdatingRef: RefObject<HTMLDialogElement> }) {
  const { UpdatingRef } = props;
  return (
    <Dialog id="updating" ref={UpdatingRef}>
      <div className="updatingModal">
        <div style={{ fontWeight: '500', fontSize: '22px' }}>
          <img src="/assets/cat-spinner.gif" aria-label="updating" alt="updating" />
          <h4>Updating...</h4>
        </div>
      </div>
    </Dialog>
  );
}
