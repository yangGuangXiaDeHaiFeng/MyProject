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

interface IBasicBoxProps {
  data: any[]; // 数据源
  xAxis: string; // x轴坐标
  boxValue: string; // 代表值的字段  具体值的样式为 [number,number,number,number,number]
  height?:number;
  maxLen?:number;
}

/**
 * 基础箱型图（单个箱型图，可设置滚动条）
 *   自定义tooltip比较麻烦，好在基础箱型图官网有自定义图例demo
 * @param props
 * @constructor
 */
const BasicBox:React.FC<IBasicBoxProps>=(props)=>{
  const {height=400,xAxis,boxValue,data,maxLen}=props;
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

  const toolTipItemTpl =
    '<li data-index={index} style="margin-bottom:4px;">' +
    '<span style="color:#242424;font-size:13px;">{name}</span><br />' +
    '<span style="color:##999999;font-size:12px;">最高分：{high}分</span><br />' +
    '<span>上四分位分：{q3}分</span><br />' +
    '<span>中位分：{median}分</span><br />' +
    '<span>下四分位分：{q1}分</span><br />' +
    '<span>最低分：{low}分</span><br />' +
    '</li>';

  return (
    <>
      <Chart height={height} data={dv||data} forceFit>
        <Axis name={xAxis} />
        <Axis name={boxValue}  />
        <Tooltip
          showTitle={false}
          crosshairs={{
            type: 'rect',
            style: {
              fill: '#E4E8F1',
              fillOpacity: 0.43,
            },
          }}
          itemTpl={toolTipItemTpl}
        />

        <Geom type="schema"
              position={`${xAxis}*${boxValue}`}
              shape="box"
              tooltip={
                [
                  `${xAxis}*${boxValue}`,
                  (x: string, values: string[]) => {
                    if (
                      !(
                        values[0] === null &&
                        values[1] === null &&
                        values[2] === null &&
                        values[3] === null &&
                        values[4] === null
                      )
                    ) {
                      return {
                        name: `${x}`,
                        low: `${values[0]}`,
                        q1: `${values[1]}`,
                        median: `${values[2]}`,
                        q3: `${values[3]}`,
                        high: `${values[4]}`,
                      };
                    }
                    return {
                      name: `${x}`,
                      low: '-',
                      q1: '-',
                      median: '-',
                      q3: '-',
                      high: '-',
                    };
                  },
                ] as any
              }
              style={{
                stroke: "rgba(0, 0, 0, 0.45)",
                fill: "#1890FF",
                fillOpacity: 0.3
              } as any}
        />
      </Chart>
      {
        flag &&<Slider
            onChange={(obj:any)=>dealSliderChange(obj,ds)}
            height={20}
            width="auto"
            xAxis={xAxis}
            yAxis={boxValue}
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
export default BasicBox;

