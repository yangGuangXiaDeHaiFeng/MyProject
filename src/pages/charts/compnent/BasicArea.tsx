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

interface IBasicAreaProps {
  data: any[]; // 数据源
  xAxis: string; // x轴坐标
  yAxis: string; // y轴坐标
  height?:number;
  maxLen?:number;
}

/**
 * 基础面积图（单面积图，可设置滚动条）
 * @param props
 * @constructor
 */
const BasicArea:React.FC<IBasicAreaProps>=(props)=>{
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

  const cols = {
  };
  // 对于像是折线图、面积图等连续图表，建议为横坐标设置range:[0,1]
  cols[xAxis]={
    range: [0, 1]
  }
  /*
            当没有设置“point”时，会出现以下现象：
                如果数据只有一条，即data.length=1时：
                      ①、图表中什么也没有②、鼠标悬浮时出现点及该点对应的数据
                      即鼠标移入图表有数据移出没有数据（用户角度的现象）
            ===》建议面积图中设置“point”（实际中看项目需求）
         * */
  return (
    <>
      <Chart height={height} data={dv||data}  scale={cols} forceFit>
        <Axis name={xAxis} />
        <Axis name={yAxis}  />
        <Tooltip
          crosshairs={{
            type: "y"
          }}
        />
        <Geom
        type="area"
        position={`${xAxis}*${yAxis}`}
        size={4}
        shape="smooth"
      />
        <Geom type="line" position={`${xAxis}*${yAxis}`} size={2}  shape="smooth"/>
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


export default BasicArea;

