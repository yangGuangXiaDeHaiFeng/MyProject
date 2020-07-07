import React from 'react';

import BaseSearchForm from "@/pages/formily/components/BaseSearchForm";
import StepForm from "@/pages/formily/components/StepForm";
const Index:React.FC<{}>=()=>{
  return(<div>
    <h1>formily  表单框架 学习</h1>
    <h2>简单查询按钮</h2>
  <BaseSearchForm/>
  <h2>分步表单</h2>
    <StepForm/>
  </div>);
}
export default Index;
