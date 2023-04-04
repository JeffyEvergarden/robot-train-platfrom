import { useState } from 'react';
import { getStudentCourseDetail_API, getStudentCourse_API } from './api';
import config from '@/config';
import { message } from 'antd';

const { successCode } = config;

export const useCourseModel = () => {
  const [courselist, setCourseList] = useState<any>([]);

  const [totalWait, setTotalWait] = useState<number>(0);
  const [totalDone, setTotalDone] = useState<number>(0);

  const getStudentCourse = async (data: any) => {
    let res: any = await getStudentCourse_API(data);
    if (res.resultCode === successCode) {
      let list: any = res?.data?.list || [];
      let _total: any = res?.data.totalPage || 0;
      setCourseList(list);
      // return res
      if (data?.type == 0) {
        setTotalWait(_total);
      } else {
        setTotalDone(_total);
      }
      // message.success('保存成功');
    } else {
      message.warning('获取数据失败');
    }
  };

  return {
    courselist,
    // setTotal,
    totalWait,
    totalDone,
    getStudentCourse,
  };
};
