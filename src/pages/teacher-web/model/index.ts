import { useState } from 'react';
import { getCourseList } from './api';

// 菜单管理的表格数据
export const useTableModel = () => {
  const [tableList, setTableList] = useState<any[]>([]);
  const [tableLoading, setTableLoading] = useState<boolean>(false);

  const getTableList = async (params?: any) => {
    setTableLoading(true);
    let res: any = await getCourseList(params);
    setTableLoading(false);

    return { data: res?.data?.list, total: res?.data?.total };
  };

  return {
    tableList,
    tableLoading,
    getTableList, // 获取表格数据
  };
};
