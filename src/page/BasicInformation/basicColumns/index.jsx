import React from 'react';
import { Button } from 'antd';
export const basicColumnsFunction = (that, permission) => {
  const basicTableList = [
    {
      title: 'BU',
      dataIndex: 'ipsaBuDeptName',
      width: '100px'
    },
    {
      title: '部门',
      dataIndex: 'ipsaDeptName',
      width: '150px'
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
      title: '性别',
      dataIndex: 'gender',
      width: '50px',
      render: (text, record) => {
        switch (text) {
          case 1:
            return <span>男</span>;
          case 0:
            return <span>女</span>;
          default:
            break;
        }
      }
    },
    {
      title: '出生日期',
      dataIndex: 'birthday',
      width: '150px'
    },
    {
      title: '入职日期',
      dataIndex: 'joiningDay',
      width: '150px'
    },
    {
      title: '转正日期',
      dataIndex: 'correctionTime',
      width: '150px'
    },
    {
      title: '通用职位',
      dataIndex: 'ipsaPostName',
      width: '150px'
    },
    {
      title: 'Grade代码',
      dataIndex: 'ipsaGradeName',
      width: '90px'
    },
    {
      title: '是否在职',
      dataIndex: 'onJob',
      width: '90px',
      render: (text, record) => {
        switch (text) {
          case 0:
            return <span>离职</span>;
          case 1:
            return <span>在职</span>;
          default:
            break;
        }
      }
    },
    {
      title: '人员性质',
      dataIndex: 'empProperty',
      width: '100px',
      render: (text, record) => {
        switch (text) {
          case 0:
            return <span>正式员工</span>;
          case 1:
            return <span>试用期</span>;
          case 2:
            return <span>实习期</span>;
          case 3:
            return <span>兼职员工</span>;

          default:
            break;
        }
      }
    },
    {
      title: '直属上级',
      dataIndex: 'directSuperiorName',
      width: '100px'
    },
    {
      title: '交付经理',
      dataIndex: 'deliveryManagerName',
      width: '100px'
    },
    {
      title: '操作',
      dataIndex: 'action',
      width: '90px',
      render: (text, record) => {
        return (
          <Button
            disabled={
              (permission && permission === 'hr') ||
              permission === 'admin' ||
              permission === 'hr'
                ? false
                : true
            }
            onClick={() => {
              const { changeBasicVisible, deptInfo } = that.props;
              let onjobKey = '',
                onJobLabel = '';
              if (record.onJob === 0) {
                onjobKey = record.onJob;
                onJobLabel = '离职';
              } else if (record.onJob === 1) {
                onjobKey = record.onJob;
                onJobLabel = '在职';
              }
              const newRecord = {
                id: record.id,
                empNo: record.empNo,
                empName: record.empName,
                ipsaBuDeptId: {
                  key: record.ipsaBuDeptId,
                  label: record.ipsaBuDeptName
                },
                ipsaDeptId: {
                  key: record.ipsaDeptId,
                  label: record.ipsaDeptName
                },
                gender: {
                  key: record.gender,
                  label: record.gender === 1 ? '男' : '女'
                },
                birthday: record.birthday,
                joiningDay: record.joiningDay,
                ipsaPostNo: {
                  key: record.ipsaPostNo,
                  label: record.ipsaPostName
                },
                ipsaGradeCode: {
                  key: record.ipsaGradeCode,
                  label: record.ipsaGradeName
                },
                correctionTime: record.correctionTime
                  ? record.correctionTime
                  : '',
                empProperty: {
                  key: record.empProperty,
                  label: record.empProperty
                },
                directSuperiorName: {
                  key: record.directSuperiorId,
                  label: record.directSuperiorName
                },
                deliveryManagerName: {
                  key: record.deliveryManagerId,
                  label: record.deliveryManagerName
                },
                onJob: {
                  key: onjobKey,
                  label: onJobLabel
                }
              };
              changeBasicVisible({
                basicVisible: true,
                record: newRecord
              });
              if (record.ipsaBuDeptId) {
                deptInfo({ id: record.ipsaBuDeptId });
              }
            }}
          >
            编辑
          </Button>
        );
      }
    }
  ];
  return basicTableList;
};
