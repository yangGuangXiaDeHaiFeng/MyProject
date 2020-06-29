import React from "react";
import {Axis, Chart, Geom, Legend, Tooltip,Coord} from "bizcharts";
// @ts-ignore
import DataSet from '@antv/data-set';

interface IBasicPieProps {
  data: any[]; // 数据源
  xAxis: string; // x轴坐标
  yAxis: string; // y轴坐标
  color?: string[];
  height?: number;
}

/**
 * 基础饼图
 *    接口返回对应数据即可（不需要计算到具体百分比）
 *     ===》各item所占比例和最大限度接近100%
 * @param props
 * @constructor
 */
const BasicPie: React.FC<IBasicPieProps> = (props) => {
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
        <Coord type="theta" radius={0.75} />
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
        />
      </Chart>
  );
};


export default BasicPie;

