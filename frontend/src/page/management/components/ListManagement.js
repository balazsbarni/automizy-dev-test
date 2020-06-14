import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { 
    Row, 
    Col, 
    Spin, 
    Empty, 
    Button, 
    Modal, 
    message } from 'antd'
const { confirm } = Modal
import { Collapse } from 'antd';
const { Panel } = Collapse;
import { Tag } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons'
import "../../../layout/Layout.css"

const ListManagement = ({ reloadListTrigger, projects, students, setProjects, setStudents }) => {
    const [trigger, setTrigger] = useState()
    const [loader, setLoader] = useState(true)
    const [view, setView] = useState('project')

    const [list, setList] = useState({
        data: null,
        complete: false,
        error: false
    })

    const getDistinctProjectId = ()=> list.data.managements.map(e => e.project_id).filter((management, i, arr) => arr.indexOf(management) === i)

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
                projects ? null : 
                           axios.get('api/project')
                            .then(result => {
                                setProjects(result.data.projects)})
                            .catch(() => {
                                setLoader(false)
                                setList({
                                    data: null,
                                    error: true,
                                    complete: true
                                })
                })

                students ? null : 
                axios.get('api/student')
                 .then(result => {
                     setStudents(result.data.students)})
                 .catch(() => {
                     setLoader(false)
                     setList({
                         data: null,
                         error: true,
                         complete: true
                     })
     })
            },
        [trigger, reloadListTrigger]
    )

    const onClickDeleteManagement = ({ name, id }) => {
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

    const deleteManagement = ({ id, name }) => {
        setLoader(true)
        axios.delete('api/project/' + id)
            .then(res => {
                message.success('The following project has been deleted: ' + name)
                setLoader(false)
                setTrigger(new Date().getTime())
            }
            )
            .catch(() =>
                setLoader(false)
            )
    }

    const filterStudentsByProject = (pId) => {
        const managementIdsByProject = list.data.managements.filter(m => m.project_id === pId).map(m => m.student_id)
        return students.filter(s => managementIdsByProject.indexOf(s.id) !== -1)
    }

    return (
        <Spin size="large" spinning={loader}>
            <Row style={{ marginTop: 8, marginBottom: 8 }}>
                <Col span={24}>
                    {(projects && list.data && list.data.managements.length && projects.length && students && students.length ?
                            <Collapse accordion>
                                {projects.filter(project => filterStudentsByProject(project.id).length > 0).map(project => 
                                    <Panel header={project.name} key={project.id}>
                                        {(filterStudentsByProject(project.id)).map(student =>
                                            <Tag key={student.id}>{student.first_name + ' ' + student.last_name}</Tag>
                                        )}   
                                    </Panel>)}
                            </Collapse>
                            :
                            <Empty />
                    )}
                </Col>
            </Row>
        </Spin>
    )
}

export default ListManagement