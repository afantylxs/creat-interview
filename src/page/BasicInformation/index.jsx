import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button, Table, Modal, Form, Icon, Input } from 'antd';
import BasicModal from './components/BasicModal.jsx';
import { actionCreators } from './store';
const columns = [
    {
        title: 'BU',
        dataIndex: 'address',
        width: '50%',
        key: 1,
      },
      {
        title: '部门',
        dataIndex: 'number',
        width: '50%',
        key: 2,
      },
]

const data = [
    {
        address: '西溪国际',
        number: 120,
    },
    {
        address: '蚂蚁Z空间',
        number: 108,
    },
    {
        address: '乐佳国际',
        number: 198,
    },
    {
        address: '德力西大厦',
        number: 345,
    }
]
 class ProjectInformation extends Component {
    constructor(props){
        super(props);
        this.state ={
            visible: false,
        }
    }

    handleShowModel = () => {
       const { handleChangeBasicVisible } = this.props;
       handleChangeBasicVisible(true)
    }

    handleCloseModal = visible => {
        this.setState({
            visible,
        })
    }
    render() {
        const { visible } = this.state;
        return (
            <div className="project-information">
                <Row style={{padding: '10px'}}>
                    <Col span={24}>
                        <Row>
                            <Col span={12}>
                                <Button style={{marginLeft: '30px'}} onClick={this.handleShowModel.bind(this)} type="primary">新增人员</Button>
                            </Col>
                            <Col span={12} style={{textAlign: 'right'}}>
                            <Button style={{marginRight: '40px'}} type="primary">导入</Button>
                            <Button type="primary">导出</Button>
                            </Col>
                        </Row>
                    </Col>
                    <Col style={{marginTop: '30px'}} span={24}>
                        <Table columns={columns} dataSource={data}/>
                    </Col>
                </Row>
                <BasicModal/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        basicVisible: state.basic.basicVisible,
    }
}

const mapDispatchTopProps = dispatch => {
    return {
        handleChangeBasicVisible(active) {
            dispatch(
                actionCreators.changeBasicVisible(
                    {
                        basicVisible: active,
                    }
                )
            )
        }
    }
}
export default   connect(mapStateToProps, mapDispatchTopProps)(ProjectInformation);