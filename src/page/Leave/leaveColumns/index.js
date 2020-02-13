import React from 'react';
import { Button, Tooltip } from 'antd';
import moment from 'moment';
export const leaveColumnsFunction = (that, permission) => {
  const leaveList = [
    {
      title: 'BU',
      dataIndex: 'ipsaBuDeptName',
      width: '150px'
    },
    {
      title: '部门',
      dataIndex: 'ipsaDeptName',
      width: '150px'
    },
    {
      title: '姓名',
      dataIndex: 'empName',
      width: '150px'
    },
    {
      title: '软通工号',
      dataIndex: 'empNo',
      width: '150px'
    },
    {
      title: '阿里离项时间',
      dataIndex: 'leaveProjTime',
      width: '150px',
      render: (text, record) => {
        return <span>{text ? moment(text).format('YYYY-MM-DD') : ''}</span>;
      }
    },
    {
      title: '阿里离项原因',
      dataIndex: 'leaveProjReasonName',
      width: '150px'
    },
    {
      title: '阿里离项类型',
      dataIndex: 'leaveProjType',
      width: '150px',
      render: (text, render) => {
        switch (text) {
          case 0:
            return <span>被动</span>;
          case 1:
            return <span>主动</span>;

          default:
            break;
        }
      }
    },
    {
      title: '业务线反馈离职原因',
      dataIndex: 'busOnlineFeedback',
      width: '180px'
    },
    {
      title: '业务线反馈离职分类',
      dataIndex: 'busOnlineFeedbackTypeName',
      width: '180px'
    },
    {
      title: '业务线反馈离职类型',
      dataIndex: 'busOnlineFeedbackName',
      width: '180px'
    },

    {
      title: '离职提出时间',
      dataIndex: 'leaveOfficeApplyTime',
      width: '150px',
      render: (text, record) => {
        return <span>{moment(text).format('YYYY-MM-DD')}</span>;
      }
    },
    {
      title: '离职生效日',
      dataIndex: 'effectiveTime',
      width: '150px',
      render: (text, record) => {
        return <span>{moment(text).format('YYYY-MM-DD')}</span>;
      }
    },
    {
      title: '离职时状态',
      dataIndex: 'leaveOfficeStatusName',
      width: '150px'
    },
    {
      title: 'IPSA离职原因',
      dataIndex: 'leaveReasonName',
      width: '150px'
    },
    {
      title: 'HR一月后离职分类',
      dataIndex: 'hrOneMonthClassName',
      width: '150px'
    },
    {
      title: 'HR一月后离职类型',
      dataIndex: 'hrOneMonthTypeName',
      width: '150px'
    },
    {
      title: 'HR一月后沟通离职原因',
      dataIndex: 'hrCommunicateReason',
      width: '200px'
    },
    {
      title: '操作',
      dataIndex: 'action',
      width: '150px',
      fixed: 'right',
      render: (text, record) => {
        return (
          <Button
            onClick={() => {
              const { changeLeaveVisible, dictInfoSon, dictInfo } = that.props;
              const newRecord = JSON.parse(JSON.stringify(record));
              newRecord.busOnlineFeedbackType = {
                value: newRecord.busOnlineFeedbackType,
                label: newRecord.busOnlineFeedbackTypeName
              };
              newRecord.busOnlineFeedbackId = {
                value: newRecord.busOnlineFeedbackId,
                label: newRecord.busOnlineFeedbackName
              };
              newRecord.hrOneMonthClass = {
                value: newRecord.hrOneMonthClass,
                label: newRecord.hrOneMonthClassName
              };
              newRecord.hrOneMonthType = {
                value: newRecord.hrOneMonthType,
                label: newRecord.hrOneMonthTypeName
              };
              if (newRecord.id && newRecord.busOnlineFeedbackType.value) {
                const arg0 = {
                  name: 'business_leave_type',
                  pid: newRecord.busOnlineFeedbackType.value
                };
                dictInfoSon(arg0);
              }

              if (newRecord.id && newRecord.hrOneMonthClass.value) {
                const arg0 = {
                  name: 'hr_leave_type',
                  pid: newRecord.hrOneMonthClass.value
                };

                dictInfoSon(arg0);
              }

              if (newRecord.leaveReasonId) {
                dictInfo('ipsa_leave_reason');
              }
              changeLeaveVisible({
                leaveVisible: true,
                newRecord
              });
            }}
          >
            编辑
          </Button>
        );
      }
    }
  ];
  return leaveList;
};
