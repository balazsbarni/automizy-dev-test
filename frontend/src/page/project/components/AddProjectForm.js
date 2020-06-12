import React from 'react'
import { Form, Input } from 'antd'

const AddProjectForm = ({form}) => {
    return (
        <Form form={form} layout="vertical">
            <Form.Item
                label={'Name'}
                name="name"
                rules={[{ required: true, message: 'Please type the projects name!' }]}
            >
                <Input
                    autoComplete='off'
                    placeholder="Projectname"
                />
            </Form.Item>
            <Form.Item
                label={'Description'}
                name="desc"
                rules={[{ required: false, message: 'Please type the projects description!' }]}
            >
                <Input
                    autoComplete='off'
                    placeholder="Description"
                />
            </Form.Item>
        </Form>
    )
}

export default AddProjectForm