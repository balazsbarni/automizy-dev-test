import axios from 'axios'

const getData = (setLoader, setList) => {
  startRetreiveData(setLoader, setList)
  getProjects(setLoader, setList)
}


const startRetreiveData = (setLoader, setList) => {
  setLoader(true)
  setList(prevList => ({
    ...prevList,
    error: false,
    complete: false
  }))
}

const getProjects = (setLoader, setList) => {
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

export default getData
