export const filterStudentsByProject = (projectId, list) => {
  const managementIdsByProject = list.managementData.filter(management => management.project_id === projectId)
  return managementIdsByProject.map(management => ({
    managementId: management.id,
    student: list.studentData.filter(student => student.id === management.student_id)[0]
  }))
}

export const filterProjectsByStudent = (studentId, list) => {
  const managementIdsByStudent = list.managementData.filter(management => management.student_id === studentId)
  return managementIdsByStudent.map(management => ({
    managementId: management.id,
    project: list.projectData.filter(project => project.id === management.project_id)[0]
  }))
}