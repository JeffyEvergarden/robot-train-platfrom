import { useState } from 'react';
import { getStudentCourseDetail_API, getStudentCourse_API } from './api';
import config from '@/config';
import { message } from 'antd';

const { successCode } = config;

export const useCourseModel = () => {
  const [courselist, setCourseList] = useState<any>([]);

  const [total, setTotal] = useState<number>(0);

  const getStudentCourse = async (data: any) => {
    let res: any = await getStudentCourse_API(data);
    if (res.resultCode === successCode) {
      let list: any = res?.data?.list || [];
      let _total: any = res?.data.total || 0;
      setCourseList(list);
      setTotal(_total);
      // message.success('保存成功');
    } else {
      message.warning('获取数据失败');
    }
  };

  return {
    courselist,
    total,
    getStudentCourse,
  };
};
