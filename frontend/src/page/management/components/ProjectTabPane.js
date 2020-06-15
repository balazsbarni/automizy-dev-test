import React from 'react'
import { filterStudentsByProject } from '../utils/filterManagement'
import checkListData from '../utils/checkListData'
import {
  Row,
  Col,
  Empty,
  Tag,
  Collapse
} from 'antd'
const { Panel } = Collapse;



const ProjectTabPane = ({ list }) => {
  return (
    <Row style={{ marginTop: 8, marginBottom: 8 }}>
      <Col span={24}>
        {(list.complete && (checkListData(list) ?
          <Collapse accordion>
            {list.projectData.filter(project => filterStudentsByProject(project.id, list).length > 0).map(project =>
              <Panel header={project.name} key={project.id}>
                {(filterStudentsByProject(project.id, list)).map(elem =>
                  <Tag closable onClose={(e) => { e.preventDefault(); onClickDeleteManagement(elem.mId) }} key={elem.student.id} >{elem.student.first_name + ' ' + elem.student.last_name}</Tag>
                )}
              </Panel>)}
          </Collapse>
          :
          <Empty />
        ))}
      </Col>
    </Row>
  )
}

export default ProjectTabPane