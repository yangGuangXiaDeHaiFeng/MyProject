import usePagination from "./usePagination";
import useRowSelection from "./useRowSelection";

interface IOptionsProps {
  data:any,
  loading?:boolean,
  onChange?:(pagination:any, filters:any, sorter:any, extra:any)=>void;
  pagination?:any,
  rowSelection?:any

}
function useTable(options:IOptionsProps) {
  const {data,loading}=options;
  const tableProps:any = {
    dataSource: data.list,
    loading,
    onChange: (
      pagination:any,
      filters:any,
      sorter:any,
      extra: { currentDataSource: [] }
    ) => {
      if (options.onChange) {
        options.onChange(pagination, filters, sorter, extra);
      }
    }
  };

  const pagination = usePagination({
    total: data.totalCount,
    ...(options.pagination || {}),
    onChange: (page, pageSize) => {
      if (!options.onChange) {
        if (options.pagination && options.pagination.onChange) {
          options.pagination.onChange(page, pageSize);
        } else {
          // doFetch({ page, pageSize });
        }
      }
    }
  });
  if (options.pagination === false) {
    tableProps.pagination = false;
  } else {
    tableProps.pagination = pagination;
  }

  const {
    rowSelection,
    selectedList,
    resetSelection
  } = useRowSelection(
    typeof options.rowSelection === "object" ? options.rowSelection : {}
  );
  if (options.rowSelection) {
    tableProps.rowSelection = rowSelection;
  }



  return {
    tableProps,
    resetSelection,
    selectedList,
  };
}
export default useTable;
