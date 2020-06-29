import React from 'react';
import {Button,Input} from 'antd';
import useTitle from "@/pages/reactHook/selfDefinateHooks/useTitle";
import useInputDeal from "@/pages/reactHook/selfDefinateHooks/useInputDeal";
import useUpdate from "@/pages/reactHook/selfDefinateHooks/useUpdate";
import useXState from "@/pages/reactHook/selfDefinateHooks/useXState";
import PageTable from "@/pages/reactHook/selfDefinateHooks/table";

const SelfHooks=()=>{
  useTitle('hook学习'); // 自定义hook
  const inputProps=useInputDeal('please');
  const update=useUpdate();
  const [value,setValue]=useXState('');
  return(<> <div>
    <Input {...inputProps}/>
    <div>当前input输入的内容为：{inputProps.value}</div>
  </div>
    <div>
      <h3>小小计时器</h3>
      <div>当前时间：{Date.now()}</div>
      <Button onClick={()=>update()}>更新时间</Button>
    </div>
    <div>
      <h3>更新state，并支持回调</h3>
      <div>改变名称，并在控制台输出改变后的名称</div>
      <span>名称：</span><Input onChange={(e)=>{
        setValue(e.target.value,()=>{
          console.log('改变后的值为：',value);
        });
    }}/>
    </div>
    <div>
      <h3>自定义hook，现实table的封装</h3>
      <PageTable/>
    </div>
  </>)
}
export default SelfHooks;
