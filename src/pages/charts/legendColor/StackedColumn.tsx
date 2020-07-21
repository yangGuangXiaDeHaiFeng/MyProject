import React from "react";
import {Axis, Chart, Geom, Legend, Tooltip} from "bizcharts";
// @ts-ignore
import Slider from 'bizcharts-plugin-slider';
// @ts-ignore
import DataSet from '@antv/data-set';
import {dealSliderChange, filterSliderData} from "@/pages/charts/utils/chartsCommon";

interface IStackedColumnProps {
  data: any[]; // 数据源
  xAxis: string; // x轴坐标
  yAxis: string; // y轴坐标
  legendName: string; // 图例对应的变量(数据中表示种类的字段)
  color: any[];
  items:string[];// 自定义图例
  allItemsAndColors:any;// 图例和颜色的对应关系
  height?: number;
  maxLen?: number;
}

/**
 * 堆积柱状图（设置滚动条）
 * @param props
 * @constructor
 */
const StackedColumn: React.FC<IStackedColumnProps> = (props) => {
  const {height = 400, xAxis, yAxis, data, maxLen, color, legendName,items,allItemsAndColors} = props;
  let flag: boolean = false;
  let dv: any;
  let ds: any;
  // 获取数据中横坐标的个数，作为是否出现滚动条的依据；
  if (maxLen) {
    const xAxisData = [...new Set(data.map((item) => item[xAxis]))];
    // 设置一个flag，用来判断是否出现滚动条（以及是否需要处理数据）
    flag = xAxisData.length > maxLen;
    if (flag) {
      const startLength = 0;
      const endLength = maxLen - 1;
      /*
          此处处理区别于单条折线图
            初始化时，应取xAxisData中的第1个（index为0）作为start,取所能展示的最后一个（index为max-1）作为end
       */
      ds = new DataSet({
        state: {
          start: xAxisData[startLength],
          end: xAxisData[endLength],
        },
      });
      dv = ds.createView()
        .source(data)
        .transform({
          type: 'filter',
          // eslint-disable-next-line consistent-return
          callback: (obj: any) => filterSliderData(flag, ds, data, obj, xAxis),
        });
    }
  }
  const legendItem = [];
  // 自定义图例的处理 ：图例名称和颜色对应起来
  if (items && items.length > 0) {
    for (let i = 0; i < items.length; i += 1) {
      legendItem.push({
        value: items[i],
        marker: {
          symbol: 'square',
          fill: allItemsAndColors[items[i]],
          radius: 5,
        },
      });
    }
  }
  return (
    <>
      <Chart height={height} data={dv || data} forceFit>
        <Axis name={xAxis} />
        <Axis name={yAxis} />
        <Legend
          custom
          items={legendItem}
          clickable={false}
        />
        <Tooltip
        />
        <Geom type="intervalStack"
              position={`${xAxis}*${yAxis}`}
              color={color ? [`${legendName}`, color] : legendName}
        />
      </Chart>
      {
        flag && <Slider
            onChange={(obj: any) => dealSliderChange(obj, ds)}
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
};


export default StackedColumn;

