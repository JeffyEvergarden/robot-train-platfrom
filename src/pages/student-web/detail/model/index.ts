import React, { useState } from 'react';

import { message } from 'antd';
import { postDrawPanel_API, getDrawPanel_API, addNode_API, deleteNode_API } from './api';
import config from '@/config';

const { successCode } = config;

const travelNodes = (nodes: any[]) => {
  nodes.forEach((item: any) => {
    if (item.type === 'step') {
      item.type === 'step-html';
    }
  });
};

const travelEdges = (edges: any[]) => {
  edges.forEach((item: any) => {
    item.type === 'polyline';
  });
};

export const useDrawModel = () => {
  const [loading, setLoadng] = useState<boolean>(false);
  // 保存画布接口
  const saveDrawPanel = async (data: any) => {
    let res: any = await postDrawPanel_API(data);
    // 画布
    if (res.code === successCode) {
      message.success('保存成功');
    } else {
      message.warning('保存失败');
    }
  };

  const getDrawPanel = async (data: any) => {
    setLoadng(true);
    let res: any = await getDrawPanel_API(data);
    setLoadng(false);
    // 画布
    if (res.resultCode === successCode) {
      let data: any = res.data || {};

      const { nodes = [], edges = [] } = data;
      travelNodes(nodes);
      travelEdges(edges);

      return data;
    } else {
      message.warning('获取画布失败');
      return false;
    }
  };

  // -------------用不上
  const addNode = async (data: any) => {
    let res: any = await addNode_API(data);
    if (res.code === successCode) {
      return true;
    } else {
      message.warning('节点添加失败');
      return false;
    }
  };

  const deleteNode = async (data: any) => {
    let res: any = await deleteNode_API(data);
    if (res.code === successCode) {
      return true;
    } else {
      message.warning('节点添加失败');
      return false;
    }
  };

  return {
    loading,
    saveDrawPanel, // 保存画布
    getDrawPanel, // 获取画布
    addNode,
    deleteNode,
  };
};
