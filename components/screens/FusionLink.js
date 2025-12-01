// // components/screens/FusionLink.js
// import React, { useState, useEffect } from "react";

// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   Alert,
//   Platform
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { useApp } from "../context/AppContext";
// import { useTranslation } from "../hooks/useTranslation";
// import { useDevice } from "../context/DeviceContext";
// import { useAdapter } from "@/api/contexts/DatabaseContext";

// import RNPickerSelect from "react-native-picker-select";

// const FusionLink = ({ route, navigation }) => {
//   const adapter = useAdapter()();
//   const { getFibersByProjectId } = adapter;

//   const { topInset, bottomInset, stylesFull } = useDevice();
//   const { isDarkMode } = useApp();
//   const { t } = useTranslation();

//   // Obtener parámetros con valores por defecto
//   const { 
//     projectId: routeProjectId, 
//     link, 
//     linkHash, 
//     node,
//     project 
//   } = route.params || {};

//   // Determinar projectId de múltiples fuentes posibles
//   const projectId = routeProjectId || project?.id || node?.projectId;
  
//   console.log('🔷 FusionLink - Params:', { 
//     routeProjectId, 
//     projectId, 
//     node: node?.label,
//     nodeType: node?.typeId,
//     hasLink: !!link 
//   });

//   const [fibersData, setFibersData] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   const [srcLink, setSrcLink] = useState({
//     fiber: null,
//     buffer: null,
//     thread: null,
//     threads: [],
//   });
  
//   const [dstLink, setDstLink] = useState({
//     fiber: null,
//     buffer: null,
//     thread: null,
//     threads: [],
//   });

//   const colors = {
//     primary: "#3498db",
//     success: "#2ecc71",
//     warning: "#f39c12",
//     danger: "#e74c3c",
//     background: isDarkMode ? "#121212" : "#ffffff",
//     card: isDarkMode ? "#1e1e1e" : "#ffffff",
//     text: isDarkMode ? "#ffffff" : "#2c3e50",
//     subText: isDarkMode ? "#b0b0b0" : "#7f8c8d",
//     border: isDarkMode ? "#333" : "#ecf0f1",
//     inputBackground: isDarkMode ? "#2a2a2a" : "#f8f9fa",
//     placeholder: isDarkMode ? "#888888" : "#a0a0a0",
//     cardBackground: isDarkMode ? "#1e1e1e" : "#f6f1f1be",
//   };

//   const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: colors.background,
//     },
//     header: {
//       flexDirection: "row",
//       alignItems: "center",
//       justifyContent: "space-between",
//       backgroundColor: colors.card,
//       padding: 16,
//       paddingTop: topInset - 10,
//       borderBottomWidth: 1,
//       borderBottomColor: colors.border,
//     },
//     backButton: {
//       padding: 4,
//     },
//     headerTitle: {
//       fontSize: 18,
//       fontWeight: "600",
//       color: colors.text,
//     },
//     headerActions: {
//       flexDirection: "row",
//       alignItems: "center",
//     },
//     mapButton: {
//       padding: 4,
//       marginLeft: 10,
//     },
//     content: {
//       flex: 1,
//       padding: 16,
//     },
//     section: {
//       marginBottom: 25,
//     },
//     sectionTitle: {
//       fontSize: 18,
//       fontWeight: "700",
//       color: colors.text,
//       marginBottom: 15,
//     },
//     label: {
//       fontSize: 16,
//       fontWeight: "600",
//       color: colors.text,
//       marginBottom: 8,
//       marginTop: 12,
//     },
//     formCard: {
//       backgroundColor: colors.cardBackground,
//       borderRadius: 14,
//       padding: 16,
//       marginBottom: 16,
//       borderWidth: 1,
//       borderColor: colors.border,
//     },
//     linkContainer: {
//       flexDirection: "row",
//       justifyContent: "space-between",
//       alignItems: "center",
//       paddingVertical: 10,
//     },
//     pickerContainer: {
//       flex: 1,
//       marginHorizontal: 5,
//     },
//     button: {
//       backgroundColor: colors.primary,
//       padding: 16,
//       borderRadius: 8,
//       alignItems: 'center',
//       marginTop: 20,
//     },
//     buttonText: {
//       color: 'white',
//       fontWeight: 'bold',
//       fontSize: 16,
//     },
//     loadingContainer: {
//       padding: 20,
//       alignItems: 'center',
//     },
//     debugInfo: {
//       fontSize: 12,
//       color: colors.subText,
//       marginTop: 4,
//     },
//     warningBox: {
//       padding: 10,
//       backgroundColor: colors.warning + '20',
//       borderRadius: 8,
//       marginBottom: 10,
//     },
//     warningText: {
//       color: colors.warning,
//       textAlign: 'center',
//     },
//     errorBox: {
//       padding: 15,
//       backgroundColor: colors.danger + '20',
//       borderRadius: 8,
//       marginBottom: 10,
//     },
//     errorText: {
//       color: colors.danger,
//       textAlign: 'center',
//       fontWeight: 'bold',
//     },
//     pickerWebContainer: {
//       borderWidth: 1,
//       borderColor: colors.border,
//       borderRadius: 8,
//       backgroundColor: colors.inputBackground,
//       marginBottom: 16,
//     },
//     pickerWeb: {
//       width: '100%',
//       height: 50,
//       paddingHorizontal: 10,
//       color: colors.text,
//       backgroundColor: colors.inputBackground,
//       borderWidth: 0,
//       borderRadius: 8,
//     }
//   });

//   // COMPONENTE PICKER MEJORADO
//   const CustomPicker = ({ items, onValueChange, value, placeholder, disabled = false }) => {
//     if (Platform.OS === 'web') {
//       return (
//         <View style={styles.pickerWebContainer}>
//           <select 
//             style={styles.pickerWeb}
//             value={value || ''}
//             onChange={(e) => onValueChange(e.target.value ? e.target.value : null)}
//             disabled={disabled}
//           >
//             <option value="">{placeholder?.label || "Seleccione..."}</option>
//             {items.map((item) => (
//               <option key={item.value} value={item.value}>
//                 {item.label}
//               </option>
//             ))}
//           </select>
//         </View>
//       );
//     }

//     const pickerSelectStyles = {
//       inputIOS: {
//         fontSize: 16,
//         paddingVertical: 12,
//         paddingHorizontal: 10,
//         borderWidth: 1,
//         borderColor: colors.border,
//         borderRadius: 8,
//         color: colors.text,
//         backgroundColor: colors.inputBackground,
//         paddingRight: 30,
//         marginVertical: 8,
//       },
//       inputAndroid: {
//         fontSize: 16,
//         paddingHorizontal: 10,
//         paddingVertical: 12,
//         borderWidth: 1,
//         borderColor: colors.border,
//         borderRadius: 8,
//         color: colors.text,
//         backgroundColor: colors.inputBackground,
//         paddingRight: 30,
//         marginVertical: 8,
//       },
//       placeholder: {
//         color: colors.placeholder,
//       },
//       iconContainer: {
//         top: 12,
//         right: 12,
//       },
//     };

//     return (
//       <RNPickerSelect
//         onValueChange={onValueChange}
//         items={items}
//         value={value}
//         placeholder={placeholder}
//         disabled={disabled}
//         style={pickerSelectStyles}
//         useNativeAndroidPickerStyle={false}
//         fixAndroidTouchableBug={true}
//         Icon={() => {
//           return <Ionicons name="chevron-down" size={20} color={colors.placeholder} />;
//         }}
//       />
//     );
//   };

//   // CARGAR FIBRAS - VERSIÓN SIMPLIFICADA Y CORREGIDA
//   useEffect(() => {
//     const loadFibers = async () => {
//       try {
//         setIsLoading(true);
//         console.log('🔷 FusionLink - Cargando fibras para proyecto:', projectId);

//         // VERIFICACIÓN EXTRA: mostrar todos los parámetros
//     console.log('🔷 FusionLink - Todos los parámetros:', {
//       projectId,
//       node: node?.label,
//       nodeType: node?.typeId,
//       nodeId: node?.id,
//       hasLink: !!link
//     });
        
//         // VERIFICACIÓN CRÍTICA DE PROJECTID
//         if (!projectId) {
//           console.error('❌ FusionLink - NO HAY PROJECTID VÁLIDO');
//           console.error('❌ Params disponibles:', route.params);
//           setFibersData([]);
//           setIsLoading(false);
//           return;
//         }
        

//         console.log('🔷 FusionLink - Cargando fibras para proyecto:', projectId);
        
//         // Obtener todas las fibras del proyecto
//     let records = await getFibersByProjectId(projectId, null);
//     console.log('🔷 FusionLink - Fibras obtenidas de BD:', records?.length || 0);

//     // DEBUG DETALLADO de las fibras obtenidas
//     if (records && records.length > 0) {
//       console.log('🔷 FusionLink - Detalle de fibras obtenidas:');
//       records.forEach((fiber, index) => {
//         console.log(`  ${index + 1}. ${fiber.label} (ID: ${fiber.id}, nodeId: ${fiber.nodeId}, projectId: ${fiber.projectId})`);
        
//         // Verificar metadata
//         if (fiber.metadata) {
//           try {
//             const metadata = JSON.parse(fiber.metadata);
//             console.log(`     Metadata:`, metadata);
//           } catch (e) {
//             console.log(`     Error parsing metadata:`, e);
//           }
//         }
//       });
//     } else {
//       console.log('🔷 FusionLink - NO SE ENCONTRARON FIBRAS EN LA BD');
//       console.log('🔷 Posibles causas:');
//       console.log('   - Las fibras no se guardaron correctamente en CreateProject');
//       console.log('   - El projectId no es correcto:', projectId);
//       console.log('   - No hay fibras creadas para este proyecto');
//     }

//         // DEBUG: Mostrar información de las fibras
//         console.log('🔷 FusionLink - Fibras encontradas:');
//         records.forEach((fiber, index) => {
//           console.log(`  ${index + 1}. ${fiber.label} (ID: ${fiber.id}, nodeId: ${fiber.nodeId})`);
//         });

//         // FILTRADO SEGÚN TIPO DE NODO
//         let filteredRecords = [...records];
        
//         if (node) {
//           console.log('🔷 FusionLink - Aplicando filtro para nodo tipo:', node.typeId);
          
//           if (node.typeId === 4) {
//             // UNIT: Solo mostrar fibra DROP específica de esta UNIT
//             const nodeIdentifier = node.id;
//             console.log('🔷 FusionLink - Filtrando para UNIT:', nodeIdentifier);
            
//             filteredRecords = records.filter(fiber => {
//               const matches = fiber.nodeId === nodeIdentifier;
//               console.log(`  Fiber ${fiber.label}: nodeId=${fiber.nodeId}, matches=${matches}`);
//               return matches;
//             });
            
//           } else if (node.typeId === 1) {
//             // MDF: Excluir TODAS las fibras DROP (que tienen nodeId)
//             console.log('🔷 FusionLink - Filtrando para MDF - excluyendo DROP fibers');
            
//             filteredRecords = records.filter(fiber => {
//               const isNotDropFiber = !fiber.nodeId;
//               return isNotDropFiber;
//             });
//           }
//           // Para IDF y Pedestal no filtramos
//         }

//         console.log('🔷 FusionLink - Fibras después del filtro:', filteredRecords.length);

//         // PROCESAR ESTRUCTURA DE DATOS
//         const processedRecords = [];
        
//         for (let i = 0; i < filteredRecords.length; i++) {
//           const fiber = { ...filteredRecords[i] };
          
//           // Asegurar que tenga threads
//           if (!fiber.threads || !Array.isArray(fiber.threads)) {
//             fiber.threads = Array.from({length: 12}, (_, index) => ({
//               number: index + 1,
//               active: true,
//               inUse: false
//             }));
//           }

//           // Crear estructura base de buffers
//           let buffers = [{ 
//             ...fiber, 
//             value: fiber.id,
//             label: fiber.label || `Fibra ${i + 1}`,
//             key: `fiber-${fiber.id}`,
//             isMainFiber: true
//           }];
          
//           // Obtener buffers hijos si existen
//           try {
//             let children = await getFibersByProjectId(projectId, fiber.id);
            
//             if (children && children.length > 0) {
//               const childBuffers = children.map((buffer, idx) => {
//                 // Asegurar que los buffers también tengan threads
//                 if (!buffer.threads || !Array.isArray(buffer.threads)) {
//                   buffer.threads = Array.from({length: 12}, (_, index) => ({
//                     number: index + 1,
//                     active: true,
//                     inUse: false
//                   }));
//                 }
                
//                 return {
//                   ...buffer,
//                   value: buffer.id,
//                   label: buffer.label || `Buffer ${idx + 1}`,
//                   key: `buffer-${buffer.id}`,
//                   isBuffer: true,
//                   parentFiberId: fiber.id
//                 };
//               });

//               buffers = [...buffers, ...childBuffers];
//             }
//           } catch (error) {
//             console.error(`Error cargando buffers para ${fiber.label}:`, error);
//           }

//           processedRecords.push({
//             ...fiber,
//             buffers: buffers,
//             value: fiber.id,
//             label: fiber.label || `Fibra ${i + 1}`,
//             key: `fiber-${fiber.id}`,
//           });
//         }

//         console.log('🔷 FusionLink - Registros procesados:', processedRecords.length);
//         setFibersData(processedRecords);

//         // CARGAR DATOS EXISTENTES SI HAY LINK
//         if (link && processedRecords.length > 0) {
//           loadExistingLinkData(processedRecords);
//         }
        
//       } catch (error) {
//         console.error('❌ Error cargando fibras:', error);
//         Alert.alert("Error", "No se pudieron cargar las fibras");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     const loadExistingLinkData = (fibers) => {
//       try {
//         console.log('🔷 Cargando datos del link existente');
        
//         // SOURCE
//         const srcFiber = fibers.find((x) => x.id == link.src.fiberId);
//         if (srcFiber) {
//           const srcBuffer = srcFiber.buffers?.find((x) => x.id == link.src.bufferId);
//           const actualFiber = srcBuffer || srcFiber;
//           const srcThreads = buildThreads(actualFiber, actualFiber.threads, true);
          
//           setSrcLink({
//             fiber: srcFiber,
//             buffer: srcBuffer,
//             thread: link.src.thread + 1,
//             threads: srcThreads,
//           });
//         }

//         // DESTINATION
//         const dstFiber = fibers.find((x) => x.id == link.dst.fiberId);
//         if (dstFiber) {
//           const dstBuffer = dstFiber.buffers?.find((x) => x.id == link.dst.bufferId);
//           const actualFiber = dstBuffer || dstFiber;
//           const dstThreads = buildThreads(actualFiber, actualFiber.threads, false);
          
//           setDstLink({
//             fiber: dstFiber,
//             buffer: dstBuffer,
//             thread: link.dst.thread + 1,
//             threads: dstThreads,
//           });
//         }
//       } catch (error) {
//         console.error('Error cargando link existente:', error);
//       }
//     };

//     loadFibers();
//   }, [projectId, node, link, getFibersByProjectId]);

//   // CONSTRUIR THREADS DISPONIBLES
//   const buildThreads = (fiber, threads, isSource) => {
//     if (!threads || !Array.isArray(threads)) {
//       threads = Array.from({length: 12}, (_, index) => ({
//         number: index + 1,
//         active: true,
//         inUse: false
//       }));
//     }

//     let availableThreads = threads.filter((x) => x.active === true && x.inUse !== true);
//     let result = [];
//     const fusionLinks = node.fusionLinks || [];

//     availableThreads.forEach((thread) => {
//       let found = false;
//       const threadNumber = thread.number;

//       // Verificar si el thread está en uso
//       for (let i = 0; i < fusionLinks.length; i++) {
//         const fusionLink = fusionLinks[i];
//         if (!fusionLink.deleted && fusionLink.hash !== link?.hash) {
//           const linkSide = isSource ? fusionLink.src : fusionLink.dst;
          
//           if (linkSide && (linkSide.fiberId === fiber.id || linkSide.bufferId === fiber.id)) {
//             if (linkSide.thread + 1 === threadNumber) {
//               found = true;
//               break;
//             }
//           }
//         }
//       }

//       if (!found) {
//         result.push(thread);
//       }
//     });

//     return result.map((thread) => ({
//       ...thread,
//       value: thread.number,
//       label: `${t("thread") || "Hilo"} ${thread.number}`,
//       key: `thread-${thread.number}`,
//     }));
//   };

//   // MANEJADORES DE CAMBIOS
//   const handleSrcFiberChange = (value) => {
//     const fiber = fibersData.find((x) => x.value === value);
    
//     if (fiber) {
//       const threads = fiber.buffers && fiber.buffers.length <= 1 ? 
//         buildThreads(fiber, fiber.threads, true) : [];
      
//       setSrcLink({
//         fiber: fiber,
//         buffer: null,
//         thread: null,
//         threads: threads,
//       });
//     } else {
//       setSrcLink({
//         fiber: null,
//         buffer: null,
//         thread: null,
//         threads: [],
//       });
//     }
//   };

//   const handleSrcBufferChange = (value) => {
//     if (!srcLink.fiber) return;
    
//     const buffer = srcLink.fiber.buffers.find((x) => x.value === value);
//     if (buffer) {
//       const threads = buildThreads(buffer, buffer.threads, true);
//       setSrcLink({
//         ...srcLink,
//         buffer: buffer,
//         thread: null,
//         threads: threads,
//       });
//     }
//   };

//   const handleSrcThreadChange = (value) => {
//     setSrcLink({
//       ...srcLink,
//       thread: value,
//     });
//   };

//   const handleDstFiberChange = (value) => {
//     const fiber = fibersData.find((x) => x.value === value);
    
//     if (fiber) {
//       const threads = fiber.buffers && fiber.buffers.length <= 1 ? 
//         buildThreads(fiber, fiber.threads, false) : [];
      
//       setDstLink({
//         fiber: fiber,
//         buffer: null,
//         thread: null,
//         threads: threads,
//       });
//     } else {
//       setDstLink({
//         fiber: null,
//         buffer: null,
//         thread: null,
//         threads: [],
//       });
//     }
//   };

//   const handleDstBufferChange = (value) => {
//     if (!dstLink.fiber) return;
    
//     const buffer = dstLink.fiber.buffers.find((x) => x.value === value);
//     if (buffer) {
//       const threads = buildThreads(buffer, buffer.threads, false);
//       setDstLink({
//         ...dstLink,
//         buffer: buffer,
//         thread: null,
//         threads: threads,
//       });
//     }
//   };

//   const handleDstThreadChange = (value) => {
//     setDstLink({
//       ...dstLink,
//       thread: value,
//     });
//   };

//   // GUARDAR FUSION LINK
//   const handleSave = () => {
//     if (!srcLink.fiber || !srcLink.thread || !dstLink.fiber || !dstLink.thread) {
//       Alert.alert("Error", "Por favor completa todos los campos");
//       return;
//     }

//     const result = {
//       src: {
//         fiberId: srcLink.fiber.id,
//         fiberLabel: srcLink.fiber.label,
//         bufferId: srcLink.buffer?.id || null,
//         bufferLabel: srcLink.buffer?.label || null,
//         thread: srcLink.thread - 1,
//       },
//       dst: {
//         fiberId: dstLink.fiber.id,
//         fiberLabel: dstLink.fiber.label,
//         bufferId: dstLink.buffer?.id || null,
//         bufferLabel: dstLink.buffer?.label || null,
//         thread: dstLink.thread - 1,
//       },
//       deleted: false,
//       hash: link ? link.hash : linkHash,
//     };

//     console.log('💾 Guardando fusion link:', result);

//     if (route.params?.onSaveFusionLink) {
//       route.params.onSaveFusionLink(result);
//       Alert.alert("Éxito", "Enlace de fusión guardado correctamente");
//     } else {
//       Alert.alert("Error", "No se pudo guardar el enlace de fusión");
//     }
    
//     navigation.goBack();
//   };

//   // RENDER CONTENIDO
//   const renderContent = () => {
//     if (isLoading) {
//       return (
//         <View style={styles.loadingContainer}>
//           <Text style={{ color: colors.text }}>Cargando fibras...</Text>
//         </View>
//       );
//     }

//     if (!projectId) {
//       return (
//         <View style={styles.content}>
//           <View style={styles.errorBox}>
//             <Text style={styles.errorText}>
//               Error: No se pudo identificar el proyecto
//             </Text>
//           </View>
//           <TouchableOpacity 
//             style={[styles.button, { backgroundColor: colors.danger }]}
//             onPress={() => navigation.goBack()}
//           >
//             <Text style={styles.buttonText}>Volver Atrás</Text>
//           </TouchableOpacity>
//         </View>
//       );
//     }

//     return (
//       <ScrollView style={styles.content}>
//         {/* INFO DEL PROYECTO */}
//         <View style={styles.debugInfo}>
//           <Text style={[styles.debugInfo, {marginBottom: 10}]}>
//             Proyecto ID: {projectId} | Fibras: {fibersData.length}
//           </Text>
//         </View>

//         {fibersData.length === 0 && (
//           <View style={styles.warningBox}>
//             <Text style={styles.warningText}>
//               No hay fibras disponibles para este nodo
//             </Text>
//           </View>
//         )}

//         {/* SECCIÓN SOURCE */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Fuente</Text>
          
//           <View style={styles.formCard}>
//             <Text style={styles.label}>Fibra</Text>
//             <CustomPicker
//               onValueChange={handleSrcFiberChange}
//               items={fibersData}
//               placeholder={{ 
//                 label: fibersData.length === 0 
//                   ? "No hay fibras disponibles" 
//                   : "Seleccione una fibra...", 
//                 value: null 
//               }}
//               value={srcLink.fiber?.value}
//               disabled={fibersData.length === 0}
//             />

//             {/* BUFFER SOURCE */}
//             {srcLink.fiber?.buffers && srcLink.fiber.buffers.length > 1 && (
//               <View>
//                 <Text style={styles.label}>Buffer</Text>
//                 <CustomPicker
//                   onValueChange={handleSrcBufferChange}
//                   items={srcLink.fiber.buffers}
//                   placeholder={{ label: "Seleccione un buffer...", value: null }}
//                   value={srcLink.buffer?.value}
//                 />
//               </View>
//             )}

//             {/* THREAD SOURCE */}
//             <Text style={styles.label}>Hilo</Text>
//             <CustomPicker
//               onValueChange={handleSrcThreadChange}
//               items={srcLink.threads}
//               placeholder={{ 
//                 label: srcLink.threads.length === 0 
//                   ? "No hay hilos disponibles" 
//                   : "Seleccione un hilo...", 
//                 value: null 
//               }}
//               value={srcLink.thread}
//               disabled={srcLink.threads.length === 0}
//             />
//           </View>
//         </View>

//         {/* SECCIÓN DESTINATION */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Destino</Text>
          
//           <View style={styles.formCard}>
//             <Text style={styles.label}>Fibra</Text>
//             <CustomPicker
//               onValueChange={handleDstFiberChange}
//               items={fibersData}
//               placeholder={{ 
//                 label: fibersData.length === 0 
//                   ? "No hay fibras disponibles" 
//                   : "Seleccione una fibra...", 
//                 value: null 
//               }}
//               value={dstLink.fiber?.value}
//               disabled={fibersData.length === 0}
//             />

//             {/* BUFFER DESTINATION */}
//             {dstLink.fiber?.buffers && dstLink.fiber.buffers.length > 1 && (
//               <View>
//                 <Text style={styles.label}>Buffer</Text>
//                 <CustomPicker
//                   onValueChange={handleDstBufferChange}
//                   items={dstLink.fiber.buffers}
//                   placeholder={{ label: "Seleccione un buffer...", value: null }}
//                   value={dstLink.buffer?.value}
//                 />
//               </View>
//             )}

//             {/* THREAD DESTINATION */}
//             <Text style={styles.label}>Hilo</Text>
//             <CustomPicker
//               onValueChange={handleDstThreadChange}
//               items={dstLink.threads}
//               placeholder={{ 
//                 label: dstLink.threads.length === 0 
//                   ? "No hay hilos disponibles" 
//                   : "Seleccione un hilo...", 
//                 value: null 
//               }}
//               value={dstLink.thread}
//               disabled={dstLink.threads.length === 0}
//             />
//           </View>
//         </View>

//         {/* BOTONES */}
//         <View style={{ flexDirection: 'row', gap: 10, marginTop: 20 }}>
//           <TouchableOpacity 
//             style={[styles.button, { 
//               flex: 1, 
//               backgroundColor: colors.danger,
//             }]}
//             onPress={() => navigation.goBack()}
//           >
//             <Text style={styles.buttonText}>Cancelar</Text>
//           </TouchableOpacity>
          
//           <TouchableOpacity 
//             style={[styles.button, { 
//               flex: 1,
//               backgroundColor: (srcLink.fiber && srcLink.thread && dstLink.fiber && dstLink.thread) 
//                 ? colors.success 
//                 : '#cccccc'
//             }]}
//             onPress={handleSave}
//             disabled={!srcLink.fiber || !srcLink.thread || !dstLink.fiber || !dstLink.thread}
//           >
//             <Text style={styles.buttonText}>Guardar</Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     );
//   };

//   return (
//     <View style={[stylesFull.screen, styles.container]}>
//       {/* HEADER */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//           <Ionicons name="arrow-back" size={24} color={colors.text} />
//         </TouchableOpacity>

//         <Text style={styles.headerTitle}>Enlace de Fusión</Text>

//         <View style={styles.headerActions}>
//           <TouchableOpacity onPress={() => console.log('Debug info')} style={styles.mapButton}>
//             <Ionicons name="information-circle" size={20} color={colors.primary} />
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* CONTENIDO */}
//       {renderContent()}
//     </View>
//   );
// };

// export default FusionLink;

// components/screens/FusionLink.js
import React, { useState, useEffect } from "react";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useApp } from "../context/AppContext";
import { useTranslation } from "../hooks/useTranslation";
import { useDevice } from "../context/DeviceContext";
import { useAdapter } from "@/api/contexts/DatabaseContext";

import RNPickerSelect from "react-native-picker-select";

const FusionLink = ({ route, navigation }) => {
  const adapter = useAdapter()();
  const { getFibersByProjectId } = adapter;

  const { topInset, bottomInset, stylesFull } = useDevice();
  const { isDarkMode } = useApp();
  const { t } = useTranslation();

  // Obtener parámetros con valores por defecto
  const { 
    projectId: routeProjectId, 
    link, 
    linkHash, 
    node,
    project 
  } = route.params || {};

  // Determinar projectId de múltiples fuentes posibles
  const projectId = routeProjectId || project?.id || node?.projectId;
  
  console.log('🔷 FusionLink - Params:', { 
    routeProjectId, 
    projectId, 
    node: node?.label,
    nodeType: node?.typeId,
    hasLink: !!link 
  });

  const [fibersData, setFibersData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [srcLink, setSrcLink] = useState({
    fiber: null,
    buffer: null,
    thread: null,
    threads: [],
  });
  
  const [dstLink, setDstLink] = useState({
    fiber: null,
    buffer: null,
    thread: null,
    threads: [],
  });

  const colors = {
    primary: "#3498db",
    success: "#2ecc71",
    warning: "#f39c12",
    danger: "#e74c3c",
    background: isDarkMode ? "#121212" : "#ffffff",
    card: isDarkMode ? "#1e1e1e" : "#ffffff",
    text: isDarkMode ? "#ffffff" : "#2c3e50",
    subText: isDarkMode ? "#b0b0b0" : "#7f8c8d",
    border: isDarkMode ? "#333" : "#ecf0f1",
    inputBackground: isDarkMode ? "#2a2a2a" : "#f8f9fa",
    placeholder: isDarkMode ? "#888888" : "#a0a0a0",
    cardBackground: isDarkMode ? "#1e1e1e" : "#f6f1f1be",
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: colors.card,
      padding: 16,
      paddingTop: topInset - 10,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    backButton: {
      padding: 4,
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: "600",
      color: colors.text,
    },
    headerActions: {
      flexDirection: "row",
      alignItems: "center",
    },
    mapButton: {
      padding: 4,
      marginLeft: 10,
    },
    content: {
      flex: 1,
      padding: 16,
    },
    section: {
      marginBottom: 25,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "700",
      color: colors.text,
      marginBottom: 15,
    },
    label: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.text,
      marginBottom: 8,
      marginTop: 12,
    },
    formCard: {
      backgroundColor: colors.cardBackground,
      borderRadius: 14,
      padding: 16,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: colors.border,
    },
    linkContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 10,
    },
    pickerContainer: {
      flex: 1,
      marginHorizontal: 5,
    },
    button: {
      backgroundColor: colors.primary,
      padding: 16,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 20,
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 16,
    },
    loadingContainer: {
      padding: 20,
      alignItems: 'center',
    },
    debugInfo: {
      fontSize: 12,
      color: colors.subText,
      marginTop: 4,
    },
    warningBox: {
      padding: 10,
      backgroundColor: colors.warning + '20',
      borderRadius: 8,
      marginBottom: 10,
    },
    warningText: {
      color: colors.warning,
      textAlign: 'center',
    },
    errorBox: {
      padding: 15,
      backgroundColor: colors.danger + '20',
      borderRadius: 8,
      marginBottom: 10,
    },
    errorText: {
      color: colors.danger,
      textAlign: 'center',
      fontWeight: 'bold',
    },
    pickerWebContainer: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
      backgroundColor: colors.inputBackground,
      marginBottom: 16,
    },
    pickerWeb: {
      width: '100%',
      height: 50,
      paddingHorizontal: 10,
      color: colors.text,
      backgroundColor: colors.inputBackground,
      borderWidth: 0,
      borderRadius: 8,
    }
  });

  // COMPONENTE PICKER MEJORADO
  const CustomPicker = ({ items, onValueChange, value, placeholder, disabled = false }) => {
    if (Platform.OS === 'web') {
      return (
        <View style={styles.pickerWebContainer}>
          <select 
            style={styles.pickerWeb}
            value={value || ''}
            onChange={(e) => onValueChange(e.target.value ? e.target.value : null)}
            disabled={disabled}
          >
            <option value="">{placeholder?.label || "Seleccione..."}</option>
            {items.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </View>
      );
    }

    const pickerSelectStyles = {
      inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 8,
        color: colors.text,
        backgroundColor: colors.inputBackground,
        paddingRight: 30,
        marginVertical: 8,
      },
      inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 12,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 8,
        color: colors.text,
        backgroundColor: colors.inputBackground,
        paddingRight: 30,
        marginVertical: 8,
      },
      placeholder: {
        color: colors.placeholder,
      },
      iconContainer: {
        top: 12,
        right: 12,
      },
    };

    return (
      <RNPickerSelect
        onValueChange={onValueChange}
        items={items}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        style={pickerSelectStyles}
        useNativeAndroidPickerStyle={false}
        fixAndroidTouchableBug={true}
        Icon={() => {
          return <Ionicons name="chevron-down" size={20} color={colors.placeholder} />;
        }}
      />
    );
  };

  // 🔥 FUNCIÓN AUXILIAR PARA OBTENER COLOR POR ÍNDICE
  const getColorByIndex = (index) => {
    const colors = [
      "#0000FF", "#FFA500", "#008000", "#A52A2A",
      "#708090", "#FFFFFF", "#FF0000", "#000000", 
      "#FFFF00", "#EE82EE", "#FFC0CB", "#00FFFF"
    ];
    return colors[index % colors.length];
  };

  // 🔥 NUEVA FUNCIÓN MEJORADA PARA CARGAR FIBRAS
  const loadProjectFibers = async () => {
    try {
      setIsLoading(true);
      console.log('🔷 FusionLink - Iniciando carga de fibras para proyecto:', projectId);

      // VERIFICACIÓN CRÍTICA DE PROJECTID
      if (!projectId) {
        console.error('❌ FusionLink - NO HAY PROJECTID VÁLIDO');
        Alert.alert("Error", "No se pudo identificar el proyecto");
        setFibersData([]);
        setIsLoading(false);
        return;
      }

      // Obtener todas las fibras del proyecto (main fibers con parentFiberId = null)
      let mainFibers = await getFibersByProjectId(projectId, null);
      console.log('🔷 FusionLink - Fibras principales obtenidas:', mainFibers?.length || 0);

      if (!mainFibers || mainFibers.length === 0) {
        console.log('🔷 FusionLink - No se encontraron fibras principales');
        setFibersData([]);
        setIsLoading(false);
        return;
      }

      // PROCESAR CADA FIBRA PRINCIPAL Y SUS BUFFERS
      const processedFibers = [];

      for (const mainFiber of mainFibers) {
        try {
          console.log(`🔷 Procesando fibra: ${mainFiber.label} (ID: ${mainFiber.id})`);

          // Parsear metadata de la fibra principal
          let fiberMetadata = {};
          if (mainFiber.metadata) {
            try {
              fiberMetadata = JSON.parse(mainFiber.metadata);
              console.log(`   Metadata:`, fiberMetadata);
            } catch (e) {
              console.log(`   Error parsing metadata:`, e);
            }
          }

          // Obtener threads de la fibra principal
          const mainFiberThreads = fiberMetadata.threads || Array.from({length: 12}, (_, index) => ({
            number: index + 1,
            color: getColorByIndex(index),
            active: true,
            inUse: false
          }));

          // Crear objeto de fibra principal
          const mainFiberObj = {
            ...mainFiber,
            value: mainFiber.id,
            label: mainFiber.label,
            key: `fiber-${mainFiber.id}`,
            threads: mainFiberThreads,
            isMainFiber: true,
            buffers: [] // Inicializar array de buffers
          };

          // OBTENER BUFFERS (fibras hijas con parentFiberId = mainFiber.id)
          let buffers = [];
          try {
            const childFibers = await getFibersByProjectId(projectId, mainFiber.id);
            console.log(`   Buffers encontrados: ${childFibers?.length || 0}`);

            if (childFibers && childFibers.length > 0) {
              for (const bufferFiber of childFibers) {
                // Parsear metadata del buffer
                let bufferMetadata = {};
                if (bufferFiber.metadata) {
                  try {
                    bufferMetadata = JSON.parse(bufferFiber.metadata);
                  } catch (e) {
                    console.log(`   Error parsing buffer metadata:`, e);
                  }
                }

                // Obtener threads del buffer
                const bufferThreads = bufferMetadata.threads || Array.from({length: 12}, (_, index) => ({
                  number: index + 1,
                  color: getColorByIndex(index),
                  active: true,
                  inUse: false
                }));

                const bufferObj = {
                  ...bufferFiber,
                  value: bufferFiber.id,
                  label: bufferFiber.label,
                  key: `buffer-${bufferFiber.id}`,
                  threads: bufferThreads,
                  isBuffer: true,
                  parentFiberId: mainFiber.id
                };

                buffers.push(bufferObj);
              }
            }
          } catch (error) {
            console.error(`❌ Error cargando buffers para ${mainFiber.label}:`, error);
          }

          // Agregar la fibra principal como primer "buffer" (para selección)
          const allBuffers = [
            {
              ...mainFiberObj,
              label: `${mainFiber.label} (Principal)`,
              isMainFiber: true
            },
            ...buffers
          ];

          mainFiberObj.buffers = allBuffers;
          processedFibers.push(mainFiberObj);

        } catch (error) {
          console.error(`❌ Error procesando fibra ${mainFiber.label}:`, error);
        }
      }

      console.log('🔷 FusionLink - Fibras procesadas exitosamente:', processedFibers.length);
      
      // APLICAR FILTRADO SEGÚN TIPO DE NODO
      let filteredFibers = applyNodeFilter(processedFibers, node);
      console.log('🔷 FusionLink - Fibras después del filtro:', filteredFibers.length);

      setFibersData(filteredFibers);

      // CARGAR DATOS EXISTENTES SI HAY UN LINK
      if (link && filteredFibers.length > 0) {
        console.log('🔷 Cargando datos del link existente');
        loadExistingLinkData(filteredFibers);
      }

    } catch (error) {
      console.error('❌ Error general cargando fibras:', error);
      Alert.alert("Error", "No se pudieron cargar las fibras del proyecto");
    } finally {
      setIsLoading(false);
    }
  };

  // 🔥 FUNCIÓN PARA APLICAR FILTRO POR TIPO DE NODO
  const applyNodeFilter = (fibers, currentNode) => {
    if (!currentNode) return fibers;

    console.log('🔷 Aplicando filtro para nodo tipo:', currentNode.typeId);

    switch (currentNode.typeId) {
      case 4: // UNIT - Solo mostrar fibra DROP específica
        const nodeIdentifier = currentNode.id;
        console.log('🔷 Filtrando para UNIT:', nodeIdentifier);
        
        return fibers.filter(fiber => {
          // Para UNIT, mostrar solo la fibra DROP que tiene nodeId = currentNode.id
          const isDropFiber = fiber.nodeId === nodeIdentifier;
          console.log(`   Fiber ${fiber.label}: nodeId=${fiber.nodeId}, matches=${isDropFiber}`);
          return isDropFiber;
        });

      case 1: // MDF - Excluir fibras DROP (las que tienen nodeId)
        console.log('🔷 Filtrando para MDF - excluyendo DROP fibers');
        return fibers.filter(fiber => !fiber.nodeId);

      case 2: // IDF - Mostrar todas excepto DROP de unidades específicas
      case 3: // Pedestal - Mostrar todas excepto DROP de unidades específicas
        console.log('🔷 Filtrando para IDF/Pedestal - mostrando todas las fibras principales');
        return fibers.filter(fiber => !fiber.nodeId || fiber.nodeId === currentNode.id);

      default:
        return fibers;
    }
  };

  // 🔥 EFFECT MEJORADO PARA CARGAR FIBRAS
  useEffect(() => {
    loadProjectFibers();
  }, [projectId, node, link]);

  // 🔥 FUNCIÓN MEJORADA PARA CARGAR LINK EXISTENTE
  const loadExistingLinkData = (fibers) => {
    try {
      console.log('🔷 Cargando datos del link existente:', link);

      // SOURCE
      if (link.src) {
        const srcFiber = fibers.find(f => f.id === link.src.fiberId);
        if (srcFiber) {
          let srcBuffer = null;
          if (link.src.bufferId) {
            srcBuffer = srcFiber.buffers?.find(b => b.id === link.src.bufferId);
          }

          const actualFiber = srcBuffer || srcFiber;
          const srcThreads = buildThreads(actualFiber, actualFiber.threads, true);
          
          setSrcLink({
            fiber: srcFiber,
            buffer: srcBuffer,
            thread: link.src.thread + 1,
            threads: srcThreads,
          });

          console.log('🔷 Source cargado:', {
            fiber: srcFiber?.label,
            buffer: srcBuffer?.label,
            thread: link.src.thread + 1
          });
        }
      }

      // DESTINATION
      if (link.dst) {
        const dstFiber = fibers.find(f => f.id === link.dst.fiberId);
        if (dstFiber) {
          let dstBuffer = null;
          if (link.dst.bufferId) {
            dstBuffer = dstFiber.buffers?.find(b => b.id === link.dst.bufferId);
          }

          const actualFiber = dstBuffer || dstFiber;
          const dstThreads = buildThreads(actualFiber, actualFiber.threads, false);
          
          setDstLink({
            fiber: dstFiber,
            buffer: dstBuffer,
            thread: link.dst.thread + 1,
            threads: dstThreads,
          });

          console.log('🔷 Destination cargado:', {
            fiber: dstFiber?.label,
            buffer: dstBuffer?.label,
            thread: link.dst.thread + 1
          });
        }
      }

    } catch (error) {
      console.error('❌ Error cargando link existente:', error);
    }
  };

  // 🔥 FUNCIÓN MEJORADA PARA CONSTRUIR THREADS DISPONIBLES
  const buildThreads = (fiber, threads, isSource) => {
    if (!threads || !Array.isArray(threads)) {
      threads = Array.from({length: 12}, (_, index) => ({
        number: index + 1,
        color: getColorByIndex(index),
        active: true,
        inUse: false
      }));
    }

    // Filtrar threads activos y no en uso
    let availableThreads = threads.filter(thread => 
      thread.active === true && thread.inUse !== true
    );

    // Verificar threads ya usados en otros fusion links
    const fusionLinks = node?.fusionLinks || [];
    const usedThreads = new Set();

    fusionLinks.forEach(fusionLink => {
      if (!fusionLink.deleted && fusionLink.hash !== link?.hash) {
        const linkSide = isSource ? fusionLink.src : fusionLink.dst;
        if (linkSide && (linkSide.fiberId === fiber.id || linkSide.bufferId === fiber.id)) {
          usedThreads.add(linkSide.thread + 1);
        }
      }
    });

    // Filtrar threads disponibles
    const result = availableThreads
      .filter(thread => !usedThreads.has(thread.number))
      .map(thread => ({
        ...thread,
        value: thread.number,
        label: `${t("thread") || "Hilo"} ${thread.number}`,
        key: `thread-${thread.number}`,
      }));

    console.log(`🔷 Threads disponibles para ${fiber.label}:`, result.length);
    return result;
  };

  // MANEJADORES DE CAMBIOS
  const handleSrcFiberChange = (value) => {
    const fiber = fibersData.find((x) => x.value === value);
    
    if (fiber) {
      const threads = fiber.buffers && fiber.buffers.length <= 1 ? 
        buildThreads(fiber, fiber.threads, true) : [];
      
      setSrcLink({
        fiber: fiber,
        buffer: null,
        thread: null,
        threads: threads,
      });
    } else {
      setSrcLink({
        fiber: null,
        buffer: null,
        thread: null,
        threads: [],
      });
    }
  };

  const handleSrcBufferChange = (value) => {
    if (!srcLink.fiber) return;
    
    const buffer = srcLink.fiber.buffers.find((x) => x.value === value);
    if (buffer) {
      const threads = buildThreads(buffer, buffer.threads, true);
      setSrcLink({
        ...srcLink,
        buffer: buffer,
        thread: null,
        threads: threads,
      });
    }
  };

  const handleSrcThreadChange = (value) => {
    setSrcLink({
      ...srcLink,
      thread: value,
    });
  };

  const handleDstFiberChange = (value) => {
    const fiber = fibersData.find((x) => x.value === value);
    
    if (fiber) {
      const threads = fiber.buffers && fiber.buffers.length <= 1 ? 
        buildThreads(fiber, fiber.threads, false) : [];
      
      setDstLink({
        fiber: fiber,
        buffer: null,
        thread: null,
        threads: threads,
      });
    } else {
      setDstLink({
        fiber: null,
        buffer: null,
        thread: null,
        threads: [],
      });
    }
  };

  const handleDstBufferChange = (value) => {
    if (!dstLink.fiber) return;
    
    const buffer = dstLink.fiber.buffers.find((x) => x.value === value);
    if (buffer) {
      const threads = buildThreads(buffer, buffer.threads, false);
      setDstLink({
        ...dstLink,
        buffer: buffer,
        thread: null,
        threads: threads,
      });
    }
  };

  const handleDstThreadChange = (value) => {
    setDstLink({
      ...dstLink,
      thread: value,
    });
  };

  // 🔥 FUNCIÓN MEJORADA PARA GUARDAR
  const handleSave = () => {
    if (!srcLink.fiber || !srcLink.thread || !dstLink.fiber || !dstLink.thread) {
      Alert.alert("Error", "Por favor completa todos los campos requeridos");
      return;
    }

    // Validar que no sea el mismo thread en la misma fibra
    if (srcLink.fiber.id === dstLink.fiber.id && 
        srcLink.buffer?.id === dstLink.buffer?.id && 
        srcLink.thread === dstLink.thread) {
      Alert.alert("Error", "No puedes enlazar el mismo thread de la misma fibra");
      return;
    }

    const result = {
      src: {
        fiberId: srcLink.fiber.id,
        fiberLabel: srcLink.fiber.label,
        bufferId: srcLink.buffer?.id || null,
        bufferLabel: srcLink.buffer?.label || null,
        thread: srcLink.thread - 1, // Convertir a base 0
      },
      dst: {
        fiberId: dstLink.fiber.id,
        fiberLabel: dstLink.fiber.label,
        bufferId: dstLink.buffer?.id || null,
        bufferLabel: dstLink.buffer?.label || null,
        thread: dstLink.thread - 1, // Convertir a base 0
      },
      deleted: false,
      hash: link ? link.hash : linkHash || `link-${Date.now()}`,
    };

    console.log('💾 Guardando fusion link:', result);

    // Usar el contexto para guardar en lugar de params
    if (route.params?.onSaveFusionLink) {
      route.params.onSaveFusionLink(result);
      Alert.alert("Éxito", "Enlace de fusión guardado correctamente");
      navigation.goBack();
    } else {
      Alert.alert("Error", "No se pudo guardar el enlace de fusión - función no disponible");
    }
  };

  // RENDER MEJORADO
  const renderContent = () => {
    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <Text style={{ color: colors.text }}>Cargando fibras disponibles...</Text>
        </View>
      );
    }

    if (!projectId) {
      return (
        <View style={styles.content}>
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>
              Error: No se pudo identificar el proyecto
            </Text>
            <Text style={[styles.errorText, {fontSize: 14, marginTop: 10}]}>
              ProjectID recibido: {JSON.stringify(route.params)}
            </Text>
          </View>
          <TouchableOpacity 
            style={[styles.button, { backgroundColor: colors.danger }]}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Volver Atrás</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (fibersData.length === 0) {
      return (
        <View style={styles.content}>
          <View style={styles.warningBox}>
            <Text style={styles.warningText}>
              No hay fibras disponibles para este nodo
            </Text>
            <Text style={[styles.warningText, {marginTop: 10}]}>
              • Verifica que el proyecto tenga fibras creadas{'\n'}
              • Para unidades, asegúrate de tener la fibra DROP asignada{'\n'}
              • Para MDF/IDF, verifica que hayas agregado fibras principales
            </Text>
          </View>
          
          <View style={styles.debugInfo}>
            <Text style={styles.debugInfo}>
              ProjectID: {projectId} | Nodo: {node?.label} | Tipo: {node?.typeId}
            </Text>
          </View>

          <TouchableOpacity 
            style={[styles.button, { backgroundColor: colors.danger }]}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Volver Atrás</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <ScrollView style={styles.content}>
        {/* INFO DEL PROYECTO */}
        <View style={styles.debugInfo}>
          <Text style={[styles.debugInfo, {marginBottom: 10}]}>
            Proyecto ID: {projectId} | Fibras disponibles: {fibersData.length}
            {node && ` | Nodo: ${node.label} (Tipo: ${node.typeId})`}
          </Text>
        </View>

        {/* SECCIÓN SOURCE */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Fuente</Text>
          
          <View style={styles.formCard}>
            <Text style={styles.label}>Fibra</Text>
            <CustomPicker
              onValueChange={handleSrcFiberChange}
              items={fibersData}
              placeholder={{ 
                label: fibersData.length === 0 
                  ? "No hay fibras disponibles" 
                  : "Seleccione una fibra...", 
                value: null 
              }}
              value={srcLink.fiber?.value}
              disabled={fibersData.length === 0}
            />

            {/* BUFFER SOURCE */}
            {srcLink.fiber?.buffers && srcLink.fiber.buffers.length > 1 && (
              <View>
                <Text style={styles.label}>Buffer</Text>
                <CustomPicker
                  onValueChange={handleSrcBufferChange}
                  items={srcLink.fiber.buffers}
                  placeholder={{ label: "Seleccione un buffer...", value: null }}
                  value={srcLink.buffer?.value}
                />
              </View>
            )}

            {/* THREAD SOURCE */}
            <Text style={styles.label}>Hilo</Text>
            <CustomPicker
              onValueChange={handleSrcThreadChange}
              items={srcLink.threads}
              placeholder={{ 
                label: srcLink.threads.length === 0 
                  ? "No hay hilos disponibles" 
                  : "Seleccione un hilo...", 
                value: null 
              }}
              value={srcLink.thread}
              disabled={srcLink.threads.length === 0}
            />
          </View>
        </View>

        {/* SECCIÓN DESTINATION */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Destino</Text>
          
          <View style={styles.formCard}>
            <Text style={styles.label}>Fibra</Text>
            <CustomPicker
              onValueChange={handleDstFiberChange}
              items={fibersData}
              placeholder={{ 
                label: fibersData.length === 0 
                  ? "No hay fibras disponibles" 
                  : "Seleccione una fibra...", 
                value: null 
              }}
              value={dstLink.fiber?.value}
              disabled={fibersData.length === 0}
            />

            {/* BUFFER DESTINATION */}
            {dstLink.fiber?.buffers && dstLink.fiber.buffers.length > 1 && (
              <View>
                <Text style={styles.label}>Buffer</Text>
                <CustomPicker
                  onValueChange={handleDstBufferChange}
                  items={dstLink.fiber.buffers}
                  placeholder={{ label: "Seleccione un buffer...", value: null }}
                  value={dstLink.buffer?.value}
                />
              </View>
            )}

            {/* THREAD DESTINATION */}
            <Text style={styles.label}>Hilo</Text>
            <CustomPicker
              onValueChange={handleDstThreadChange}
              items={dstLink.threads}
              placeholder={{ 
                label: dstLink.threads.length === 0 
                  ? "No hay hilos disponibles" 
                  : "Seleccione un hilo...", 
                value: null 
              }}
              value={dstLink.thread}
              disabled={dstLink.threads.length === 0}
            />
          </View>
        </View>

        {/* BOTONES */}
        <View style={{ flexDirection: 'row', gap: 10, marginTop: 20 }}>
          <TouchableOpacity 
            style={[styles.button, { 
              flex: 1, 
              backgroundColor: colors.danger,
            }]}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, { 
              flex: 1,
              backgroundColor: (srcLink.fiber && srcLink.thread && dstLink.fiber && dstLink.thread) 
                ? colors.success 
                : '#cccccc'
            }]}
            onPress={handleSave}
            disabled={!srcLink.fiber || !srcLink.thread || !dstLink.fiber || !dstLink.thread}
          >
            <Text style={styles.buttonText}>Guardar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  };

  return (
    <View style={[stylesFull.screen, styles.container]}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          {link ? "Editar Enlace" : "Nuevo Enlace"} de Fusión
        </Text>

        <View style={styles.headerActions}>
          <TouchableOpacity 
            onPress={() => {
              console.log('🔍 Debug Info:', {
                projectId,
                fibersCount: fibersData.length,
                node: node?.label,
                srcLink,
                dstLink
              });
            }} 
            style={styles.mapButton}
          >
            <Ionicons name="information-circle" size={20} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* CONTENIDO */}
      {renderContent()}
    </View>
  );
};

export default FusionLink;