import React from 'react';
import {FormButtonGroup, Reset, SchemaForm, SchemaMarkupField as Field, Submit} from "@formily/antd";
import {Input} from "antd";

const BaseSearchForm:React.FC<{}>=()=>{

  return  <SchemaForm
    components={{ Input }}
    onSubmit={values => {
      console.log(values)
    }}
  >
    <Field type="string" name="name" title="Name" x-component="Input" />
    <FormButtonGroup>
      <Submit>查询</Submit>
      <Reset>重置</Reset>
    </FormButtonGroup>
  </SchemaForm>
}
export default BaseSearchForm;
