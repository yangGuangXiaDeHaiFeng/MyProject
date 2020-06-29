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

interface IBasicLineProps {
  data: any[]; // 数据源
  xAxis: string; // x轴坐标
  yAxis: string; // y轴坐标
  height?:number;
  maxLen?:number;
}

/**
 * 基础折线图（单折线图，可设置滚动条）
 * @param props
 * @constructor
 */
const BasicLine:React.FC<IBasicLineProps>=(props)=>{
  const {height=400,xAxis,yAxis,data,maxLen}=props;
  let flag:boolean=false;
  let ds:any;
  let dv:any;
  // 是否传入maxLen(有滚动条时必须传入)
  if(maxLen){
    const dataLen=data.length;
    // 设置一个flag，用来判断是否出现滚动条（以及是否需要处理数据）
    flag=dataLen>maxLen;
    if(flag){
      const startLength =dataLen-maxLen ;
      const endLength = dataLen - 1;
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
          crosshairs={{
            type: "y"
          }}
        />
        <Geom type="line" position={`${xAxis}*${yAxis}`}size={2}
             />
        <Geom
          type="point"
          position={`${xAxis}*${yAxis}`}
          size={4}
          shape="circle"
        />
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


export default BasicLine;

