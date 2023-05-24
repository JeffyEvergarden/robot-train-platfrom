import { useState } from 'react';
import { api_scoreSort, api_studentGroup } from './api';
import config from '@/config';
import { message } from 'antd';

const { successCode } = config;

export const useStudentRankModel = () => {
  const [loading, setLoading] = useState<any>(false);

  // 排名分组 接口
  const [studentGroupInfo, setStudentGroupInfo] = useState<any>({});

  const getStudentGroup = async (params: any) => {
    setLoading(true);
    let res: any = await api_studentGroup(params);
    setLoading(false);
    if (res.resultCode !== successCode) {
      message.warning('获取数据失败');
      return;
    }
    const { data = {} } = res;
    const dropItems = [
      { label: '全部', key: '0', queryVal: undefined },
      { label: data?.groupName, key: '1', queryVal: data?.id },
    ];
    const newData = { ...data, dropItems };
    setStudentGroupInfo(newData);
  };

  // 成绩排名 接口
  const [scoreSortData, setScoreSortData] = useState<any>({});

  const getScoreSort = async (params: any) => {
    setLoading(true);
    let res: any = await api_scoreSort(params);
    setLoading(false);
    if (res.resultCode !== successCode) {
      message.warning('获取数据失败');
      return;
    }
    const { data = {} } = res;
    const { myRank = {}, rankList = [] } = data;
    const { userName, rank } = myRank;
    // 判断我的排名是否在列表中
    const inListIndex = rankList.findIndex(
      (item: any) => item.userName === userName && item.rank === rank,
    );
    if (inListIndex > 0) {
      // 我的排名是否在列表中
      const newRankList = rankList?.map((item: any, index: any) => {
        const newItem = { ...item, key: `${index}-${item?.userName}` };
        if (inListIndex === index) {
          newItem.isMe = 'isMe';
        }
        return newItem;
      });
      data.rankList = newRankList;
    } else {
      if (myRank) {
        const newMyRank = { ...data.myRank, key: 'myRank', isMe: 'isMe' };
        data.myRank = newMyRank;
        data.rankList = [...rankList, newMyRank];
      }
    }
    setScoreSortData(data);
  };

  return {
    loading,
    setLoading,
    // 排名分组 接口
    getStudentGroup,
    studentGroupInfo,
    // 成绩排名 接口
    getScoreSort,
    scoreSortData,
  };
};
