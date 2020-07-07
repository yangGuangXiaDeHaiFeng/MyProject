import {useState,useMemo} from 'react';

export const defaultPagination={
  total:0,
  pageSize: 10,
  current: 1
}
interface IConfig {
  total:number;
  pageSize?:number;
  page?:number;
  defaultCurrent?:number;
  onChange?:(current:number, pageSize:number)=>void;
}
function usePagination(config:IConfig=defaultPagination) {
const [pagination,setPagination]=useState({
  pageSize: config.pageSize || defaultPagination.pageSize,
  current: config.page || config.defaultCurrent || defaultPagination.current
});
  const paginationConfig=useMemo(()=>{
    return{
      ...defaultPagination,
      showTotal: (total:number) =>
        `每页 ${pagination.pageSize} 条  第 ${pagination.current}页 共 ${total}条`,
      ...config,
      pageSize: pagination.pageSize,
      current: pagination.current,
      showSizeChanger:true,
      onChange: (current:number, pageSize:number) => {
        if (config.onChange) {
          config.onChange(current, pageSize);
        }
        setPagination({ pageSize, current });
      },
      onShowSizeChange: (current:number, pageSize:number) => {
        if (config.onChange) {
          config.onChange(current, pageSize);
        }
        setPagination({ pageSize, current });
      }
    };
    },[config, pagination]
 );
return paginationConfig;
}
export default usePagination;
