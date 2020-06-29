import {useState,useRef,useEffect} from 'react';

/**
 * 自定义hooks函数
 * 实现类似于class组件的setState支持第二个参数回调，
 *
 */
const useXState=(initState:any)=>{
  const [state,setState]=useState(initState);
  let isUpdate=useRef();
  console.log('isUpdate',isUpdate);
  const setXState=(sta:any,callback:any)=> {
    setState((pre: any) => {
      isUpdate.current = callback;
      return typeof state === 'function' ? sta(pre) : sta
    });
  }
    useEffect(() => {
      if(isUpdate.current) {
        // @ts-ignore
        isUpdate.current()
      }

    })
    return[state,setXState];

}
export default useXState;
