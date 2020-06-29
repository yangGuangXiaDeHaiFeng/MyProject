function pDealData(data:number=10) {
  return new Promise(((resolve, reject) => {
    if(data>5){
      resolve(data)
    }else{
      try {
        reject(new Error('数据不符合要求'))
      }catch (e) {
        console.log('e',e.name);
      }

    }
  }))
}
export function testBut() {
  // pDealData(6).then((num)=>{
  //   console.log('执行结果是',num);
  // })
  pDealData(3)
    .catch((num)=>{
    console.log('执行结果是',num);
  })
}

export function p1() {
  const p=new Promise((resolve,reject )=> {
    resolve('success')
    console.log('after resolve');
    reject(new Error('error'))
  });
 const resultT= p.then((res)=>{
    console.log('resolve',res);
  },(res)=>{
    console.log('reject',res);
  })
  p.catch((r)=>{
    console.log(r)
  })
  resultT.then((t)=>{
    console.log('t',t);
  })
  console.log('resultT',resultT);
}

export function p2() {
  const p11=Promise.resolve({name:'lili',age:23});
  p11.then((r)=>{
    console.log('r',r);
  })
}

export function p3() {
  const p = new Promise((resolve) => {
    resolve('success');
  });

  const pp = Promise.resolve(p);

  pp.then(result => {
    console.log('result',result);
  });

  console.log('pp == p',pp == p);
}

export function pAll() {
  const pp1=Promise.resolve('123');
  const pp2=Promise.resolve(123);
  const pp3=Promise.resolve('hello');
  const pp4=Promise.resolve('hi');
  // const pp5=Promise.reject(new Error('error'));
  Promise.all([pp1,pp2,pp3,pp4]).then((re)=>{
    console.log('re',re);
  })
}
function sleep(wait:number) {
   return new Promise(((resolve) => {
         setTimeout(()=>{
           resolve(wait)
         },wait)
   }))
}
export function p4() {
  const ppp1=sleep(500);
  const ppp2=sleep(500);
  const ppp3=sleep(1000);
  Promise.all([ppp1,ppp2,ppp3]).then((res)=>{
    console.log('res',res);
  })
}
