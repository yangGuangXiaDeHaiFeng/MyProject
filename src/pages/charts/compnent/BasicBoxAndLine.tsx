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

interface IBasicBoxAndLineProps {
  data: any[]; // 数据源
  xAxis: string; // x轴坐标
  avg: string; // 平均数
  boxValue: string; // 代表值的字段  具体值的样式为 [number,number,number,number,number]
  height?:number;
  maxLen?:number;
  colors?:[string,string]; // 图表的颜色，colors[0]:箱型图颜色；colors[1]:折线图颜色；
}

/**
 * 带平均数箱型图（在箱型图的基础上增加折线图（表示平均数））
 *   自定义tooltip比较麻烦，好在基础箱型图官网有自定义图例demo
 * @param props
 * @constructor
 */
const BasicBoxAndLine:React.FC<IBasicBoxAndLineProps>=(props)=>{
  const {height=400,xAxis,boxValue,data,maxLen,avg,colors=['#1890FF','#fdae6b']}=props;
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
    '<span>平均分：{avg}分</span><br />' +
    '<span>中位分：{median}分</span><br />' +
    '<span>下四分位分：{q1}分</span><br />' +
    '<span>最低分：{low}分</span><br />' +
    '</li>';

  return (
    <>
      <Chart height={height} data={dv||data} forceFit>
        <Axis name={xAxis} />
        <Axis name={boxValue}  />
        <Axis name={avg} grid={null} />
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
              color={colors[0]}
              tooltip={
                [
                  `${xAxis}*${boxValue}*${avg}`,
                  (x: string, values: string[],v:number) => {
                    if (
                      !(
                        values[0] === null &&
                        values[1] === null &&
                        values[2] === null &&
                        values[3] === null &&
                        values[4] === null&&
                        avg===null
                      )
                    ) {
                      return {
                        name: `${x}`,
                        low: `${values[0]}`,
                        q1: `${values[1]}`,
                        avg:v,
                        median: `${values[2]}`,
                        q3: `${values[3]}`,
                        high: `${values[4]}`,
                      };
                    }
                    return {
                      name: `${x}`,
                      low: '-',
                      q1: '-',
                      avg:'-',
                      median: '-',
                      q3: '-',
                      high: '-',
                    };
                  },
                ] as any
              }
              style={{
                stroke: "rgba(0, 0, 0, 0.45)",
                fill: `${colors[0]}`,
                fillOpacity: 0.8
              } as any}
        />
        <Geom type="line" position={`${xAxis}*${avg}`} size={2} tooltip={false} color={colors[1]} />
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
export default BasicBoxAndLine;

