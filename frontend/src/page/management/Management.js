import React, { useState } from 'react'
import { Layout, Row, Col, Spin, Empty, List, Typography, Button, Modal, message } from 'antd'
const { Title } = Typography
const { Header, Content } = Layout
import ListManagement from './components/ListManagement'

const Management=({projects, students, setProjects, setStudents})=>{
  const [reloadListTrigger, setReloadListTrigger] = useState(null)
  const [showModal, setShowModal] = useState(false)

  const onClickAddNewProject =() => { setShowModal(true) }
  const onClickCancel= () => { setShowModal(false) }
  const onDone=({name})=>{
      setShowModal(false)
      setReloadListTrigger(new Date().getTime())
      message.success('The following project has been saved: ' + name)
  }

    return (
      <Layout>
        <Header className="header">
            <Title>Management Handler</Title>
        </Header>
        <Content className="content">
        <Content className="content">
              <ListManagement
                reloadListTrigger={reloadListTrigger}
                projects={projects}
                setProjects={setProjects}
                students={students}
                setStudents={setStudents}
                />
          </Content>
        </Content>
      </Layout>
    )
}

export default Management