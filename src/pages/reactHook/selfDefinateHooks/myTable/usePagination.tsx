import {useState,useMemo} from 'react';

const defaultPagination={
  showSizeChanger: true,
  showQuickJumper: true,
  hideOnSinglePage:false,
  page: 1,
  total:0,
  pageSize:10,
}
interface IPaginationConfig{
  total:number, // list总数是从接口中拿出来的，所以，必须需要人为传入
  showSizeChanger?:boolean;
  showQuickJumper?: boolean;
  hideOnSinglePage?:boolean;
  page?:number
  pageSize?:number,
  onChange?:(current:number, pageSize:number)=>void; // 页发生变化
  onShowSizeChange?:(current:number, pageSize:number)=>void; // 每页显示几条发生变化
}
function usePagination(paginationConfig:IPaginationConfig=defaultPagination){
    const [pagination,setPagination]=useState({
      pageSize:paginationConfig.pageSize||defaultPagination.pageSize,
      current:paginationConfig.page||defaultPagination.page,
    });
    const result=useMemo(()=>{
      return{
        ...defaultPagination,
        total:paginationConfig.total||defaultPagination.total,
        showTotal: (total:number) => `共 ${total} 条记录`,
        ...paginationConfig,
        current: paginationConfig.page||defaultPagination.page,
        onChange: (page: number, pageSize:number)=>{
          if(paginationConfig.onChange){
            paginationConfig.onChange(page,pageSize);
          }
          setPagination({current:page,pageSize})
        },
        onShowSizeChange: (current: number, size: number) => {
          if(paginationConfig.onShowSizeChange){
            paginationConfig.onShowSizeChange(current,size)
          }
          setPagination({current,pageSize:size})
        },
      }
    },[paginationConfig,pagination])
  // 返回pagination需要的配置
  return result;
}
export default usePagination;
