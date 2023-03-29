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
  HtmlNode,
  HtmlNodeModel,
} from '@logicflow/core';
import ReactDOM from 'react-dom';
import { CheckCircleOutlined } from '@ant-design/icons';
import style from './index.less';

const colors = ['#4878FF', '#FEB444', '#36A5A4', '#C2C8D5'];

class CourseNodeModel extends RectNodeModel {
  constructor(data: BaseNodeModel, graphModel: GraphModel) {
    super(data, graphModel);
    // console.log(data);
    const property = data.properties;
  }

  initNodeData(data: any) {
    // 可以在super之前，强制设置节点文本位置不居中，而且在节点下面
    data.text =
      !data.text || typeof data.text === 'string'
        ? {
            value: data.text,
            x: data.x,
            y: data.y,
            editable: false, // 不可编辑节点名字
          }
        : {
            ...data.text,
            editable: false,
          };
    super.initNodeData(data);
    this.width = 200;
    this.height = 74;
    this.radius = 8;
  }

  getNodeStyle() {
    const style = super.getNodeStyle();
    style.stroke = colors[0];
    style.strokeDasharray = '3 0';
    style.radius = 8;
    return style;
  }

  getTextStyle() {
    const style = super.getTextStyle();
    style.fontSize = 16;
    style.color = colors[0];
    // style.color = '#7DAAFF';
    return style;
  }
}

class TaskNodeModel extends RectNodeModel {
  constructor(data: BaseNodeModel, graphModel: GraphModel) {
    super(data, graphModel);
    // console.log(data);
    const property = data.properties;
  }

  initNodeData(data: any) {
    // 可以在super之前，强制设置节点文本位置不居中，而且在节点下面
    data.text =
      !data.text || typeof data.text === 'string'
        ? {
            value: data.text,
            x: data.x,
            y: data.y,
            editable: false, // 不可编辑节点名字
          }
        : {
            ...data.text,
            editable: false,
          };
    super.initNodeData(data);
    this.width = 200;
    this.height = 74;
    this.radius = 8;
  }

  getNodeStyle() {
    const style = super.getNodeStyle();
    style.stroke = colors[1];
    style.strokeDasharray = '3 0';
    style.radius = 8;
    return style;
  }

  getTextStyle() {
    const style = super.getTextStyle();
    style.fontSize = 16;
    style.color = colors[1];
    // style.color = '#7DAAFF';
    return style;
  }
}

class StepNodeModel extends RectNodeModel {
  constructor(data: BaseNodeModel, graphModel: GraphModel) {
    super(data, graphModel);
    // console.log(data);
    const property = data.properties;
  }

  initNodeData(data: any) {
    // 可以在super之前，强制设置节点文本位置不居中，而且在节点下面
    data.text =
      !data.text || typeof data.text === 'string'
        ? {
            value: data.text,
            x: data.x,
            y: data.y,
            editable: false, // 不可编辑节点名字
          }
        : {
            ...data.text,
            editable: false,
          };
    super.initNodeData(data);
    this.width = 200;
    this.height = 74;
    this.radius = 8;
  }

  getNodeStyle() {
    const style = super.getNodeStyle();
    style.stroke = colors[2];
    style.strokeDasharray = '3 0';
    style.radius = 8;
    return style;
  }

  getTextStyle() {
    const style = super.getTextStyle();
    style.fontSize = 16;
    style.color = colors[2];
    // style.color = '#7DAAFF';
    return style;
  }
}

// html 节点测试
class StepHtmlNodeModel extends HtmlNodeModel {
  initNodeData(data: any) {
    // 可以在super之前，强制设置节点文本位置不居中，而且在节点下面
    data.text =
      !data.text || typeof data.text === 'string'
        ? {
            value: data.text,
            x: data.x,
            y: data.y,
            editable: false, // 不可编辑节点名字
          }
        : {
            ...data.text,
            editable: false,
          };
    super.initNodeData(data);
    this.width = 200;
    this.height = 74;
    this.radius = 8;
  }
  setAttributes() {
    this.text.editable = false; // 禁止节点文本编辑
    // 设置节点宽高和锚点
    const width = 200;
    const height = 74;
    this.width = width;
    this.height = height;
    this.anchorsOffset = [
      [width / 2, 0],
      [0, height / 2],
      [-width / 2, 0],
      [0, -height / 2],
    ];
  }

  getTextStyle() {
    const style = super.getTextStyle();
    style.fontSize = 16;
    style.color = colors[2];
    // style.color = '#7DAAFF';
    style.display = 'none';
    return style;
  }
}

// status: wait ==> 置灰 // doing ==> 进行中 // finish ==> 完成
const StepHtmlBox = (props: any) => {
  const { properties, text } = props;

  const { status } = properties;

  let icon = null;

  if (status === 'finish') {
    icon = <CheckCircleOutlined style={{ color: '#20C783' }} />;
  }

  return (
    <div className={`${style['step-box']} ${status == 'wait' ? style['step-box_disabled'] : ''}`}>
      <div className={style['step-header']}>
        <div className={style['step-title']}>{text}</div>
        <div className={style['step-status']}>{icon}</div>
      </div>
    </div>
  );
};

class StepHtmlNode extends HtmlNode {
  setHtml(rootEl: HTMLElement) {
    const { properties, text } = this.props.model;
    console.log(properties);
    ReactDOM.render(<StepHtmlBox text={text.value} properties={properties} />, rootEl);
  }
}

export function registerNode(lf: any, options: any) {
  // 任务节点注册
  lf.batchRegister([
    {
      type: 'course', // 标题
      view: RectNode,
      model: CourseNodeModel,
    },
    {
      type: 'task', // 标题
      view: RectNode,
      model: TaskNodeModel,
    },
    {
      type: 'step', // 标题
      view: RectNode,
      model: StepNodeModel,
    },
    {
      type: 'step-html',
      view: StepHtmlNode,
      model: StepHtmlNodeModel,
    },
  ]);
  if (!lf.extension.menu) {
    return;
  }
  // 任务节点菜单
  lf.extension.menu.setMenuByType({
    type: 'course',
    menu: [
      {
        text: '添加子任务',
        callback(node: any) {
          //
          options?.addSubTask?.(node);
        },
      },
      {
        text: '删除',
        callback: async (node: any) => {
          if (options.deleteNode) {
            let res: any = options.deleteNode(node.id);
            if (res) {
              lf.deleteNode(node.id);
            }
          } else {
            // 扩散删除
            lf.deleteNode(node.id);
          }
        },
      },
    ],
  });

  lf.extension.menu.setMenuByType({
    type: 'task',
    menu: [
      {
        text: '添加子步骤',
        callback(node: any) {
          //
          options?.addSubStep?.(node);
        },
      },
      {
        text: '删除',
        callback: async (node: any) => {
          if (options.deleteNode) {
            let res: any = options.deleteNode(node.id);
            if (res) {
              lf.deleteNode(node.id);
            }
          } else {
            lf.deleteNode(node.id);
          }
        },
      },
    ],
  });
}
