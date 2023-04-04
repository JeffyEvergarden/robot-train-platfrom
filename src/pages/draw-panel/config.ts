// Menu组件支持菜单包括节点右键菜单、边右键菜单、画布右键菜单，默认情况下，Menu在各个菜单内置了以下功能。

import { message } from 'antd';

// 节点右键菜单(nodeMenu)： 删除、复制、编辑文案
// 边右键菜单(edgeMenu)：删除、编辑文案
// 画布右键菜单(graphMenu)：无

// 设置右键通用菜单

export const setMenuConfig = (lf: any, options: any) => {
  if (options.isSilentMode) {
    lf.extension.menu.setMenuConfig({
      nodeMenu: [], // 覆盖默认的节点右键菜单
      edgeMenu: [], // 删除默认的边右键菜单
      graphMenu: [], // 覆盖默认的边右键菜单，与false表现一样
    });
    return;
  }
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
  const { edges } = lf.graphModel;
  const id = edge.id;
  const targetNodeId = edge.targetNodeId;

  // 是否存在一个节点有两条线连到同一个节点啊
  let _otherEdge = edges.find((item: any) => {
    return id !== item.id && targetNodeId === item.targetNodeId;
  });

  if (_otherEdge) {
    return false;
  }
  return true;
};
