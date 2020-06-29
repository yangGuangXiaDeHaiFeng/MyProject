import React from 'react';
import {Table,Form,Input,Row,Col,InputNumber} from 'antd';
import { ColumnProps } from 'antd/es/table';

interface ITableFormProps {
  data:any[]
}
const TableForm:React.FC<ITableFormProps>=props=>{
  const [form] = Form.useForm();
  const {data}=props;
  const columns:ColumnProps<any>[]=[
    {
      title: '名称',
      align: 'center',
      dataIndex: 'name',
      key: 'name',
      // render: () => {
      //   return (
      //     <Form.Item
      //       name='minScore'
      //       rules={[{ required: true }]}
      //     >
      //       <Input />
      //     </Form.Item>
      //   );
      // },
    },
    {
      title: '类型',
      align: 'center',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '大于等于',
      align: 'center',
      dataIndex: 'minScore',
      key: 'minScore',
      render: (text,record,index) => {
        console.log('text',text,index);
        return (
          <Form.Item
            name={`minScore${index}`}
            rules={[{ required: true,message:'分值必填' },{pattern:/^([1-9][0-9]*)+(.[0-9]{1})?$/,message: '分数必须是一位小数'}]}
          >
            <InputNumber min={0.0} step={0.1} />
          </Form.Item>
        );
      },
    },
    {
      title: '分值区间',
      align: 'center',
      dataIndex: 'scoreInternal',
      key: 'scoreInternal',
      render: (text,record,index) => {
        return (
          <Row>
            <Col span={11}>  <Form.Item
              name={`scoreInternal_start${index}`}
              rules={[{ required: true,message:'分值必填' }]}
            >
              <Input />
            </Form.Item></Col>
            ~
            <Col  span={11}> <Form.Item
              name={`scoreInternal_end${index}`}
              rules={[{ required: true,message:'分值必填' }]}
            >
              <Input />
            </Form.Item></Col>
            </Row>
        );
      },
    },
  ]
  return(
      <Form form={form} initialValues={{ minScore0: 65,minScore1: 90,scoreInternal_start0:23,scoreInternal_end0:89,
        scoreInternal_start1:90,scoreInternal_end1:100,
      }}>
    <Table
      bordered
      pagination={false}
      columns={columns}
      dataSource={data}
      rowKey="key"
    />
      </Form>
  )
}
export default TableForm;
