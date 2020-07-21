import React,{memo,useState} from "react";
import {Select} from 'antd';
import StackedColumn from "./StackedColumn";

const StackedColumnMemo=memo(StackedColumn);
const { Option } = Select;
// 数据格式说明
const data_2020=[
  {
    xValue: "大一",
    type: "大四",
    money: null
  }, {
    xValue: "大一",
    type: "大三",
    money: null
  }, {
    xValue: "大一",
    type: "大二",
    money: null
  }, {
    xValue: "大一",
    type: "大一",
    money: 280
  }];
const data_2019=
  [
  {
    xValue: "大一",
    type: "大四",
    money: null
  }, {
    xValue: "大一",
    type: "大三",
    money: null
  }, {
    xValue: "大一",
    type: "大二",
    money: null
  }, {
    xValue: "大一",
    type: "大一",
    money: 280
  },
  {
    xValue: "大二",
    type: "大四",
    money: null
  }, {
    xValue: "大二",
    type: "大三",
    money: null
  }, {
    xValue: "大二",
    type: "大二",
    money: 579,
  }, {
    xValue: "大二",
    type: "大一",
    money: 280
  },
];
const data_2018=  [
  {
    xValue: "大一",
    type: "大四",
    money: null
  }, {
    xValue: "大一",
    type: "大三",
    money: null
  }, {
    xValue: "大一",
    type: "大二",
    money: null
  }, {
    xValue: "大一",
    type: "大一",
    money: 280
  },
  {
    xValue: "大二",
    type: "大四",
    money: null
  }, {
    xValue: "大二",
    type: "大三",
    money: null
  }, {
    xValue: "大二",
    type: "大二",
    money: 579,
  }, {
    xValue: "大二",
    type: "大一",
    money: 280
  },
  {
    xValue: "大三",
    type: "大四",
    money: null
  }, {
    xValue: "大三",
    type: "大三",
    money: 790
  }, {
    xValue: "大三",
    type: "大二",
    money: 579,
  }, {
    xValue: "大三",
    type: "大一",
    money: 280
  },
];
const data_2017=  [
  {
    xValue: "大一",
    type: "大四",
    money: null
  }, {
    xValue: "大一",
    type: "大三",
    money: null
  }, {
    xValue: "大一",
    type: "大二",
    money: null
  }, {
    xValue: "大一",
    type: "大一",
    money: 280
  },
  {
    xValue: "大二",
    type: "大四",
    money: null
  }, {
    xValue: "大二",
    type: "大三",
    money: null
  }, {
    xValue: "大二",
    type: "大二",
    money: 579,
  }, {
    xValue: "大二",
    type: "大一",
    money: 280
  },
  {
    xValue: "大三",
    type: "大四",
    money: null
  }, {
    xValue: "大三",
    type: "大三",
    money: 790
  }, {
    xValue: "大三",
    type: "大二",
    money: 579,
  }, {
    xValue: "大三",
    type: "大一",
    money: 280
  },
  {
    xValue: "大四",
    type: "大四",
    money: 1000
  }, {
    xValue: "大四",
    type: "大三",
    money: 790
  }, {
    xValue: "大四",
    type: "大二",
    money: 579,
  }, {
    xValue: "大四",
    type: "大一",
    money: 280
  },
];
// 没有安装顺序出现的数据
const data_2016=[
  {
    xValue: "大二",
    type: "大四",
    money: null
  }, {
    xValue: "大二",
    type: "大三",
    money: null
  }, {
    xValue: "大二",
    type: "大二",
    money: 579,
  }, {
    xValue: "大二",
    type: "大一",
    money: null
  },
  {
    xValue: "大四",
    type: "大四",
    money: 1000
  }, {
    xValue: "大四",
    type: "大三",
    money: null
  }, {
    xValue: "大四",
    type: "大二",
    money: 579,
  }, {
    xValue: "大四",
    type: "大一",
    money: null
  },
];
// 通用颜色数组
export const colors = [
  '#F57878',
  '#D29DFF',
  '#81C9FF',
  '#6ED8B9',
  '#FEA657',
  '#D2D86E',
  '#FFA0D3',
  '#9CBE71',
];
export function dealData(d:any[],pro:string,c:string[]) {
  //  用对象来保存图例和颜色的对应关系
  const result = {};
  if(d&&d.length>0&&pro&&c&&c.length>0){
    const items = [...new Set(d.map((item: any) => item[pro]))];
    for(let i=0;i<items.length;i+=1){
      result[items[i]]=c[i%c.length];
    }
  }
  return result;
}
/**
 * 需求说明
 * 1、图例和颜色对应并固定，比如：“大二”无论在什么情况下都是 “red”;
 * 2、“后来者居上”，比如：“大二”比“大一”大，所以堆积图显示时，“大二”应该在上面；
 * 3、图例符合用户习惯，比如图例顺序应该是“大一、大二、大三、大四”或者“大二、大三、大四”而不应该是其他（“大四、大三”……）
 * 实现说明：
 *   经研究发现
 *      ①、图例顺序（从左到右）和堆积图顺序（从上到下）一致。即默认情况下“需求2”和“需求3”相悖；
 *          ====》图例：使用自定义图例，人为控制图例的顺序;
 *          ====>堆积图：按照顺序，给全量颜色
 *      ②、当某个值为null时，图表中不显示，但是图例依旧会显示
 *          ====》图例数据从横坐标取。
 *  数据说明：
 *     接口返回全量数据，逻辑上不存在的置为null。
 *
 *
 * @constructor
 */
const LegendColor:React.FC<{}>=()=>{
  const[data,setDate]=useState(data_2020)
  function changData(value:string) {
    console.log('value',value);
      if(value==='2020'){
        setDate(data_2020)
      }
    if(value==='2019'){
      setDate(data_2019)
    }
    if(value==='2018'){
      setDate(data_2018)
    }
    if(value==='2017'){
      setDate(data_2017)
    }
    if(value==='2016'){
      setDate(data_2016)
    }
  }
  // 图例名称和颜色的对应关系
  const itemsColors=dealData(data,'type',colors);
 // 堆积图的颜色
  const c=Object.values(itemsColors);
  // 自定义图例 ：  内容从横坐标中获取，顺序与横坐标一致
  const legendItem=[...new Set(data.map((item: any) => item.xValue))];

  const selectOptions=[{value:'2016',name:'2016年'},{value:'2017',name:'2017年'},{value:'2018',name:'2018年'},{value:'2019',name:'2019年'},{value:'2020',name:'2020年'}];
  return<div>
    <div style={{display:"flex",justifyContent:'space-between'}}>
      <h3>大学生累计消费</h3>
    <Select style={{width:220}} onChange={changData} defaultValue="2020">
      {selectOptions.map((item:any)=><Option key={item.value} value={item.value}>{item.name}</Option> )}
    </Select>
    </div>
   <StackedColumnMemo data={data}
                      xAxis="xValue"
                      yAxis="money"
                      legendName="type"
                      color={c}
                      items={legendItem}
                      allItemsAndColors={itemsColors}
                     />
  </div>
}
export default LegendColor;

