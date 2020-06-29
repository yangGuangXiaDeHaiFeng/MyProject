import React, { useState, useEffect } from 'react';
import {Button} from 'antd';

const UseEffect:React.FC<{}>=()=>{
  const [count] = useState('0');
  const [name, setName] = useState('');
  useEffect(() => {
    const v=new Date();
    setName(`ll${v}`);
    return()=>{
    }
  },[count]);
  return (
    <div>
      <p>你好，{name}</p>
      <p>You clicked {count} times</p>
      <Button >
        Click me
      </Button>
    </div>
  );
}
export default UseEffect;
