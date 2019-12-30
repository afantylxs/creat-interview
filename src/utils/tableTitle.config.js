import React from 'react';
export const reminderColumns = [
  {
    title: '姓名',
    dataIndex: 'empName',
    width: '150px',
    fixed: 'left'
  },
  {
    title: 'BU',
    dataIndex: 'ipsaBuDeptId',
    width: '150px'
  },
  {
    title: '部门',
    dataIndex: 'ipsaDeptId',
    width: '150px'
  },
  {
    title: '软通工号',
    dataIndex: 'empNo',
    width: '150px'
  },
  {
    title: '性别',
    dataIndex: 'gender',
    width: '150px'
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
    dataIndex: 'ipsaPostNo',
    width: '150px'
  },
  {
    title: 'Grade代码',
    dataIndex: 'ipsaGradeCode',
    width: '150px'
  },
  {
    title: '是否在职',
    dataIndex: 'onJob',
    width: '150px',
    render: (text, record) => {
      return <span>{text === 0 ? '离职' : '在职'} </span>;
    }
  },
  {
    title: '人员性质',
    dataIndex: 'empProperty',
    width: '150px'
  },
  {
    title: '直属上级',
    dataIndex: 'directSuperiorName',
    width: '150px'
  },
  {
    title: '交付经理',
    dataIndex: 'deliveryManagerName',
    width: '150px'
  }
];

export const educationList = [
  {
    title: '毕业学校',
    dataIndex: 'graduatedUniversities',
    width: '150px'
  },
  {
    title: '专业',
    dataIndex: 'majorCode',
    width: '150px'
  },
  {
    title: '学历',
    dataIndex: 'educationCode',
    width: '150px'
  },
  {
    title: '是否统招',
    dataIndex: 'uniformFlag',
    width: '150px'
  }
];

export const leaveFormList = [
  {
    title: '姓名',
    dataIndex: 'name',
    width: '150px'
  },
  {
    title: 'BU',
    dataIndex: 'bu',
    width: '150px'
  },
  {
    title: '部门',
    dataIndex: 'bumen',
    width: '150px'
  },
  {
    title: '软通工号',
    dataIndex: 'empNo',
    width: '150px'
  },
  {
    title: '阿里离项时间',
    dataIndex: 'alworkId',
    width: '150px'
  },
  {
    title: '阿里离项原因',
    dataIndex: 'entryp',
    width: '150px'
  },
  {
    title: '阿里离项类型',
    dataIndex: 'onepost',
    width: '150px'
  },
  {
    title: '业务线反馈离职原因',
    dataIndex: 'twopost',
    width: '150px'
  },
  {
    title: '业务线反馈离职类型',
    dataIndex: 'threepost',
    width: '150px'
  },
  {
    title: '业务线反馈离职分类',
    dataIndex: 'hierarchy',
    width: '150px'
  },
  {
    title: '离职提出时间',
    dataIndex: 'direction',
    width: '150px'
  },
  {
    title: '离职生效日',
    dataIndex: 'frame',
    width: '150px'
  },
  {
    title: '离职时状态',
    dataIndex: 'careergroup',
    width: '150px'
  },
  {
    title: 'IPSA离职原因',
    dataIndex: 'businessunit',
    width: '150px'
  },
  {
    title: 'HR三月后离职分类',
    dataIndex: 'entryname',
    width: '150px'
  },
  {
    title: 'HR一月后离职类型',
    dataIndex: 'business',
    width: '150px'
  },
  {
    title: 'HR一月后沟通离职原因',
    dataIndex: 'projecttype',
    width: '150px'
  }
];
