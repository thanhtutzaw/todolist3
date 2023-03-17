import { MouseEventHandler, RefObject } from "react";

export type AppContextType = {
  undoCount: number;
  canDelete: boolean;
  deleteloading: boolean;
  openDeleteModal: boolean;
  openDeleteToast: boolean;
  DeleteModalMounted: boolean;
  DeleteToastMounted: boolean;
  setopenDeleteModal: Function;
  setloading: Function;
  deleteHandle: Function;
  setcanDelete: Function;
  setopenDeleteToast: Function;
  setDeleteModalMounted: Function;
  setDeleteToastMounted: Function;
  handleDeleteModal: MouseEventHandler<HTMLButtonElement>;
  editModalRef: RefObject<HTMLDialogElement>;
};
