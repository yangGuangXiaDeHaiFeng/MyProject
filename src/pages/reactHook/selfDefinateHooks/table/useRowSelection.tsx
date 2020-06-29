import {useState,useMemo,useCallback} from 'react';

export const defaultOptions={
  selectedList: [],
  selectedRowKey: []
}
interface IOptions {
  selectedList:any[];
  selectedRowKey:any[];
  onChange?:(selectedRowKeys:any, selectedRows:any)=>void;
}
function useRowSelection(options:IOptions = defaultOptions) {
  const [selectedList, setSelectedList] = useState(options.selectedList || defaultOptions.selectedList);
  const [selectedRowKey, setSelectedRowKeys] = useState(
    options.selectedRowKey || defaultOptions.selectedRowKey
  );
  const rowSelection = useMemo(() => {
    return {
      columnWidth: "44px",
      ...options,
      selectedList,
      selectedRowKey,
      onChange: (selectedRowKeys:any[], selectedRows:any[]) => {
        setSelectedRowKeys(selectedRowKeys);
        setSelectedList(selectedRows);
        if (options.onChange) {
          options.onChange(selectedRowKeys, selectedRows);
        }
      }
    };

  }, [selectedList, selectedRowKey, options]);
  // 操作完取消选中
  const resetSelection = useCallback(() => {
    setSelectedList([]);
    setSelectedRowKeys([]);
  }, []);
  return { rowSelection, selectedList, selectedRowKey, resetSelection };
}
export default useRowSelection;
