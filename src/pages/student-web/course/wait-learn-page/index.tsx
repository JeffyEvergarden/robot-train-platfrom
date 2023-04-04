import React, { useEffect, useState, useImperativeHandle } from 'react';
import style from '../style.less';
import { Pagination, Button, Tag } from 'antd';
import { Link, history } from 'umi';
import config from '@/config';

import { useCourseModel } from '../model';
import coursePic from '@/asset/image/course-pic.png';
import Condition from '@/components/Condition';
import Process from '../component/process';

import { formatePercent } from '@/utils';

const { basePath } = config;

const WaitLearnPage: React.FC<any> = (props: any) => {
  const { type, courseKey, getStudentCourse, courselist, total } = props;

  const [pageNo, setPageNo] = useState<any>(1);

  const [pageSize, setPageSize] = useState<any>(12);

  useEffect(() => {
    let params = {
      current: pageNo,
      pageSize,
      type: type,
      taskType: courseKey,
    };
    if (courseKey == 3) {
      delete params.taskType;
    }
    getStudentCourse(params);
  }, [pageNo, pageSize, type, courseKey]);

  return (
    <div className={style['normal-page']}>
      <div className={style['paget-context']}>
        {courselist.map((item: any, index: number) => {
          return (
            <Link
              target="blank"
              key={index}
              to={{ pathname: `/student/course/detail`, search: `?courseId=${item.taskId}` }}
            >
              <div className={style['course-box']}>
                <div className={style['course-pic']}>
                  <img src={coursePic} className={style['course-pic']} />
                </div>

                <div className={style['box']}>
                  <div className={style['course-title']}>{item.taskName}</div>

                  <div className={style['context']}>
                    <div>
                      <Condition r-if={item.taskType == 1}>
                        <Tag color="blue">培训课程</Tag>
                      </Condition>
                      <Condition r-if={item.taskType == 2}>
                        <Tag color={'orange'}>考试课程</Tag>
                      </Condition>
                    </div>
                  </div>

                  <div className={style['context-bottom']}>
                    <Process percent={item.progress} />
                    <span>学习进度：{formatePercent(item.progress)}</span>
                    {/*
                      <Button type="primary">开始学习</Button>
                    </Link> */}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className={style['page-right']}>
        <Pagination
          current={pageNo}
          total={total}
          pageSize={pageSize}
          showSizeChanger
          pageSizeOptions={[12, 24, 36]}
          showTotal={(total, range) => `总共 ${total} 条`}
          onChange={(current: any, size: any) => {
            setPageNo(current);
          }}
          onShowSizeChange={(current: any, size: any) => {
            setPageNo(1);
            setPageSize(size);
          }}
        />
      </div>
    </div>
  );
};

export default WaitLearnPage;
