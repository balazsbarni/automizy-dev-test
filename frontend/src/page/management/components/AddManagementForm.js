import React from 'react'
import { Form, Select } from 'antd'
const { Option } = Select;

const AddManagementForm = ({ form, students, projects, managements }) => {

    function onChange(value) {
        console.log(`selected ${value}`);
      }
      
      function onBlur() {
        console.log('blur');
      }
      
      function onFocus() {
        console.log('focus');
      }
      
      function onSearch(val) {
        console.log('search:', val);
      }

    return (
        <Form form={form} layout="vertical">
            <Form.Item
                label={'Project Name'}
                name="project"
                rules={[{ required: true, message: 'Please select the projects name!' }]}
            >
                <Select
                    showSearch
                    placeholder="Select a project"
                    optionFilterProp="children"
                    onChange={onChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onSearch={onSearch}
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {projects.map(project => <Option key={project.id} value={project.id}>{project.name}</Option>)}
                    
                </Select>
            </Form.Item>
            <Form.Item
                label={'Student name'}
                name="student"
                rules={[{ required: false, message: 'Please select the student!' }]}
            >
                <Select
                    showSearch
                    placeholder="Select a student"
                    optionFilterProp="children"
                    onChange={onChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onSearch={onSearch}
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                   {students.map(student => <Option key={student.id} value={student.id}>{`${student.first_name} ${student.last_name}`}</Option>)}
                </Select>
            </Form.Item>
        </Form>
    )
}

export default AddManagementForm