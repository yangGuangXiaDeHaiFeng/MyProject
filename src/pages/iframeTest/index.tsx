import React from 'react';

const Index:React.FC<{}>=()=>{
  return(
    <div>
      <h1>iframe学习</h1>
      <iframe src="http://localhost:8001/static/person.7cf0ec88.png" width="560" height="960"    title="预览"
              name="previewFrame" >
        浏览器不支持
      </iframe>

    </div>
  )
}
export default Index;
