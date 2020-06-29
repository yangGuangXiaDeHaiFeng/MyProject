import React from 'react';
import {Table} from 'antd';
import usePagination from "@/pages/reactHook/selfDefinateHooks/table/usePagination";
import useRowSelection from "@/pages/reactHook/selfDefinateHooks/table/useRowSelection";

import useTable from "@/pages/reactHook/selfDefinateHooks/table/useTable";
import data from './tableData';

const {total,list}=data;
const columns=[
  { title: "标题", dataIndex: "title" },
  { title: "更新时间", dataIndex: "datetime" },
  { title: "类型", dataIndex: "type" }
];
const PageTable=()=>{
  const pagination=usePagination({
    total
  });
  const { rowSelection } = useRowSelection();
  const {
    tableProps,
  } = useTable({
    data
  });

  return(
    <>
      <h2>usePagination和useRowSelection</h2>
      <Table
        rowKey="content"
        pagination={pagination as any}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={list}
      />
      <h2>useTable</h2>
      <Table rowKey="id" columns={columns} {...tableProps} />
      </>
  )
}
export default PageTable;
