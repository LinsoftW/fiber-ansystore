// // projectService.js
// import { getAdapter } from '../config/dataSource';

// export const getFibers = async (projectId, parentId) => {
//   const adapter = getAdapter();
//   return await adapter.getFibers(projectId, parentId);
// }

// export const createFiber = async (data) => {
//   const adapter = getAdapter();
//   return await adapter.createFiber(data);
// }


import { getAdapter } from '../config/dataSource';

export const getFibersByProject = async (projectId, parentId = null) => {
  const adapter = getAdapter();
  return await adapter.getFibersByProjectId(projectId, parentId);
}

export const getFibers = async (projectId, parentId = null) => {
  const adapter = getAdapter();
  return await adapter.getFibers(projectId, parentId);
}

export const createFiber = async (data) => {
  const adapter = getAdapter();
  return await adapter.createFiber(data);
}

export const updateFiber = async (fiberId, updates) => {
  const adapter = getAdapter();
  return await adapter.updateFiber(fiberId, updates);
}

export const deleteFiber = async (fiberId) => {
  const adapter = getAdapter();
  return await adapter.deleteFiber(fiberId);
}

export const getFiberById = async (fiberId) => {
  const adapter = getAdapter();
  return await adapter.getFiberById(fiberId);
}