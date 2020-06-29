import React from "react";
import {Axis, Chart, Geom, Legend, Tooltip} from "bizcharts";
// @ts-ignore
import Slider from 'bizcharts-plugin-slider';
// @ts-ignore
import DataSet from '@antv/data-set';
import {dealSliderChange, filterSliderData} from "@/pages/charts/utils/chartsCommon";
import styles from './GroupedBoxChart.less';


interface IGroupedBoxChartProps {
  data: any[]; // 数据源
  xAxis: string; // x轴坐标
  legendName: string; // 图例对应的变量(数据中表示种类的字段)
  color?: string[];
  boxValue: string; // 代表值的字段  具体值的样式为 [number,number,number,number,number]
  height?:number;
  maxLen?:number;

}

/**
 * 分组箱型图（自定义图例，可设置滚动条）
 * @param props
 * @constructor
 */
const GroupedBoxChart: React.FC<IGroupedBoxChartProps> = (props) => {
  const {height=400,xAxis,boxValue,data,maxLen,color,legendName}=props;
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
  const toolTipItemTpl =
    '<li data-index={index} style="margin-bottom:4px;">' +
    '<span style="color:#242424;font-size:13px;">{name}</span><br />' +
    '<span style="color:##999999;font-size:12px;">最高分：{high}分</span><br />' +
    '<span>上四分位分：{q3}分</span><br />' +
    '<span>中位分：{median}分</span><br />' +
    '<span>下四分位分：{q1}分</span><br />' +
    '<span>最低分：{low}分</span><br />' +
    '</li>';
  const containerTpl =
    '<div class="g2-tooltip">' +
    '<div class="g2-tooltip-title" style="margin-bottom: 4px;"></div>' +
    '<ul style="display:inline-block;padding-left:0;text-align:right;">' +
    '<li></li>' +
    '<li>最高分：</li>' +
    '<li>上四位分：</li>' +
    '<li>平均分：</li>' +
    '<li>下四位分：</li>' +
    '<li>最低分：</li>' +
    '</ul>' +
    '<ul class="g2-tooltip-list tooltip-list"></ul></div>';
  function getCurrentColor(key: string): string {
    // 获取所有的图例信息
    const lend: string[] = [];
    data.forEach((item: any) => {
      lend.push(item[`${legendName}`]);
    });
    const lendData = [...new Set(lend)];
    const resultMap = [];
    let result: string = '';
    if (color && color.length > 0) {
      // 传入颜色
      for (let i = 0; i < color.length && i < lendData.length; i += 1) {
        const obj: any = {};
        obj[`${lendData[i]}`] = color[i % 8];
        resultMap.push(obj);
      }
    } else {
      // 未传入颜色
      for (let i = 0; i < lendData.length; i += 1) {
        const obj = {};
        // @ts-ignore
        // eslint-disable-next-line no-undef
        obj[`${lendData[i]}`] = G2.Global.colors[i];
        resultMap.push(obj);
      }
    }

    if (resultMap && resultMap.length > 0) {
      const rr = resultMap.filter((item: any) => item[`${key}`]);
      if (rr && rr.length > 0) {
        result = rr[0][`${key}`];
      }
    }
    return result;
  }
  return (
    <>
      <Chart height={height} data={dv||data} forceFit   className={styles.groupBoxChart}>
        <Axis name={xAxis} />
        <Axis name={boxValue}  />
        <Legend/>
        <Tooltip
          crosshairs={{
            type: 'rect',
            style: {
              fill: '#E4E8F1',
              fillOpacity: 0.43,
            },
          }}
          itemTpl={toolTipItemTpl}
          containerTpl={containerTpl}
        />
        <Geom
          type="schema"
          position={`${xAxis}*${boxValue}`}
          shape="box"
          color={color ? [`${legendName}`, color] : legendName}
          size={[...new Set(data.map(item => item[xAxis]))].length < 8 ? 38 : undefined}
          style={[
            `${legendName}`,
            {
              stroke: 'rgba(0, 0, 0, 0.45)',
              fill: (val: any) => getCurrentColor(val),
              fillOpacity: 0.8,
            },
          ]}
          adjust="dodge"
          tooltip={
            [
              `${xAxis}*${legendName}*${boxValue}`,
              (x: string, legend: string, values: string[]) => {
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
                    name: `${legend}`,
                    low: `${values[0]}`,
                    q1: `${values[1]}`,
                    median: `${values[2]}`,
                    q3: `${values[3]}`,
                    high: `${values[4]}`,
                  };
                }
                return {
                  name: `${legend}`,
                  low: '-',
                  q1: '-',
                  median: '-',
                  q3: '-',
                  high: '-',
                };
              },
            ] as any
          }
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

export default GroupedBoxChart;

