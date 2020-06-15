import React from 'react'
import { filterProjectsByStudent } from '../utils/filterManagement'
import checkListData from '../utils/checkListData'
import {
  Row,
  Col,
  Empty,
  Tag,
  Collapse
} from 'antd'
const { Panel } = Collapse;

const StudentTabPane = ({ list }) => {
  return (
    <Row style={{ marginTop: 8, marginBottom: 8 }}>
      <Col span={24}>
        {(list.complete && (checkListData(list) ?
          <Collapse accordion>
            {list.studentData.filter(student => filterProjectsByStudent(student.id, list).length > 0).map(student =>
              <Panel header={student.first_name + ' ' + student.last_name} key={student.id}>
                {(filterProjectsByStudent(student.id, list)).map(elem =>
                  <Tag closable onClose={(e) => { e.preventDefault(); onClickDeleteManagement(elem.mId) }} key={elem.project.id}>{elem.project.name}</Tag>
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

export default StudentTabPane