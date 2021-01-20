import React from 'react';
import GroupedColumn from '@/pages/charts/compnent/GroupedColumn';

const doubleData = [
  {
    month: 'Jan',
    city: 'Tokyo',
    temperature: 7,
  },
  {
    month: 'Jan',
    city: 'London',
    temperature: 3.9,
  },
  {
    month: 'Feb',
    city: 'Tokyo',
    temperature: 6.9,
  },
  {
    month: 'Feb',
    city: 'London',
    temperature: 4.2,
  },
  {
    month: 'Mar',
    city: 'Tokyo',
    temperature: 9.5,
  },
  {
    month: 'Mar',
    city: 'London',
    temperature: 5.7,
  },
  {
    month: 'Apr',
    city: 'Tokyo',
    temperature: 14.5,
  },
  {
    month: 'Apr',
    city: 'London',
    temperature: 8.5,
  },
  {
    month: 'May',
    city: 'Tokyo',
    temperature: 18.4,
  },
  {
    month: 'May',
    city: 'London',
    temperature: 11.9,
  },
  {
    month: 'Jun',
    city: 'Tokyo',
    temperature: 21.5,
  },
  {
    month: 'Jun',
    city: 'London',
    temperature: 15.2,
  },
  {
    month: 'Jul',
    city: 'Tokyo',
    temperature: 25.2,
  },
  {
    month: 'Jul',
    city: 'London',
    temperature: 17,
  },
  {
    month: 'Aug',
    city: 'Tokyo',
    temperature: 26.5,
  },
  {
    month: 'Aug',
    city: 'London',
    temperature: 16.6,
  },
  {
    month: 'Sep',
    city: 'Tokyo',
    temperature: 23.3,
  },
  {
    month: 'Sep',
    city: 'London',
    temperature: 14.2,
  },
  {
    month: 'Oct',
    city: 'Tokyo',
    temperature: 18.3,
  },
  {
    month: 'Oct',
    city: 'London',
    temperature: 10.3,
  },
  {
    month: 'Nov',
    city: 'Tokyo',
    temperature: 13.9,
  },
  {
    month: 'Nov',
    city: 'London',
    temperature: 6.6,
  },
  {
    month: 'Dec',
    city: 'Tokyo',
    temperature: 9.6,
  },
  {
    month: 'Dec',
    city: 'London',
    temperature: 4.8,
  },
];

const Index: React.FC<{}> = () => {
  function changeToPic() {
    const wrapDiv = document.getElementById('changeToPic');
    if (wrapDiv) {
      const canvas = wrapDiv.querySelector('canvas');
      if (canvas) {
        exportCanvasAsPNG(canvas, '销量变化');
      }
    }
  }

  return (
    <div>
      <h1>将一张图表数据保存为图片</h1>
      <div id="changeToPic">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2>各月销量</h2>
          <a onClick={changeToPic}>保存为图片</a>
        </div>
        <GroupedColumn
          data={doubleData}
          xAxis="month"
          yAxis="temperature"
          legendName="city"
          maxLen={20}
        />
      </div>
    </div>
  );
};
export default Index;

function exportCanvasAsPNG(canvasElement: any, fileName: string) {
  const MIME_TYPE = 'image/png';
  const imgURL = canvasElement.toDataURL(MIME_TYPE, 1.0);
  const dlLink = document.createElement('a');
  dlLink.download = fileName;
  dlLink.href = imgURL;
  dlLink.dataset.downloadurl = [MIME_TYPE, dlLink.download, dlLink.href].join(':');
  document.body.appendChild(dlLink);
  dlLink.click();
  document.body.removeChild(dlLink);
}
