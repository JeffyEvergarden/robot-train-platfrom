
import React, { useEffect, useRef } from 'react';
import style from './index.less';


const shapeList: any = [
  {
    type: 'rect',
    text: '矩形',
  },
  {
    type: 'circle',
    text: '圆形',
  },
  {
    type: 'finish',
    text: '结束节点',
  },
]

const DndDiyPanel: React.FC<any> = (props: any) => {

  // 鼠标点击事件
  const { lf } = props;

  const mouseDown = (shape: any) => {
    lf.dnd.startDrag({
      type: shape.type,
      text: `${shape.type}节点`
    });
  }

  return (
    <div className={style['panel']}>
      {shapeList.map((shape: any) => {
        const { type, text } = shape;
        return (
          <div key={type}>
            <div className={style['panel-item']} onMouseDown={() => { mouseDown(shape); }}>
              <div
                className={style[`panel-${type}`]}
              />
              <div className={style['panel-title']}>{text}</div>
            </div>
          </div>
        );
      })}
    </div>
  )
}

export default DndDiyPanel;