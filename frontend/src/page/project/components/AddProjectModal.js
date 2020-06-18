import React from 'react'
import axios from 'axios'
import { Button, Modal, Form } from 'antd'
import '../../../layout/Layout.css'
import AddProjectForm from './AddProjectForm'

const AddProjectModal = ({ visible, onClickCancel, onDone }) => {
  const [form] = Form.useForm()

  const onClickSave = () => {
    form.validateFields()
      .then(values => {
        saveProject({
          name: values.name,
          desc: values.desc
        })
      })
      .catch(info => {
        console.log('Validate Failed:', info)
      })
  }

  const saveProject = ({ name, desc }) => {
    axios.post('api/project', {
      'name': name,
      'desc': desc
    })
      .then(() => {
        form.resetFields()
        onDone({ name: name })
      })
      .catch((err) => {
        if (err.response.status === 409) {
          setDuplicationErrorMessage({ name: err.response.data.error })
        }
      })
  }
  const setDuplicationErrorMessage = ({ name }) => {
    form.setFields([
      {
        name: Object.keys(name)[0],
        errors: ['Alredy exists']
      }
    ])
  }

  return (
    <Modal
      visible={visible}
      title='Add new project'
      onCancel={onClickCancel}
      footer={[
        <Button key='cancel' onClick={onClickCancel}>Cancel</Button>,
        <Button key='save' type='primary' onClick={onClickSave}>Save</Button>
      ]}
    >
      <AddProjectForm form={form} />
    </Modal>
  )
}

export default AddProjectModal
