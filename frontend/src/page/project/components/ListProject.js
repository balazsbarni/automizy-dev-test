import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Row,
  Col,
  Spin,
  Empty,
  Button,
  Modal,
  Collapse,
  message
} from 'antd'
const { confirm } = Modal
const { Panel } = Collapse
import { ExclamationCircleOutlined } from '@ant-design/icons'
import '../../../layout/Layout.css'
import getData from '../utils/getData'

const ListProject = ({ reloadListTrigger, list, setList }) => {
  const [trigger, setTrigger] = useState()
  const [loader, setLoader] = useState(true)

  useEffect(
    () => getData(setLoader, setList),
    [trigger, reloadListTrigger]
  )

  const onClickDeleteProject = ({ name, id }) => {
    confirm({
      title: 'Are you sure delete this project?',
      icon: <ExclamationCircleOutlined />,
      content: name,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        deleteProject({ name, id })
      },
      onCancel() { }
    })
  }

  const deleteProject = ({ id, name }) => {
    setLoader(true)
    axios.delete('api/project/' + id)
      .then(res => {
        message.success('The following project has been deleted: ' + name)
        setLoader(false)
        setTrigger(new Date().getTime())
      })
      .catch(() =>
        setLoader(false)
      )
  }
  return (
    <Spin size='large' spinning={loader}>
      <Row style={{ marginTop: 8, marginBottom: 8 }}>
        <Col span={24}>
          {(list.complete && (
            list.projectData &&
              list.projectData.length ?
              <Collapse accordion>
                {list.projectData.map(project =>
                  <Panel header={project.name} key={project.id}>
                    <p>{project.desc}</p>
                    <Button type='primary' onClick={() => onClickDeleteProject(project)}>Delete</Button>
                  </Panel>
                )}
              </Collapse>
              :
              <Empty />
          ))}
        </Col>
      </Row>
    </Spin>
  )
}

export default ListProject