import {useState} from 'react';

function useUpdate() {
  const [,setFlag]=useState();
  const update=()=>{
    // 保证每次的值不一样
    setFlag(Math.random());
  }
  return update;
}
export default useUpdate;
