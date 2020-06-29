import {useEffect} from 'react';

 const useRequest = (fn:any, dependencies:any[]) => {
  const request = () => {
    console.log('执行request');
    let timer:any;
    // let cancel=false;
    // if (!cancel) {
      timer=setTimeout(()=>{
        console.log(`模拟网络请求${Math.random()}`);
      },3000)
    // }
    // 请求的方法返回一个 取消掉这次请求的方法
    return () => {
      // cancel = true;
      clearTimeout(timer)
    };
  };

  // 重点看这段，在useEffect传入的函数，返回一个取消请求的函数
  // 这样在下一次调用这个useEffect时，会先取消掉上一次的请求。
  useEffect(() => {
    const cancelRequest = request();
    return () => {
      cancelRequest();
    };
  }, dependencies);

  return {  request };
};
export default useRequest;
