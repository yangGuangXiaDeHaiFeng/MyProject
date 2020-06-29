// 超出x后出现滚动条
export const maxLen=6;
// 处理滚动条的onChage
export function dealSliderChange(obj:any,dataSet:any,) {
  const { startValue, endValue } = obj;
  dataSet.setState('start', startValue);
  dataSet.setState('end', endValue);
}

/**
 * 过滤出可在滚动条上显示的数据
 * @param flag：处理数据的时机
 * @param dataSet
 * @param data：接口返回的数据源
 * @param obj：当前数据
 * @param xAxis： 横坐标
 */
// eslint-disable-next-line consistent-return
export function filterSliderData(flag:boolean,dataSet:any,data:any[],obj:any,xAxis:string) {
  if (flag) {
    // 获取开始节点的下标值
    const { start } = dataSet.state;
    const startIndex = data.findIndex((value: any) => value[xAxis] === start);
    // 获取末尾节点下标值
    const { end } = dataSet.state;
    const endIndex = data.findIndex((value: any) => value[xAxis] === end);
    if (startIndex > -1 && endIndex > -1) {
      const filterData = data.slice(startIndex, endIndex + 1);
      const filterIndex = filterData.findIndex((value: any) => value[xAxis] === obj[xAxis]);
      if (filterIndex > -1) {
        return obj;
      }
    }
  } else {
    return obj;
  }
}
