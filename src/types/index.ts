import { MouseEventHandler, RefObject } from 'react';

export type AppContextType = {
  undoCount: number;
  deleting: boolean;
  cancelDelete: boolean;
  deleteloading: boolean;
  openDeleteModal: boolean;
  openDeleteToast: boolean;
  DeleteModalMounted: boolean;
  DeleteToastMounted: boolean;
  setopenDeleteModal: Function;
  isPrevent: boolean;
  setdeleting: Function;
  setisPrevent: Function;
  setloading: Function;
  deleteHandle: Function;
  setcancelDelete: Function;
  setopenDeleteToast: Function;
  setDeleteModalMounted: Function;
  setDeleteToastMounted: Function;
  handleDeleteModal: MouseEventHandler<HTMLButtonElement>;
  editModalRef: RefObject<HTMLDialogElement>;
};
export interface todosProps {
  id: string | number;
  text?: string;
  completed?: boolean;
}
