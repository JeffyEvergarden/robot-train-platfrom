// Menu组件支持菜单包括节点右键菜单、边右键菜单、画布右键菜单，默认情况下，Menu在各个菜单内置了以下功能。

import { message } from 'antd';

// 节点右键菜单(nodeMenu)： 删除、复制、编辑文案
// 边右键菜单(edgeMenu)：删除、编辑文案
// 画布右键菜单(graphMenu)：无

// 设置右键通用菜单

export const setMenuConfig = (lf: any, options: any) => {
  lf.extension.menu.setMenuConfig({
    nodeMenu: [
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
    ], // 覆盖默认的节点右键菜单
    edgeMenu: [
      {
        text: '删除',
        callback(edge: any) {
          lf.deleteEdge(edge.id);
        },
      },
    ], // 删除默认的边右键菜单
    graphMenu: [], // 覆盖默认的边右键菜单，与false表现一样
  });
};

export const setControlConfig = (lf: any) => {
  lf.extension.control.removeItem('undo');
  lf.extension.control.removeItem('redo');
  console.log(lf.extension.control.controlItems);
};

export const checkEdge = (edge: any, lf: any) => {
  const { edges, nodes } = lf?.graphModel;
  // const id = edge.id;
  const targetNodeId = edge.targetNodeId;
  const sourceNodeId = edge.sourceNodeId;

  // 是否存在一个节点有两条线连到同一个节点啊
  // let _otherEdge = edges.find((item: any) => {
  //   return id !== item.id && targetNodeId === item.targetNodeId;
  // });

  //是否连相同type节点
  let _sameNode =
    nodes?.find((item: any) => {
      return targetNodeId === item.id;
    })?.type ===
    nodes?.find((item: any) => {
      return sourceNodeId === item.id;
    })?.type;
  //是否开始直接连结束
  let _startToEndNode =
    nodes?.find((item: any) => {
      return sourceNodeId === item.id;
    })?.type === 'start' &&
    nodes?.find((item: any) => {
      return targetNodeId === item.id;
    })?.type === 'finish';

  if (_sameNode) {
    return '不允许连续连接客户节点或者学员节点（需交替排列）';
  }

  if (!judgeLineByNode(edge, lf?.graphModel)) {
    return '不允许存在环形结构';
  }

  if (_startToEndNode) {
    return '开始节点不允许直接连接结束节点';
  }

  return false;
  // if (_otherEdge) {
  //   return false;
  // }
  // return true;
};

interface TNode {
  id: any;
  parents: TNode[];
  children: TNode[];
}

class TNode {
  constructor(node: any) {
    this.id = node.id;
    this.parents = [];
    this.children = [];
  }
}
// 判断有无环
export const judgeLineByNode = (line: any, info: any) => {
  const nodes = info.nodes;
  const lines = info.edges;
  const arr = [];
  const map = new Map();
  nodes.forEach((item: any) => {
    const tmp = new TNode(item);
    arr.push(tmp);
    map.set(tmp.id, tmp);
  });
  // 连接关系
  lines.forEach((item: any) => {
    if (item.id === line.id) {
      return;
    }
    const sourceNode = map.get(item.sourceNodeId);
    const targetNode = map.get(item.targetNodeId);
    sourceNode.children.push(targetNode);
    targetNode.parents.push(sourceNode);
  });

  const source = map.get(line.sourceNodeId); // 头节点
  const target = map.get(line.targetNodeId); // 尾节点

  // 目标节点不能是父族辈节点
  const set = new Set();
  const parents = [source];
  while (parents.length > 0) {
    let node = parents.pop();
    // 不存在则推进set
    node.parents.forEach((parent: any) => {
      if (!set.has(parent)) {
        // 不存在才push
        set.add(parent);
        parents.push(parent);
      }
    });
  }
  // 此时set 已收集完父祖辈的节点
  const setArr = Array.from(set).map((item: any) => item.id);
  // 是否有环
  const flag = setArr.indexOf(target.id) > -1;
  // 校验完成 返回表示节点合法
  // 存在环返回false 不存在则 true
  return !flag;
};
