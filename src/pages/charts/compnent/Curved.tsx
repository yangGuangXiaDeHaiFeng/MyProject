import React from "react";
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
  Legend
} from "bizcharts";
// @ts-ignore
import Slider from 'bizcharts-plugin-slider';
// @ts-ignore
import DataSet from '@antv/data-set';
import {dealSliderChange, filterSliderData} from "@/pages/charts/utils/chartsCommon";

interface ICuredProps {
  data: any[]; // 数据源
  xAxis: string; // x轴坐标
  yAxis: string; // y轴坐标
  legendName: string; // 图例对应的变量(数据中表示种类的字段)
  color?: string[];
  height?:number;
  maxLen?:number;
}

/**
 * 多折线图（两条及两条以上折线图，可设置滚动条）
 * @param props
 * @constructor
 */
const Cured:React.FC<ICuredProps>=(props)=>{
  const {height=400,xAxis,yAxis,data,maxLen,color,legendName}=props;
  let flag:boolean=false;
  let dv:any;
  let ds:any;
  // 获取数据中横坐标的个数，作为是否出现滚动条的依据；
  if(maxLen){
    const xAxisData=[...new Set(data.map((item)=>item[xAxis]))];
    // 设置一个flag，用来判断是否出现滚动条（以及是否需要处理数据）
  flag=xAxisData.length>maxLen;
    if(flag){
      const startLength = 0;
      const endLength = maxLen - 1;
      /*
          此处处理区别于单条折线图
            初始化时，应取xAxisData中的第1个（index为0）作为start,取所能展示的最后一个（index为max-1）作为end
       */
      ds=new DataSet({
        state: {
          start: xAxisData[startLength],
          end: xAxisData[endLength],
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
        <Legend/>
        <Tooltip
          crosshairs={{
            type: "y"
          }}
        />
        <Geom type="line" position={`${xAxis}*${yAxis}`}size={2}
              color={color ? [`${legendName}`, color] : legendName}

        />
        <Geom
          type="point"
          position={`${xAxis}*${yAxis}`}
          size={4}
          shape="circle"
          color={color ? [`${legendName}`, color] : legendName}

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


export default Cured;

