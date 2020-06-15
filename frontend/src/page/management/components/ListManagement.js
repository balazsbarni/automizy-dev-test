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
import "../../../layout/Layout.css"


const ListManagement = ({ reloadListTrigger, projects, students, setProjects, setStudents }) => {
    const [trigger, setTrigger] = useState()
    const [loader, setLoader] = useState(true)

    const [list, setList] = useState({
        data: null,
        complete: false,
        error: false
    })

    useEffect(
        () => {
            setLoader(true)
            setList({
                data: list.data,
                error: false,
                complete: false
            })
            axios.get('api/management')
                .then(res => {
                    setLoader(false)
                    setList({
                        data: res.data,
                        error: false,
                        complete: true
                    })
                })
                .catch(() => {
                    setLoader(false)
                    setList({
                        data: null,
                        error: true,
                        complete: true
                    })
                })
            !projects ?
                axios.get('api/project')
                    .then(result => {
                        setProjects(result.data.projects)
                    })
                    .catch(() => {
                        setLoader(false)
                        setList({
                            data: null,
                            error: true,
                            complete: true
                        })
                    }) : null

            !students ?
                axios.get('api/student')
                    .then(result => {
                        setStudents(result.data.students)
                    })
                    .catch(() => {
                        setLoader(false)
                        setList({
                            data: null,
                            error: true,
                            complete: true
                        })
                    }) : null
        },
        [trigger, reloadListTrigger]
    )

    const onClickDeleteManagement = (id) => {
        confirm({
            title: 'Are you sure delete this m?',
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

    const filterStudentsByProject = (pId) => {
        const managementIdsByProject = list.data.managements.filter(m => m.project_id === pId)
        return managementIdsByProject.map(m => ({
            mId: m.id,
            student: students.filter(s => s.id === m.student_id)[0]
        }))
    }

    const filterProjectsByStudent = (sId) => {
        const managementIdsByStudent = list.data.managements.filter(m => m.student_id === sId)
        return managementIdsByStudent.map(m => ({
            mId: m.id,
            project: projects.filter(p => p.id === m.project_id)[0]
        }))
    }

    return (
        <Spin size="large" spinning={loader}>
            <Tabs defaultActiveKey="1">
                <TabPane tab="Management list by projects" key="1">
                    <Row style={{ marginTop: 8, marginBottom: 8 }}>
                        <Col span={24}>
                            {(projects && list.data && list.data.managements.length && projects.length && students && students.length ?
                                <Collapse accordion>
                                    {projects.filter(project => filterStudentsByProject(project.id).length > 0).map(project =>
                                        <Panel header={project.name} key={project.id}>
                                            {(filterStudentsByProject(project.id)).map(elem =>
                                                <Tag closable onClose={(e) => { e.preventDefault(); onClickDeleteManagement(elem.mId) }} key={elem.student.id} >{elem.student.first_name + ' ' + elem.student.last_name}</Tag>
                                            )}
                                        </Panel>)}
                                </Collapse>
                                :
                                <Empty />
                            )}
                        </Col>
                    </Row>
                </TabPane>
                <TabPane tab="Management list by students" key="2">
                    <Row style={{ marginTop: 8, marginBottom: 8 }}>
                        <Col span={24}>
                            {(projects && list.data && list.data.managements.length && projects.length && students && students.length ?
                                <Collapse accordion>
                                    {students.filter(student => filterProjectsByStudent(student.id).length > 0).map(student =>
                                        <Panel header={student.first_name + ' ' + student.last_name} key={student.id}>
                                            {(filterProjectsByStudent(student.id)).map(elem =>
                                                <Tag closable onClose={(e) => { e.preventDefault(); onClickDeleteManagement(elem.mId) }} key={elem.project.id}>{elem.project.name}</Tag>
                                            )}
                                        </Panel>)}
                                </Collapse>
                                :
                                <Empty />
                            )}
                        </Col>
                    </Row>
                </TabPane>
            </Tabs>
        </Spin>
    )
}

export default ListManagement