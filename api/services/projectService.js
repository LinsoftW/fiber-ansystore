// // projectService.js
// import { getAdapter } from '../config/dataSource';

// export const getProjects = async () => {
//   const adapter = getAdapter();
//   return await adapter.getProjects();
// }

// export const createProject = async (data) => {
//   const adapter = getAdapter();
//   return await adapter.createProject(data);
// }

// export const getProjectById = async (id) => {
//    const adapter = getAdapter();
//    return await adapter.getProjectById(data); 
// }

import { getAdapter } from '../config/dataSource';

export const getProjects = async () => {
  const adapter = getAdapter();
  return await adapter.getProjects();
}

export const createProject = async (data) => {
  const adapter = getAdapter();
  return await adapter.createProject(data);
}

export const getProjectById = async (id) => {
  const adapter = getAdapter();
  return await adapter.getProject(id); // ✅ Corregido: usar getProject en lugar de getProjectById
}

export const updateProject = async (id, data) => {
  const adapter = getAdapter();
  return await adapter.updateProject(id, data);
}

export const deleteProject = async (id) => {
  const adapter = getAdapter();
  return await adapter.hardDeleteProject(id);
}

export const getProject = async (id) => {
  const adapter = getAdapter();
  return await adapter.getProject(id);
}

// Alias para compatibilidad
export const getProjectByID = getProjectById;