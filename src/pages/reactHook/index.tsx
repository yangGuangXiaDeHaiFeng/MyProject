import React from 'react';
import UseEffect from "@/pages/reactHook/UseEffect";
import MemoPage from "@/pages/reactHook/MemoPage";
import SelfHooks from "@/pages/reactHook/selfDefinateHooks";


const ReactHook:React.FC<{}>=()=>{

  return(<div>
    <h1>初识ReactHook</h1>
    <UseEffect/>
    <h1>性能优化：memo</h1>
    <MemoPage/>
    <h1>自定义hook</h1>
    <SelfHooks/>

  </div>)
}
export default ReactHook;
