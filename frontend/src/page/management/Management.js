import React, { useState } from 'react'
import { Layout, message } from 'antd'
const { Content } = Layout
import ListManagement from './components/ListManagement'
import ManagementHeader from './components/ManagementHeader'
import AddManagementModal from './components/AddManagementModal'

const Management = ({ list, setList }) => {
  const [reloadListTrigger, setReloadListTrigger] = useState(null)
  const [showModal, setShowModal] = useState(false)

  const onClickAddNewManagement = () => { setShowModal(true) }

  const onClickCancel = () => { setShowModal(false) }

  const onDone = () => {
    setShowModal(false)
    setReloadListTrigger(new Date().getTime())
    message.success('Student added to project')
  }

  return (
    <Layout>
      <ManagementHeader onClickAddNewManagement={onClickAddNewManagement} />
      <Content className='content'>
        <ListManagement
          reloadListTrigger={reloadListTrigger}
          list={list}
          setList={setList}
        />
        <AddManagementModal
          visible={showModal}
          onClickCancel={onClickCancel}
          onDone={onDone}
          list={list}
        />
      </Content>
    </Layout>
  )
}

export default Management
