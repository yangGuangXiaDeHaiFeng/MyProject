import React from "react";
import {Axis, Chart, Geom, Legend, Tooltip,Coord,Label} from "bizcharts";
// @ts-ignore
import DataSet from '@antv/data-set';

interface IBasicDonutProps {
  data: any[]; // 数据源
  xAxis: string; // x轴坐标
  yAxis: string; // y轴坐标
  color?: string[];
  height?: number;
}

/**
 * 基础环图
 *    建议后端直接返回对应的数值（即后端不需要处理成百分比）
 * @param props
 * @constructor
 */
const BasicDonut: React.FC<IBasicDonutProps> = (props) => {
  const {height = 400, xAxis, yAxis, data, color} = props;
  const ds = new DataSet();
  const  dv = ds
    .createView()
    .source(data)
    .transform({
      type: "percent",
      field: yAxis,
      dimension: xAxis,
      as: "percent"
    });
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
    <Chart height={height} data={dv} forceFit scale={cols}>
      <Coord type="theta" radius={0.75} innerRadius={0.6} />
      <Axis name="percent" />
      <Legend />
      <Tooltip
        showTitle={false}
      />
      <Geom
        type="intervalStack"
        position="percent"
        color={color ? [`${xAxis}`, color] : xAxis}
        style={{
          lineWidth: 1,
          stroke: '#fff',
        }}
      >
        <Label
          content="percent"
          formatter={(val:number, item:any) => {
            return `${item.point[xAxis]  }: ${  val}`;
          }}
        />
      </Geom>
    </Chart>
  );
};


export default BasicDonut;

