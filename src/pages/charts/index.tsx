import React,{memo}  from 'react';
import BasicLine from "@/pages/charts/compnent/BasicLine";
import Cured from "@/pages/charts/compnent/Curved";
import BasicColumn from "@/pages/charts/compnent/BasicColumn";
import GroupedColumn from "@/pages/charts/compnent/GroupedColumn";
import StackedColumn from "@/pages/charts/compnent/StackedColumn";
import BasicArea from "@/pages/charts/compnent/BasicArea";
import Bubbles from "@/pages/charts/compnent/Bubbles";
import StackedPercentageColumn from "@/pages/charts/compnent/StackedPercentageColumn";
import StackedPercentageArea from "@/pages/charts/compnent/StackedPercentageArea";
import BasicPie from "@/pages/charts/compnent/BasicPie";
import BasicPie2 from "@/pages/charts/compnent/BasicPie2";
import BasicDonut from "@/pages/charts/compnent/BasicDonut";
import BasicRadar from "@/pages/charts/compnent/BasicRadar";
import BasicRadar2 from "@/pages/charts/compnent/BasicRadar2";
import BasicHeatMap from "@/pages/charts/compnent/BasicHeatMap";
import BasicBox from "@/pages/charts/compnent/BasicBox";
import GroupedBoxChart from "@/pages/charts/compnent/GroupedBoxChart";
import {maxLen} from "@/pages/charts/utils/chartsCommon";


const BasicLineMemo=memo(BasicLine);
const CuredMemo=memo(Cured);
const BasicColumnMemo=memo(BasicColumn);
const GroupedColumnMemo=memo(GroupedColumn);
const StackedColumnMemo=memo(StackedColumn);
const BasicAreaMemo=memo(BasicArea);
const BubblesMemo=memo(Bubbles);
const StackedPercentageColumnMemo=memo(StackedPercentageColumn);
const StackedPercentageAreaMemo=memo(StackedPercentageArea);
const BasicPieMemo=memo(BasicPie);
const BasicPie2Memo=memo(BasicPie2);
const BasicDonutMemo=memo(BasicDonut);
const BasicRadarMemo=memo(BasicRadar);
const BasicRadar2Memo=memo(BasicRadar2);
const BasicHeatMapMemo=memo(BasicHeatMap);
const BasicBoxMemo=memo(BasicBox);
const GroupedBoxChartMemo=memo(GroupedBoxChart);

const basicLineData= [
  {
    year: "1991",
    value: 3
  },
  {
    year: "1992",
    value: 4
  },
  {
    year: "1993",
    value: 3.5
  },
  {
    year: "1994",
    value: 5
  },
  {
    year: "1995",
    value: 4.9
  },
  {
    year: "1996",
    value: 6
  },
  {
    year: "1997",
    value: 7
  },
  {
    year: "1998",
    value: 9
  },
  {
    year: "1999",
    value: 13
  }
];
const doubleData= [
  {
    month: "Jan",
    city: "Tokyo",
    temperature: 7
  },
  {
    month: "Jan",
    city: "London",
    temperature: 3.9
  },
  {
    month: "Feb",
    city: "Tokyo",
    temperature: 6.9
  },
  {
    month: "Feb",
    city: "London",
    temperature: 4.2
  },
  {
    month: "Mar",
    city: "Tokyo",
    temperature: 9.5
  },
  {
    month: "Mar",
    city: "London",
    temperature: 5.7
  },
  {
    month: "Apr",
    city: "Tokyo",
    temperature: 14.5
  },
  {
    month: "Apr",
    city: "London",
    temperature: 8.5
  },
  {
    month: "May",
    city: "Tokyo",
    temperature: 18.4
  },
  {
    month: "May",
    city: "London",
    temperature: 11.9
  },
  {
    month: "Jun",
    city: "Tokyo",
    temperature: 21.5
  },
  {
    month: "Jun",
    city: "London",
    temperature: 15.2
  },
  {
    month: "Jul",
    city: "Tokyo",
    temperature: 25.2
  },
  {
    month: "Jul",
    city: "London",
    temperature: 17
  },
  {
    month: "Aug",
    city: "Tokyo",
    temperature: 26.5
  },
  {
    month: "Aug",
    city: "London",
    temperature: 16.6
  },
  {
    month: "Sep",
    city: "Tokyo",
    temperature: 23.3
  },
  {
    month: "Sep",
    city: "London",
    temperature: 14.2
  },
  {
    month: "Oct",
    city: "Tokyo",
    temperature: 18.3
  },
  {
    month: "Oct",
    city: "London",
    temperature: 10.3
  },
  {
    month: "Nov",
    city: "Tokyo",
    temperature: 13.9
  },
  {
    month: "Nov",
    city: "London",
    temperature: 6.6
  },
  {
    month: "Dec",
    city: "Tokyo",
    temperature: 9.6
  },
  {
    month: "Dec",
    city: "London",
    temperature: 4.8
  }
];
const  basicColumnData = [
  {
    year: "1951 年",
    sales: 38
  },
  {
    year: "1952 年",
    sales: 52
  },
  {
    year: "1956 年",
    sales: 61
  },
  {
    year: "1957 年",
    sales: 145
  },
  {
    year: "1958 年",
    sales: 48
  },
  {
    year: "1959 年",
    sales: 38
  },
  {
    year: "1960 年",
    sales: 38
  },
  {
    year: "1962 年",
    sales: 38
  },
  {
    year: "1969 年",
    sales: 68
  }
];
const basicColumnData2=[
  {
    x: "分类一",
    y: [76, 100]
  },
  {
    x: "分类二",
    y: [56, 108]
  },
  {
    x: "分类三",
    y: [38, 129]
  },
  {
    x: "分类四",
    y: [58, 155]
  },
  {
    x: "分类五",
    y: [45, 120]
  },
  {
    x: "分类六",
    y: [23, 99]
  },
  {
    x: "分类七",
    y: [18, 56]
  },
  {
    x: "分类八",
    y: [18, 34]
  }
];
const stackedData= [
  {
    country: "Europe",
    year: "1750",
    value: 163
  },
  {
    country: "Europe",
    year: "1800",
    value: 203
  },
  {
    country: "Europe",
    year: "1850",
    value: 276
  },
  {
    country: "Europe",
    year: "1900",
    value: 408
  },
  {
    country: "Europe",
    year: "1950",
    value: 547
  },
  {
    country: "Europe",
    year: "1999",
    value: 729
  },
  {
    country: "Europe",
    year: "2050",
    value: 628
  },
  {
    country: "Europe",
    year: "2100",
    value: 828
  },
  {
    country: "Asia",
    year: "1750",
    value: 502
  },
  {
    country: "Asia",
    year: "1800",
    value: 635
  },
  {
    country: "Asia",
    year: "1850",
    value: 809
  },
  {
    country: "Asia",
    year: "1900",
    value: 947
  },
  {
    country: "Asia",
    year: "1950",
    value: 1402
  },
  {
    country: "Asia",
    year: "1999",
    value: 3634
  },
  {
    country: "Asia",
    year: "2050",
    value: 5268
  },
  {
    country: "Asia",
    year: "2100",
    value: 7268
  },
  {
    country: "Asia",
    year: "2200",
    value: 7568
  },
  {
    country: "Europe",
    year: "2200",
    value: 7568
  }
];
const basicPieData= [
  {
    year: "1991",
    value: 30.3
  },
  {
    year: "1992",
    value:20.3
  },
  {
    year: "1993",
    value: 30.3
  },
  {
    year: "1994",
    value:20.3
  },
];
const donutData = [
  {
    item: "事例一",
    count: 40
  },
  {
    item: "事例二",
    count: 21
  },
  {
    item: "事例三",
    count: 17
  },
  {
    item: "事例四",
    count: 13
  },
  {
    item: "事例五",
    count: 9
  }
];
const radarData=[
  {month: "一月份", day:"星期一", sales: 10},
  {month: "二月份", day:"星期一", sales: 5},
  {month: "三月份", day:"星期一", sales: 10},
  {month: "四月份", day:"星期一", sales: 10},
  {month: "五月份", day:"星期一", sales: 10},
  {month: "六月份", day:"星期一", sales: 10},
  {month: "七月份", day:"星期一", sales: 10},
  {month: "八月份", day:"星期二", sales: 10},
  {month: "九月份", day:"星期一", sales: 10},
  {month: "十月份", day:"星期二", sales: 10},
  {month: "十一月份", day:"星期一", sales: 10},
  {month: "十二月份", day:"星期一", sales: 10},
  {month: "一月份", day:"星期二", sales: 10},
  {month: "二月份", day:"星期二", sales: 35},
  {month: "三月份", day:"星期二", sales: 10},
  {month: "四月份", day:"星期二", sales: 60},
  {month: "五月份", day:"星期二", sales: 10},
  {month: "六月份", day:"星期二", sales: 10},
  {month: "七月份", day:"星期二", sales: 10},
  {month: "八月份", day:"星期二", sales: 90},
  {month: "九月份", day:"星期二", sales: 10},
  {month: "十月份", day:"星期二", sales: 330},
  {month: "十一月份", day:"星期二", sales: 40},
  {month: "十二月份", day:"星期二", sales: 50},
  {month: "一月份", day:"星期三", sales: 10},
  {month: "二月份", day:"星期三", sales: 35},
  {month: "三月份", day:"星期三", sales: 10},
  {month: "四月份", day:"星期三", sales: 10},
  {month: "五月份", day:"星期三", sales: 10},
  {month: "六月份", day:"星期三", sales: 50},
  {month: "七月份", day:"星期三", sales: 40},
  {month: "八月份", day:"星期三", sales: 90},
  {month: "九月份", day:"星期三", sales: 10},
  {month: "十月份", day:"星期三", sales: 330},
  {month: "十一月份", day:"星期三", sales: 40},
  {month: "十二月份", day:"星期三", sales: 50},
  {month: "一月份", day:"星期六", sales: 10},
  {month: "二月份", day:"星期六", sales: 35},
  {month: "三月份", day:"星期六", sales: 1700},
  {month: "四月份", day:"星期六", sales: 1070},
  {month: "五月份", day:"星期六", sales: 1770},
  {month: "六月份", day:"星期六", sales: 580},
  {month: "七月份", day:"星期六", sales: 490},
  {month: "八月份", day:"星期六", sales:456},
  {month: "九月份", day:"星期六", sales: 1000},
  {month: "十月份", day:"星期六", sales: 630},
  {month: "十一月份", day:"星期六", sales: 490},
  {month: "十二月份", day:"星期六", sales: 560},
];
 const boxData=[
   {
     x:'一月',
     boxValue:[0,1,4,7,9]
   },
   {
     x:'二月',
     boxValue:[7,34,68,70,90]
   },
   {
     x:'三月',
     boxValue:[2,12,42,72,92]
   },
   {
     x:'四月',
     boxValue:[1,11,41,71,91]
   },
   {
     x:'五月',
     boxValue:[9,91,94,97,99]
   },
   {
     x:'六月',
     boxValue:[70,71,94,117,119]
   },
   {
     x:'七月',
     boxValue:[20,31,44,57,69]
   },
   {
     x:'八月',
     boxValue:[6,16,46,76,96]
   }, {
     x:'九月',
     boxValue:[12,33,44,74,94]
   },
   {
     x:'十月',
     boxValue:[2,6,4,7,10]
   },
 ];
const groupedBoxData=[
  {
    "termName": "第一学期",
    "gradeName": "2018年",
    "interval": [
      1,
      2,
      3,
      4,
      5
    ]
  },
  {
    "termName": "第二学期",
    "gradeName": "2018年",
    "interval": [
      2,
      2.2,
      3,
      4,
      4.5
    ]
  },
  {
    "termName": "第三学期",
    "gradeName": "2018年",
    "interval": [
      3,
      3.2,
      3.5,
      4,
      5
    ]
  },
  {
    "termName": "第四学期",
    "gradeName": "2018年",
    "interval": [
      1,
      3.2,
      3.4,
      4,
      6
    ]
  },
  {
    "termName": "第五学期",
    "gradeName": "2018年",
    "interval": [
      2,
      3,
      3.2,
      3.5,
      5
    ]
  },
  {
    "termName": "第六学期",
    "gradeName": "2018年",
    "interval": [
      1,
      2,
      2.4,
      3,
      3.5
    ]
  },
  {
    "termName": "第七学期",
    "gradeName": "2018年",
    "interval": [
      1,
      2,
      3,
      3.2,
      3.5
    ]
  },
  {
    "termName": "第八学期",
    "gradeName": "2018年",
    "interval": [
      1.5,
      2.5,
      3,
      3.5,
      5
    ]
  },
  {
    "termName": "第一学期",
    "gradeName": "2019年",
    "interval": [
      1,
      2,
      2.4,
      4,
      5
    ]
  },
  {
    "termName": "第二学期",
    "gradeName": "2019年",
    "interval": [
      2,
      2.2,
      3.5,
      4,
      4.5
    ]
  },
  {
    "termName": "第三学期",
    "gradeName": "2019年",
    "interval": [
      3,
      3.2,
      3.5,
      4,
      6
    ]
  },
  {
    "termName": "第四学期",
    "gradeName": "2018年",
    "interval": [
      1,
      3.2,
      3.4,
      4,
      6
    ]
  },
  {
    "termName": "第五学期",
    "gradeName": "2019年",
    "interval": [
      1,
      3,
      3.2,
      3.5,
      5
    ]
  },
  {
    "termName": "第六学期",
    "gradeName": "2019年",
    "interval": [
      1,
      2,
      2.4,
      3,
      3.5
    ]
  },
  {
    "termName": "第七学期",
    "gradeName": "2019年",
    "interval": [
      1,
      2,
      3,
      3.2,
      3.5
    ]
  },
  {
    "termName": "第八学期",
    "gradeName": "2019年",
    "interval": [
      0.5,
      2.5,
      3,
      3.5,
      5
    ]
  }
];

const ChartsIndex:React.FC<{}>=()=>{

  return(
    <div style={{background:'white'}}>
      <h1>bizCharts图表封装</h1>
      <h2>折线图-单条</h2>
      <BasicLineMemo data={basicLineData} xAxis='year' yAxis='value' maxLen={maxLen}/>
      <h2>折线图-多条</h2>
      <CuredMemo data={doubleData} xAxis="month" yAxis="temperature" legendName="city" maxLen={maxLen}/>
      <h2>柱状图-单条</h2>
      <BasicColumnMemo data={basicColumnData} xAxis="year" yAxis="sales"  maxLen={maxLen}/>
      <h2>柱状图-单条-区间柱状图：区别只是数据（格式）不同</h2>
      <BasicColumnMemo data={basicColumnData2} xAxis="x" yAxis="y"  maxLen={maxLen}/>
      <h2>柱状图-多条</h2>
      <GroupedColumnMemo data={doubleData} xAxis="month" yAxis="temperature" legendName="city" maxLen={maxLen}/>
      <h2>柱状图-多条-堆叠柱状图</h2>
      <StackedColumnMemo data={doubleData} xAxis="month" yAxis="temperature" legendName="city" maxLen={maxLen}/>
      <h2>面积图-单-基础面积图</h2>
      <BasicAreaMemo  data={basicLineData} xAxis='year' yAxis='value' maxLen={maxLen}/>
      <h2>面积图-多-多面积图</h2>
      <BubblesMemo  data={doubleData} xAxis="month" yAxis="temperature" legendName="city" maxLen={maxLen}/>
      <h2>柱状图-多-百分比堆积柱状图</h2>
      <StackedPercentageColumnMemo data={stackedData} xAxis="year" yAxis="value" legendName="country" maxLen={maxLen}/>
      <h2>面积图-多-百分比堆叠面积图</h2>
      <StackedPercentageAreaMemo data={stackedData} xAxis="year" yAxis="value" legendName="country" maxLen={maxLen}/>
      <h2>饼图-基础饼图-前端自动计算百分比</h2>
      <BasicPieMemo data={basicLineData} xAxis='year' yAxis='value' />
      <h2>饼图-基础饼图-后端计算百分比</h2>
      <BasicPie2Memo data={basicPieData} xAxis='year' yAxis='value' />
      <h2>饼图-基础环图-前端自动计算百分比</h2>
      <BasicDonutMemo  data={donutData} xAxis='item' yAxis='count' />
      <h2>基础雷达图</h2>
      <BasicRadarMemo data={doubleData} xAxis="month" yAxis="temperature" legendName="city"/>
      <h2>基础雷达图-线</h2>
      <BasicRadar2Memo data={doubleData} xAxis="month" yAxis="temperature" legendName="city"/>
      <h2>热力图-色块图</h2>
      <BasicHeatMapMemo data={radarData} xAxis="month" yAxis="day" legendName="sales" maxLen={maxLen}/>
      <h2>箱型图-基础箱型图</h2>
      <BasicBoxMemo data={boxData} xAxis="x" boxValue="boxValue" maxLen={maxLen}/>
      <h2>箱型图-分组箱型图</h2>
      <GroupedBoxChartMemo data={groupedBoxData} xAxis="termName" legendName="gradeName" boxValue="interval"  maxLen={5}/>
    </div>
  );
}
export default ChartsIndex;

