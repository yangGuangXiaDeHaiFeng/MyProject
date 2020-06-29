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

interface IBubblesProps {
  data: any[]; // 数据源
  xAxis: string; // x轴坐标
  yAxis: string; // y轴坐标
  legendName: string; // 图例对应的变量(数据中表示种类的字段)
  color?: string[];
  height?:number;
  maxLen?:number;
}

/**
 * 多面积图（两个及两个以上面积图，可设置滚动条）
 * @param props
 * @constructor
 */
const Bubbles:React.FC<IBubblesProps>=(props)=>{
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
  const cols = {
  };
  cols[xAxis]={
    range: [0, 1]
  }
  /**
   * 实际项目中发现，在多面积图中,做如下处理显示效果会更好
   *  ①、设置“area”同时也设置“line”，并且“area”中的颜色最好设置透明度；
   ②、为防止只有一组数组时出现的“异常”现象（鼠标移入出现点，移出后都没有），设置“point”
   */
  return (
    <>
      <Chart height={height} data={dv||data} forceFit scale={cols}>
        <Axis name={xAxis} />
        <Axis name={yAxis}  />
        <Legend/>
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
          color={color ? [`${legendName}`, color] : legendName}
          opacity={0.2}
        />
        <Geom type="line" position={`${xAxis}*${yAxis}`}size={2}
                   color={color ? [`${legendName}`, color] : legendName}
              shape="smooth"
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
export default Bubbles;

