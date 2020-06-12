import React, {useState} from 'react'
import { Layout, message} from 'antd'
const { Content } = Layout
import '../../layout/Layout.css'
import ListProject from './components/ListProject'
import AddProjectModal from './components/AddProjectModal'
import ProjectHeader from './components/ProjectHeader'

const Project = () => {
  const [reloadListTrigger, setReloadListTrigger] = useState(null)
  const [showModal, setShowModal] = useState(false)

  const onClickAddNewProject =() => { setShowModal(true) }
  const onClickCancel= () => { setShowModal(false) }
  const onDone=({name})=>{
      setShowModal(false)
      setReloadListTrigger(new Date().getTime())
      message.success('The following project has been saved: ' + name)
  }

  return(
      <Layout>
          <ProjectHeader onClickAddNewProject={onClickAddNewProject}/>
          <Content className="content">
              <ListProject reloadListTrigger={reloadListTrigger}/>
              <AddProjectModal 
                visible={showModal} 
                onClickCancel={onClickCancel} 
                onDone={onDone}
              />
          </Content>
      </Layout>
  )
}

export default Project
