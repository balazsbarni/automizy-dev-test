export const filterStudentsByProject = (pId, list) => {
  const managementIdsByProject = list.managementData.filter(m => m.project_id === pId)
  return managementIdsByProject.map(m => ({
    mId: m.id,
    student: list.studentData.filter(s => s.id === m.student_id)[0]
  }))
}

export const filterProjectsByStudent = (sId, list) => {
  const managementIdsByStudent = list.managementData.filter(m => m.student_id === sId)
  return managementIdsByStudent.map(m => ({
    mId: m.id,
    project: list.projectData.filter(p => p.id === m.project_id)[0]
  }))
}