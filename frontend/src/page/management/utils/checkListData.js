const checkListData = (list) => {
  return list.studentData &&
    list.projectData &&
    list.managementData &&
    list.studentData.length &&
    list.projectData.length &&
    list.managementData.length
}

export default checkListData