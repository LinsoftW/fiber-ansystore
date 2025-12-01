// // projectService.js
// import { getAdapter } from '../config/dataSource';

// export const getNodes = async (projectId) => {
//   const adapter = getAdapter();
//   return await adapter.getNodes(projectId);
// }

// export const createNode = async (data) => {
//   const adapter = getAdapter();
//   return await adapter.createNode(data);
// }


import { getAdapter } from '../config/dataSource';

export const getNodesByProject = async (projectId) => {
  const adapter = getAdapter();
  return await adapter.getNodesByProject(projectId);
}

export const getNodes = async (projectId) => {
  const adapter = getAdapter();
  return await adapter.getNodesByProject(projectId);
}

export const createNode = async (data) => {
  const adapter = getAdapter();
  return await adapter.createNode(data);
}

export const updateNode = async (nodeId, updates) => {
  const adapter = getAdapter();
  return await adapter.updateNode(nodeId, updates);
}

export const deleteNode = async (nodeId) => {
  const adapter = getAdapter();
  return await adapter.deleteNode(nodeId);
}

export const getNodeById = async (nodeId) => {
  const adapter = getAdapter();
  return await adapter.getNodeById(nodeId);
}

// Alias para compatibilidad con código existente
export const getNodesByProjectId = getNodesByProject;