import React from 'react';
import person from './img/person.png';
import styles from './index.less';

const Index:React.FC<{}>=()=>{
  return(<div>
    <h1>和CSS有关的demo</h1>
   <h2>css实现图片自适应容器宽高</h2>
    <div className={styles.imgDiv}>
      <img src={person} alt='person' className={styles.child}/>
    </div>
  </div>);
}
export default Index;
