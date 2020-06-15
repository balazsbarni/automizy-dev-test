import React from 'react'
import {
  Layout,
  Row,
  Col,
  Typography,
  Button
} from 'antd'
const { Title } = Typography
const { Header } = Layout
import "../../../layout/Layout.css"


const ManagementHeader = ({ onClickAddNewManagement }) => {
  return (
    <Header className='header'>
      <Row>
        <Col span={18}>
          <Title>Management Handler</Title>
        </Col>
        <Col span={2}>
          <Button
            type='primary'
            onClick={onClickAddNewManagement}>
            Add new Management item
          </Button>
        </Col>
      </Row>
    </Header>
  )
}

export default ManagementHeader
