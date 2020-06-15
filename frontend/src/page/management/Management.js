import React, { useState } from 'react'
import { Layout, Row, Col, Spin, Empty, List, Typography, Button, Modal, message } from 'antd'
const { Title } = Typography
const { Header, Content } = Layout
import ListManagement from './components/ListManagement'
import ManagementHeader from './components/ManagementHeader'
import AddManagementModal from './components/AddManagementModal'

const Management=({projects, students, setProjects, setStudents})=>{
  const [reloadListTrigger, setReloadListTrigger] = useState(null)
  const [showModal, setShowModal] = useState(false)

  const onClickAddNewManagement =() => { setShowModal(true) }
  const onClickCancel= () => { setShowModal(false) }
  const onDone=()=>{
      setShowModal(false)
      setReloadListTrigger(new Date().getTime())
      message.success('Student added to project')
  }

    return (
      <Layout>
        <ManagementHeader onClickAddNewManagement={onClickAddNewManagement}/>
        <Content className="content">
              <ListManagement
                reloadListTrigger={reloadListTrigger}
                projects={projects}
                setProjects={setProjects}
                students={students}
                setStudents={setStudents}
                />
              <AddManagementModal 
                visible={showModal} 
                onClickCancel={onClickCancel} 
                onDone={onDone}
                projects={projects}
                students={students}
              />
          </Content>
      </Layout>
    )
}

export default Management