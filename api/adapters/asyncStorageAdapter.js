// // adapters/asyncStorageAdapter.js
// import { 
//   ProjectService, 
//   NetworkMapService, 
//   DeviceConfigService, 
//   FiberConfigService, 
//   UnitsService, 
//   ProjectTypeService, 
//   NodeService, 
//   FileService,
//   initializeStorage 
// } from '@/service/storage';

// // import { initializeStorage } from "@/service/storage";

// // Inicialización
// export const initializeStorageAdapter = async () => {
//   try {
//     await initializeStorage();
//     console.log('✅ AsyncStorage adapter initialized successfully');
//     return true;
//   } catch (error) {
//     console.error('❌ Error initializing AsyncStorage adapter:', error);
//     throw error;
//   }
// };

// // Adapter principal
// export const asyncStorageAdapter = {
//   // Proyectos
//   getProjects: async () => {
//     try {
//       return await ProjectService.getProjects();
//     } catch (error) {
//       console.error('Error getting projects:', error);
//       throw error;
//     }
//   },

//   getProject: async (projectId) => {
//     try {
//       return await ProjectService.getProjectById(projectId);
//     } catch (error) {
//       console.error('Error getting project:', error);
//       throw error;
//     }
//   },

//   saveProject: async (projectData) => {
//     try {
//       const existingProject = await ProjectService.getProjectById(projectData.id);
//       if (existingProject) {
//         return await ProjectService.updateProject(projectData.id, projectData);
//       } else {
//         return await ProjectService.createProject(projectData);
//       }
//     } catch (error) {
//       console.error('Error saving project:', error);
//       throw error;
//     }
//   },

//   hardDeleteProject: async (projectId) => {
//     try {
//       return await ProjectService.deleteProject(projectId);
//     } catch (error) {
//       console.error('Error deleting project:', error);
//       throw error;
//     }
//   },

//   deleteAllProjects: async () => {
//     try {
//       const projects = await ProjectService.getProjects();
//       for (const project of projects) {
//         await ProjectService.deleteProject(project.id);
//       }
//       return { success: true, deletedCount: projects.length };
//     } catch (error) {
//       console.error('Error deleting all projects:', error);
//       throw error;
//     }
//   },

//   // Mapas de red
//   saveNetworkMap: async (projectId, mapData) => {
//     try {
//       return await NetworkMapService.saveNetworkMap(projectId, mapData);
//     } catch (error) {
//       console.error('Error saving network map:', error);
//       throw error;
//     }
//   },

//   getNetworkMap: async (projectId) => {
//     try {
//       return await NetworkMapService.getNetworkMapByProject(projectId);
//     } catch (error) {
//       console.error('Error getting network map:', error);
//       throw error;
//     }
//   },

//   // Configuraciones de dispositivos
//   saveDeviceConfig: async (projectId, devices) => {
//     try {
//       return await DeviceConfigService.saveDeviceConfig(projectId, devices);
//     } catch (error) {
//       console.error('Error saving device config:', error);
//       throw error;
//     }
//   },

//   getDeviceConfig: async (projectId) => {
//     try {
//       return await DeviceConfigService.getDeviceConfig(projectId);
//     } catch (error) {
//       console.error('Error getting device config:', error);
//       throw error;
//     }
//   },

//   // Configuraciones de fibra
//   saveFiberConfig: async (projectId, fibers) => {
//     try {
//       return await FiberConfigService.saveFiberConfig(projectId, fibers);
//     } catch (error) {
//       console.error('Error saving fiber config:', error);
//       throw error;
//     }
//   },

//   getFiberConfig: async (projectId) => {
//     try {
//       return await FiberConfigService.getFiberConfig(projectId);
//     } catch (error) {
//       console.error('Error getting fiber config:', error);
//       throw error;
//     }
//   },

//   // Información de unidades
//   saveUnitsInfo: async (projectId, unitsInfo) => {
//     try {
//       return await UnitsService.saveUnitsInfo(projectId, unitsInfo);
//     } catch (error) {
//       console.error('Error saving units info:', error);
//       throw error;
//     }
//   },

//   getUnitsInfo: async (projectId) => {
//     try {
//       return await UnitsService.getUnitsInfo(projectId);
//     } catch (error) {
//       console.error('Error getting units info:', error);
//       throw error;
//     }
//   },

//   // Tipos de proyecto
//   saveProjectType: async (projectId, projectType) => {
//     try {
//       return await ProjectTypeService.saveProjectType(projectId, projectType);
//     } catch (error) {
//       console.error('Error saving project type:', error);
//       throw error;
//     }
//   },

//   getProjectType: async (projectId) => {
//     try {
//       return await ProjectTypeService.getProjectType(projectId);
//     } catch (error) {
//       console.error('Error getting project type:', error);
//       throw error;
//     }
//   },

//   // Nodos
//   getNodesByProject: async (projectId) => {
//     try {
//       return await NodeService.getNodesByProject(projectId);
//     } catch (error) {
//       console.error('Error getting nodes by project:', error);
//       throw error;
//     }
//   },

//   createNode: async (nodeData) => {
//     try {
//       return await NodeService.createNode(nodeData);
//     } catch (error) {
//       console.error('Error creating node:', error);
//       throw error;
//     }
//   },

//   updateNode: async (nodeId, updates) => {
//     try {
//       return await NodeService.updateNode(nodeId, updates);
//     } catch (error) {
//       console.error('Error updating node:', error);
//       throw error;
//     }
//   },

//   deleteNode: async (nodeId) => {
//     try {
//       return await NodeService.deleteNode(nodeId);
//     } catch (error) {
//       console.error('Error deleting node:', error);
//       throw error;
//     }
//   },

//   // Archivos
//   saveProjectFile: async (projectId, file) => {
//     try {
//       return await FileService.saveProjectFile(projectId, file);
//     } catch (error) {
//       console.error('Error saving project file:', error);
//       throw error;
//     }
//   },

//   getProjectFiles: async (projectId) => {
//     try {
//       return await FileService.getProjectFiles(projectId);
//     } catch (error) {
//       console.error('Error getting project files:', error);
//       throw error;
//     }
//   }
// };

// // Alias para compatibilidad
// export const initDatabase = initializeStorageAdapter;

// adapters/asyncStorageAdapter.js
import { 
  ProjectService, 
  NetworkMapService, 
  DeviceConfigService, 
  FiberConfigService, 
  UnitsService, 
  ProjectTypeService, 
  NodeService, 
  FileService,
  FiberService,  // Asegúrate de importar FiberService
  MediaService,  // Y MediaService si no está importado
  initializeStorage 
} from '@/service/storage';

// import { initializeStorage } from "@/service/storage";

// Inicialización
export const initializeStorageAdapter = async () => {
  try {
    await initializeStorage();
    console.log('✅ AsyncStorage adapter initialized successfully');
    return true;
  } catch (error) {
    console.error('❌ Error initializing AsyncStorage adapter:', error);
    throw error;
  }
};

// Adapter principal
export const asyncStorageAdapter = {
  // Proyectos
  getProjects: async () => {
    try {
      return await ProjectService.getProjects();
    } catch (error) {
      console.error('Error getting projects:', error);
      throw error;
    }
  },

  getProject: async (projectId) => {
    try {
      return await ProjectService.getProjectById(projectId);
    } catch (error) {
      console.error('Error getting project:', error);
      throw error;
    }
  },

  saveProject: async (projectData) => {
    try {
      const existingProject = await ProjectService.getProjectById(projectData.id);
      if (existingProject) {
        return await ProjectService.updateProject(projectData.id, projectData);
      } else {
        return await ProjectService.createProject(projectData);
      }
    } catch (error) {
      console.error('Error saving project:', error);
      throw error;
    }
  },

  updateProject: async (projectId, projectData) => {  // ✅ Agregar esta función
    try {
      return await ProjectService.updateProject(projectId, projectData);
    } catch (error) {
      console.error('Error updating project:', error);
      throw error;
    }
  },

  hardDeleteProject: async (projectId) => {
    try {
      return await ProjectService.deleteProject(projectId);
    } catch (error) {
      console.error('Error deleting project:', error);
      throw error;
    }
  },

  deleteAllProjects: async () => {
    try {
      const projects = await ProjectService.getProjects();
      for (const project of projects) {
        await ProjectService.deleteProject(project.id);
      }
      return { success: true, deletedCount: projects.length };
    } catch (error) {
      console.error('Error deleting all projects:', error);
      throw error;
    }
  },

  // Mapas de red
  saveNetworkMap: async (projectId, mapData) => {
    try {
      return await NetworkMapService.saveNetworkMap(projectId, mapData);
    } catch (error) {
      console.error('Error saving network map:', error);
      throw error;
    }
  },

  getNetworkMap: async (projectId) => {
    try {
      return await NetworkMapService.getNetworkMapByProject(projectId);
    } catch (error) {
      console.error('Error getting network map:', error);
      throw error;
    }
  },

  // Configuraciones de dispositivos
  saveDeviceConfig: async (projectId, devices) => {
    try {
      return await DeviceConfigService.saveDeviceConfig(projectId, devices);
    } catch (error) {
      console.error('Error saving device config:', error);
      throw error;
    }
  },

  getDeviceConfig: async (projectId) => {
    try {
      return await DeviceConfigService.getDeviceConfig(projectId);
    } catch (error) {
      console.error('Error getting device config:', error);
      throw error;
    }
  },

  // Configuraciones de fibra
  saveFiberConfig: async (projectId, fibers) => {
    try {
      return await FiberConfigService.saveFiberConfig(projectId, fibers);
    } catch (error) {
      console.error('Error saving fiber config:', error);
      throw error;
    }
  },

  getFiberConfig: async (projectId) => {
    try {
      return await FiberConfigService.getFiberConfig(projectId);
    } catch (error) {
      console.error('Error getting fiber config:', error);
      throw error;
    }
  },

  // Información de unidades
  saveUnitsInfo: async (projectId, unitsInfo) => {
    try {
      return await UnitsService.saveUnitsInfo(projectId, unitsInfo);
    } catch (error) {
      console.error('Error saving units info:', error);
      throw error;
    }
  },

  getUnitsInfo: async (projectId) => {
    try {
      return await UnitsService.getUnitsInfo(projectId);
    } catch (error) {
      console.error('Error getting units info:', error);
      throw error;
    }
  },

  // Tipos de proyecto
  saveProjectType: async (projectId, projectType) => {
    try {
      return await ProjectTypeService.saveProjectType(projectId, projectType);
    } catch (error) {
      console.error('Error saving project type:', error);
      throw error;
    }
  },

  getProjectType: async (projectId) => {
    try {
      return await ProjectTypeService.getProjectType(projectId);
    } catch (error) {
      console.error('Error getting project type:', error);
      throw error;
    }
  },

  // Nodos
  getNodesByProject: async (projectId) => {
    try {
      return await NodeService.getNodesByProject(projectId);
    } catch (error) {
      console.error('Error getting nodes by project:', error);
      throw error;
    }
  },

  createNode: async (nodeData) => {
    try {
      return await NodeService.createNode(nodeData);
    } catch (error) {
      console.error('Error creating node:', error);
      throw error;
    }
  },

  updateNode: async (nodeId, updates) => {
    try {
      return await NodeService.updateNode(nodeId, updates);
    } catch (error) {
      console.error('Error updating node:', error);
      throw error;
    }
  },

  deleteNode: async (nodeId) => {
    try {
      return await NodeService.deleteNode(nodeId);
    } catch (error) {
      console.error('Error deleting node:', error);
      throw error;
    }
  },

  // FIBERS - ✅ NUEVAS FUNCIONES AGREGADAS
  getFibersByProjectId: async (projectId, parentId = null) => {
    try {
      return await FiberService.getFibersByProject(projectId, parentId);
    } catch (error) {
      console.error('Error getting fibers by project:', error);
      throw error;
    }
  },

  createFiber: async (fiberData) => {
    try {
      return await FiberService.createFiber(fiberData);
    } catch (error) {
      console.error('Error creating fiber:', error);
      throw error;
    }
  },

  updateFiber: async (fiberId, updates) => {
    try {
      return await FiberService.updateFiber(fiberId, updates);
    } catch (error) {
      console.error('Error updating fiber:', error);
      throw error;
    }
  },

  deleteFiber: async (fiberId) => {
    try {
      return await FiberService.deleteFiber(fiberId);
    } catch (error) {
      console.error('Error deleting fiber:', error);
      throw error;
    }
  },

  getFiberById: async (fiberId) => {
    try {
      return await FiberService.getFiberById(fiberId);
    } catch (error) {
      console.error('Error getting fiber by ID:', error);
      throw error;
    }
  },

  // MEDIA - ✅ NUEVAS FUNCIONES AGREGADAS
  getMediasByNodeId: async (nodeId) => {
    try {
      return await MediaService.getMediasByNodeId(nodeId);
    } catch (error) {
      console.error('Error getting media by node ID:', error);
      throw error;
    }
  },

  createMedia: async (mediaData) => {
    try {
      return await MediaService.createMedia(mediaData);
    } catch (error) {
      console.error('Error creating media:', error);
      throw error;
    }
  },

  updateMedia: async (mediaId, updates) => {
    try {
      return await MediaService.updateMedia(mediaId, updates);
    } catch (error) {
      console.error('Error updating media:', error);
      throw error;
    }
  },

  deleteMedia: async (mediaId) => {
    try {
      return await MediaService.deleteMedia(mediaId);
    } catch (error) {
      console.error('Error deleting media:', error);
      throw error;
    }
  },

  // Archivos
  saveProjectFile: async (projectId, file) => {
    try {
      return await FileService.saveProjectFile(projectId, file);
    } catch (error) {
      console.error('Error saving project file:', error);
      throw error;
    }
  },

  getProjectFiles: async (projectId) => {
    try {
      return await FileService.getProjectFiles(projectId);
    } catch (error) {
      console.error('Error getting project files:', error);
      throw error;
    }
  }
};

// Alias para compatibilidad
export const initDatabase = initializeStorageAdapter;