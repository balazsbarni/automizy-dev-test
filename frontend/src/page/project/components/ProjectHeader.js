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
import '../../../layout/Layout.css'

const ProjectHeader = ({ onClickAddNewProject }) => {
  return (
    <Header className='header'>
      <Row>
        <Col span={20}>
          <Title>Project Handler</Title>
        </Col>
        <Col span={2}>
          <Button
            type='primary'
            onClick={onClickAddNewProject}>
            Add new Project
          </Button>
        </Col>
      </Row>
    </Header>
  )
}

export default ProjectHeader
