import React from "react";
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
} from "bizcharts";
// @ts-ignore
import Slider from 'bizcharts-plugin-slider';
// @ts-ignore
import DataSet from '@antv/data-set';
import {dealSliderChange, filterSliderData} from "@/pages/charts/utils/chartsCommon";

interface IBasicColumnProps {
  data: any[]; // 数据源
  xAxis: string; // x轴坐标
  yAxis: string; // y轴坐标
  height?:number;
  maxLen?:number;
}

/**
 * 单柱状图：
 *     1、带有滚动条Slider；
 *     2、可适用于基础柱状图、区间柱状图，二者的区别只是数据源的不同
 *        基础柱状图：yAxis 对应的值是number类型
 *        区间柱状图：yAxis 对应的值是[number,number](数组)类型
 * @param props
 * @constructor
 */
const BasicColumn:React.FC<IBasicColumnProps>=(props)=>{
  const {height=400,xAxis,yAxis,data,maxLen}=props;
  let flag:boolean=false;
  let ds:any;
  let dv:any;
  // 是否传入maxLen(有滚动条时必须传入)
  if(maxLen){
    // 设置一个flag，用来判断是否出现滚动条（以及是否需要处理数据）
    flag=data.length>maxLen;
    if(flag){
      const startLength = 0;
      const endLength = maxLen - 1;
      ds=new DataSet({
        state: {
          start: data[startLength][xAxis],
          end: data[endLength][xAxis],
        },
      });
      dv=ds.createView()
        .source(data)
        .transform({
          type: 'filter',
          // eslint-disable-next-line consistent-return
          callback: (obj: any) =>   filterSliderData(flag,ds,data,obj,xAxis),
        });
    }
  }
  return (
    <>
      <Chart height={height} data={dv||data} forceFit>
        <Axis name={xAxis} />
        <Axis name={yAxis}  />
        <Tooltip
        />
        <Geom type="interval" position={`${xAxis}*${yAxis}`} />
      </Chart>
      {
        flag &&<Slider
          onChange={(obj:any)=>dealSliderChange(obj,ds)}
          height={20}
          width="auto"
          xAxis={xAxis}
          yAxis={yAxis}
          data={data}
          start={ds.state.start}
          end={ds.state.end}
          padding={[50]}
          textStyle={{
            fontSize: '0',
          }}
          backgroundChart={{
            type: 'heatmap',
          }}
        />
      }
    </>
  );
}


export default BasicColumn;

