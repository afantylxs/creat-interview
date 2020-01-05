import React from 'react';
import { Button } from 'antd';
import moment from 'moment';
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
      dataIndex: 'joiningProjTime',
      width: '100px',
      render: (text, record) => {
        return <span>{text ? moment(text).format('YYYY-MM-DD') : ''}</span>;
      }
    },
    {
      title: '一类岗位',
      dataIndex: 'firstCategoryName',
      width: '100px'
    },
    {
      title: '二类岗位',
      dataIndex: 'secondCategoryName',
      width: '100px'
    },
    {
      title: '三类岗位',
      dataIndex: 'thirdJobName',
      width: '100px'
    },
    {
      title: '层级',
      dataIndex: 'aliGradeCodeName',
      width: '80px'
    },
    {
      title: '技术方向',
      dataIndex: 'techDirection',
      width: '100px'
    },
    {
      title: '框架',
      dataIndex: 'aliFrameName',
      width: '150px'
    },
    {
      title: '事业群',
      dataIndex: 'careerGroupName',
      width: '150px'
    },
    {
      title: '事业群本部',
      dataIndex: 'groupDeptName',
      width: '150px'
    },
    {
      title: '事业部',
      dataIndex: 'careerDeptName',
      width: '150px'
    },
    {
      title: '阿里部门',
      dataIndex: 'deptName',
      width: '150px'
    },
    {
      title: '项目名称',
      dataIndex: 'projectName',
      width: '200px'
    },
    {
      title: '业务线名称',
      dataIndex: 'businessLine',
      width: '100px'
    },
    {
      title: '项目类型',
      dataIndex: 'projetType',
      width: '80px',
      render: (text, record) => {
        switch (text) {
          case 0:
            return <span>FP</span>;

          case 1:
            return <span>TM</span>;

          default:
            break;
        }
      }
    },
    {
      title: '项目时长',
      dataIndex: 'projetDurationType',
      width: '80px',
      render: (text, record) => {
        switch (text) {
          case 0:
            return <span>短期</span>;

          case 1:
            return <span>长期</span>;

          default:
            break;
        }
      }
    },
    {
      title: '是否IDU',
      dataIndex: 'iduFlag',
      width: '70px',
      render: (text, record) => {
        switch (text) {
          case 0:
            return <span>否</span>;

          case 1:
            return <span>是</span>;

          default:
            break;
        }
      }
    },
    {
      title: '是否TL',
      dataIndex: 'tlFlag',
      width: '70px',
      render: (text, record) => {
        switch (text) {
          case 0:
            return <span>否</span>;

          case 1:
            return <span>是</span>;

          default:
            break;
        }
      }
    },
    {
      title: '工作城市',
      dataIndex: 'workCityName',
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
      width: '80px',
      render: (text, record) => {
        switch (text) {
          case 0:
            return <span>闲置</span>;

          case 1:
            return <span>在岗</span>;

          default:
            break;
        }
      }
    },
    {
      title: '是否骨干',
      dataIndex: 'backboneFlag',
      width: '70px',
      render: (text, record) => {
        switch (text) {
          case 0:
            return <span>否</span>;

          case 1:
            return <span>是</span>;

          default:
            break;
        }
      }
    },
    {
      title: '是否收费',
      dataIndex: 'chargeFlag',
      width: '70px',
      render: (text, record) => {
        switch (text) {
          case 0:
            return <span>否</span>;

          case 1:
            return <span>是</span>;

          default:
            break;
        }
      }
    },
    {
      title: '操作',
      dataIndex: 'action',
      width: '70px',
      fixed: 'right',
      render: (text, record) => {
        const { changeProjectVisible } = that.props;

        return (
          <Button
            onClick={() => {
              const newRecord = JSON.parse(JSON.stringify(record));
              newRecord.projectId = {
                key: record.projectId ? record.projectId : '',
                label: record.projectName ? record.projectName : ''
              };
              newRecord.firstCategoryId = {
                key: record.firstCategoryId ? record.firstCategoryId : '',
                label: record.firstCategoryName ? record.firstCategoryName : ''
              };
              newRecord.secondCategoryId = {
                key: record.secondCategoryId ? record.secondCategoryId : '',
                label: record.secondCategoryName
                  ? record.secondCategoryName
                  : ''
              };
              newRecord.thirdJobId = {
                key: record.thirdJobId ? record.thirdJobId : '',
                label: record.thirdJobName ? record.thirdJobName : ''
              };
              newRecord.aliGradeCode = {
                key: record.aliGradeCode ? record.aliGradeCode : '',
                label: record.aliGradeCodeName ? record.aliGradeCodeName : ''
              };
              newRecord.aliFrameId = {
                key: record.aliFrameId ? record.aliFrameId : '',
                label: record.aliFrameName ? record.aliFrameName : ''
              };
              newRecord.careerGroupId = {
                key: record.careerGroupId ? record.careerGroupId : '',
                label: record.careerGroupName ? record.careerGroupName : ''
              };
              newRecord.groupDeptId = {
                key: record.groupDeptId ? record.groupDeptId : '',
                label: record.groupDeptName ? record.groupDeptName : ''
              };
              newRecord.careerDeptId = {
                key: record.careerDeptId ? record.careerDeptId : '',
                label: record.careerDeptName ? record.careerDeptName : ''
              };
              newRecord.deptId = {
                key: record.deptId ? record.deptId : '',
                label: record.deptName ? record.deptName : ''
              };
              newRecord.shortDate =
                record.projetDurationType === 0 ? true : false;
              changeProjectVisible({
                projectVisible: true,
                record: newRecord
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
