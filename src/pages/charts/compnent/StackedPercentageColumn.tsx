import React from "react";
import {Axis, Chart, Geom, Legend, Tooltip} from "bizcharts";
// @ts-ignore
import Slider from 'bizcharts-plugin-slider';
// @ts-ignore
import DataSet from '@antv/data-set';
import {dealSliderChange, filterSliderData} from "@/pages/charts/utils/chartsCommon";

interface IStackedPercentageColumnProps {
  data: any[]; // 数据源
  xAxis: string; // x轴坐标
  yAxis: string; // y轴坐标
  legendName: string; // 图例对应的变量(数据中表示种类的字段)
  color?: string[];
  height?: number;
  maxLen?: number;
}

/**
 * 百分比堆积柱状图（可设置滚动条）
 * @param props
 * @constructor
 */
const StackedPercentageColumn: React.FC<IStackedPercentageColumnProps> = (props) => {
  const {height = 400, xAxis, yAxis, data, maxLen, color, legendName} = props;
  let flag: boolean = false;
  let ds = new DataSet();
  let rows=[];
  let dv = ds
    .createView()
    .source(data)
    .transform({
      type: "percent",
      field: yAxis,
      dimension:legendName ,
      groupBy: [xAxis],
      as: "percent"
    });
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
      rows=dv.rows||[];
      dv = ds.createView()
        .source(data).transform({
        type: "percent",
        field: yAxis,
        // 统计销量
        dimension:legendName ,
        // 每年的占比
        groupBy: [xAxis],
        // 以不同产品类别为分组
        as: "percent"
      }).transform({
          type: 'filter',
          // eslint-disable-next-line consistent-return
          callback: (obj: any) => filterSliderData(flag, ds, data, obj, xAxis),
        });
    }
  }
  const cols = {
    percent: {
      min: 0,
      formatter(val:number) {
        // 保留两位小数
        return `${(val * 100).toFixed(2)  }%`;
      }
    }
  };
  return (
    <>
      <Chart height={height} data={dv} forceFit scale={cols}>
        <Axis name={xAxis} />
        <Axis name="percent" />
        <Legend />
        <Tooltip
        />
        <Geom type="intervalStack"
              position={`${xAxis}*percent`}
              color={color ? [`${legendName}`, color] : legendName}
        />
      </Chart>
      {
        flag && <Slider
            onChange={(obj: any) => dealSliderChange(obj, ds)}
            height={20}
            width="auto"
            xAxis={xAxis}
            yAxis="percent"
            data={rows}
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


export default StackedPercentageColumn;

