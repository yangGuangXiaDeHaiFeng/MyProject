import React,{useState} from 'react';
import {Tabs,Table,DatePicker} from 'antd';
import useRequest from "@/pages/aboutTabs/useRequest";
import data from './tableData';

const {RangePicker}=DatePicker;
const {TabPane}=Tabs;
const TAB_ALL = "all";
const TAB_FINISHED = "finished";
const TAB_UNFINISHED = "unfinished";
const tabMap = {
  [TAB_ALL]: "全部",
  [TAB_FINISHED]: "已完成",
  [TAB_UNFINISHED]: "待完成"
};
const columns=[
  { title: "标题", dataIndex: "title" },
  { title: "更新时间", dataIndex: "datetime" },
  { title: "类型", dataIndex: "type" }
];
/*
function test() {
  setTimeout(()=>{
    console.log(`模拟网络请求${Math.random()}`);
  },3000)
}
 */
const AboutTabs=()=>{
  const [activeTab, setActiveTab] = useState(TAB_ALL);
  useRequest(()=> {
  },[activeTab]
  )
  return(<div>
    <h1>关于Tabs切换时的优化：频繁切换后之前的请求</h1>
    <h2>未优化之前</h2>
    <RangePicker/>
    <Tabs activeKey={activeTab} onChange={setActiveTab}>
      <TabPane tab={tabMap[TAB_ALL]} key={TAB_ALL} />
      <TabPane tab={tabMap[TAB_FINISHED]} key={TAB_FINISHED} />
      <TabPane tab={tabMap[TAB_UNFINISHED]} key={TAB_UNFINISHED} />
    </Tabs>
    <Table  columns={columns} rowKey="id" dataSource={data.list}/>
  </div>)
}
export default AboutTabs;
