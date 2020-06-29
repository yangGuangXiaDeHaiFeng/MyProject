import React from "react";
import {Axis, Chart, Geom, Legend, Tooltip,Coord} from "bizcharts";


interface IBasicPie2Props {
  data: any[]; // 数据源
  xAxis: string; // x轴坐标
  yAxis: string; // y轴坐标
  color?: string[];
  height?: number;
}

/**
 * 基础饼图
 *    接口返回计算后的百分比（后端需要计算后再返回）
 *    ===>所有item所占百分和不一定接近100%（取决于后端返回值）
 * @param props
 * @constructor
 */
const BasicPie2: React.FC<IBasicPie2Props> = (props) => {

  const {height = 400, xAxis, yAxis, data, color} = props;
  const cols={};
  cols[yAxis]={
    formatter(val:number) {
      // 保留两位小数
      return `${val}%`;
    }
  }
  return (
      <Chart height={height} data={data} forceFit  scale={cols}>
        <Coord type="theta" radius={0.75} />
        <Axis name={yAxis} />
        <Legend />
        <Tooltip
          showTitle={false}
        />
        <Geom
          type="intervalStack"
          position={yAxis}
          color={color ? [`${xAxis}`, color] : xAxis}
          style={{
            lineWidth: 1,
            stroke: '#fff',
          }}
        />
      </Chart>
  );
};


export default BasicPie2;

