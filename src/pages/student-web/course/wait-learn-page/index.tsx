import React, { useEffect, useState } from "react";
import style from '../style.less';
import { Pagination, Button, Tag } from 'antd';
import { Link, history } from 'umi';
import config from '@/config';

import { useCourseModel } from '../model'
import coursePic from '@/asset/image/course-pic.png';
import Condition from "@/components/Condition";
import Process from "../component/process";

import { formatePercent } from '@/utils';

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
              <Link
                target="blank"
                key={index}
                to={{ pathname: `/student/course/detail`, search: `?courseId=${item.courseId}` }}>
                <div className={style['course-box']} >

                  <div className={style['course-pic']}>
                    <img src={coursePic} className={style['course-pic']}></img>
                  </div>

                  <div className={style['box']}>
                    <div className={style['course-title']}>{item.title}</div>

                    <div className={style['context']}>
                      <div>
                        <Condition r-if={item.finished}>
                          <Tag color="success">已完成</Tag>
                        </Condition>
                        <Condition r-if={!item.finished}>
                          <Tag color={'error'}>未完成</Tag>
                        </Condition>
                      </div>

                    </div>

                    <div className={style['context-bottom']}>
                      <Process percent={item.process}></Process>
                      <span>学习进度：{formatePercent(item.process)}</span>
                      {/*
                      <Button type="primary">开始学习</Button>
                    </Link> */}
                    </div>
                  </div>
                </div>
              </Link>
            )
          })
        }

      </div>

      <div className={style['page-right']}>
        <Pagination current={pageNo} total={total} pageSize={pageSize} showSizeChanger
          pageSizeOptions={[12, 24, 36]}
          showTotal={(total, range) => `总共 ${total} 条`}
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