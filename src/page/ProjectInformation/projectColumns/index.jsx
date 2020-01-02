import React from 'react';
import { Button } from 'antd';
export const projectColumnsFunction = that => {
  const projectList = [
    {
      title: 'BU',
      dataIndex: 'ipsaBuDeptName',
      width: '100px'
    },
    {
      title: '部门',
      dataIndex: 'ipsaDeptName',
      width: '180px'
    },
    {
      title: '姓名',
      dataIndex: 'empName',
      width: '80px'
    },
    {
      title: '软通工号',
      dataIndex: 'empNo',
      width: '100px'
    },
    {
      title: '阿里工号',
      dataIndex: 'aliNo',
      width: '100px'
    },
    {
      title: '入项时间',
      dataIndex: 'joiningProjTimeFormat',
      width: '100px'
    },
    {
      title: '一类岗位',
      dataIndex: 'firstCategoryId',
      width: '100px'
    },
    {
      title: '二类岗位',
      dataIndex: 'secondCategoryId',
      width: '100px'
    },
    {
      title: '三类岗位',
      dataIndex: 'thirdJobId',
      width: '100px'
    },
    {
      title: '层级',
      dataIndex: 'aliGradeCode',
      width: '80px'
    },
    {
      title: '技术方向',
      dataIndex: 'techDirection',
      width: '100px'
    },
    {
      title: '框架',
      dataIndex: 'aliFrameId',
      width: '80px'
    },
    {
      title: '事业群',
      dataIndex: 'careerGroupId',
      width: '100px'
    },
    {
      title: '事业部',
      dataIndex: 'careerDeptId',
      width: '100px'
    },
    {
      title: '项目名称',
      dataIndex: 'xmmc',
      width: '100px'
    },
    {
      title: '业务线名称',
      dataIndex: 'businessLine',
      width: '100px'
    },
    {
      title: '项目类型',
      dataIndex: 'projetType',
      width: '80px'
    },
    {
      title: '项目时长',
      dataIndex: 'projetDurationType',
      width: '80px'
    },
    {
      title: '是否IDU',
      dataIndex: 'iduFlag',
      width: '70px'
    },
    {
      title: '是否TL',
      dataIndex: 'tlFlag',
      width: '70px'
    },
    {
      title: '工作城市',
      dataIndex: 'workcity',
      width: '100px'
    },
    {
      title: '办公场地',
      dataIndex: 'workAddress',
      width: '100px'
    },
    {
      title: '资源状态',
      dataIndex: 'resourceStatus',
      width: '80px'
    },
    {
      title: '是否骨干',
      dataIndex: 'backboneFlag',
      width: '70px'
    },
    {
      title: '是否收费',
      dataIndex: 'chargeFlag',
      width: '70px'
    },
    {
      title: '操作',
      dataIndex: 'action',
      width: '70px',
      render: (text, record) => {
        const { changeProjectVisible } = that.props;
        return (
          <Button
            onClick={() => {
              changeProjectVisible({
                projectVisible: true,
                record
              });
            }}
          >
            编辑
          </Button>
        );
      }
    }
  ];
  return projectList;
};
