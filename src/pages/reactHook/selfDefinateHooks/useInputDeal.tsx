import {useState} from 'react';

function useInputDeal(initValue:string) {
  const [value,setValue]=useState(initValue||"");
  const onChange=(e:any)=>{
    setValue(e.target.value);
  }
  return {value,onChange}
}
export default useInputDeal;
