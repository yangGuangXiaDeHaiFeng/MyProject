import React,{memo,useState,useEffect,useCallback,useMemo} from 'react';
import {Button} from 'antd';

const MemoPage=()=>{
  const [name,setName]=useState('hello');
  const [person,setPerson]=useState({name2:'hh',age:7});
  const [b]=useState('hi');
  const bfn=useCallback(()=>{
    console.log('b',b);
  },[b]);


  const bvar=useMemo(()=>{return `${b}:你好`},[b]);
  useEffect(()=>{
    console.log('start');
  })
return <div>
  <Button onClick={()=>setName(`hello${Math.random()}`)} >改变PageA</Button>
  <Button onClick={()=>setPerson({name2:`hello${Math.random()}`,age:7+Math.random()})} >改变PageA(对象)</Button>
  <PageA name={name} {...person}/><PageB bfn={bfn} bvar={bvar} />
  </div>
}
export interface IPageAProps {
  name:string;
  name2:string;
  age:number;

}
const PageA:React.FC<IPageAProps>=(props)=>{
const {name,name2,age}=props;
  console.log('进入PageA页面',name2,age);
  useEffect(()=>{
    console.log('PageA页面-useEffect');
  },[name2,age,name]);
  return<div>{name2}</div>
}
export interface IPageBProps {
  bfn:()=>void,bvar:string
}
const PageB:React.FC<IPageBProps>=memo((props)=>{
  const {bfn,bvar}=props;
  console.log('进入PageB页面');
  useEffect(()=>{
    console.log('PageB页面-useEffect');
  });

  return<div>PageB+{bvar}</div>
})
export default MemoPage;
