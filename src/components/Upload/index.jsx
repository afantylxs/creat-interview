import React, { Component } from 'react';
import { Button, Upload } from 'antd';

export default class UploadFile extends Component {
  render() {
    return (
      <div>
        <Upload>
          <Button>导入</Button>
        </Upload>
      </div>
    );
  }
}
