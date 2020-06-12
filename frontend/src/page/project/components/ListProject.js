import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { 
    Row, 
    Col, 
    Spin, 
    Empty, 
    List, 
    Typography, 
    Button, 
    Modal, 
    message } from 'antd'
const { confirm } = Modal
import { ExclamationCircleOutlined } from '@ant-design/icons'
import "../../../layout/Layout.css"

const ListProject = ({ reloadListTrigger }) => {
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
            axios.get('api/project')
                .then(res => {
                    setLoader(false)
                    setList({
                        data: res.data,
                        error: false,
                        complete: true
                    })
                }
                )
                .catch(() => {
                    setLoader(false)
                    setList({
                        data: null,
                        error: true,
                        complete: true
                    })
                }
                )
        },
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
            }
            )
            .catch(() =>
                setLoader(false)
            )
    }
    return (
        <Spin size="large" spinning={loader}>
            <Row style={{ marginTop: 8, marginBottom: 8 }}>
                <Col span={24}>
                    {(list.complete && (
                        list.data &&
                            list.data.projects.length ?
                            <List
                                bordered
                                dataSource={list.data.projects}
                                renderItem={item => (
                                    <List.Item>
                                        <Typography.Text strong>
                                            {item.name}
                                        </Typography.Text>
                                        <Typography.Text>
                                            {item.desc}
                                        </Typography.Text>
                                        <Button
                                            type="primary"
                                            onClick={() => onClickDeleteProject(item)}>
                                            Delete
                                        </Button>
                                    </List.Item>
                                )}
                            />
                            :
                            <Empty />
                    ))}
                </Col>
            </Row>
        </Spin>
    )
}

export default ListProject