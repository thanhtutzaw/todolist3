import{j as a,a as e,r as d,F as f,A as v,b,d as E,K as N}from"./index-c9679828.js";function B(i){const{closeHandle:o,closeConfirm:l}=i;return a("div",{className:"closeConfirmModal",children:[e("p",{style:{fontWeight:"500",fontSize:"22px"},children:"Discard Changes ?"}),a("div",{children:[e("button",{className:"btn continueBtn",onClick:l,children:"Keep editing"}),e("button",{className:"btn discardBtn",onClick:()=>{l(),o()},children:"Discard"})]})]})}function S(i){return e("div",{className:"closeConfirmModal",children:a("p",{style:{fontWeight:"500",fontSize:"22px"},children:[e("span",{role:"img","aria-label":"updating",children:"🌟"})," ","Updating..."]})})}function U(i){const{text:o,settext:l,todo:t,editInput:m,closeHandle:c,clearSelect:p,setisPrevent:r}=i,[s,u]=d.useState(!1);d.useEffect(()=>{s?document.getElementById("updating").showModal():document.getElementById("updating").close()},[s]);const g=async n=>{const M=v(E,"users",b.currentUser.uid,"todos",n),x={...t,text:o};if(o!==t.text){console.info("%cUpdating...","color:grey"),u(!0),r(!0);try{await N(M,x),document.getElementById("editModal").close(),console.info("%cUpdated ✔️","color:green"),u(!1),p(),r(!1)}catch(y){alert("Update Error ! "+y.message)}}else c()},h=d.useRef(null);d.useEffect(()=>{t&&l(t.text)},[t]);function C(){document.querySelector("#confirmModal").close()}return a(f,{children:[e("dialog",{id:"confirmModal",children:e(B,{closeConfirm:C,closeHandle:c})}),e("dialog",{id:"updating",children:e(S,{})}),t&&e(f,{children:e("div",{style:{pointerEvents:s?"none":"auto",userSelect:s?"none":"unset"},className:"editModal",onClick:n=>{n.preventDefault(),n.stopPropagation()},children:a("div",{className:"editInput",ref:m,children:[e("textarea",{style:{userSelect:s?"none":"unset"},value:o,ref:h,onChange:n=>{l(n.target.value)},className:"textarea"}),a("div",{className:"editModalActions",children:[e("button",{onClick:()=>{o!==t.text?document.getElementById("confirmModal").showModal():c()},className:"editCloseBtn",children:"Close"}),e("button",{onClick:()=>{g(t.id)},type:"submit",className:"updateBtn",children:"Save"})]})]})},t.id)})]})}export{U as default};
