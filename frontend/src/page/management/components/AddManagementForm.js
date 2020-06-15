import React from 'react'
import { Form, Select } from 'antd'
const { Option } = Select;

const AddManagementForm = ({ form, list }) => {

  return (
    <Form form={form} layout='vertical'>
      <Form.Item
        label={'Project Name'}
        name='project'
        rules={[{ required: true, message: 'Please select the projects name!' }]}
      >
        <Select
          showSearch
          placeholder='Select a project'
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {list.projectData.map(project => 
            <Option key={project.id} value={project.id}>{project.name}</Option>
          )}
        </Select>
      </Form.Item>
      <Form.Item
        label={'Student name'}
        name='student'
        rules={[{ required: true, message: 'Please select the student!' }]}
      >
        <Select
          showSearch
          placeholder='Select a student'
          optionFilterProp='children'
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {list.studentData.map(student =>
            <Option key={student.id} value={student.id}>{`${student.first_name} ${student.last_name}`}</Option>
          )}
        </Select>
      </Form.Item>
    </Form>
  )
}

export default AddManagementForm
