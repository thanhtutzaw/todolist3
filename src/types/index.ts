import { Timestamp } from 'firebase/firestore';
import { MouseEventHandler, RefObject } from 'react';

export type AppContextType = {
  labels: labelProps[];
  setlabels: Function;
  todos: todosProps[];
  settodos: Function;
  filter: todosProps[] | null[];
  setfilter: Function;
  loading: boolean;
  theme: string;
  setTheme: Function;
  tab: string;
  settab: Function;
  tabRef: RefObject<HTMLDivElement>;
  deleting: boolean;
  openDeleteToast: boolean;
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
