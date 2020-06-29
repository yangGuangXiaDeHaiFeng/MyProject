import React from "react";
import {
  Chart,
  Coord,
  Geom,
  Axis,
  Tooltip,
  Legend
} from "bizcharts";

interface IBasicRadarProps {
  data: any[]; // 数据源
  xAxis: string; // x轴坐标
  yAxis: string; // y轴坐标
  legendName:string;// 分类名称
  height?:number;
  color?:string[];
}

/**
 * 基础雷达图-面
 * @param props
 * @constructor
 */
const BasicRadar:React.FC<IBasicRadarProps>=(props)=>{
  const {height=400,xAxis,yAxis,data,legendName,color}=props;
  return (
    <Chart
      height={height}
      data={data}
      forceFit
    >
      <Coord type="polar" radius={0.8} />
      <Axis
        name={xAxis}
        line={null}
        tickLine={null}
        grid={{
          lineStyle: {
            lineDash: null
          },
          hideFirstLine: false
        } as any}
      />
      <Tooltip />
      <Axis
        name="score"
        line={null}
        tickLine={null}
        grid={{
          type: "polygon",
          lineStyle: {
            lineDash: null
          },
          alternateColor: "rgba(0, 0, 0, 0.04)"
        } as any}
      />
      <Legend />
      <Geom
        type="area"
        position={`${xAxis}*${yAxis}`}
        color={color ? [`${legendName}`, color] : legendName}
      />
      <Geom type="line" position={`${xAxis}*${yAxis}`} size={2}
            color={color ? [`${legendName}`, color] : legendName}
      />
      <Geom
        type="point"
        position={`${xAxis}*${yAxis}`}
        size={4}
        shape="circle"
        color={color ? [`${legendName}`, color] : legendName}
      />
    </Chart>
  );
}


export default BasicRadar;

