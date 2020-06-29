import React from "react";
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
  Label,
} from "bizcharts";
// @ts-ignore
import Slider from 'bizcharts-plugin-slider';
// @ts-ignore
import DataSet from '@antv/data-set';
import {dealSliderChange, filterSliderData} from "@/pages/charts/utils/chartsCommon";

interface IBasicHeatMapProps {
  data: any[]; // 数据源
  xAxis: string; // x轴坐标
  yAxis: string; // y轴坐标
  height?:number;
  legendName: string; // 图例对应的变量(数据中表示种类的字段) 热力图中的图例一般用连续型图例
  color?: string;// 色块的颜色 ，不填时，使用默认颜色
  maxLen?:number;
}

/**
 * 基础热力图-色块图
 * @param props
 * @constructor
 */
const BasicHeatMap:React.FC<IBasicHeatMapProps>=(props)=>{
  const {height=400,xAxis,yAxis,data,legendName, color = '#BAE7FF-#1890FF-#0050B3',maxLen}=props;
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
  const cols = {};
  cols[xAxis] = {
    type: 'cat',
  };
  cols[yAxis] = {
    type: 'cat',
  };
  return (
    <>
      <Chart height={height} data={dv||data} forceFit scale={cols}>
        <Axis name={xAxis}
              grid={{
                align: 'center',
                lineStyle: {
                  lineWidth: 1,
                  lineDash: null,
                  stroke: '#f0f0f0',
                },
                showFirstLine: true,
              } as any }
        />
        <Axis name={yAxis}
              grid={{
                align: 'center',
                lineStyle: {
                  lineWidth: 1,
                  lineDash: null,
                  stroke: '#f0f0f0',
                },
              } as any}
        />
        <Tooltip
        />
        <Geom type="polygon"
              position={`${xAxis}*${yAxis}`}
              color={[legendName, color]}
              style={{
                stroke: '#fff',
                lineWidth: 1,
              }}
        >
          <Label
            content={legendName}
            offset={-2}
            textStyle={{
              fill: '#fff',
              fontWeight: 'bold',
              shadowBlur: 2,
              shadowColor: 'rgba(0, 0, 0, .45)',
            }}
          />
        </Geom>
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
export default BasicHeatMap;

