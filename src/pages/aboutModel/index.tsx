import React,{useState} from 'react';
import { Modal, Select, Button } from 'antd';

const { Option } = Select;
const AboutModel:React.FC<{}>=props=>{
  const [visible, setHidden] = useState(false);
  return (
    <div>
      <Button type="primary" onClick={()=>{setHidden(true)}}>
        Open Modal
      </Button>
      <Modal
        title="Basic Modal"
        visible={visible}
        onOk={()=>setHidden(false)}
        onCancel={()=>setHidden(false)}
      >
        <Select style={{ width: '420px' }} mode="multiple">
          <Option value="ha">ha</Option>
          <Option value="ha1">ha</Option>
          <Option value="ha2">ha</Option>
          <Option value="ha3">ha</Option>
          <Option value="ha4">ha</Option>
          <Option value="ha5">ha</Option>
        </Select>
        <Select style={{ width: '420px' }} mode="multiple">
          <Option value="ha">ha</Option>
          <Option value="ha1">ha</Option>
          <Option value="ha2">ha</Option>
          <Option value="ha3">ha</Option>
          <Option value="ha4">ha</Option>
          <Option value="ha5">ha</Option>
        </Select>
        <Select style={{ width: '420px' }} mode="multiple">
          <Option value="ha">ha</Option>
          <Option value="ha1">ha</Option>
          <Option value="ha2">ha</Option>
          <Option value="ha3">ha</Option>
          <Option value="ha4">ha</Option>
          <Option value="ha5">ha</Option>
        </Select>
        <Select style={{ width: '420px' }} mode="multiple">
          <Option value="ha">ha</Option>
          <Option value="ha1">ha</Option>
          <Option value="ha2">ha</Option>
          <Option value="ha3">ha</Option>
          <Option value="ha4">ha</Option>
          <Option value="ha5">ha</Option>
        </Select>
        <Select style={{ width: '420px' }} mode="multiple">
          <Option value="ha">ha</Option>
          <Option value="ha1">ha</Option>
          <Option value="ha2">ha</Option>
          <Option value="ha3">ha</Option>
          <Option value="ha4">ha</Option>
          <Option value="ha5">ha</Option>
        </Select>
      </Modal>
    </div>
  );
}
export default AboutModel;
