import React from 'react'
import axios from 'axios'
import { Button, Modal, Form } from 'antd'
import '../../../layout/Layout.css'
import AddManagementForm from './AddManagementForm'

const AddManagementModal = ({ visible, onClickCancel, onDone, list }) => {
  const [form] = Form.useForm()

  const onClickSave = () => {
    form.validateFields()
      .then(values => {
        saveManagement({
          student_id: values.student,
          project_id: values.project
        })
      })
      .catch(info => {
        console.log('Validate Failed:', info)
      })
  }

  const saveManagement = ({ student_id, project_id }) => {
    axios.post('api/management', {
      'student_id': student_id,
      'project_id': project_id
    })
      .then(() => {
        form.resetFields()
        onDone()
      })
      .catch((err) => {
        if (err.response.status === 409) {
          setDuplicationErrorMessage()
        }
      })
  }
  
  const setDuplicationErrorMessage = () => {
    form.setFields([
      {
        name: 'student',
        errors: ['Already assigned to project']
      }
    ])
  }

  return (
    <Modal
      visible={visible}
      title='Add new management item'
      onCancel={onClickCancel}
      footer={[
        <Button key='cancel' onClick={onClickCancel}>Cancel</Button>,
        <Button key='save' type='primary' onClick={onClickSave}>Save</Button>
      ]}
    >
      <AddManagementForm form={form} list={list} />
    </Modal>
  )
}

export default AddManagementModal
