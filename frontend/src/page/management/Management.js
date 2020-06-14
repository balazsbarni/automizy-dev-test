import React from 'react'
import { Layout, Row, Col, Spin, Empty, List, Typography, Button, Modal, message } from 'antd'
const { Title } = Typography
const { Header, Content } = Layout

const Management=({projects, students})=>{
    return (
      <Layout>
        <Header className="header">
            <Title>Management Handler</Title>
        </Header>
        <Content className="content">
          Write frontend code here
          {console.log(projects)}
          {console.log(students)}
        </Content>
      </Layout>
    )
}

export default Management