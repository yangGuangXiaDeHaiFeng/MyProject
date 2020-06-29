import React from 'react';
import classNames from 'classnames'
import styles from './englishRotate.less';

const EnglishRotate:React.FC<{}>=()=>{
  const str='every import';

  return(<div className={styles.root}>
    <h1>实现当文字为英文时，文字旋转90度(实现不了)</h1>
    <div className={styles.content}>
      <div  className={classNames(styles.item,styles.chinese)}>啦啦啦啦</div>
      <div  className={styles.item}>
        <div style={{display:'flex',flexDirection:'column'}}>
        {
          str.split('').map(item=><div>{item}</div>)
        }
        </div>
      </div>
    </div>

  </div>)
}
export default EnglishRotate;
