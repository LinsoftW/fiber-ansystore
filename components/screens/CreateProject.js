// NUEVA ACTUALIZACION
// NUEVA IMPLEMENTACIÓN MEJORADA
import React, { useState, useEffect, useRef } from "react";
import 'react-native-get-random-values';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
  Share,
  Platform,
  PermissionsAndroid,
  FlatList,
  ActivityIndicator,
  Button,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import QRCode from "react-native-qrcode-svg";
import { captureRef } from "react-native-view-shot";
import * as DocumentPicker from "expo-document-picker";
import { useTranslation } from "../hooks/useTranslation";
import { useApp } from "../context/AppContext";
import { useDevice } from "../context/DeviceContext";
import { useAdapter } from "@/api/contexts/DatabaseContext";
import { v4 as uuidv4 } from "uuid";
import * as MediaLibrary from "expo-media-library";
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreateProject = ({ navigation, route }) => {
  // Obtener adapter
  const adapter = useAdapter()();
  const {
    getProjects,
    getProject,
    saveProject,
    updateProject,
    createNode,
    updateNode,
    deleteNode,
    getNodesByProject,
    createFiber,
    updateFiber,
    deleteFiber,
    getFibersByProjectId,
    getMediasByNodeId,
    createMedia,
    updateMedia,
    deleteMedia,
    saveUnitsInfo,
    getUnitsInfo,
    saveProjectType,
    getProjectType
  } = adapter;

  const { topInset, bottomInset, stylesFull } = useDevice();
  const { t } = useTranslation();
  // const { isDarkMode, nodesTypesList } = useApp();
  const { 
    isDarkMode, 
    nodesTypesList,
    // 🔥 NUEVO: Obtener las funciones del contexto
    updateFiberData,
    getFiberUpdate,
    clearFiberUpdate,
    updateNodeMediaData,
    getNodeMediaUpdate,
    clearNodeMediaUpdate
  } = useApp();

  // Referencias y estados
  const qrRef = useRef();
  const [projectId, setProjectId] = useState(route.params?.projectId);
  const [createdProjId, setCreatedProjId] = useState(null);
  const [isEditMode, setIsEditMode] = useState(!!projectId);

  // Estados para modales
  const [showAddFiberModal, setShowAddFiberModal] = useState(false);
  const [showAddNodeModal, setShowAddNodeModal] = useState(false);
  const [showFilterNodesModal, setShowFilterNodesModal] = useState(false);
  const [showCloseProjectModal, setShowCloseProjectModal] = useState(false);
  const [qrModalVisible, setQrModalVisible] = useState(false);
  const [projectSelectorVisible, setProjectSelectorVisible] = useState(false);

  // Estados para datos
  const [fibers, setFibers] = useState([]);
  const [deletedFiberIds, setDeletedFiberIds] = useState([]);
  const [nodes, setNodes] = useState([]);
  const [allNodes, setAllNodes] = useState([]);
  const [saving, setSaving] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [existingProjects, setExistingProjects] = useState([]);

  // Datos del proyecto
  const [projectData, setProjectData] = useState({
    name: "",
    address: "",
    city: "",
    country: "",
    state: "",
    description: "",
    status: "active",
  });

  const [unitsInfo, setUnitsInfo] = useState({
    living_unit: "0",
    office_amenities: "0",
    commercial_unit: "0",
  });

  const [projectType, setProjectType] = useState({
    build_type: "MDU",
    job_type: "Residential",
    building_type: "Garden Style",
  });

  // Configuraciones
  const fiberTypesList = [
    { typeId: "12F", name: "12F", description: "fiber12FDescription", buffersCount: 1 },
    { typeId: "24F", name: "24F", description: "fiber24FDescription", buffersCount: 2 },
    { typeId: "48F", name: "48F", description: "fiber48FDescription", buffersCount: 4 },
    { typeId: "96F", name: "96F", description: "fiber96FDescription", buffersCount: 8 },
    { typeId: "192F", name: "192F", description: "fiber192FDescription", buffersCount: 16 },
  ];

  const fiberColors12Hex = [
    { index: 0, color: "#0000FF" }, { index: 1, color: "#FFA500" },
    { index: 2, color: "#008000" }, { index: 3, color: "#A52A2A" },
    { index: 4, color: "#708090" }, { index: 5, color: "#FFFFFF" },
    { index: 6, color: "#FF0000" }, { index: 7, color: "#000000" },
    { index: 8, color: "#FFFF00" }, { index: 9, color: "#EE82EE" },
    { index: 10, color: "#FFC0CB" }, { index: 11, color: "#00FFFF" },
  ];

  const nodesFiltersList = [
    { id: 0, name: t("allNodeFilter") || "Todos", type: "ALL" },
    { id: 1, name: "MDF", type: "MDF" },
    { id: 2, name: "IDF", type: "IDF" },
    { id: 3, name: t("pedestal") || "Pedestal", type: "P" },
    { id: 4, name: t("unit") || "Unidad", type: "U" },
  ];

  const [selectedNodesFilter, setSelectedNodesFilter] = useState(nodesFiltersList[0]);

  // Colores dinámicos
  const colors = {
    background: isDarkMode ? "#121212" : "#f5f7fa",
    cardBackground: isDarkMode ? "#1e1e1e" : "white",
    text: isDarkMode ? "#ffffff" : "#2c3e50",
    secondaryText: isDarkMode ? "#b0b0b0" : "#7f8c8d",
    border: isDarkMode ? "#333333" : "#e1e8ed",
    inputBackground: isDarkMode ? "#2a2a2a" : "#f8f9fa",
    placeholder: isDarkMode ? "#888888" : "#a0a0a0",
    primary: "#3498db",
    success: "#2ecc71",
    warning: "#f39c12",
    danger: "#e74c3c",
  };

  // ESTILOS MEJORADOS - UNIFICADOS
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 20,
      paddingVertical: 15,
      backgroundColor: colors.cardBackground,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 3,
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: "700",
      color: colors.text,
    },
    backButton: {
      padding: 5,
    },
    headerActions: {
      flexDirection: "row",
      alignItems: "center",
      gap: 15,
    },
    clearButton: {
      padding: 5,
    },
    scrollView: {
      flex: 1,
    },
    scrollContent: {
      padding: 20,
      paddingBottom: 40,
    },
    section: {
      marginBottom: 25,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "700",
      color: colors.text,
      marginBottom: 15,
      paddingLeft: 5,
    },
    formCard: {
      backgroundColor: colors.cardBackground,
      borderRadius: 14,
      padding: 20,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
      elevation: 3,
    },
    inputGroup: {
      marginBottom: 18,
    },
    label: {
      fontSize: 15,
      fontWeight: "600",
      color: colors.text,
      marginBottom: 8,
    },
    input: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 10,
      padding: 14,
      fontSize: 16,
      backgroundColor: colors.inputBackground,
      color: colors.text,
    },
    textArea: {
      height: 100,
      textAlignVertical: "top",
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
    },
    totalUnits: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 10,
      paddingTop: 10,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    totalLabel: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.text,
    },
    totalValue: {
      fontSize: 18,
      fontWeight: "700",
      color: colors.primary,
    },
    
    // ESTILOS UNIFICADOS PARA NODOS Y FIBRAS
    itemCard: {
      backgroundColor: colors.cardBackground,
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 2,
      borderLeftWidth: 4,
      borderLeftColor: colors.primary,
    },
    itemHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 8,
    },
    itemInfo: {
      flex: 1,
    },
    itemName: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.text,
      marginBottom: 4,
    },
    itemDescription: {
      fontSize: 14,
      color: colors.secondaryText,
    },
    itemType: {
      fontSize: 12,
      color: colors.primary,
      fontWeight: "500",
      marginTop: 2,
    },
    actionButtons: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    actionButton: {
      padding: 6,
    },
    removeButton: {
      padding: 4,
    },

    // Estilos para modales
    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
    },
    modalContent: {
      backgroundColor: colors.cardBackground,
      padding: 25,
      borderRadius: 16,
      width: '90%',
      maxHeight: '80%',
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: "700",
      color: colors.text,
      marginBottom: 20,
      textAlign: "center",
    },
    modalItem: {
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    modalItemText: {
      fontSize: 16,
      color: colors.text,
    },
    modalContainer: {
      width: "100%",
      maxWidth: 400,
      borderRadius: 16,
      overflow: "hidden",
    },
    selectorModal: {
      maxHeight: "80%",
    },
    projectList: {
      maxHeight: 300,
      marginBottom: 20,
    },
    projectItem: {
      flexDirection: "row",
      alignItems: "center",
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    projectInfo: {
      flex: 1,
      marginLeft: 12,
    },
    projectName: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.text,
    },
    projectAddress: {
      fontSize: 14,
      color: colors.secondaryText,
      marginTop: 2,
    },
    noProjectsText: {
      textAlign: "center",
      fontSize: 16,
      color: colors.secondaryText,
      padding: 20,
    },
    closeModalButton: {
      backgroundColor: colors.primary,
      borderRadius: 10,
      padding: 15,
      alignItems: "center",
    },
    cancelButton: {
      backgroundColor: colors.danger,
      marginTop: 10,
    },
    closeModalText: {
      color: "white",
      fontWeight: "600",
      fontSize: 16,
    },
    selectProjectButton: {
      padding: 5,
    },
  });

  // Efectos
  useEffect(() => {
    const initializeEmptyProject = async () => {
      const hash = uuidv4();
      const mdfNode = {
        hash: hash,
        label: `MDF`,
        createdDate: new Date().toISOString(),
        modifiedDate: new Date().toISOString(),
        deleted: 0,
        typeId: 1,
        devices: [],
        fusionLinks: [],
      };

      console.log("🆕 Initializing empty project with default MDF");
      setAllNodes([mdfNode]);
      setNodes([mdfNode]);
    };

    if (!projectId) {
      console.log("🚀 No project ID, initializing empty project");
      initializeEmptyProject();
    } else {
      console.log("📁 Loading existing project:", projectId);
      loadProjectData(projectId);
    }

    loadExistingProjects();
  }, [projectId]);

  // 🔥 NUEVO: useEffect para verificar actualizaciones de fibras
  useEffect(() => {
    const checkForFiberUpdates = () => {
      fibers.forEach(fiber => {
        const tempId = fiber.id || fiber.hash;
        const fiberUpdate = getFiberUpdate(tempId);
        
        if (fiberUpdate && fiberUpdate.data) {
          console.log("🔄 Actualizando fibra desde contexto:", fiber.label);
          
          // Actualizar el estado local
          const updatedFibers = fibers.map(f => 
            (f.id === fiber.id || f.hash === fiber.hash) ? fiberUpdate.data : f
          );
          setFibers(updatedFibers);
          
          // Limpiar la actualización
          clearFiberUpdate(tempId);
        }
      });
    };

    checkForFiberUpdates();
  }, [fibers, getFiberUpdate, clearFiberUpdate]);

  // 🔥 NUEVO: useEffect para verificar actualizaciones de medios
  useEffect(() => {
    const checkForNodeMediaUpdates = () => {
      allNodes.forEach(node => {
        const nodeId = node.id;
        if (nodeId) {
          const mediaUpdate = getNodeMediaUpdate(nodeId);
          
          if (mediaUpdate && mediaUpdate.media) {
            console.log("🔄 Actualizando medios del nodo desde contexto:", node.label);
            
            // Actualizar el nodo con los nuevos medios
            const updatedNode = {
              ...node,
              media: mediaUpdate.media
            };
            
            updateLocalNode(updatedNode);
            
            // Limpiar la actualización
            clearNodeMediaUpdate(nodeId);
          }
        }
      });
    };

    checkForNodeMediaUpdates();
  }, [allNodes, getNodeMediaUpdate, clearNodeMediaUpdate]);

  // Funciones principales
  const loadExistingProjects = async () => {
    try {
      const projects = await getProjects();
      setExistingProjects(projects);
    } catch (error) {
      console.log("Error loading projects:", error);
    }
  };

  const loadProjectData = async (id) => {
    const timestamp = new Date().toISOString();
    try {
      console.log("\n" + "=".repeat(80));
      console.log("📥 === INICIANDO CARGA DE DATOS DEL PROYECTO ===", timestamp);
      console.log(`    Project ID: ${id}`);
      console.log("=".repeat(80));

      setDeletedFiberIds([]);

      // Cargar datos del proyecto
      const project = await getProject(id);
      if (project) {
        setProjectData({
          name: project.name || "",
          address: project.address || "",
          city: project.city || "",
          country: project.country || "",
          state: project.state || "",
          description: project.description || "",
          status: project.status || "active",
        });
      }

      // Cargar nodos
      console.log("\n1️⃣ CARGANDO NODOS:");
      console.log(`   📥 Leyendo nodos de AsyncStorage para proyecto: ${id}`);
      
      // Intentar cargar de AsyncStorage primero
      let nodesFromAsync = await loadNodesFromAsyncStorage(id);
      
      if (nodesFromAsync && nodesFromAsync.length > 0) {
        console.log(`   ✅ ${nodesFromAsync.length} nodos cargados de AsyncStorage`);
        setAllNodes(nodesFromAsync);
        setNodes(nodesFromAsync);
      } else {
        // Fallback a Base de Datos
        console.log(`   📥 Fallback: Leyendo nodos de base de datos para proyecto: ${id}`);
        const dbNodes = await getNodesByProject(id);
        console.log(`   📦 Nodos cargados: ${dbNodes?.length || 0}`);

        if (!dbNodes || dbNodes.length === 0) {
        console.log("   ⚠️ No nodes found, creating default MDF");
        const hash = uuidv4();
        const defaultMDF = {
          hash: hash,
          label: `MDF`,
          createdDate: new Date().toISOString(),
          modifiedDate: new Date().toISOString(),
          deleted: 0,
          typeId: 1,
          devices: [],
          fusionLinks: [],
        };
        
        try {
          const savedNode = await createNode({
            ...defaultMDF,
            projectId: id,
          });
          console.log("   ✅ Created default MDF node:", savedNode.id);
          
          setAllNodes([{...defaultMDF, id: savedNode.id}]);
          setNodes([{...defaultMDF, id: savedNode.id}]);
        } catch (error) {
          console.error("   ❌ Error creating default MDF node:", error);
          setAllNodes([defaultMDF]);
          setNodes([defaultMDF]);
        }
      } else {
        const mappedNodes = dbNodes.map((node) => {
          let parsedMetadata = null;
          const metadataStr = node.metadata;

          if (metadataStr && typeof metadataStr === "string") {
            try {
              parsedMetadata = JSON.parse(metadataStr);
            } catch (e) {
              console.error(`   ❌ Error parsing metadata for node ${node.label}:`, e);
            }
          } else if (metadataStr && typeof metadataStr === "object") {
            parsedMetadata = metadataStr;
          }

          return {
            id: node.id,
            hash: node.hash || uuidv4(),
            label: node.label,
            projectId: node.projectId,
            typeId: node.typeId,
            description: node.description || "",
            createdDate: node.createdDate,
            modifiedDate: node.modifiedDate,
            deleted: node.deleted || 0,
            devices: parsedMetadata?.devices || [],
            fusionLinks: parsedMetadata?.fusionLinks || [],
          };
        });

          setAllNodes(mappedNodes);
          setNodes(mappedNodes);
          console.log(`   ✅ ${mappedNodes.length} nodos cargados correctamente desde DB`);
        }
      }

      // 🔥 CARGAR FIBRAS DESDE ASYNCSTORAGE PRIMERO
      console.log("\n2️⃣ CARGANDO FIBRAS:");
      const asyncStorageKey = `@fibraoptica/fibers_project_${id}`;
      console.log(`   📥 Intentando leer de AsyncStorage: "${asyncStorageKey}"`);
      
      let asyncStorageFibers = [];
      try {
        const asyncData = await AsyncStorage.getItem(asyncStorageKey);
        console.log(`   - Resultado de getItem (null): ${asyncData == null}`);
        
        if (asyncData) {
          console.log(`   - Tamaño de datos: ${asyncData.length} bytes`);
          try {
            asyncStorageFibers = JSON.parse(asyncData);
            console.log(`   ✅ JSON parseado correctamente`);
            console.log(`   - Total items en AsyncStorage: ${asyncStorageFibers.length}`);
            
            if (asyncStorageFibers.length > 0) {
              console.log(`   - Primeros 3 items:`);
              asyncStorageFibers.slice(0, 3).forEach((item, idx) => {
                const type = item.parentFiberId ? 'Buffer' : 'Fibra';
                console.log(`      ${idx + 1}. ${item.label} [${type}]`);
              });
              if (asyncStorageFibers.length > 3) {
                console.log(`      ... y ${asyncStorageFibers.length - 3} items más`);
              }
            }
          } catch (parseError) {
            console.error(`   ❌ Error parsing JSON:`, parseError);
          }
        } else {
          console.log(`   ⚠️ No data in AsyncStorage para esta clave`);
        }
      } catch (asyncError) {
        console.error(`   ❌ Error leyendo de AsyncStorage:`, asyncError);
      }

      // CARGAR FIBRAS DE BASE DE DATOS
      console.log(`\n   📥 Intentando leer de Base de Datos...`);
      let records = await getFibersByProjectId(id, null);
      console.log(`   📦 Fibras principales desde DB: ${records?.length || 0}`);
      
      let dbFibers = [];
      if (records && records.length > 0) {
        for (let f of records) {
          let metadata = {};
          if (f.metadata) {
            try {
              metadata = JSON.parse(f.metadata);
            } catch (e) {
              console.error("   ❌ Error parsing fiber metadata:", e);
            }
          }

          const buffers = await getFibersByProjectId(id, f.id);
          dbFibers.push({
            ...f,
            threads: metadata.threads || [],
            isSystemFiber: metadata.isSystemFiber || false,
            buffers: buffers || [],
          });
        }
        console.log(`   ✅ ${dbFibers.length} fibras cargadas de DB`);
      } else {
        console.log(`   ⚠️ No fibers found in database`);
      }

      // 🔥 DECIDIR QUÉ USAR: AsyncStorage o DB
      console.log(`\n   🔄 DECISIÓN DE CARGA:`);
      console.log(`      - AsyncStorage items: ${asyncStorageFibers.length}`);
      console.log(`      - Database fibers: ${dbFibers.length}`);
      
      let fibersToUse = [];
      if (asyncStorageFibers.length > 0) {
        console.log(`   ✅ Usando datos de AsyncStorage (prioritario)`);
        fibersToUse = asyncStorageFibers;
      } else if (dbFibers.length > 0) {
        console.log(`   ✅ Usando datos de Base de Datos (fallback)`);
        fibersToUse = dbFibers;
      } else {
        console.log(`   ⚠️ No fibers found en ningún lado`);
        fibersToUse = [];
      }

      setFibers(fibersToUse);
      console.log(`   ✅ Total de fibras seteadas en state: ${fibersToUse.length}`);

      // Cargar información adicional
      console.log(`\n3️⃣ CARGANDO INFORMACIÓN ADICIONAL:`);
      try {
        const units = await getUnitsInfo(id);
        if (units) {
          console.log(`   ✅ Units info cargada`);
          setUnitsInfo({
            living_unit: units.living_unit?.toString() || "0",
            office_amenities: units.office_amenities?.toString() || "0",
            commercial_unit: units.commercial_unit?.toString() || "0",
          });
        }
      } catch (error) {
        console.log("   ⚠️ No units info found");
      }

      try {
        const projectTypeData = await getProjectType(id);
        if (projectTypeData) {
          console.log(`   ✅ Project type cargado`);
          setProjectType({
            build_type: projectTypeData.build_type || 'MDU',
            job_type: projectTypeData.job_type || 'Residential',
            building_type: projectTypeData.building_type || 'Garden Style'
          });
        }
      } catch (error) {
        console.log("   ⚠️ No project type found");
      }

      console.log("\n✅ === CARGA DE PROYECTO COMPLETADA ===");
      console.log("=".repeat(80) + "\n");

    } catch (error) {
      console.error("\n❌ === ERROR EN CARGA DE PROYECTO ===");
      console.error("Error:", error);
      console.error("=".repeat(80) + "\n");
      Alert.alert(t("error") || "Error", t("failedToLoadProject") || "Failed to load project");
    } finally {
      setSaving(false);
    }
  };

//   const saveFibersToDatabase = async (projectId) => {
//   try {
//     console.log("💾 Saving fibers to database for project:", projectId);
    
//     // Procesar fibras principales
//     for (const fiber of fibers) {
//       if (fiber.deleted) {
//         // Eliminar fibra si tiene ID
//         if (fiber.id) {
//           await deleteFiber(fiber.id);
//           console.log("🗑️ Deleted fiber:", fiber.label);
//         }
//         continue;
//       }

//       if (!fiber.id) {
//         // Crear nueva fibra
//         const fiberToSave = {
//           ...fiber,
//           projectId: projectId,
//           nodeId: fiber.nodeId || null,
//           metadata: JSON.stringify({
//             threads: fiber.threads || [],
//             isSystemFiber: fiber.isSystemFiber || false
//           })
//         };

//         const createdFiber = await createFiber(fiberToSave);
//         console.log("✅ Created fiber:", fiber.label, "ID:", createdFiber.id);
        
//         // Actualizar el ID en el estado local
//         fiber.id = createdFiber.id;

//         // Guardar buffers si existen
//         if (fiber.buffers && fiber.buffers.length > 0) {
//           for (const buffer of fiber.buffers) {
//             if (!buffer.id) {
//               const bufferToSave = {
//                 ...buffer,
//                 projectId: projectId,
//                 parentFiberId: createdFiber.id,
//                 metadata: JSON.stringify({
//                   threads: buffer.threads || [],
//                   isBuffer: true
//                 })
//               };
              
//               const createdBuffer = await createFiber(bufferToSave);
//               console.log("✅ Created buffer:", buffer.label, "ID:", createdBuffer.id);
//               buffer.id = createdBuffer.id;
//             }
//           }
//         }
//       } else {
//         // Actualizar fibra existente
//         await updateFiber(fiber.id, {
//           label: fiber.label,
//           typeId: fiber.typeId,
//           nodeId: fiber.nodeId || null,
//           metadata: JSON.stringify({
//             threads: fiber.threads || [],
//             isSystemFiber: fiber.isSystemFiber || false
//           }),
//           modifiedDate: new Date().toISOString()
//         });
//         console.log("📝 Updated fiber:", fiber.label);
//       }
//     }

//     // Procesar fibras eliminadas
//     for (const fiberId of deletedFiberIds) {
//       await deleteFiber(fiberId);
//       console.log("🗑️ Deleted fiber by ID:", fiberId);
//     }

//     setDeletedFiberIds([]);
//     console.log("✅ All fibers saved successfully");
    
//   } catch (error) {
//     console.error("❌ Error saving fibers:", error);
//     throw error;
//   }
// };

// FUNCIÓN PARA GUARDAR FIBRAS EN LA BASE DE DATOS


// const saveFibersToDatabase = async (projectId) => {
//   try {
//     console.log("💾 Saving fibers to database for project:", projectId);
//     console.log("📊 Total fibers to save:", fibers.length);
    
    
//     const fiberIdsToKeep = [];

//     // Procesar fibras principales
//     for (const fiber of fibers) {
//       if (fiber.deleted) {
//         // Eliminar fibra si tiene ID
//         if (fiber.id) {
//           await deleteFiber(fiber.id);
//           console.log("🗑️ Deleted fiber:", fiber.label);
//         }
//         continue;
//       }

//       if (!fiber.id) {
//         // Crear nueva fibra
//         const fiberToSave = {
//           label: fiber.label,
//           typeId: fiber.typeId,
//           projectId: projectId,
//           nodeId: fiber.nodeId || null,
//           parentFiberId: null, // Fibras principales no tienen parent
//           metadata: JSON.stringify({
//             threads: fiber.threads || [],
//             isSystemFiber: fiber.isSystemFiber || false,
//             buffersCount: fiber.buffers?.length || 0
//           }),
//           createdDate: fiber.createdDate || new Date().toISOString(),
//           modifiedDate: new Date().toISOString(),
//           deleted: 0
//         };

//         console.log("➕ Creating fiber:", fiberToSave.label);
//         const createdFiber = await createFiber(fiberToSave);
//         console.log("✅ Created fiber:", createdFiber.label, "ID:", createdFiber.id);
        
//         // Actualizar el ID en el estado local
//         fiber.id = createdFiber.id;
//         fiberIdsToKeep.push(createdFiber.id);

//         // Guardar buffers si existen
//         if (fiber.buffers && fiber.buffers.length > 0) {
//           console.log("📦 Saving", fiber.buffers.length, "buffers for fiber:", fiber.label);
//           for (const buffer of fiber.buffers) {
//             if (!buffer.id) {
//               const bufferToSave = {
//                 label: buffer.label,
//                 typeId: buffer.typeId,
//                 projectId: projectId,
//                 nodeId: buffer.nodeId || null,
//                 parentFiberId: createdFiber.id, // Los buffers tienen parent
//                 metadata: JSON.stringify({
//                   threads: buffer.threads || [],
//                   isBuffer: true,
//                   parentFiberLabel: fiber.label
//                 }),
//                 createdDate: buffer.createdDate || new Date().toISOString(),
//                 modifiedDate: new Date().toISOString(),
//                 deleted: 0
//               };
              
//               console.log("➕ Creating buffer:", bufferToSave.label);
//               const createdBuffer = await createFiber(bufferToSave);
//               console.log("✅ Created buffer:", createdBuffer.label, "ID:", createdBuffer.id);
//               buffer.id = createdBuffer.id;
//               fiberIdsToKeep.push(createdBuffer.id);
//             }
//           }
//         }
//       } else {
//         // Actualizar fibra existente
//         const fiberToUpdate = {
//           label: fiber.label,
//           typeId: fiber.typeId,
//           nodeId: fiber.nodeId || null,
//           metadata: JSON.stringify({
//             threads: fiber.threads || [],
//             isSystemFiber: fiber.isSystemFiber || false,
//             buffersCount: fiber.buffers?.length || 0
//           }),
//           modifiedDate: new Date().toISOString()
//         };

//         await updateFiber(fiber.id, fiberToUpdate);
//         console.log("📝 Updated fiber:", fiber.label);
//         fiberIdsToKeep.push(fiber.id);

//         // Actualizar buffers existentes
//         if (fiber.buffers && fiber.buffers.length > 0) {
//           for (const buffer of fiber.buffers) {
//             if (buffer.id) {
//               const bufferToUpdate = {
//                 label: buffer.label,
//                 typeId: buffer.typeId,
//                 nodeId: buffer.nodeId || null,
//                 metadata: JSON.stringify({
//                   threads: buffer.threads || [],
//                   isBuffer: true,
//                   parentFiberLabel: fiber.label
//                 }),
//                 modifiedDate: new Date().toISOString()
//               };
//               await updateFiber(buffer.id, bufferToUpdate);
//               fiberIdsToKeep.push(buffer.id);
//             }
//           }
//         }
//       }
//     }

//     // Procesar fibras eliminadas
//     for (const fiberId of deletedFiberIds) {
//       if (fiberId) {
//         await deleteFiber(fiberId);
//         console.log("🗑️ Deleted fiber by ID:", fiberId);
//       }
//     }

//     setDeletedFiberIds([]);
//     console.log("✅ All fibers saved successfully. Total:", fiberIdsToKeep.length);
    
//   } catch (error) {
//     console.error("❌ Error saving fibers:", error);
//     throw error;
//   }
// };
  
// 🔥 REFACTORIZADO: saveFibersToDatabase con LOGS EXHAUSTIVOS para debugging
const saveFibersToDatabase = async (currentProjectId) => {
  const timestamp = new Date().toISOString();
  try {
    console.log("\n" + "=".repeat(80));
    console.log("💾 === INICIANDO GUARDADO DE FIBRAS ===", timestamp);
    console.log("=".repeat(80));
    
    // VERIFICACIÓN 1: ProjectID
    console.log("\n1️⃣ VERIFICACIÓN DE PROJECT ID:");
    console.log(`   - Tipo: ${typeof currentProjectId}`);
    console.log(`   - Valor: "${currentProjectId}"`);
    console.log(`   - Nulo/Indefinido: ${currentProjectId == null}`);
    console.log(`   - Vacío: ${currentProjectId === ''}`);
    
    if (!currentProjectId) {
      console.error("❌ ERROR CRÍTICO: ProjectID es null/undefined");
      console.error(`   Stack trace:`);
      console.trace();
      Alert.alert("Error", "No se pudo guardar las fibras - ID de proyecto no disponible");
      return;
    }

    // VERIFICACIÓN 2: FIBRAS EN STATE
    console.log("\n2️⃣ VERIFICACIÓN DE FIBRAS EN STATE:");
    console.log(`   - Total de fibras en state: ${fibers.length}`);
    console.log(`   - Tipo de fibers: ${typeof fibers}`);
    
    if (!Array.isArray(fibers)) {
      console.error("❌ ERROR: fibers no es un array");
      return;
    }

    // Listar todas las fibras
    let fiberCount = 0;
    console.log("\n   📋 Listado de fibras:");
    fibers.forEach((f, i) => {
      const buffersInfo = f.buffers ? `${f.buffers.length} buffers` : "sin buffers";
      const deletedInfo = f.deleted ? " [MARCADA COMO ELIMINADA]" : "";
      console.log(`      ${i + 1}. ${f.label || 'SIN NOMBRE'} - ID: ${f.id || 'SIN ID'} (${buffersInfo})${deletedInfo}`);
      if (!f.deleted) fiberCount++;
    });
    console.log(`   - Fibras NO eliminadas: ${fiberCount}`);
    
    // VERIFICACIÓN 3: PROCESAMIENTO DE FIBRAS
    const fibersKey = `@fibraoptica/fibers_project_${currentProjectId}`;
    console.log("\n3️⃣ INFORMACIÓN DE ALMACENAMIENTO:");
    console.log(`   - Clave AsyncStorage: "${fibersKey}"`);
    
    const allFibersToSave = [];
    let fiberProcessed = 0;
    let bufferProcessed = 0;

    console.log("\n4️⃣ PROCESANDO FIBRAS:");
    for (const fiber of fibers) {
      if (fiber.deleted) {
        console.log(`   ⏭️  SALTANDO fibra eliminada: ${fiber.label}`);
        continue;
      }

      fiberProcessed++;
      const fiberToSave = {
        id: fiber.id || uuidv4(),
        label: fiber.label,
        typeId: fiber.typeId,
        projectId: currentProjectId,
        nodeId: fiber.nodeId || null,
        parentFiberId: null,
        metadata: {
          threads: fiber.threads || [],
          isSystemFiber: fiber.isSystemFiber || false,
          buffersCount: fiber.buffers?.length || 0,
          color: fiber.color || null
        },
        createdDate: fiber.createdDate || new Date().toISOString(),
        modifiedDate: new Date().toISOString(),
        deleted: 0
      };

      console.log(`      ➕ FIBRA ${fiberProcessed}: ${fiberToSave.label}`);
      console.log(`         ID: ${fiberToSave.id}`);
      console.log(`         Project: ${fiberToSave.projectId}`);
      console.log(`         Buffers en state: ${fiber.buffers?.length || 0}`);
      
      allFibersToSave.push(fiberToSave);

      // Guardar buffers
      if (fiber.buffers && fiber.buffers.length > 0) {
        console.log(`         🔹 PROCESANDO ${fiber.buffers.length} BUFFERS:`);
        for (const buffer of fiber.buffers) {
          bufferProcessed++;
          const bufferToSave = {
            id: buffer.id || uuidv4(),
            label: buffer.label,
            typeId: buffer.typeId,
            projectId: currentProjectId,
            nodeId: buffer.nodeId || null,
            parentFiberId: fiberToSave.id,
            metadata: {
              threads: buffer.threads || [],
              isBuffer: true,
              parentFiberLabel: fiber.label,
              color: buffer.color || null
            },
            createdDate: buffer.createdDate || new Date().toISOString(),
            modifiedDate: new Date().toISOString(),
            deleted: 0
          };
          
          console.log(`            🔹${bufferProcessed}. Buffer: ${bufferToSave.label} (ID: ${bufferToSave.id})`);
          allFibersToSave.push(bufferToSave);
        }
      }
    }

    // VERIFICACIÓN 4: RESUMEN PRE-GUARDADO
    console.log("\n5️⃣ RESUMEN PRE-GUARDADO:");
    console.log(`   - Total de fibras procesadas: ${fiberProcessed}`);
    console.log(`   - Total de buffers procesados: ${bufferProcessed}`);
    console.log(`   - Total items a guardar: ${allFibersToSave.length}`);
    
    if (allFibersToSave.length === 0) {
      console.warn("⚠️  ADVERTENCIA: No hay items para guardar!");
    }

    // VERIFICACIÓN 5: INTENTANDO GUARDAR EN ASYNCSTORAGE
    console.log("\n6️⃣ GUARDANDO EN ASYNCSTORAGE:");
    console.log(`   - Iniciando AsyncStorage.setItem...`);
    console.log(`   - Clave: "${fibersKey}"`);
    console.log(`   - Tamaño de datos: ${JSON.stringify(allFibersToSave).length} bytes`);
    
    try {
      await AsyncStorage.setItem(fibersKey, JSON.stringify(allFibersToSave));
      console.log(`   ✅ AsyncStorage.setItem completó SIN ERROR`);
    } catch (asyncError) {
      console.error(`   ❌ ERROR en AsyncStorage.setItem:`, asyncError);
      console.error(`   - Tipo de error: ${asyncError.name}`);
      console.error(`   - Mensaje: ${asyncError.message}`);
      throw asyncError;
    }

    // VERIFICACIÓN 6: VERIFICAR GUARDADO
    console.log("\n7️⃣ VERIFICANDO GUARDADO:");
    let verifyData;
    try {
      verifyData = await AsyncStorage.getItem(fibersKey);
      console.log(`   ✅ AsyncStorage.getItem completó`);
      console.log(`   - Datos recuperados (null/undefined): ${verifyData == null}`);
      console.log(`   - Tamaño de datos: ${verifyData?.length || 0} bytes`);
      
      if (verifyData) {
        const parsed = JSON.parse(verifyData);
        console.log(`   ✅ JSON parseado correctamente`);
        console.log(`   - Total items verificados: ${parsed.length}`);
        
        if (parsed.length > 0) {
          console.log(`   - Primeros 3 items:`);
          parsed.slice(0, 3).forEach((item, idx) => {
            const type = item.parentFiberId ? 'Buffer' : 'Fibra';
            console.log(`      ${idx + 1}. ${item.label} [${type}] (ID: ${item.id})`);
          });
          if (parsed.length > 3) {
            console.log(`      ... y ${parsed.length - 3} items más`);
          }
        }
      } else {
        console.error(`   ❌ CRÍTICO: AsyncStorage.getItem retornó null/undefined`);
      }
    } catch (verifyError) {
      console.error(`   ❌ ERROR durante verificación:`, verifyError);
      console.error(`   - Tipo de error: ${verifyError.name}`);
      console.error(`   - Mensaje: ${verifyError.message}`);
    }
    
    console.log("\n✅ === GUARDADO DE FIBRAS COMPLETADO ===");
    console.log("=".repeat(80) + "\n");
    
  } catch (error) {
    console.error("\n❌ === ERROR CRÍTICO EN GUARDADO DE FIBRAS ===");
    console.error("Tipo de error:", error.name);
    console.error("Mensaje:", error.message);
    console.error("Stack:", error.stack);
    console.error("=".repeat(80) + "\n");
    throw error;
  }
};

  const handleInputChange = (field, value) => {
    setProjectData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleUnitsChange = (field, value) => {
    if (/^\d*$/.test(value)) {
      setUnitsInfo((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const calculateTotalUnits = () => {
    const living = parseInt(unitsInfo.living_unit || "0");
    const offices = parseInt(unitsInfo.office_amenities || "0");
    const commercial = parseInt(unitsInfo.commercial_unit || "0");
    return living + offices + commercial;
  };

  const addFiber = () => {
    setShowAddFiberModal(true);
  };

  const addNode = () => {
    setShowAddNodeModal(true);
  };

  const buildFiberThreads = () => {
    let items = [];
    for (let i = 0; i < 12; i++) {
      const color = fiberColors12Hex[i];
      items.push({
        number: i + 1,
        color: color.color,
        active: true,
        inUse: false,
      });
    }
    return items;
  };

  const buildFiber = (label, typeId) => {
    return {
      hash: uuidv4(),
      label: label,
      createdDate: new Date().toISOString(),
      modifiedDate: new Date().toISOString(),
      deleted: 0,
      typeId: typeId,
      threads: buildFiberThreads(),
      buffers: [],
    };
  };

  const handleOnSelectFiberType = (fiberType) => {
    const existingFibersOfType = fibers.filter(
      (x) => x.typeId === fiberType.typeId && !x.deleted
    );

    let fiberNumber = existingFibersOfType.length + 1;
    let fiberLabel = `${fiberType.name}_${fiberNumber}`;

    while (fibers.some((f) => f.label === fiberLabel && !f.deleted)) {
      fiberNumber++;
      fiberLabel = `${fiberType.name}_${fiberNumber}`;
    }

    let fiber = buildFiber(fiberLabel, fiberType.typeId);
    let buffers = [];

    if (fiberType.buffersCount > 1) {
      for (let i = 0; i < fiberType.buffersCount - 1; i++) {
        const buffer = buildFiber(`${fiberLabel}_Buffer_${i + 1}`, "12F");
        buffers.push(buffer);
      }
    }

    fiber.buffers = buffers;
    console.log("✅ Added fiber:", fiberLabel, "with", buffers.length, "buffers");
    setFibers((prev) => [...prev, fiber]);
    setShowAddFiberModal(false);
  };

  const handleNodeMedia = async (nodeId, media) => {
    console.log("📝 Updating node media for node:", nodeId);
    
    try {
      if (!nodeId) {
        console.error("❌ Node ID is undefined");
        return;
      }

      // Procesar cada medio
      for (let i = 0; i < media.length; i++) {
        const item = media[i];
        
        if (item.id == undefined) {
          // Nuevo medio - crear en base de datos
          console.log("➕ Creating new media:", item.label);
          const createdMedia = await createMedia({
            nodeId: nodeId,
            label: item.label || `Media_${Date.now()}`,
            type: item.type || 'image',
            data: item.data || '',
            comment: item.comment || '',
            createdDate: new Date().toISOString(),
            modifiedDate: new Date().toISOString(),
          });
          console.log("✅ Media created with ID:", createdMedia.id);
          
        } else {
          if (item.deleted) {
            // Eliminar medio
            console.log("🗑️ Deleting media:", item.id);
            await deleteMedia(item.id);
          } else {
            // Actualizar medio existente
            console.log("📝 Updating media:", item.id);
            await updateMedia(item.id, {
              label: item.label,
              type: item.type,
              data: item.data,
              comment: item.comment,
              modifiedDate: new Date().toISOString(),
            });
          }
        }
      }

      // Actualizar el estado local del nodo con los medios
      updateNodeMediaInState(nodeId, media.filter(m => !m.deleted));
      
      console.log("✅ Node media updated successfully");

    } catch (error) {
      console.error("❌ Error updating node media:", error);
      Alert.alert(t("error") || "Error", "Failed to save media");
    }
  };

  const updateNodeMediaInState = (nodeId, updatedMedia) => {
    // Actualizar en allNodes
    const updatedAllNodes = allNodes.map(node => {
      if (node.id === nodeId) {
        return {
          ...node,
          media: updatedMedia
        };
      }
      return node;
    });
    
    setAllNodes(updatedAllNodes);

    // Actualizar en nodes (vista filtrada)
    const updatedNodes = nodes.map(node => {
      if (node.id === nodeId) {
        return {
          ...node,
          media: updatedMedia
        };
      }
      return node;
    });
    
    setNodes(updatedNodes);
    
    console.log("🔄 Node media state updated for node:", nodeId);
  };

  // FUNCIÓN CORREGIDA PARA ACTUALIZAR NODOS
  const updateLocalNode = (node) => {
    console.log(
      "📝 Updating node:",
      node.label,
      "Devices count:",
      node.devices?.length || 0,
      "Media count:",
      node.media?.length || 0
    );

    // Actualizar en allNodes
    const allIndex =
      node.hash != undefined
        ? allNodes.findIndex((x) => x.hash == node.hash)
        : allNodes.findIndex((x) => x.id == node.id);

    if (allIndex != -1) {
      const tmpAll = [...allNodes];
      tmpAll[allIndex] = node;
      setAllNodes(tmpAll);
      console.log("✅ Updated in allNodes at index:", allIndex);
    } else {
      console.warn("⚠️ Node not found in allNodes");
    }

    // Actualizar en nodes (vista filtrada)
    const index =
      node.hash != undefined
        ? nodes.findIndex((x) => x.hash == node.hash)
        : nodes.findIndex((x) => x.id == node.id);

    if (index != -1) {
      const tmp = [...nodes];
      tmp[index] = node;
      setNodes(tmp);
      console.log("✅ Updated in visible nodes at index:", index);
    }

    // 💾 PERSISTIR EN BASE DE DATOS
    if (node.id) {
      console.log("💾 Persisting node to database...");
      console.log("   Node ID:", node.id);
      console.log("   Devices:", node.devices?.length || 0);
      console.log("   FusionLinks:", node.fusionLinks?.length || 0);
      console.log("   Media:", node.media?.length || 0);

      // Preparar metadata para guardar (INCLUYENDO MEDIOS)
      const metadata = JSON.stringify({
        devices: node.devices || [],
        fusionLinks: node.fusionLinks || [],
        media: node.media || [] // ← AÑADIR MEDIOS A LOS METADATOS
      });

      const nodeToUpdate = {
        ...node,
        metadata: metadata,
      };

      updateNode(node.id, nodeToUpdate)
        .then(() => {
          console.log("✅ Node persisted to database successfully");
          
          // 🔥 CORREGIDO: Procesar medios después de actualizar el nodo
          if (node.media && node.media.length > 0) {
            console.log("💾 Processing media for UPDATED node:", node.label);
            handleNodeMedia(node.id, node.media)
              .then(() => {
                console.log("✅ Media processed successfully for node:", node.label);
              })
              .catch(error => {
                console.error("❌ Error processing media:", error);
              });
          }
        })
        .catch((error) => {
          console.error("❌ Error persisting node to database:", error);
          Alert.alert(
            t("error") || "Error",
            "No se pudo guardar el nodo en la base de datos",
            [{ text: t("ok") || "OK" }]
          );
        });
    } else {
      console.log("⚠️ Node has no ID, cannot persist to database yet");
    }

    console.log("🔄 Node updated:", node.label);
  };

  // FUNCIÓN MEJORADA PARA AGREGAR NODOS
  const handleNodeSelect = async (nodeType) => {
    const unitType = nodesTypesList().find((x) => x.type == "U");
    let nodeLabel = "";

    // Determinar el tipo de nodo para mostrar en la UI
    const getNodeTypeName = (typeId) => {
      const type = nodesTypesList().find(x => x.id === typeId);
      return type ? type.name : "Node";
    };

    if (nodeType.id === unitType?.id) {
      const existingUnits = allNodes.filter(
        (x) => x.typeId == unitType.id && !x.deleted
      );
      const unitsCount = existingUnits.length;
      const maxUnits = calculateTotalUnits();

      if (unitsCount >= maxUnits) {
        Alert.alert(t("error") || "Error", t("maxUnits") || "Maximum units reached");
        return;
      }
      nodeLabel = `UNIT_${unitsCount + 1}`;
    } else {
      const sameTypeNodes = allNodes.filter(
        (x) => x.typeId == nodeType.id && !x.deleted
      );
      let nodeNumber = sameTypeNodes.length + 1;
      nodeLabel = `${nodeType.name}_${nodeNumber}`;

      while (allNodes.some((n) => n.label === nodeLabel && !n.deleted)) {
        nodeNumber++;
        nodeLabel = `${nodeType.name}_${nodeNumber}`;
      }
    }

    const newNode = {
      hash: uuidv4(),
      label: nodeLabel,
      createdDate: new Date().toISOString(),
      modifiedDate: new Date().toISOString(),
      deleted: 0,
      typeId: nodeType.id,
      typeName: getNodeTypeName(nodeType.id), // Agregar nombre del tipo para mostrar
      devices: [],
      fusionLinks: [],
    };

    // 🔥 PERSISTIR INMEDIATAMENTE SI ESTAMOS EN MODO EDICIÓN
    if (isEditMode && projectId) {
      try {
        console.log("💾 Persisting new node immediately:", newNode.label);
        const createdNode = await createNode({
          ...newNode,
          projectId: projectId,
          metadata: JSON.stringify({
            devices: [],
            fusionLinks: [],
          })
        });
        
        // Usar el nodo con ID de la base de datos
        newNode.id = createdNode.id;
        console.log("✅ Node persisted with ID:", createdNode.id);
      } catch (error) {
        console.error("❌ Error persisting node:", error);
        Alert.alert(t("error") || "Error", "Failed to save node");
        return;
      }
    }

    // Crear fibra DROP para unidades
    if (nodeType.id === unitType?.id) {
      const dropFiberLabel = `2F_${nodeLabel}`;
      const dropThreads = [];
      for (let i = 0; i < 12; i++) {
        const color = fiberColors12Hex[i];
        dropThreads.push({
          number: i + 1,
          color: color.color,
          active: i < 2,
          inUse: false,
        });
      }

      const dropFiber = {
        hash: uuidv4(),
        label: dropFiberLabel,
        createdDate: new Date().toISOString(),
        modifiedDate: new Date().toISOString(),
        deleted: 0,
        typeId: "12F",
        threads: dropThreads,
        buffers: [],
        nodeId: newNode.id || newNode.hash,
        isSystemFiber: true,
        projectId: isEditMode ? projectId : null,
      };

      console.log("🔷 Creating DROP fiber for UNIT:", dropFiberLabel);
      setFibers((prev) => [...prev, dropFiber]);
    }

    // Actualizar estados
    setAllNodes((prev) => {
      const updated = [...prev, newNode];
      console.log("📦 AllNodes updated. Total:", updated.length);
      return updated;
    });

    if (selectedNodesFilter.id === 0 || selectedNodesFilter.id === nodeType.id) {
      setNodes((prev) => {
        const updated = [...prev, newNode];
        console.log("👁️ Visible nodes updated. Total:", updated.length);
        return updated;
      });
    }

    setShowAddNodeModal(false);
    console.log("✅ Node added successfully:", newNode.label);
  };

  // FUNCIÓN CORREGIDA PARA GUARDAR PROYECTO
  const handleSaveProject = async () => {
    if (saving) return;

    setSaving(true);
    setShowCloseProjectModal(true);

    try {
      if (!projectData.name?.trim()) {
        Alert.alert(t("error") || "Error", t("nameAndAddressRequired") || "Name is required");
        setSaving(false);
        return;
      }

      console.log("=== SAVE PROCESS STARTED ===");
      console.log("📊 All nodes to save:", allNodes.length);
      console.log("🔧 Edit mode:", isEditMode);
      console.log("🆔 Project ID:", projectId);

      let projectToSave;

      if (isEditMode) {
        // MODO EDICIÓN
        console.log("✏️ Updating existing project:", projectId);
        
        projectToSave = await updateProject(projectId, {
          name: projectData.name.trim(),
          address: projectData.address.trim(),
          city: projectData.city || "",
          country: projectData.country || "USA",
          state: projectData.state || "",
          description: projectData.description || "",
          status: "active",
        });

        // GUARDAR NODOS EN MODO EDICIÓN
        console.log("💾 Processing nodes in edit mode...");
        const updatedNodes = [...allNodes];
        
        for (let i = 0; i < updatedNodes.length; i++) {
          const node = updatedNodes[i];
          
          if (!node.id && !node.deleted) {
            // Nodo nuevo - Crear en base de datos
            console.log("➕ Creating new node:", node.label);
            try {
              const createdNode = await createNode({
                ...node,
                projectId: projectId,
                metadata: JSON.stringify({
                  devices: node.devices || [],
                  fusionLinks: node.fusionLinks || [],
                })
              });
              
              updatedNodes[i] = { ...updatedNodes[i], id: createdNode.id };
              console.log("✅ Node created with ID:", createdNode.id);
              
              // 🔥 AQUÍ: Procesar medios después de crear el nodo
              if (node.media && node.media.length > 0) {
                console.log("💾 Processing media for NEW node:", node.label);
                await handleNodeMedia(createdNode.id, node.media);
              }
            } catch (error) {
              console.error("❌ Error creating node:", error);
            }
          } else if (node.id && !node.deleted) {
            // Nodo existente - Actualizar
            console.log("📝 Updating node:", node.label, "ID:", node.id);
            try {
              await updateNode(node.id, {
                label: node.label,
                typeId: node.typeId,
                description: node.description || "",
                metadata: JSON.stringify({
                  devices: node.devices || [],
                  fusionLinks: node.fusionLinks || [],
                }),
                modifiedDate: new Date().toISOString(),
              });

              // 🔥 AQUÍ: Procesar medios después de actualizar el nodo
              if (node.media && node.media.length > 0) {
                console.log("💾 Processing media for UPDATED node:", node.label);
                await handleNodeMedia(node.id, node.media);
              }
            } catch (error) {
              console.error("❌ Error updating node:", error);
            }
          } else if (node.id && node.deleted) {
            // Nodo existente - Eliminar
            console.log("🗑️ Deleting node:", node.label, "ID:", node.id);
            try {
              await deleteNode(node.id);
            } catch (error) {
              console.error("❌ Error deleting node:", error);
            }
          }
        }

        // Actualizar estado con los IDs generados
        setAllNodes(updatedNodes);
        setNodes(updatedNodes.filter(node => 
          !node.deleted && (selectedNodesFilter.id === 0 || node.typeId === selectedNodesFilter.id)
        ));

        // 🔥 GUARDAR FIBRAS Y CONFIGURACIONES EN MODO EDICIÓN
        console.log("\n📦 === INICIANDO GUARDADO DE CONFIGURACIONES EN MODO EDICIÓN ===");
        console.log(`📊 Estado actual:`);
        console.log(`   - ProjectID: ${projectId}`);
        console.log(`   - Fibers en state: ${fibers.length}`);
        console.log(`   - Nodes en state: ${allNodes.length}`);
        
        console.log("\n0️⃣ Guardando NODOS...");
        try {
          await saveNodesToAsyncStorage(projectId);
          console.log("✅ NODOS guardados");
        } catch (nodeError) {
          console.error("❌ Error al guardar NODOS:", nodeError);
        }
        
        console.log("\n1️⃣ Guardando FIBRAS...");
        try {
          await saveFibersToDatabase(projectId);
          console.log("✅ FIBRAS guardadas");
        } catch (fiberError) {
          console.error("❌ Error al guardar FIBRAS:", fiberError);
        }
        
        console.log("\n2️⃣ Guardando CONFIGURACIONES DE DISPOSITIVOS...");
        try {
          await saveDeviceConfigurations(projectId);
          console.log("✅ DISPOSITIVOS guardados");
        } catch (deviceError) {
          console.error("❌ Error al guardar DISPOSITIVOS:", deviceError);
        }
        
        console.log("\n3️⃣ Guardando CONFIGURACIONES DE FIBRAS...");
        try {
          await saveFiberConfigurations(projectId);
          console.log("✅ CONFIGURACIONES DE FIBRAS guardadas");
        } catch (fiberConfigError) {
          console.error("❌ Error al guardar CONFIGURACIONES DE FIBRAS:", fiberConfigError);
        }
        
        console.log("\n4️⃣ Guardando CONEXIONES DE RED...");
        try {
          await saveNetworkConnections(projectId);
          console.log("✅ CONEXIONES guardadas");
        } catch (connError) {
          console.error("❌ Error al guardar CONEXIONES:", connError);
        }
        
        console.log("📦 === FIN GUARDADO DE CONFIGURACIONES EN MODO EDICIÓN ===\n");

      } else {
        // MODO CREACIÓN
        console.log("🆕 Creating new project");
        
        projectToSave = await saveProject({
          name: projectData.name.trim(),
          address: projectData.address.trim(),
          city: projectData.city || "",
          country: projectData.country || "USA",
          state: projectData.state || "",
          description: projectData.description || "",
          status: "active",
        });

        console.log("✅ Project created with ID:", projectToSave.id);

        // Guardar información adicional
        await saveUnitsInfo(projectToSave.id, unitsInfo);
        await saveProjectType(projectToSave.id, projectType);

        // GUARDAR NODOS EN MODO CREACIÓN
        console.log("💾 Saving nodes for new project...");
        const nodesWithIds = [];
        
        for (let i = 0; i < allNodes.length; i++) {
          const node = allNodes[i];
          if (node.deleted) continue;
          
          console.log("➕ Creating node:", node.label);
          
          try {
            const createdNode = await createNode({
              ...node,
              projectId: projectToSave.id,
              metadata: JSON.stringify({
                devices: node.devices || [],
                fusionLinks: node.fusionLinks || [],
              })
            });
            
            const nodeWithId = { ...node, id: createdNode.id };
            nodesWithIds.push(nodeWithId);
            
            // 🔥 AQUÍ: Procesar medios después de crear el nodo
            if (node.media && node.media.length > 0) {
              console.log("💾 Processing media for NEW node:", node.label);
              await handleNodeMedia(createdNode.id, node.media);
            }
            
            console.log("✅ Node created with ID:", createdNode.id);
          } catch (error) {
            console.error("❌ Error creating node:", error);
            nodesWithIds.push(node); // Mantener el nodo incluso si falla
          }
        }
        
        setAllNodes(nodesWithIds);
        setNodes(nodesWithIds);

        // 🔥 GUARDAR FIBRAS CON ID CORRECTO
        console.log("\n📦 === INICIANDO GUARDADO DE CONFIGURACIONES EN MODO CREACIÓN ===");
        console.log(`📊 Estado actual:`);
        console.log(`   - ProjectID: ${projectToSave.id}`);
        console.log(`   - Fibers en state: ${fibers.length}`);
        console.log(`   - Nodes en state: ${nodesWithIds.length}`);
        
        console.log("\n0️⃣ Guardando NODOS...");
        try {
          await saveNodesToAsyncStorage(projectToSave.id);
          console.log("✅ NODOS guardados");
        } catch (nodeError) {
          console.error("❌ Error al guardar NODOS:", nodeError);
        }
        
        console.log("\n1️⃣ Guardando FIBRAS...");
        try {
          await saveFibersToDatabase(projectToSave.id);
          console.log("✅ FIBRAS guardadas");
        } catch (fiberError) {
          console.error("❌ Error al guardar FIBRAS:", fiberError);
        }
        
        console.log("\n2️⃣ Guardando CONFIGURACIONES DE DISPOSITIVOS...");
        try {
          await saveDeviceConfigurations(projectToSave.id);
          console.log("✅ DISPOSITIVOS guardados");
        } catch (deviceError) {
          console.error("❌ Error al guardar DISPOSITIVOS:", deviceError);
        }
        
        console.log("\n3️⃣ Guardando CONFIGURACIONES DE FIBRAS...");
        try {
          await saveFiberConfigurations(projectToSave.id);
          console.log("✅ CONFIGURACIONES DE FIBRAS guardadas");
        } catch (fiberConfigError) {
          console.error("❌ Error al guardar CONFIGURACIONES DE FIBRAS:", fiberConfigError);
        }
        
        console.log("\n4️⃣ Guardando CONEXIONES DE RED...");
        try {
          await saveNetworkConnections(projectToSave.id);
          console.log("✅ CONEXIONES guardadas");
        } catch (connError) {
          console.error("❌ Error al guardar CONEXIONES:", connError);
        }
        
        console.log("📦 === FIN GUARDADO DE CONFIGURACIONES EN MODO CREACIÓN ===\n");

        // Actualizar estado del proyecto
        setCreatedProjId(projectToSave.id);
        setProjectId(projectToSave.id);
        setIsEditMode(true);
        
        console.log("🔄 Project setup completed");
      }

      console.log("✅ Project saved successfully!");

      // 🔥 NUEVO: Verificar que los datos se guardaron correctamente
      await verifyProjectDataPersistence(projectToSave?.id || projectId);

    } catch (error) {
      console.log("❌ Error saving project:", error);
      Alert.alert(
        t("error") || "Error",
        t(isEditMode ? "failedToUpdate" : "failedToSave") || "Failed to save project"
      );
    } finally {
      setSaving(false);
    }
  };

  // 🔥 NUEVO: Función para verificar persistencia de datos
  const verifyProjectDataPersistence = async (projId) => {
    try {
      console.log("🔍 === VERIFICACIÓN DE PERSISTENCIA ===");
      console.log("📁 Proyecto:", projId);
      
      if (!projId) {
        console.warn("⚠️ Sin proyecto para verificar");
        return;
      }

      // Verificar fibras
      const fibersKey = `@fibraoptica/fibers_project_${projId}`;
      const fiberData = await AsyncStorage.getItem(fibersKey);
      const savedFibers = fiberData ? JSON.parse(fiberData) : [];
      console.log(`📦 Fibras guardadas: ${savedFibers.length}`);
      savedFibers.forEach((f, i) => {
        console.log(`  ${i + 1}. ${f.label} ${f.parentFiberId ? '(Buffer)' : ''}`);
      });

      // Verificar dispositivos
      const deviceKey = `@fibraoptica/devices_${projId}`;
      const deviceData = await AsyncStorage.getItem(deviceKey);
      const savedDevices = deviceData ? JSON.parse(deviceData) : [];
      console.log(`🔧 Dispositivos guardados: ${savedDevices.length}`);

      // Verificar conexiones
      const connectionsKey = `@fibraoptica/connections_${projId}`;
      const connData = await AsyncStorage.getItem(connectionsKey);
      const savedConnections = connData ? JSON.parse(connData) : [];
      console.log(`🔗 Conexiones guardadas: ${savedConnections.length}`);
      savedConnections.forEach((c, i) => {
        console.log(`  ${i + 1}. ${c.sourceNodeId} → ${c.targetNodeId}`);
      });

      console.log("✅ === VERIFICACIÓN COMPLETADA ===");
      
    } catch (error) {
      console.error("❌ Error en verificación:", error);
    }
  };

  // FUNCIÓN CORREGIDA PARA handleSeeNodePath
  const handleSeeNodePath = async (node) => {
    console.log("📍 Finding path for node:", node.label);
    
    let nodesForPath = [];
    
    // Usar los nodos ya cargados en el estado
    if (allNodes && allNodes.length > 0) {
      nodesForPath = [...allNodes];
      console.log("📋 Using nodes from state:", nodesForPath.length);
    } else if (projectId) {
      // Si no hay nodos en el estado, cargarlos desde la base de datos
      try {
        nodesForPath = await getNodesByProject(projectId);
        console.log("📋 Loaded nodes from database for path:", nodesForPath.length);
      } catch (error) {
        console.error("❌ Error loading nodes for path:", error);
        nodesForPath = [...allNodes];
      }
    } else {
      nodesForPath = [...allNodes];
    }

    // CORRECCIÓN: Buscar el nodo MDF correctamente
    const mdfType = nodesTypesList().find((x) => x.type == "MDF");
    console.log("🔍 Looking for MDF with type ID:", mdfType?.id);
    
    const mdf = nodesForPath.find((x) => x.typeId == mdfType?.id && !x.deleted);
    
    console.log("📊 Available nodes for path search:");
    nodesForPath.forEach(n => {
      console.log(`   - ${n.label} (Type: ${n.typeId}, Deleted: ${n.deleted})`);
    });

    if (!mdf) {
      console.error("❌ MDF node not found in:", nodesForPath.map(n => n.label));
      Alert.alert(
        t("error") || "Error", 
        "No se encontró el nodo MDF. Asegúrate de que existe un nodo MDF en el proyecto."
      );
      return;
    }

    console.log("✅ Found MDF node:", mdf.label);
    
    navigation.navigate("NodePath", {
      mdf: mdf,
      node: node,
      nodes: nodesForPath.filter(n => !n.deleted),
      fibers: fibers.filter(f => !f.deleted),
    });
  };

  // COMPONENTE MEJORADO PARA RENDERIZAR NODOS
  const RenderNode = ({ node }) => {
    const mdfType = nodesTypesList().find((x) => x.type == "MDF");
    const unitType = nodesTypesList().find((x) => x.type === "U");
    
    // Determinar el tipo de nodo para mostrar
    const nodeTypeName = nodesTypesList().find(x => x.id === node.typeId)?.name || "Node";

    return (
      <View style={styles.itemCard}>
        <View style={styles.itemHeader}>
          <View style={styles.itemInfo}>
            <Text style={styles.itemName}>{node.label}</Text>
            <Text style={styles.itemType}>{nodeTypeName}</Text>
            {node.description ? (
              <Text style={styles.itemDescription}>{node.description}</Text>
            ) : null}
          </View>

          <View style={styles.actionButtons}>
            {/* PATH - No mostrar para MDF */}
            {node.typeId !== mdfType?.id && (
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleSeeNodePath(node)}
              >
                <Ionicons name="git-branch-outline" size={22} color={colors.primary} />
              </TouchableOpacity>
            )}

            {/* FUSION LINK - No mostrar para MDF y UNIT */}
            {node.typeId !== mdfType?.id && node.typeId !== unitType?.id && (
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleSeeNodeLinks(node)}
              >
                <Ionicons name="git-network" size={22} color={colors.primary} />
              </TouchableOpacity>
            )}

            {/* MEDIA */}
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleSeeNodeMedia(node)}
            >
              <Ionicons name="attach" size={22} color={colors.primary} />
            </TouchableOpacity>

            {/* INFO */}
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleSeeNodeInfo(node)}
            >
              <Ionicons name="information-circle" size={22} color={colors.primary} />
            </TouchableOpacity>

            {/* REMOVE - No mostrar para MDF */}
            {node.typeId !== mdfType?.id && (
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => handleRemoveNode(node)}
              >
                <Ionicons name="trash" size={22} color={colors.danger} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    );
  };

  // COMPONENTE MEJORADO PARA RENDERIZAR FIBRAS
  const RenderFiber = ({ fiber }) => {
    return (
      <View style={styles.itemCard}>
        <View style={styles.itemHeader}>
          <View style={styles.itemInfo}>
            <Text style={styles.itemName}>
              {fiber.label} {fiber.isSystemFiber && "🔒"}
            </Text>
            <Text style={styles.itemType}>{fiber.typeId}</Text>
            <Text style={styles.itemDescription}>
              {fiber.buffers?.length || 0} buffers
            </Text>
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleSeeFiberInfo(fiber)}
            >
              <Ionicons name="information-circle" size={22} color={colors.primary} />
            </TouchableOpacity>

            {!fiber.isSystemFiber && !fiber.nodeId && (
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => handleRemoveFiber(fiber)}
              >
                <Ionicons name="trash" size={22} color={colors.danger} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    );
  };

  // Funciones auxiliares
  const handleRemoveNode = (node) => {
    if (node.typeId === 4) {
      const nodeIdentifier = node.id || node.hash;
      const dropFiber = fibers.find((f) => f.nodeId === nodeIdentifier);
      if (dropFiber) {
        const updatedFibers = fibers.filter((f) => f.nodeId !== nodeIdentifier);
        setFibers(updatedFibers);
        if (dropFiber.id) {
          setDeletedFiberIds((prev) => [...prev, dropFiber.id]);
        }
      }
    }

    const updatedAll = allNodes.map(n => 
      (n.id === node.id || n.hash === node.hash) ? { ...n, deleted: true } : n
    );
    setAllNodes(updatedAll);
    
    const updatedNodes = nodes.map(n => 
      (n.id === node.id || n.hash === node.hash) ? { ...n, deleted: true } : n
    );
    setNodes(updatedNodes);
  };

  // const handleRemoveFiber = (fiber) => {
  //   if (fiber.isSystemFiber || fiber.nodeId) {
  //     Alert.alert(
  //       t("error") || "Error",
  //       "Esta fibra DROP pertenece a una UNIT y no puede ser eliminada.",
  //       [{ text: t("ok") || "OK" }]
  //     );
  //     return;
  //   }

  //   const updatedFibers = fibers.filter((f) => 
  //     f.id !== fiber.id && f.hash !== fiber.hash
  //   );
  //   setFibers(updatedFibers);

  //   const idsToDelete = [];
  //   if (fiber.id) idsToDelete.push(fiber.id);
  //   if (fiber.buffers) {
  //     fiber.buffers.forEach((buffer) => {
  //       if (buffer.id) idsToDelete.push(buffer.id);
  //     });
  //   }

  //   if (idsToDelete.length > 0) {
  //     setDeletedFiberIds((prev) => [...prev, ...idsToDelete]);
  //   }
  // };

  // Funciones de navegación
  
  const handleRemoveFiber = (fiber) => {
  if (fiber.isSystemFiber || fiber.nodeId) {
    Alert.alert(
      t("error") || "Error",
      "Esta fibra DROP pertenece a una UNIT y no puede ser eliminada.",
      [{ text: t("ok") || "OK" }]
    );
    return;
  }

  const updatedFibers = fibers.map(f => 
    (f.id === fiber.id || f.hash === fiber.hash) ? { ...f, deleted: true } : f
  );
  setFibers(updatedFibers);

  const idsToDelete = [];
  if (fiber.id) idsToDelete.push(fiber.id);
  if (fiber.buffers) {
    fiber.buffers.forEach((buffer) => {
      if (buffer.id) idsToDelete.push(buffer.id);
    });
  }

  if (idsToDelete.length > 0) {
    setDeletedFiberIds((prev) => [...prev, ...idsToDelete]);
  }
};
  
  const handleSeeNodeInfo = (node) => {
    const currentNode = allNodes.find(
      (n) => (n.id && n.id === node.id) || (n.hash && n.hash === node.hash)
    ) || node;

    navigation.navigate("NodeDetails", {
      node: currentNode,
      onSaveNode: (data) => {
        updateLocalNode(data);
      },
    });
  };

  // const handleSeeNodeMedia = async (node) => {
  //   try {
  //     console.log("📸 Loading media for node:", node.label);
      
  //     // Cargar medios existentes desde la base de datos
  //     let media = [];
  //     if (node.id) {
  //       media = await getMediasByNodeId(node.id);
  //       console.log("📦 Loaded media from database:", media.length);
  //     }

  //     // Preparar datos para la pantalla NodeMedia
  //     const nodeMediaData = {
  //       nodeId: node.id,
  //       nodeHash: node.hash,
  //       nodeLabel: node.label,
  //       media: media || [],
  //       onSaveNodeMedia: (updatedData) => {
  //         console.log("💾 Saving media from NodeMedia screen");
  //         handleNodeMedia(updatedData.nodeId, updatedData.media)
  //           .then(() => {
  //             console.log("✅ Media saved successfully from NodeMedia");
  //             // Opcional: Mostrar confirmación
  //             Alert.alert("Success", "Media saved successfully");
  //           })
  //           .catch(error => {
  //             console.error("❌ Error saving media from NodeMedia:", error);
  //             Alert.alert("Error", "Failed to save media");
  //           });
  //       },
  //     };

  //     navigation.navigate("NodeMedia", nodeMediaData);
      
  //   } catch (error) {
  //     console.error("❌ Error loading node media:", error);
  //     Alert.alert("Error", "Could not load node media");
  //   }
  // };
  
  const handleSeeNodeMedia = async (node) => {
    try {
      console.log("📸 Loading media for node:", node.label);
      
      // Cargar medios existentes desde la base de datos
      let media = [];
      if (node.id) {
        media = await getMediasByNodeId(node.id);
        console.log("📦 Loaded media from database:", media.length);
      }

      // Guardar en el contexto para que NodeMedia pueda acceder
      if (node.id) {
        updateNodeMediaData(node.id, {
          nodeId: node.id,
          nodeHash: node.hash,
          nodeLabel: node.label,
          media: media || []
        });
      }

      // Navegar sin pasar funciones
      navigation.navigate("NodeMedia", {
        nodeId: node.id,
        nodeHash: node.hash,
        nodeLabel: node.label
      });
      
    } catch (error) {
      console.error("❌ Error loading node media:", error);
      Alert.alert("Error", "Could not load node media");
    }
  };
  
  const handleSeeNodeLinks = (node) => {
    navigation.navigate("NodeLinks", {
      node: node,
      // onSaveNode: (data) => {
      //   updateLocalNode(data);
      // },
    });
  };

  // const handleSeeFiberInfo = (fiber) => {
  //   navigation.navigate("FiberDetails", {
  //     buffers: [fiber, ...(fiber.buffers || [])],
  //     onSaveFiber: (data) => {
  //       // Actualizar fibra localmente
  //       const updatedFibers = fibers.map(f => 
  //         f.id === data[0].id || f.hash === data[0].hash ? {...data[0], buffers: data.slice(1)} : f
  //       );
  //       setFibers(updatedFibers);
  //     },
  //   });
  // };
  const handleSeeFiberInfo = (fiber) => {
    const tempId = fiber.id || fiber.hash;
    
    // Guardar temporalmente los datos de la fibra en el contexto
    updateFiberData(tempId, fiber);
    
    navigation.navigate("FiberDetails", {
      buffers: [fiber, ...(fiber.buffers || [])],
      fiberTempId: tempId // Solo pasamos el ID, no la función
    });
  };

  const clearForm = () => {
    setProjectData({
      name: "", address: "", city: "", country: "", state: "", description: "", status: "active",
    });
    setUnitsInfo({ living_unit: "0", office_amenities: "0", commercial_unit: "0" });
    setProjectType({ build_type: "MDU", job_type: "Residential", building_type: "Garden Style" });
    setAttachedFiles([]);
    setAllNodes([]);
    setNodes([]);
    setProjectId(null);
    setIsEditMode(false);
  };

  const selectProjectToEdit = (project) => {
    setProjectSelectorVisible(false);
    setProjectId(project.id);
    setIsEditMode(true);
  };

  const handleNodesFilterSelect = () => {
    setShowFilterNodesModal(true);
  };

  const handleFilterNodeSelect = (filter) => {
    const filtered = filter.id === 0 ? allNodes : allNodes.filter((x) => x.typeId == filter.id);
    setNodes(filtered);
    setSelectedNodesFilter(filter);
    setShowFilterNodesModal(false);
  };

  // 🔥 NUEVO: Guardar NODOS en AsyncStorage
  const saveNodesToAsyncStorage = async (currentProjectId) => {
    try {
      console.log("💾 Guardando nodos en AsyncStorage...");
      
      if (!currentProjectId) {
        console.warn("⚠️ ProjectID no disponible para nodos");
        return;
      }

      const nodesKey = `@fibraoptica/nodes_project_${currentProjectId}`;
      const nodesToSave = [];

      // Guardar TODOS los nodos (excepto los marcados como deleted)
      allNodes.forEach(node => {
        if (!node.deleted) {
          nodesToSave.push({
            id: node.id || uuidv4(),
            hash: node.hash,
            label: node.label,
            projectId: currentProjectId,
            typeId: node.typeId,
            typeName: node.typeName || "",
            description: node.description || "",
            devices: node.devices || [],
            fusionLinks: node.fusionLinks || [],
            metadata: node.metadata || {},
            createdDate: node.createdDate || new Date().toISOString(),
            modifiedDate: new Date().toISOString(),
            deleted: 0
          });
        }
      });

      if (nodesToSave.length > 0) {
        await AsyncStorage.setItem(nodesKey, JSON.stringify(nodesToSave));
        console.log(`✅ Guardados ${nodesToSave.length} nodos en AsyncStorage`);
      } else {
        console.log("ℹ️ Sin nodos para guardar");
      }
      
    } catch (error) {
      console.error("❌ Error guardando nodos:", error);
    }
  };

  // 🔥 NUEVO: Cargar NODOS desde AsyncStorage
  const loadNodesFromAsyncStorage = async (currentProjectId) => {
    try {
      const nodesKey = `@fibraoptica/nodes_project_${currentProjectId}`;
      const nodesData = await AsyncStorage.getItem(nodesKey);
      
      if (nodesData) {
        const parsedNodes = JSON.parse(nodesData);
        console.log(`📥 Nodos cargados desde AsyncStorage: ${parsedNodes.length}`);
        return parsedNodes;
      } else {
        console.log("⚠️ No hay nodos en AsyncStorage");
        return null;
      }
    } catch (error) {
      console.error("❌ Error cargando nodos de AsyncStorage:", error);
      return null;
    }
  };

  // 🔥 NUEVO: Guardar DISPOSITIVOS en AsyncStorage
  const saveDeviceConfigurations = async (currentProjectId) => {
    try {
      console.log("💾 Guardando configuraciones de dispositivos...");
      
      if (!currentProjectId) {
        console.warn("⚠️ ProjectID no disponible para dispositivos");
        return;
      }

      const deviceKey = `@fibraoptica/devices_${currentProjectId}`;
      const deviceConfigs = [];

      // Recolectar dispositivos de TODOS los nodos
      allNodes.forEach(node => {
        if (node.devices && node.devices.length > 0) {
          node.devices.forEach(device => {
            deviceConfigs.push({
              id: device.id || uuidv4(),
              nodeId: node.id || node.hash,
              projectId: currentProjectId,
              ...device,
              createdDate: device.createdDate || new Date().toISOString(),
              modifiedDate: new Date().toISOString()
            });
          });
        }
      });

      if (deviceConfigs.length > 0) {
        await AsyncStorage.setItem(deviceKey, JSON.stringify(deviceConfigs));
        console.log(`✅ Guardados ${deviceConfigs.length} dispositivos`);
      } else {
        console.log("ℹ️ Sin dispositivos para guardar");
      }
      
    } catch (error) {
      console.error("❌ Error guardando dispositivos:", error);
    }
  };

  // 🔥 NUEVO: Guardar CONFIGURACIONES DE FIBRA en AsyncStorage
  const saveFiberConfigurations = async (currentProjectId) => {
    try {
      console.log("💾 Guardando configuraciones de fibra...");
      
      if (!currentProjectId) {
        console.warn("⚠️ ProjectID no disponible para fibras");
        return;
      }

      const fiberConfigKey = `@fibraoptica/fiber_config_${currentProjectId}`;
      const fiberConfigs = [];

      // Guardar configuración global de fibras del proyecto
      fibers.forEach(fiber => {
        if (!fiber.deleted) {
          fiberConfigs.push({
            id: fiber.id || uuidv4(),
            projectId: currentProjectId,
            fiberType: fiber.typeId,
            label: fiber.label,
            metadata: fiber.metadata || {},
            createdDate: fiber.createdDate || new Date().toISOString()
          });
        }
      });

      if (fiberConfigs.length > 0) {
        await AsyncStorage.setItem(fiberConfigKey, JSON.stringify(fiberConfigs));
        console.log(`✅ Guardadas ${fiberConfigs.length} configuraciones de fibra`);
      }
      
    } catch (error) {
      console.error("❌ Error guardando configuraciones de fibra:", error);
    }
  };

  // 🔥 NUEVO: Guardar CONEXIONES DE RED en AsyncStorage
  const saveNetworkConnections = async (currentProjectId) => {
    try {
      console.log("💾 Guardando conexiones de red...");
      
      if (!currentProjectId) {
        console.warn("⚠️ ProjectID no disponible para conexiones");
        return;
      }

      const connectionsKey = `@fibraoptica/connections_${currentProjectId}`;
      const allConnections = [];

      // Recolectar todas las conexiones de los nodos
      allNodes.forEach(node => {
        if (node.fusionLinks && node.fusionLinks.length > 0) {
          node.fusionLinks.forEach(link => {
            allConnections.push({
              id: link.id || uuidv4(),
              projectId: currentProjectId,
              sourceNodeId: node.id || node.hash,
              targetNodeId: link.targetNodeId,
              fiberCount: link.fiberCount || 1,
              status: link.status || 'active',
              metadata: link.metadata || {},
              createdDate: link.createdDate || new Date().toISOString()
            });
          });
        }
      });

      if (allConnections.length > 0) {
        await AsyncStorage.setItem(connectionsKey, JSON.stringify(allConnections));
        console.log(`✅ Guardadas ${allConnections.length} conexiones de red`);
      } else {
        console.log("ℹ️ Sin conexiones para guardar");
      }
      
    } catch (error) {
      console.error("❌ Error guardando conexiones:", error);
    }
  };

  return (
    <View style={[stylesFull.screen, { backgroundColor: colors.background }, { paddingBottom: bottomInset }]}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: topInset - 20 }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {isEditMode ? t("editProject") || "Edit Project" : t("createProject") || "Create Project"}
        </Text>
        <View style={styles.headerActions}>
          {isEditMode && (
            <TouchableOpacity onPress={clearForm} style={styles.clearButton} disabled={saving}>
              <Ionicons name="add" size={24} color={colors.primary} />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={() => setProjectSelectorVisible(true)}
            style={styles.selectProjectButton}
            disabled={saving}
          >
            <Ionicons name="folder-open" size={24} color={colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSaveProject} disabled={saving}>
            <Ionicons
              name="save"
              size={24}
              color={saving ? colors.secondaryText : colors.primary}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Property Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {t("propertyInformation") || "Property Information"}
          </Text>
          <View style={styles.formCard}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                {t("propertyName") || "Property Name"} *
              </Text>
              <TextInput
                style={styles.input}
                value={projectData.name}
                onChangeText={(text) => handleInputChange("name", text)}
                placeholder={t("propertyName") || "Property Name"}
                editable={!saving}
                placeholderTextColor={colors.placeholder}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                {t("propertyAddress") || "Property Address"} *
              </Text>
              <TextInput
                style={styles.input}
                value={projectData.address}
                onChangeText={(text) => handleInputChange("address", text)}
                placeholder={t("enterAddress") || "Enter address"}
                editable={!saving}
                placeholderTextColor={colors.placeholder}
              />
            </View>

            <View style={styles.row}>
              <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
                <Text style={styles.label}>{t("city") || "City"}</Text>
                <TextInput
                  style={styles.input}
                  value={projectData.city}
                  onChangeText={(text) => handleInputChange("city", text)}
                  placeholder={t("city") || "City"}
                  editable={!saving}
                  placeholderTextColor={colors.placeholder}
                />
              </View>

              <View style={[styles.inputGroup, { flex: 1 }]}>
                <Text style={styles.label}>{t("state") || "State"}</Text>
                <TextInput
                  style={styles.input}
                  value={projectData.state}
                  onChangeText={(text) => handleInputChange("state", text)}
                  placeholder={t("state") || "State"}
                  maxLength={2}
                  editable={!saving}
                  placeholderTextColor={colors.placeholder}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>{t("description") || "Description"}</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={projectData.description}
                onChangeText={(text) => handleInputChange("description", text)}
                placeholder={t("projectDescription") || "Project description"}
                multiline={true}
                editable={!saving}
                placeholderTextColor={colors.placeholder}
              />
            </View>
          </View>
        </View>

        {/* Unit Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {t("unitInformation") || "Unit Information"}
          </Text>
          <View style={styles.formCard}>
            <View style={styles.row}>
              <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
                <Text style={styles.label}>{t("livingUnits") || "Living Units"}</Text>
                <TextInput
                  style={styles.input}
                  value={unitsInfo.living_unit}
                  onChangeText={(text) => handleUnitsChange("living_unit", text)}
                  placeholder="0"
                  keyboardType="numeric"
                  editable={!saving}
                  placeholderTextColor={colors.placeholder}
                />
              </View>

              <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
                <Text style={styles.label}>
                  {t("officesAmenities") || "Offices & Amenities"}
                </Text>
                <TextInput
                  style={styles.input}
                  value={unitsInfo.office_amenities}
                  onChangeText={(text) => handleUnitsChange("office_amenities", text)}
                  placeholder="0"
                  keyboardType="numeric"
                  editable={!saving}
                  placeholderTextColor={colors.placeholder}
                />
              </View>

              <View style={[styles.inputGroup, { flex: 1 }]}>
                <Text style={styles.label}>{t("commercialUnits") || "Commercial Units"}</Text>
                <TextInput
                  style={styles.input}
                  value={unitsInfo.commercial_unit}
                  onChangeText={(text) => handleUnitsChange("commercial_unit", text)}
                  placeholder="0"
                  keyboardType="numeric"
                  editable={!saving}
                  placeholderTextColor={colors.placeholder}
                />
              </View>
            </View>

            <View style={styles.totalUnits}>
              <Text style={styles.totalLabel}>{t("totalUnits") || "Total Units"}:</Text>
              <Text style={styles.totalValue}>
                {calculateTotalUnits()}
              </Text>
            </View>
          </View>
        </View>

        {/* Nodos - SECCIÓN MEJORADA */}
        <View style={styles.section}>
          <View style={styles.itemHeader}>
            <Text style={styles.sectionTitle}>{t("netNodes") || "Network Nodes"}</Text>
            <View style={styles.actionButtons}>
              <TouchableOpacity onPress={() => console.log("Connection map")} style={styles.actionButton}>
                <Ionicons name="link" size={24} color={colors.primary} />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleNodesFilterSelect} style={styles.actionButton}>
                <Ionicons name="filter" size={24} color={colors.primary} />
              </TouchableOpacity>
              <TouchableOpacity onPress={addNode} style={styles.actionButton}>
                <Ionicons name="add-circle" size={24} color={colors.primary} />
              </TouchableOpacity>
            </View>
          </View>

          {nodes.filter(x => !x.deleted).length === 0 ? (
            <Text style={[styles.label, { textAlign: 'center', marginVertical: 20 }]}>
              {t("nodesEmpty") || "No nodes added"}
            </Text>
          ) : (
            <View>
              {nodes
                .filter((x) => !x.deleted)
                .map((item, index) => (
                  <RenderNode key={item.id || item.hash || index} node={item} />
                ))}
            </View>
          )}
        </View>

        {/* Fibras - SECCIÓN MEJORADA */}
        <View style={styles.section}>
          <View style={styles.itemHeader}>
            <Text style={styles.sectionTitle}>{t("netFibers") || "Network Fibers"}</Text>
            <TouchableOpacity onPress={addFiber} style={styles.actionButton}>
              <Ionicons name="add-circle" size={24} color={colors.primary} />
            </TouchableOpacity>
          </View>

          {fibers.length === 0 ? (
            <Text style={[styles.label, { textAlign: 'center', marginVertical: 20 }]}>
              {t("fibersEmpty") || "No fibers added"}
            </Text>
          ) : (
            <View>
              {fibers.map((item, index) => (
                <RenderFiber key={item.id || item.hash || index} fiber={item} />
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      {/* Modales */}
      {/* Add Fiber Modal */}
      <Modal
        visible={showAddFiberModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowAddFiberModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {t("selectFiberTypesQuantities") || "Select Fiber Type"}
            </Text>
            <ScrollView>
              {fiberTypesList.map((item) => (
                <TouchableOpacity
                  key={item.typeId}
                  style={styles.modalItem}
                  onPress={() => handleOnSelectFiberType(item)}
                >
                  <Text style={styles.modalItemText}>{item.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Add Node Modal */}
      <Modal
        visible={showAddNodeModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowAddNodeModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {t("selectNodeType") || "Select Node Type"}
            </Text>
            <ScrollView>
              {nodesTypesList().filter((x) => x.visible == true).map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.modalItem}
                  onPress={() => handleNodeSelect(item)}
                >
                  <Text style={styles.modalItemText}>{item.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Filter Nodes Modal */}
      <Modal
        visible={showFilterNodesModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowFilterNodesModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {t("filterNodes") || "Filter Nodes"}
            </Text>
            <ScrollView>
              {nodesFiltersList.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.modalItem}
                  onPress={() => handleFilterNodeSelect(item)}
                >
                  <View style={{ flexDirection: "row", gap: 3 }}>
                    {selectedNodesFilter.id == item.id && (
                      <Ionicons name="checkmark" size={24} color={colors.primary} />
                    )}
                    <Text style={styles.modalItemText}>{item.name}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Project Selector Modal */}
      <Modal
        visible={projectSelectorVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setProjectSelectorVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContainer, styles.selectorModal]}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>
                {t("selectProjectToEdit") || "Select Project to Edit"}
              </Text>
              <ScrollView style={styles.projectList}>
                {existingProjects.map((project) => (
                  <TouchableOpacity
                    key={project.id}
                    style={styles.projectItem}
                    onPress={() => selectProjectToEdit(project)}
                  >
                    <Ionicons name="business" size={24} color={colors.primary} />
                    <View style={styles.projectInfo}>
                      <Text style={styles.projectName}>{project.name}</Text>
                      <Text style={styles.projectAddress}>{project.address}</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color={colors.secondaryText} />
                  </TouchableOpacity>
                ))}
                {existingProjects.length === 0 && (
                  <Text style={styles.noProjectsText}>
                    {t("noProjectsFound") || "No projects found"}
                  </Text>
                )}
              </ScrollView>
              <TouchableOpacity
                style={[styles.closeModalButton, styles.cancelButton]}
                onPress={() => setProjectSelectorVisible(false)}
              >
                <Text style={styles.closeModalText}>{t("cancel") || "Cancel"}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Saving Modal */}
      <Modal
        visible={showCloseProjectModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowCloseProjectModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{t("project") || "Project"}</Text>
            {saving && (
              <View>
                <Text style={styles.modalItem}>{t("saving") || "Saving..."}</Text>
                <ActivityIndicator size="large" color={colors.primary} />
              </View>
            )}
            {!saving && (
              <View>
                <Text style={styles.modalItem}>{t("projectSaved") || "Project saved successfully"}</Text>
              </View>
            )}
            <View style={{ marginTop: 20, flexDirection: "row", justifyContent: "space-between", gap: 5 }}>
              <Button
                onPress={() => navigation.goBack()}
                title={t("buttonNo") || "No"}
                color="salmon"
              />
              <Button
                onPress={async () => {
                  setShowCloseProjectModal(false);
                  if (createdProjId) {
                    await loadProjectData(createdProjId);
                  }
                }}
                disabled={saving}
                title={t("buttonYes") || "Yes"}
                color={colors.primary}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CreateProject;