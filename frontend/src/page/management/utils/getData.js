import axios from 'axios'

const getData = (setLoader, list, setList) => {
  startRetreiveData(setLoader, setList)
  getManagements(setLoader, setList)
  getProjectsIfNeeded(setLoader, list, setList)
  getStudentsIfNeeded(setLoader, list, setList)
}

const startRetreiveData = (setLoader, setList) => {
  setLoader(true)
  setList(prevList => ({
    ...prevList,
    error: false,
    complete: false
  }))
}

const getManagements = (setLoader, setList) => {
  axios.get('api/management')
    .then(res => {
      setLoader(false)
      setList(prevList => ({
        ...prevList,
        managementData: res.data.managements,
        error: false,
        complete: true
      }))
    })
    .catch(() => {
      setLoader(false)
      setList(prevList => ({
        ...prevList,
        managementData: null,
        error: true,
        complete: true
      }))
    })
}

const getProjectsIfNeeded = (setLoader, list, setList) => {
  list.projectData ?
    null :
    axios.get('api/project')
      .then(res => {
        setLoader(false)
        setList(prevList => ({
          ...prevList,
          projectData: res.data.projects,
          error: false,
          complete: true
        }))
      })
      .catch(() => {
        setLoader(false)
        setList(prevList => ({
          ...prevList,
          projectData: null,
          error: true,
          complete: true
        }))
      })
}

const getStudentsIfNeeded = (setLoader, list, setList) => {
  list.studentData ?
    null :
    axios.get('api/student')
      .then(res => {
        setLoader(false)
        setList(prevList => ({
          ...prevList,
          studentData: res.data.students,
          error: false,
          complete: true
        }))
      })
      .catch(() => {
        setLoader(false)
        setList(prevList => ({
          ...prevList,
          studentData: null,
          error: true,
          complete: true
        }))
      })
}

export default getData
