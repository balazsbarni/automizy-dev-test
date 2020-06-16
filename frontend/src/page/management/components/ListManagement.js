import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Row,
  Col,
  Spin,
  Empty,
  Modal,
  message,
  Tabs,
  Tag,
  Collapse
} from 'antd'
const { confirm } = Modal
const { Panel } = Collapse;
const { TabPane } = Tabs;
import { ExclamationCircleOutlined } from '@ant-design/icons'
import '../../../layout/Layout.css'
import getData from '../utils/getData'
import ProjectTabPane from './ProjectTabPane'
import StudentTabPane from './StudentTabPane'


const ListManagement = ({ reloadListTrigger, list, setList }) => {
  const [trigger, setTrigger] = useState()
  const [loader, setLoader] = useState(true)

  useEffect(
    () => getData(setLoader, list, setList),
    [trigger, reloadListTrigger]
  )

  const onClickDeleteManagement = (id) => {
    confirm({
      title: 'Are you sure delete this record?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        deleteManagement(id)
      },
      onCancel() { }
    })
  }

  const deleteManagement = (id) => {
    setLoader(true)
    axios.delete('api/management/' + id)
      .then(res => {
        message.success('Deleted')
        setLoader(false)
        setTrigger(new Date().getTime())
      })
      .catch(() =>
        setLoader(false)
      )
  }

  return (
    <Spin size="large" spinning={loader}>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Management list by projects" key="1">
          <ProjectTabPane list={list} onClickDeleteManagement={onClickDeleteManagement}/>
        </TabPane>
        <TabPane tab="Management list by students" key="2">
          <StudentTabPane list={list} onClickDeleteManagement={onClickDeleteManagement}/>
        </TabPane>
      </Tabs>
    </Spin>
  )
}

export default ListManagement