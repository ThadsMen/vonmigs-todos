export const initializeSectionsData = (tasks, sections) => {
  // Create an object with keys from sections and empty arrays
  const sectionsData = sections.reduce((acc, section) => {
    acc[section.section] = []
    return acc
  }, {})

  // Iterate tasks once and push task ids into the correct section
  tasks.forEach((task) => {
    if (sectionsData[task.status]) {
      sectionsData[task.status].push(task.id)
    }
  })

  return sectionsData
}
