import { useState, useImperativeHandle, Fragment } from 'react';
import {
  Drawer,
  Form,
  Input,
  Select,
  Button,
  message,
  Checkbox,
  Space,
  Tree,
  Avatar,
  Spin,
} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useRoleManageModel } from '../role-manage/model';
import routers from '../../../../../config/routes';
import styles from './../index.less';
export default (props: any) => {
  const { cref, groupList, workplaceList, comfirmSubmit } = props;

  const [form] = Form.useForm();

  const [visible, setVisible] = useState<boolean>(false);
  const [rowData, setRowData] = useState<any>({});

  const [checkedKeys, setCheckedKeys] = useState<any>([]);
  const { loading, savePermission, getPermission } = useRoleManageModel();

  useImperativeHandle(cref, () => ({
    open: (record: any) => {
      form.resetFields();
      setCheckedKeys([]);
      getPermission({ id: record.id }).then((data) => {
        setVisible(true);
        setRowData(record);
        setCheckedKeys(data);
      });
    },
    close: onClose,
  }));

  const getTreeData = async (id: any) => {
    const data = await getPermission({ id });
    setCheckedKeys(data);
  };

  const roleSave = async () => {
    const b = await savePermission({ id: rowData.id, menuCodes: checkedKeys });
    if (b) {
      setVisible(false);
    }
  };

  const onClose = () => {
    // form.resetFields();
    setVisible(false);
  };

  const treeData = (routers: any[]): any[] => {
    const newRouters = routers.filter((item) => item.access && item.access === 'routerAuth');
    return newRouters.map((router: any) => {
      // if (router.mxcAuth) {
      //     return {
      //         title: router.name,
      //         key: router.path,
      //         children: router.mxcAuth.map((item: any) => {
      //             return {
      //                 title: item.name,
      //                 key: router.path+'_'+item.value,
      //             }
      //         })
      //     }
      // }
      return {
        title: router.name,
        key: router.path,
        children: router.routes ? treeData(router.routes) : [],
      };
    });
  };
  const onCheck = (checkedKeysValue: any[]) => {
    setCheckedKeys(checkedKeysValue);
  };

  return (
    <Spin spinning={loading}>
      <Drawer
        title={'权限配置'}
        placement="right"
        onClose={onClose}
        width={500}
        visible={visible}
        footer={
          <Space align="baseline" style={{ float: 'right' }}>
            <Button onClick={onClose} loading={loading}>
              取消
            </Button>
            <Button type="primary" loading={loading} onClick={roleSave}>
              保存
            </Button>
          </Space>
        }
        className={styles['drawer']}
      >
        <div className={styles['tree-content']}>
          <Avatar
            shape="square"
            size="large"
            icon={<UserOutlined />}
            style={{
              backgroundColor: '#1890ff',
            }}
          />
          <span className={styles['title']}>{rowData.roleName || ''}</span>
        </div>
        <Tree checkable onCheck={onCheck} checkedKeys={checkedKeys} treeData={treeData(routers)} />
      </Drawer>
    </Spin>
  );
};
