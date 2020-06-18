import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import { Layout, Menu } from 'antd'
import {
  UserOutlined,
  BookOutlined,
  ContactsOutlined,
} from '@ant-design/icons'
import logo from '../images/logo/automizy-color-logo-full.svg'
import './Layout.css'
import Student from '../page/student/Student'
import Project from '../page/project/Project'
import Management from '../page/management/Management'

import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000/'

const App = () => {
  const [collapsed, setCollapsed] = useState(false)
  const [activeMenu, setActiveMenu] = useState('student')

  const [list, setList] = useState({
    studentData: null,
    projectData: null,
    managementData: null,
    complete: false,
    error: false
  })

  const handleOnClickMenu = e => {
    setActiveMenu(e.key)
  }
  return (
    <Router>
      <Layout className='layout'>
        <Layout.Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          className={'sider'}
        >
          <img
            className={collapsed ? 'logo-hide' : 'logo'}
            src={logo}
            alt={''} />
          <Menu
            theme='dark'
            mode='inline'
            selectedKeys={[activeMenu]}
            onClick={e => handleOnClickMenu(e)}>
            <Menu.Item key='student' icon={<UserOutlined />}>
              <Link to='/student'>Student</Link>
            </Menu.Item>
            <Menu.Item key='project' icon={<BookOutlined />}>
              <Link to='/project'>Project</Link>
            </Menu.Item>
            <Menu.Item key='management' icon={<ContactsOutlined />}>
              <Link to='/management'>Management</Link>
            </Menu.Item>
          </Menu>
        </Layout.Sider>
        <Switch>
          <Route exact path='/'>
            <Student
              list={list}
              setList={setList}
            />
          </Route>
          <Route path='/student'>
            <Student
              list={list}
              setList={setList}
            />
          </Route>
          <Route path='/project'>
            <Project
              list={list}
              setList={setList}
            />
          </Route>
          <Route path='/management'>
            <Management
              list={list}
              setList={setList}
            />
          </Route>
        </Switch>
      </Layout>
    </Router>
  )
}
export default App