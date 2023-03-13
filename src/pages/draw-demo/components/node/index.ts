import LogicFlow, {
  BaseNodeModel,
  GraphModel,
  ConnectRule,
  CircleNodeModel,
  CircleNode,
  h,
  RectNode,
  RectNodeModel,
  PolygonNode,
  PolygonNodeModel,
} from '@logicflow/core';

// 节点类型
// 矩形：rect(opens new window)
// 圆形: circle(opens new window)
// 椭圆: ellipse(opens new window)
// 多边形: polygon(opens new window)
// 菱形: diamond
// 文本: text(opens new window)
// HTML: html

// 结束节点 -------------
class FinshNodeModel extends CircleNodeModel {
  constructor(data: BaseNodeModel, graphModel: GraphModel) {
    super(data, graphModel);
    // console.log(data);
    const property = data.properties;
  }

  initNodeData(data: any) {
    // 可以在super之前，强制设置节点文本位置不居中，而且在节点下面
    data.text = {
      value: data.text,
      editable: false, // 不可编辑节点名字
      x: data.x,
      y: data.y,
    };
    super.initNodeData(data);
  }

  getNodeStyle() {
    const style = super.getNodeStyle();
    style.stroke = '#40a9ff';
    style.strokeDasharray = '3 0';
    style.color = '#40a9ff';
    return style;
  }

  getTextStyle() {
    const style = super.getTextStyle();
    style.fontSize = 16;
    style.color = '#40a9ff';
    return style;
  }

  getConnectedSourceRules(): ConnectRule[] {
    const rules = super.getConnectedSourceRules();
    const geteWayOnlyAsTarget = {
      message: '结束节点只能连入，不能连出！',
      validate: (source: BaseNodeModel) => {
        let isValid = true;
        if (source) {
          isValid = false;
        }
        return isValid;
      },
    };
    // @ts-ignore
    rules.push(geteWayOnlyAsTarget);
    return rules;
  }
}

// 节点注册方法
export function registerNode(lf: any) {
  // 注册结束节点
  lf.register({
    type: 'finish',
    view: CircleNode,
    model: FinshNodeModel,
  });
}
