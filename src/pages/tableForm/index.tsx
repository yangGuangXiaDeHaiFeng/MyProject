import React from 'react';
import {Form,Input} from 'antd';
import TableForm from './TableForm';
import EditableTable from './EditableTable';

const Index:React.FC<{}>=()=>{
const tableData=[{name:'编辑',type:'操作',minScore: 85},{name:'编辑2',type:'操作2',minScore: 335}];
  return (<div>
    <h1>column为formItem</h1>
    <TableForm data={tableData}/>
    <h1>可编辑Table</h1>
    <EditableTable/>
    <h1>当initialValue和组件的placeholder相遇时</h1>
    <Form>
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input  placeholder='Please input your username!' />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input placeholder='Please input your password!' />
      </Form.Item>

    </Form>
  </div>)
}
export default Index;
