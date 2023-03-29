import { AppContext } from '@/Context/AppContext';
import { auth, db } from '@/lib/firebase';
import { AppContextType, todosProps } from '@/types';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { MouseEventHandler, useContext, useEffect } from 'react';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import { RiLogoutBoxFill, RiFileCopy2Fill } from 'react-icons/ri';
import { VscAdd } from 'react-icons/vsc';
type HeaderDropDownProps = {
  theme: string;
  loading: boolean;
  opentools: boolean;
  settodos: Function;
  setTheme: Function;
  setmounted: Function;
  setopentools: Function;
  todos: todosProps[] | null[];
  logoutHandle: MouseEventHandler<HTMLButtonElement>;
};
export default function HeaderDropDown(props: HeaderDropDownProps) {
  const {
    todos,
    settodos,
    loading,
    setmounted,
    theme,
    setTheme,
    opentools,
    setopentools,
    logoutHandle,
  } = props;
  const { setisPrevent } = useContext(AppContext) as AppContextType;
  interface ToolsAnimate {
    animation: string;
    pointerEvents:
      | 'none'
      | 'initial'
      | 'inherit'
      | 'unset'
      | 'visiblePainted'
      | 'visibleFill'
      | 'visibleStroke'
      | 'visible';
  }
  const enterTools: ToolsAnimate = {
    animation: 'enterTools forwards 300ms ease-in',
    pointerEvents: 'initial',
  };
  const exitTools: ToolsAnimate = {
    animation: 'exitTools forwards 500ms ease-in',
    pointerEvents: 'initial',
  };
  const toolsAnimate = opentools ? enterTools : exitTools;
  useEffect(() => {
    opentools ? setisPrevent(true) : setisPrevent(false);
  }, [opentools]);

  function exportHandle() {
    const length = todos.length;
    const isPlural = length > 1 ? 'items' : 'item';
    const dataStr = JSON.stringify(todos);
    let dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    let fileName = 'data.json';
    let linkElement = document.createElement('a') as HTMLAnchorElement;
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', fileName);
    linkElement.click();
    alert(`Exported ${length} ${isPlural} to this Device ✨`);
  }
  function importHandle() {
    let fileInput = document.createElement('input');
    fileInput.setAttribute('type', 'file');
    fileInput.click();
    fileInput.addEventListener(
      'change',
      () => {
        if (!fileInput.files) return;
        const uploadFile = fileInput.files[0];
        //limit to 57 KB
        if (uploadFile.size >= 58769) {
          alert('File Size Limited to 50 kb ! Try Again');
          throw new Error('File Size Limited to 50 kb !');
        }
        if (uploadFile.type !== 'application/json') {
          alert('Invalid File Type. JSON Required ! Try Again');
          throw new Error('Invalid File Type. JSON Required !');
        }
        const fileReader = new FileReader();
        fileReader.onload = async (e) => {
          setisPrevent(true);
          // const jsonObj = JSON.parse(JSON.stringify(e.target?.result));
          const dataStr = e.target?.result as string;
          // const data = JSON.parse(dataStr) as object[];
          const newDatas = JSON.parse(dataStr);
          // const importTodo = { ...newDatas };
          settodos([
            ...todos,
            ...newDatas,
            // newDatas.map((d: any) => {
            //   return { ...d };
            // }),
          ]);
          if (!db) {
            alert('Firestore database is not available');
            throw new Error('Firestore database is not available');
          }
          if (!auth.currentUser) {
            alert('User is not authenticated');
            throw new Error('User is not authenticated');
          }
          const collectionRef = collection(db, 'users', auth.currentUser.uid, 'todos');
          // await setDoc(doc(collectionRef, 'new-city-id'), importTodo);
          try {
            newDatas.map(async (d: any) => {
              await setDoc(doc(collectionRef, d.id), {
                ...d,
              });
            });
            console.log('finish import');
            setisPrevent(false);
            setTimeout(() => {
              setopentools(false);
            }, 2000);
          } catch (error) {
            console.error(error);
          }
          // alert(`Imported ✨`);
          // await addDoc(collectionRef, importTodo);

          // settodos([
          //   ...todos,
          //   newDatas.map((d: any) => {
          //     return { ...todos, ...d };
          //   }),
          // ]);

          // settodos({...todos})
          // settodos([...todos ,data ])
          // settodos([data]);
          // todos.push(data);
          // settodos([ ...todos, data ]);
        };
        fileReader.readAsText(fileInput.files[0]);

        // fileReader.readAsText(fileInput.files[0]);
        // console.log(fileInput.files[0]);
        // for (const file of fileInput.files) {
        //   console.log(file);
        // }
      },
      false
    );
    // const length = todos.length;
    // const isPlural = length > 1 ? 'items' : 'item';
    // const dataStr = JSON.stringify(todos);
    // let dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    // let fileName = 'data.json';
    // let linkElement = document.createElement('a') as HTMLAnchorElement;
    // linkElement.setAttribute('href', dataUri);
    // linkElement.setAttribute('download', fileName);
    // linkElement.click();
  }
  return (
    <div
      className="dropdown"
      onAnimationEnd={() => {
        if (!opentools) {
          setmounted(false);
        }
      }}
    >
      <div style={toolsAnimate} className={`tools `}>
        <div className="tools-container">
          <button
            onClick={() => {
              setTheme((prev: string) => (prev === 'light' ? 'dark' : 'light'));
              setopentools(false);
            }}
          >
            {theme === 'light' ? <MdDarkMode /> : <MdLightMode />}
            <span>Theme</span>
          </button>
          <button disabled={loading} onClick={exportHandle}>
            <RiFileCopy2Fill />
            <span>Export Data</span>
          </button>
          <button disabled={loading} onClick={importHandle}>
            <VscAdd />
            <span>Import Data</span>
          </button>
          <button disabled={loading} onClick={logoutHandle}>
            <RiLogoutBoxFill />
            <span>{loading ? 'Logging out' : 'Logout'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
