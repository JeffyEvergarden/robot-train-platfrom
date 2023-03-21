import React, { useEffect, useState } from "react";
import style from '../style.less';
import { Pagination, Button } from 'antd';
import { Link, history } from 'umi';
import config from '@/config';

import { useCourseModel } from '../model'


const { basePath } = config;

const WaitLearnPage: React.FC<any> = (props: any) => {

  const [pageNo, setPageNo] = useState<any>(1);

  const [pageSize, setPageSize] = useState<any>(8);

  const { courselist, total, getStudentCourse } = useCourseModel();


  useEffect(() => {
    getStudentCourse({ current: pageNo, pageSize })
  }, [pageNo, pageSize])

  return (
    <div className={style['normal-page']}>

      <div className={style['paget-context']}>
        {
          courselist.map((item: any, index: number) => {
            return (
              <div className={style['course-box']} key={index}>
                <div className={style['title']}>{item.title}</div>

                <div className={style['context']}></div>

                <div className={style['context-bottom']}>
                  <Link
                    target="blank"
                    to={{ pathname: `/student/course/detail`, search: `?courseId=${item.courseId}` }}>
                    <Button type="primary">开始学习</Button>
                  </Link>
                </div>
              </div>
            )
          })
        }

      </div>

      <div className={style['page-right']}>
        <Pagination current={pageNo} total={total} pageSize={pageSize} showSizeChanger
          pageSizeOptions={[8, 16, 24]}
          onChange={(current: any, size: any) => {
            setPageNo(current);
          }}
          onShowSizeChange={(current: any, size: any) => {
            setPageNo(1);
            setPageSize(size);
          }} />
      </div>

    </div>
  )

}

export default WaitLearnPage;