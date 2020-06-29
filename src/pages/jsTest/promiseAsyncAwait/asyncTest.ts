async function imAsync(num:number) {
  if(num>5){
    return num;// 这里相当于resolve(num)
  }
  throw num; // 这里相当于reject(num)
}
export function testBut2() {
  console.log('imAsync',imAsync(9));
  imAsync(9).then(res=>{
    console.log('res',res);
  })
  // imAsync(6).catch(function (v) {
  //   console.log(v);
  // });
}
export async function awaitTest() {
 const result=await Promise.resolve('success');
 console.log('result',result);
 return result;
}
