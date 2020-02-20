import React from 'react';
import moment from 'moment';
import { Tooltip } from 'antd';
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

export const weekAnalysisColumns = [
  {
    title: '统计周期',
    dataIndex: 'statisticsPeriod',
    align: 'center'
  },
  {
    title: '集团',
    dataIndex: 'groupName',
    align: 'center'
  },
  {
    title: '入职',
    children: [
      {
        title: '人数',
        dataIndex: 'joinTotal',
        align: 'center'
      },
      {
        title: '本科',
        dataIndex: 'undergradJoinTotal',
        align: 'center'
      }
    ]
  },
  {
    title: '离职',
    children: [
      {
        title: '人数',
        dataIndex: 'leaveTotal',
        align: 'center'
      },
      {
        title: '本科',
        dataIndex: 'undergradLeaveTotal',
        align: 'center'
      },
      {
        title: '主动离职',
        dataIndex: 'initiativeLeaveTotal',
        align: 'center'
      },
      {
        title: '被动离职',
        dataIndex: 'passiveLeaveTotal',
        align: 'center'
      }
    ]
  }
];

export const generalTableColumns = [
  {
    title: 'BU',
    dataIndex: 'ipsaBuDeptName',
    width: '100px',
    onCell: () => {
      return {
        style: {
          maxWidth: 100,
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          cursor: 'pointer'
        }
      };
    },
    render: text => (
      <Tooltip placement="topLeft" title={text}>
        {text}
      </Tooltip>
    )
  },
  {
    title: '部门',
    dataIndex: 'ipsaDeptName',
    width: '100px',
    onCell: () => {
      return {
        style: {
          maxWidth: 100,
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          cursor: 'pointer'
        }
      };
    },
    render: text => (
      <Tooltip placement="topLeft" title={text}>
        {text}
      </Tooltip>
    )
  },
  {
    title: '姓名',
    dataIndex: 'empName',
    width: '100px',
    onCell: () => {
      return {
        style: {
          maxWidth: 100,
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          cursor: 'pointer'
        }
      };
    },
    render: text => (
      <Tooltip placement="topLeft" title={text}>
        {text}
      </Tooltip>
    )
  },
  {
    title: '软通工号',
    dataIndex: 'empNo',
    width: '100px',
    onCell: () => {
      return {
        style: {
          maxWidth: 100,
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          cursor: 'pointer'
        }
      };
    },
    render: text => (
      <Tooltip placement="topLeft" title={text}>
        {text}
      </Tooltip>
    )
  },
  {
    title: '阿里工号',
    dataIndex: 'aliNo',
    width: '100px',
    onCell: () => {
      return {
        style: {
          maxWidth: 100,
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          cursor: 'pointer'
        }
      };
    },
    render: text => (
      <Tooltip placement="topLeft" title={text}>
        {text}
      </Tooltip>
    )
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
    width: '150px',
    render: (text, record) => {
      return <span>{text ? moment(text).format('YYYY-MM-DD') : ''}</span>;
    }
  },
  {
    title: '入职日期',
    dataIndex: 'joiningDay',
    width: '150px',
    render: (text, record) => {
      return <span>{text ? moment(text).format('YYYY-MM-DD') : ''}</span>;
    }
  },
  {
    title: '转正日期',
    dataIndex: 'correctionTime',
    width: '150px',
    render: (text, record) => {
      return <span>{text ? moment(text).format('YYYY-MM-DD') : ''}</span>;
    }
  },
  {
    title: '通用职位',
    dataIndex: 'ipsaPostName',
    width: '100px',
    onCell: () => {
      return {
        style: {
          maxWidth: 100,
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          cursor: 'pointer'
        }
      };
    },
    render: text => (
      <Tooltip placement="topLeft" title={text}>
        {text}
      </Tooltip>
    )
  },
  {
    title: 'Grade代码',
    dataIndex: 'ipsaGradeName',
    width: '100px',
    onCell: () => {
      return {
        style: {
          maxWidth: 100,
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          cursor: 'pointer'
        }
      };
    },
    render: text => (
      <Tooltip placement="topLeft" title={text}>
        {text}
      </Tooltip>
    )
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
    width: '100px',
    onCell: () => {
      return {
        style: {
          maxWidth: 100,
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          cursor: 'pointer'
        }
      };
    },
    render: text => (
      <Tooltip placement="topLeft" title={text}>
        {text}
      </Tooltip>
    )
  },
  {
    title: '交付经理',
    dataIndex: 'deliveryManagerName',
    width: '100px',
    onCell: () => {
      return {
        style: {
          maxWidth: 100,
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          cursor: 'pointer'
        }
      };
    },
    render: text => (
      <Tooltip placement="topLeft" title={text}>
        {text}
      </Tooltip>
    )
  },
  {
    title: '毕业学校',
    dataIndex: 'graduatedUniversities',
    width: '100px',
    onCell: () => {
      return {
        style: {
          maxWidth: 100,
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          cursor: 'pointer'
        }
      };
    },
    render: text => (
      <Tooltip placement="topLeft" title={text}>
        {text}
      </Tooltip>
    )
  },
  {
    title: '专业',
    dataIndex: 'majorName',
    width: '100px',
    onCell: () => {
      return {
        style: {
          maxWidth: 100,
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          cursor: 'pointer'
        }
      };
    },
    render: text => (
      <Tooltip placement="topLeft" title={text}>
        {text}
      </Tooltip>
    )
  },
  {
    title: '学历',
    dataIndex: 'educationCode',
    width: '100px',
    render: (text, record) => {
      switch (text) {
        case 0:
          return <span>高中</span>;
        case 1:
          return <span>中专</span>;
        case 2:
          return <span>大专</span>;
        case 3:
          return <span>本科</span>;
        case 4:
          return <span>硕士</span>;
        case 5:
          return <span>博士</span>;
        case 6:
          return <span>博士后</span>;
        case 7:
          return <span>院士</span>;
        default:
          break;
      }
    }
  },
  {
    title: '是否统招',
    dataIndex: 'uniformFlag',
    width: '100px',
    render: (text, record) => {
      switch (text) {
        case 0:
          return <span>非</span>;
        case 1:
          return <span>是</span>;
        default:
          break;
      }
    }
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
    width: '100px',
    onCell: () => {
      return {
        style: {
          maxWidth: 100,
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          cursor: 'pointer'
        }
      };
    },
    render: text => (
      <Tooltip placement="topLeft" title={text}>
        {text}
      </Tooltip>
    )
  },
  {
    title: '二类岗位',
    dataIndex: 'secondCategoryName',
    width: '100px',
    onCell: () => {
      return {
        style: {
          maxWidth: 100,
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          cursor: 'pointer'
        }
      };
    },
    render: text => (
      <Tooltip placement="topLeft" title={text}>
        {text}
      </Tooltip>
    )
  },
  {
    title: '三类岗位',
    dataIndex: 'thirdJobName',
    width: '100px',
    onCell: () => {
      return {
        style: {
          maxWidth: 100,
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          cursor: 'pointer'
        }
      };
    },
    render: text => (
      <Tooltip placement="topLeft" title={text}>
        {text}
      </Tooltip>
    )
  },
  {
    title: '层级',
    dataIndex: 'aliGradeCodeName',
    width: '80px'
  },
  {
    title: '技术方向',
    dataIndex: 'techDirection',
    width: '100px',
    onCell: () => {
      return {
        style: {
          maxWidth: 100,
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          cursor: 'pointer'
        }
      };
    },
    render: text => (
      <Tooltip placement="topLeft" title={text}>
        {text}
      </Tooltip>
    )
  },
  {
    title: '框架',
    dataIndex: 'aliFrameName',
    width: '100px',
    onCell: () => {
      return {
        style: {
          maxWidth: 100,
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          cursor: 'pointer'
        }
      };
    },
    render: text => (
      <Tooltip placement="topLeft" title={text}>
        {text}
      </Tooltip>
    )
  },
  {
    title: '事业群',
    dataIndex: 'careerGroupName',
    width: '100px',
    onCell: () => {
      return {
        style: {
          maxWidth: 100,
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          cursor: 'pointer'
        }
      };
    },
    render: text => (
      <Tooltip placement="topLeft" title={text}>
        {text}
      </Tooltip>
    )
  },
  {
    title: '事业群本部',
    dataIndex: 'groupDeptName',
    width: '100px',
    onCell: () => {
      return {
        style: {
          maxWidth: 100,
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          cursor: 'pointer'
        }
      };
    },
    render: text => (
      <Tooltip placement="topLeft" title={text}>
        {text}
      </Tooltip>
    )
  },
  {
    title: '事业部',
    dataIndex: 'careerDeptName',
    width: '100px',
    onCell: () => {
      return {
        style: {
          maxWidth: 100,
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          cursor: 'pointer'
        }
      };
    },
    render: text => (
      <Tooltip placement="topLeft" title={text}>
        {text}
      </Tooltip>
    )
  },
  {
    title: '阿里部门',
    dataIndex: 'deptName',
    width: '100px',
    onCell: () => {
      return {
        style: {
          maxWidth: 100,
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          cursor: 'pointer'
        }
      };
    },
    render: text => (
      <Tooltip placement="topLeft" title={text}>
        {text}
      </Tooltip>
    )
  },
  {
    title: '项目名称',
    dataIndex: 'projectName',
    width: '100px',
    onCell: () => {
      return {
        style: {
          maxWidth: 100,
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          cursor: 'pointer'
        }
      };
    },
    render: text => (
      <Tooltip placement="topLeft" title={text}>
        {text}
      </Tooltip>
    )
  },
  {
    title: '业务线名称',
    dataIndex: 'businessLine',
    width: '100px',
    onCell: () => {
      return {
        style: {
          maxWidth: 100,
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          cursor: 'pointer'
        }
      };
    },
    render: text => (
      <Tooltip placement="topLeft" title={text}>
        {text}
      </Tooltip>
    )
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
    title: '备注',
    dataIndex: 'projectRemark',
    width: '150px'
  },
  {
    title: '离项时间',
    dataIndex: 'leaveProjTime',
    width: '100px',
    render: (text, record) => {
      return <span>{text ? moment(text).format('YYYY-MM-DD') : ''}</span>;
    }
  },
  {
    title: '离项原因',
    dataIndex: 'leaveProjReasonName',
    width: '100px'
  },
  {
    title: '离项类型',
    dataIndex: 'leaveProjType',
    width: '100px',
    render: (text, record) => {
      switch (text) {
        case 0:
          return <span>被动</span>;

        case 1:
          return <span>主动</span>;

        default:
          break;
      }
    }
  }
];

export const turnoverRateColumns = [
  {
    title: '产品线',
    dataIndex: 'productLine',
    width: '200px'
  },
  {
    title: '9月在职人数(基线)',
    dataIndex: 'settlementCycleTotal',
    width: '150px'
  },
  {
    title: '9月在职骨干人数基线',
    dataIndex: 'settlementCycleBackboneTotal',
    width: '150px'
  },
  {
    title: '在职总人数',
    dataIndex: 'onJobTotal',
    width: '150px'
  },
  {
    title: '在职骨干人数',
    dataIndex: 'onJobBackboneTotal',
    width: '150px'
  },
  {
    title: '主动离职人数',
    dataIndex: 'initiativeLeaveTotal',
    width: '150px'
  },
  {
    title: '主动离职平均时间',
    dataIndex: 'initiativeLeaveAvgTime',
    width: '150px'
  },
  {
    title: '被动离职总人数',
    dataIndex: 'passiveLeaveTotal',
    width: '150px'
  },
  {
    title: '主动离职率',
    dataIndex: 'initiativeLeaveRate',
    width: '150px'
  },
  {
    title: '被动离职率',
    dataIndex: 'passiveLeaveRate',
    width: '150px'
  },
  {
    title: '离职率',
    dataIndex: 'leaveRate',
    width: '150px'
  },
  {
    title: '主动离职骨干人数',
    dataIndex: 'initiativeLeaveBackboneTotal',
    width: '150px'
  },
  {
    title: '被动离职骨干总人数',
    dataIndex: 'passiveLeaveBackboneTotal',
    width: '150px'
  },
  {
    title: '骨干主动离职率',
    dataIndex: 'initiativeLeaveBackboneRate',
    width: '150px'
  },
  {
    title: '骨干被动离职率',
    dataIndex: 'passiveLeaveBackboneRate',
    width: '150px'
  },
  {
    title: '骨干离职率',
    dataIndex: 'leaveBackboneRate',
    width: '150px'
  }
];

export const manpowerStructureColumns = [
  {
    title: '产品线',
    dataIndex: 'productLine',
    width: '200px'
  },
  {
    title: '在职总人数',
    dataIndex: 'onJobTotal',
    width: '150px'
  },
  {
    title: '在职骨干人数',
    dataIndex: 'onJobBackboneTotal',
    width: '150px'
  },
  {
    title: '211人数',
    dataIndex: 'emphasisSchoolTotal',
    width: '150px'
  },

  {
    title: '211人数百分比',
    dataIndex: 'emphasisSchoolRat',
    width: '150px'
  },
  {
    title: '211骨干人数',
    dataIndex: 'emphasisSchoolBackboneTotal',
    width: '150px'
  },
  {
    title: '211骨干人数百分比',
    dataIndex: 'emphasisSchoolBackboneRat',
    width: '150px'
  },
  {
    title: '统招本科人数',
    dataIndex: 'undergraduateTotal',
    width: '150px'
  },
  {
    title: '统招本科人数百分比',
    dataIndex: 'undergraduateRat',
    width: '150px'
  },
  {
    title: '初级人数',
    dataIndex: 'primaryTotal',
    width: '150px'
  },
  {
    title: '中级人数',
    dataIndex: 'middleTotal',
    width: '150px'
  },
  {
    title: '高级人数',
    dataIndex: 'highTotal',
    width: '150px'
  },
  {
    title: '专家人数',
    dataIndex: 'expertTotal',
    width: '150px'
  },
  {
    title: '资深',
    dataIndex: 'seniorTotal',
    width: '150px'
  },
  {
    title: '初级人数百分比',
    dataIndex: 'primaryRat',
    width: '150px'
  },
  {
    title: '中级人数百分比',
    dataIndex: 'middleRat',
    width: '150px'
  },
  {
    title: '高级人数百分比',
    dataIndex: 'highRat',
    width: '150px'
  },
  {
    title: '专家人数百分比',
    dataIndex: 'expertRat',
    width: '150px'
  },
  {
    title: '资深人数百分比',
    dataIndex: 'seniorRat',
    width: '150px'
  }
];
