import { Timestamp } from 'firebase/firestore';
import { MouseEventHandler, RefObject } from 'react';

export type AppContextType = {
  active: string;
  setactive: Function;
  tabRef: RefObject<HTMLDivElement>;
  deleting: boolean;
  openDeleteToast: boolean;
  timeAgo: Function;
  setopenDeleteToast: Function;
  dateLocale: string;
  setDateLocale: Function;
  deleteloading: boolean;
  openDeleteModal: boolean;
  DeleteModalMounted: boolean;
  DeleteToastMounted: boolean;
  setopenDeleteModal: Function;
  isPrevent: boolean;
  setdeleting: Function;
  setisPrevent: Function;
  setloading: Function;
  deleteHandle: Function;
  setDeleteModalMounted: Function;
  setDeleteToastMounted: Function;
  handleDeleteModal: MouseEventHandler<HTMLButtonElement>;
  editModalRef: RefObject<HTMLDialogElement>;
};
export interface todosProps {
  id: string | number;
  text?: string;
  completed?: boolean;
  timeStamp?: Timestamp;
  label?: string;
}
export interface labelProps {
  id: string | number;
  text?: string;
  timeStamp?: Timestamp;
}
