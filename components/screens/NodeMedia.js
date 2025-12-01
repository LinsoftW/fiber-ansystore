
// import React, { useState, useEffect, useRef } from "react";

// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   TextInput,
//   Alert,
//   Modal,
//   Share,
//   Platform,
//   PermissionsAndroid,
//   FlatList,
//   TouchableWithoutFeedback,
//   ActivityIndicator,
//   Image as RNImage,
//   Linking
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { useApp } from "../context/AppContext";
// import { useTranslation } from "../hooks/useTranslation";
// import { useDevice } from "../context/DeviceContext";
// import { useAdapter } from "@/api/contexts/DatabaseContext";

// import { v4 as uuidv4 } from "uuid";
// import RNPickerSelect from "react-native-picker-select";

// import { useFiberPath, formatPathForDisplay } from "../hooks/useFiberPath";
// import TimelineVertical from "@/utils/TimelineVertical";
// import { Button, Input } from "native-base";

// import * as FileSystem from 'expo-file-system';
// import * as MediaLibrary from 'expo-media-library';
// import * as DocumentPicker from 'expo-document-picker';
// import * as ImagePicker from 'expo-image-picker';

// const NodeMedia = ({ route, navigation }) => {
//   const { updateNode } = useAdapter()();

//   const { topInset, bottomInset, stylesFull } = useDevice();
//   const { isDarkMode, mimeTypesList } = useApp();
//   const { t } = useTranslation();
//   const { nodeId } = route.params;
//   const { nodeHash } = route.params;
//   const { media } = route.params;

//   const [showAttachModal, setShowAttachModal] = useState(false);
//   const [selectedMedia, setSelectedMedia] = useState(null);
//   const [mediaData, setMediaData] = useState(media);
//   const [loading, setLoading] = useState(false);
//   const [loadingMessage, setLoadingMessage] = useState("");

//   const colors = {
//     primary: "#3498db",
//     success: "#2ecc71",
//     warning: "#f39c12",
//     danger: "#e74c3c",
//     purple: "#9b59b6",
//     background: isDarkMode ? "#121212" : "#ffffff",
//     card: isDarkMode ? "#1e1e1e" : "#ffffff",
//     text: isDarkMode ? "#ffffff" : "#2c3e50",
//     subText: isDarkMode ? "#b0b0b0" : "#7f8c8d",
//     border: isDarkMode ? "#333" : "#ecf0f1",
//     inputBackground: isDarkMode ? "#2a2a2a" : "#f8f9fa",
//     placeholder: isDarkMode ? "#888888" : "#a0a0a0",
//     cardBackground: isDarkMode ? "#1e1e1e" : "white",
//   };

//   const styles = StyleSheet.create({
//     modalOverlay: {
//       flex: 1,
//       backgroundColor: "rgba(0, 0, 0, 0.6)",
//       justifyContent: "center",
//       alignItems: "center",
//       padding: 20,
//     },
//     modalContent: {
//       backgroundColor: colors.cardBackground,
//       padding: 25,
//       borderRadius: 16,
//       minWidth: 300,
//       alignItems: 'center',
//     },
//     modalTitle: {
//       fontSize: 20,
//       fontWeight: "700",
//       color: colors.text,
//       marginBottom: 20,
//       textAlign: "center",
//     },
//     modalItem: {
//       padding: 16,
//       fontSize: 16,
//       color: colors.text,
//       textAlign: 'center',
//     },
//     input: {
//       borderWidth: 1,
//       borderColor: colors.border,
//       borderRadius: 10,
//       padding: 14,
//       fontSize: 16,
//       backgroundColor: colors.inputBackground,
//       color: colors.text,
//       marginBottom: 15,
//     },
//     textArea: {
//       height: 70,
//       textAlignVertical: "top",
//     },
//     label: {
//       fontSize: 15,
//       fontWeight: "600",
//       color: colors.text,
//       marginBottom: 8,
//     },
//     header: {
//       flexDirection: "row",
//       alignItems: "center",
//       justifyContent: "space-between",
//       backgroundColor: "#ffffff",
//       padding: 16,
//       paddingTop: 50,
//       borderBottomWidth: 1,
//       borderBottomColor: "#ecf0f1",
//       shadowColor: "#000",
//       shadowOffset: { width: 0, height: 2 },
//       shadowOpacity: 0.1,
//       shadowRadius: 3,
//       elevation: 3,
//     },
//     backButton: {
//       padding: 4,
//     },
//     headerTitle: {
//       fontSize: 18,
//       fontWeight: "600",
//       color: "#2c3e50",
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
//     listContainer: {
//       flexGrow: 1,
//       padding: 10,
//     },
//     list: {
//       flex: 1,
//     },
//     itemContainer: {
//       backgroundColor: "#fff",
//       borderRadius: 12,
//       marginBottom: 10,
//       shadowColor: "#000",
//       shadowOffset: {
//         width: 0,
//         height: 2,
//       },
//       shadowOpacity: 0.1,
//       shadowRadius: 3,
//       elevation: 3,
//       borderWidth: 1,
//       borderColor: "#f0f0f0",
//       position: "relative",
//     },
//     itemContent: {
//       flexDirection: "row",
//       padding: 12,
//     },
//     deleteButton: {
//       position: "absolute",
//       top: -8,
//       right: -8,
//       width: 28,
//       height: 28,
//       borderRadius: 14,
//       backgroundColor: "#ff4444",
//       justifyContent: "center",
//       alignItems: "center",
//       zIndex: 10,
//       shadowColor: "#000",
//       shadowOffset: {
//         width: 0,
//         height: 1,
//       },
//       shadowOpacity: 0.2,
//       shadowRadius: 2,
//       elevation: 3,
//       borderWidth: 2,
//       borderColor: "#fff",
//     },
//     deleteButtonText: {
//       color: "#fff",
//       fontSize: 18,
//       fontWeight: "bold",
//       lineHeight: 20,
//       marginTop: -1,
//     },
//     previewContainer: {
//       width: 80,
//       height: 80,
//       borderRadius: 8,
//       overflow: "hidden",
//       marginRight: 12,
//       justifyContent: "center",
//       alignItems: "center",
//       backgroundColor: "#f8f8f8",
//     },
//     imagePreview: {
//       width: "100%",
//       height: "100%",
//     },
//     errorPreview: {
//       width: "100%",
//       height: "100%",
//       justifyContent: "center",
//       alignItems: "center",
//       backgroundColor: "#ffebee",
//     },
//     errorIcon: {
//       fontSize: 20,
//       marginBottom: 4,
//     },
//     errorText: {
//       fontSize: 10,
//       color: "#d32f2f",
//       fontWeight: "bold",
//     },
//     videoPreview: {
//       width: "100%",
//       height: "100%",
//       justifyContent: "center",
//       alignItems: "center",
//       backgroundColor: "#e3f2fd",
//     },
//     documentPreview: {
//       width: "100%",
//       height: "100%",
//       justifyContent: "center",
//       alignItems: "center",
//       backgroundColor: "#e8f5e8",
//     },
//     unknownPreview: {
//       width: "100%",
//       height: "100%",
//       justifyContent: "center",
//       alignItems: "center",
//       backgroundColor: "#f5f5f5",
//     },
//     videoIcon: {
//       fontSize: 24,
//       marginBottom: 4,
//       color: "#1976d2",
//     },
//     documentIcon: {
//       fontSize: 24,
//       marginBottom: 4,
//       color: "#388e3c",
//     },
//     unknownIcon: {
//       fontSize: 24,
//       marginBottom: 4,
//       color: "#757575",
//     },
//     videoText: {
//       fontSize: 10,
//       fontWeight: "bold",
//       color: "#1976d2",
//     },
//     documentText: {
//       fontSize: 10,
//       fontWeight: "bold",
//       color: "#388e3c",
//     },
//     unknownText: {
//       fontSize: 10,
//       fontWeight: "bold",
//       color: "#757575",
//     },
//     infoContainer: {
//       flex: 1,
//       justifyContent: "space-between",
//     },
//     fileLabel: {
//       fontSize: 16,
//       fontWeight: "bold",
//       color: "#333",
//       marginBottom: 4,
//     },
//     type: {
//       fontSize: 12,
//       color: "#666",
//       marginBottom: 4,
//     },
//     comment: {
//       fontSize: 12,
//       color: "#888",
//       fontStyle: "italic",
//       marginBottom: 4,
//     },
//     dataSize: {
//       fontSize: 11,
//       color: "#999",
//     },
//     emptyContainer: {
//       flex: 1,
//       justifyContent: "center",
//       alignItems: "center",
//       paddingVertical: 60,
//     },
//     emptyIcon: {
//       fontSize: 64,
//       marginBottom: 16,
//       color: "#666",
//     },
//     emptyTitle: {
//       fontSize: 18,
//       fontWeight: "bold",
//       color: "#666",
//       marginBottom: 8,
//     },
//     emptySubtitle: {
//       fontSize: 14,
//       color: "#999",
//       textAlign: "center",
//       paddingHorizontal: 20,
//     },
//     errorContainer: {
//       justifyContent: 'center',
//       alignItems: 'center',
//       backgroundColor: '#ffebee',
//     },
//     openButton: {
//       backgroundColor: '#3498db',
//       paddingHorizontal: 12,
//       paddingVertical: 6,
//       borderRadius: 6,
//       marginTop: 5,
//     },
//     openButtonText: {
//       color: '#fff',
//       fontSize: 10,
//       fontWeight: 'bold',
//     },
//     loadingContent: {
//       alignItems: 'center',
//       justifyContent: 'center',
//       padding: 20,
//     },
//     cancelButton: {
//       marginTop: 20,
//       padding: 12,
//       backgroundColor: '#e74c3c',
//       borderRadius: 8,
//       minWidth: 120,
//       alignItems: 'center',
//     },
//     cancelButtonText: {
//       color: 'white',
//       fontWeight: 'bold',
//       fontSize: 16,
//     },
//   });

//   // Función mejorada para mostrar el file picker
//   const showFilePicker = () => {
//     return new Promise((resolve, reject) => {
//       Alert.alert(
//         "Seleccionar archivo",
//         "¿Cómo quieres agregar el archivo?",
//         [
//           {
//             text: "Galería",
//             onPress: async () => {
//               try {
//                 console.log("Seleccionando desde galería...");
//                 const file = await pickFromGallery();
//                 resolve(file);
//               } catch (error) {
//                 console.error("Error en galería:", error);
//                 reject(error);
//               }
//             }
//           },
//           {
//             text: "Cámara",
//             onPress: async () => {
//               try {
//                 console.log("Abriendo cámara...");
//                 const file = await takePhoto();
//                 resolve(file);
//               } catch (error) {
//                 console.error("Error en cámara:", error);
//                 reject(error);
//               }
//             }
//           },
//           {
//             text: "Documentos",
//             onPress: async () => {
//               try {
//                 console.log("Seleccionando documento...");
//                 const file = await pickDocument();
//                 resolve(file);
//               } catch (error) {
//                 console.error("Error en documentos:", error);
//                 reject(error);
//               }
//             }
//           },
//           {
//             text: "Cancelar",
//             style: "cancel",
//             onPress: () => {
//               console.log("Selección cancelada");
//               resolve(null);
//             }
//           }
//         ]
//       );
//     });
//   };

//   const pickFromGallery = async () => {
//     try {
//       const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//       if (status !== 'granted') {
//         Alert.alert('Permiso denegado', 'Necesitamos permisos para acceder a tu galería.');
//         return null;
//       }

//       const result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.All,
//         allowsEditing: false,
//         quality: 0.8,
//         base64: false,
//       });

//       if (!result.canceled && result.assets && result.assets.length > 0) {
//         const asset = result.assets[0];
//         const fileName = asset.fileName || `image_${Date.now()}.jpg`;
        
//         return {
//           uri: asset.uri,
//           name: fileName,
//           fileName: fileName,
//           type: asset.type || 'image',
//           mimeType: asset.mimeType || 'image/jpeg',
//           size: asset.fileSize || 0,
//           file: {
//             size: asset.fileSize || 0,
//             type: asset.mimeType || 'image/jpeg'
//           }
//         };
//       }
//       return null;
//     } catch (error) {
//       console.error("Error picking from gallery:", error);
//       Alert.alert("Error", "No se pudo acceder a la galería");
//       return null;
//     }
//   };
  
//   const takePhoto = async () => {
//     try {
//       const { status } = await ImagePicker.requestCameraPermissionsAsync();
//       if (status !== 'granted') {
//         Alert.alert('Permiso denegado', 'Necesitamos permisos para acceder a tu cámara.');
//         return null;
//       }

//       const result = await ImagePicker.launchCameraAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.All,
//         allowsEditing: false,
//         quality: 0.8,
//         base64: false,
//       });

//       if (!result.canceled && result.assets && result.assets.length > 0) {
//         const asset = result.assets[0];
//         const fileName = `photo_${Date.now()}.jpg`;
        
//         return {
//           uri: asset.uri,
//           name: fileName,
//           fileName: fileName,
//           type: asset.type || 'image',
//           mimeType: asset.mimeType || 'image/jpeg',
//           size: asset.fileSize || 0,
//           file: {
//             size: asset.fileSize || 0,
//             type: asset.mimeType || 'image/jpeg'
//           }
//         };
//       }
//       return null;
//     } catch (error) {
//       console.error("Error taking photo/video:", error);
//       Alert.alert("Error", "No se pudo acceder a la cámara");
//       return null;
//     }
//   };
  
//   const pickDocument = async () => {
//     try {
//       const result = await DocumentPicker.getDocumentAsync({
//         type: '*/*',
//         copyToCacheDirectory: true,
//       });

//       if (result.assets && result.assets.length > 0) {
//         const asset = result.assets[0];
//         return {
//           uri: asset.uri,
//           name: asset.name,
//           fileName: asset.name,
//           type: getFileTypeFromMime(asset.mimeType),
//           mimeType: asset.mimeType || 'application/octet-stream',
//           size: asset.size || 0,
//           file: {
//             size: asset.size || 0,
//             type: asset.mimeType || 'application/octet-stream'
//           }
//         };
//       }
//       return null;
//     } catch (error) {
//       console.error("Error picking document:", error);
//       Alert.alert("Error", "No se pudo seleccionar el documento");
//       return null;
//     }
//   };
  
//   const getFileTypeFromMime = (mimeType) => {
//     if (!mimeType) return 'document';
    
//     if (mimeType.startsWith('image/')) return 'image';
//     if (mimeType.startsWith('video/')) return 'video';
//     if (mimeType.startsWith('audio/')) return 'audio';
    
//     return 'document';
//   };

//   const handleSave = () => {
//     if (route.params?.onSaveNodeMedia) {
//       const upd = {
//         nodeId: nodeId,
//         nodeHash: nodeHash,
//         media: mediaData,
//       };
//       route.params.onSaveNodeMedia(upd);
//     }
//     navigation.goBack();
//   };

//   // Función mejorada para abrir archivos en móvil
//   const openMediaFile = async (item) => {
//     try {
//       const { content } = item;
//       const { data, mimeType, type } = content;

//       if (!data) {
//         Alert.alert("Error", "No hay datos para mostrar");
//         return;
//       }

//       if (data.startsWith('data:')) {
//         const base64Data = data.split(',')[1];
//         const fileName = `media_${Date.now()}.${getFileExtension(mimeType)}`;
//         const fileUri = `${FileSystem.cacheDirectory}${fileName}`;
        
//         await FileSystem.writeAsStringAsync(fileUri, base64Data, {
//           encoding: FileSystem.EncodingType.Base64,
//         });

//         const canOpen = await Linking.canOpenURL(`file://${fileUri}`);
//         if (canOpen) {
//           await Linking.openURL(`file://${fileUri}`);
//         } else {
//           Alert.alert(
//             "Abrir archivo",
//             `No se pudo abrir el archivo automáticamente. Tipo: ${mimeType}`,
//             [{ text: "OK", style: "cancel" }]
//           );
//         }
//       } else {
//         const canOpen = await Linking.canOpenURL(data);
//         if (canOpen) {
//           await Linking.openURL(data);
//         } else {
//           Alert.alert("Error", "No se puede abrir este tipo de archivo");
//         }
//       }
//     } catch (error) {
//       console.error("Error al abrir archivo:", error);
//       Alert.alert("Error", "No se pudo abrir el archivo");
//     }
//   };

//   const getFileExtension = (mimeType) => {
//     const extensions = {
//       'image/jpeg': 'jpg',
//       'image/png': 'png',
//       'image/gif': 'gif',
//       'image/webp': 'webp',
//       'video/mp4': 'mp4',
//       'video/quicktime': 'mov',
//       'application/pdf': 'pdf',
//       'application/msword': 'doc',
//       'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
//       'text/plain': 'txt',
//     };
//     return extensions[mimeType] || 'bin';
//   };

//   const convertFileToBase64 = async (file) => {
//     try {
//       console.log("Convirtiendo archivo a base64:", file.uri);
      
//       const response = await fetch(file.uri);
//       const blob = await response.blob();
      
//       return new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.onload = () => {
//           console.log("Conversión a base64 completada");
//           resolve(reader.result);
//         };
//         reader.onerror = (error) => {
//           console.error("Error en FileReader:", error);
//           reject(new Error("No se pudo leer el archivo"));
//         };
//         reader.readAsDataURL(blob);
//       });
//     } catch (error) {
//       console.error('Error converting file to base64:', error);
//       throw new Error(`Error al convertir el archivo: ${error.message}`);
//     }
//   };

//   // FUNCIÓN CORREGIDA - Manejo mejorado del estado de loading
//   // const handleAttachFile = async () => {
//   //   console.log("handleAttachFile llamado");
    
//   //   let loadingTimeout = null;
    
//   //   try {
//   //     console.log("Llamando a showFilePicker...");
//   //     const file = await showFilePicker();
//   //     console.log("Archivo retornado:", file);
      
//   //     if (!file) {
//   //       console.log("No se seleccionó archivo");
//   //       return;
//   //     }

//   //     // Verificar tipo permitido
//   //     const allowedTypes = mimeTypesList && mimeTypesList();
//   //     console.log("Tipos permitidos:", allowedTypes);
      
//   //     if (allowedTypes && allowedTypes.length > 0 && !allowedTypes.includes(file.mimeType)) {
//   //       console.log("Tipo no permitido:", file.mimeType);
//   //       Alert.alert("Error", "Tipo de archivo no permitido");
//   //       return;
//   //     }

//   //     // MOSTRAR LOADING INMEDIATAMENTE
//   //     setLoadingMessage("Procesando archivo...");
//   //     setLoading(true);
      
//   //     // Timeout de seguridad
//   //     loadingTimeout = setTimeout(() => {
//   //       console.warn("Timeout de seguridad - cerrando loading");
//   //       setLoading(false);
//   //       Alert.alert("Timeout", "La operación está tomando demasiado tiempo. Inténtalo de nuevo.");
//   //     }, 45000); // 45 segundos

//   //     console.log("Convirtiendo a base64...");
      
//   //     // Asegurar nombre de archivo válido
//   //     const fileName = file.name || 
//   //                    file.fileName || 
//   //                    `file_${Date.now()}.${getFileExtension(file.mimeType)}`;
      
//   //     console.log("Nombre de archivo:", fileName);
      
//   //     const base64String = await convertFileToBase64(file);
//   //     console.log("Conversión a base64 completada");
      
//   //     // LIMPIAR TIMEOUT Y CERRAR LOADING
//   //     clearTimeout(loadingTimeout);
//   //     setLoading(false);
      
//   //     const newMedia = {
//   //       hash: uuidv4(),
//   //       label: fileName,
//   //       comment: '',
//   //       content: {
//   //         mimeType: file.mimeType,
//   //         fileType: file.type,
//   //         size: file.file?.size || file.size || 0,
//   //         type: file.type,
//   //         data: base64String
//   //       }
//   //     };

//   //     console.log("Nuevo media creado");
      
//   //     const upd = [...mediaData, newMedia];
//   //     setMediaData(upd);
//   //     console.log("MediaData actualizado, total items:", upd.length);
      
//   //     Alert.alert("Éxito", "Archivo agregado correctamente");
      
//   //   } catch (error) {
//   //     // ASEGURARSE DE CERRAR LOADING EN ERRORES
//   //     console.error("Error en handleAttachFile:", error);
//   //     if (loadingTimeout) clearTimeout(loadingTimeout);
//   //     setLoading(false);
//   //     Alert.alert("Error", "No se pudo seleccionar el archivo: " + error.message);
//   //   }
//   // };
//   // VERSIÓN SIMPLIFICADA - Sin modal de loading
// const handleAttachFile = async () => {
//   console.log("handleAttachFile llamado");
  
//   try {
//     const file = await showFilePicker();
    
//     if (!file) {
//       return;
//     }

//     // Verificar tipo permitido
//     const allowedTypes = mimeTypesList && mimeTypesList();
//     if (allowedTypes && allowedTypes.length > 0 && !allowedTypes.includes(file.mimeType)) {
//       Alert.alert("Error", "Tipo de archivo no permitido");
//       return;
//     }

//     // Solo deshabilitar el botón en lugar de mostrar modal
//     setLoading(true);

//     const fileName = file.name || 
//                    file.fileName || 
//                    `file_${Date.now()}.${getFileExtension(file.mimeType)}`;
    
//     const base64String = await convertFileToBase64(file);
    
//     // Siempre asegurar que loading sea false
//     setLoading(false);
    
//     const newMedia = {
//       hash: uuidv4(),
//       label: fileName,
//       comment: '',
//       content: {
//         mimeType: file.mimeType,
//         fileType: file.type,
//         size: file.file?.size || file.size || 0,
//         type: file.type,
//         data: base64String
//       }
//     };

//     const upd = [...mediaData, newMedia];
//     setMediaData(upd);
    
//     Alert.alert("Éxito", "Archivo agregado correctamente");
    
//   } catch (error) {
//     // Garantizar que loading sea false en errores
//     setLoading(false);
//     Alert.alert("Error", "No se pudo seleccionar el archivo: " + error.message);
//   }
// };

//   // Función para cancelar manualmente el loading
//   const handleCancelLoading = () => {
//     console.log("Cancelando operación...");
//     setLoading(false);
//   };

//   const onItemPress = async (item, index) => {
//     if (Platform.OS !== 'web') {
//       await openMediaFile(item);
//     } else {
//       setSelectedMedia(item);
//       setShowAttachModal(true);
//     }
//   };

//   const handleApplyChanges = () => {
//     let index = -1;
//     if (selectedMedia?.id !== undefined)
//       index = mediaData.findIndex((x) => x.id === selectedMedia.id);
//     else if (selectedMedia?.hash !== undefined)
//       index = mediaData.findIndex((x) => x.hash === selectedMedia.hash);

//     if (index !== -1) {
//       let upd = [...mediaData];
//       upd[index] = selectedMedia;
//       setMediaData(upd);
//       setShowAttachModal(false);
//     }
//   };

//   const handleDelete = (item, index) => {
//     Alert.alert(
//       "Eliminar archivo",
//       `¿Estás seguro de que quieres eliminar "${item.label}"?`,
//       [
//         { text: "Cancelar", style: "cancel" },
//         {
//           text: "Eliminar",
//           style: "destructive",
//           onPress: () => {
//             let upd = [...mediaData];
//             upd[index] = {
//               ...mediaData[index],
//               deleted: true,
//             };
//             setMediaData(upd);
//           }
//         },
//       ]
//     );
//   };

//   // Resto del código de renderMediaItem se mantiene igual...
//   const renderMediaItem = ({ item, index }) => {
//     const meta = item.content;
//     const { label, comment } = item;
//     const { type, size, data, mimeType } = meta;

//     const handlePress = () => {
//       onItemPress(item, index);
//     };

//     const handleLongPress = () => {
//       Alert.alert("Opciones", `Archivo: ${label || "Sin nombre"}`, [
//         { text: "Cancelar", style: "cancel" },
//         {
//           text: "Eliminar",
//           style: "destructive",
//           onPress: () => handleDelete(item, index),
//         },
//         Platform.OS === 'web' && {
//           text: "Editar",
//           onPress: () => {
//             setSelectedMedia(item);
//             setShowAttachModal(true);
//           }
//         }
//       ].filter(Boolean));
//     };

//     function formatBytes(bytes, decimals = 2) {
//       if (!bytes || bytes === 0) return '0 B';
//       const k = 1024;
//       const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
//       const i = Math.min(
//         Math.floor(Math.log(bytes) / Math.log(k)),
//         sizes.length - 1
//       );
//       let value = bytes / Math.pow(k, i);
//       if (value >= 1023.995 && i < sizes.length - 1) {
//         value = 1;
//       }
//       return `${parseFloat(value.toFixed(decimals))} ${sizes[i]}`;
//     }

//     const ImageRenderer = ({ source, style, resizeMode = 'cover' }) => {
//       const [imageError, setImageError] = React.useState(false);

//       if (Platform.OS === 'web') {
//         if (imageError || !source?.uri) {
//           return (
//             <View style={[style, styles.errorContainer]}>
//               <Text>No se puede cargar la imagen</Text>
//             </View>
//           );
//         }
//         return (
//           <img
//             src={source.uri}
//             style={{
//               width: '100%',
//               height: '100%',
//               objectFit: resizeMode,
//               borderRadius: style?.borderRadius || 0,
//             }}
//             onError={() => setImageError(true)}
//             alt="Preview"
//           />
//         );
//       }

//       return (
//         <RNImage
//           source={source}
//           style={style}
//           resizeMode={resizeMode}
//           onError={() => setImageError(true)}
//         />
//       );
//     };

//     const getImageSource = (base64Data, mimeType = 'image/jpeg') => {
//       if (!base64Data) return null;
//       if (base64Data.startsWith('data:')) {
//         return { uri: base64Data };
//       }
//       return { uri: `data:${mimeType};base64,${base64Data}` };
//     };

//     const imageSource = getImageSource(data, mimeType);

//     const renderPreview = () => {
//       if (type === "image" && data && imageSource) {
//         return (
//           <ImageRenderer
//             source={imageSource}
//             style={styles.imagePreview}
//             resizeMode="cover"
//           />
//         );
//       } else if (type === "image" && !data) {
//         return (
//           <View style={styles.errorPreview}>
//             <Text style={styles.errorIcon}>❌</Text>
//             <Text style={styles.errorText}>Error</Text>
//           </View>
//         );
//       } else if (type === "video") {
//         return (
//           <View style={styles.videoPreview}>
//             <Text style={styles.videoIcon}>🎬</Text>
//             <Text style={styles.videoText}>VIDEO</Text>
//             {Platform.OS !== 'web' && (
//               <TouchableOpacity 
//                 style={styles.openButton}
//                 onPress={() => openMediaFile(item)}
//               >
//                 <Text style={styles.openButtonText}>ABRIR</Text>
//               </TouchableOpacity>
//             )}
//           </View>
//         );
//       } else if (type === "document") {
//         return (
//           <View style={styles.documentPreview}>
//             <Text style={styles.documentIcon}>📄</Text>
//             <Text style={styles.documentText}>DOC</Text>
//             {Platform.OS !== 'web' && (
//               <TouchableOpacity 
//                 style={styles.openButton}
//                 onPress={() => openMediaFile(item)}
//               >
//                 <Text style={styles.openButtonText}>ABRIR</Text>
//               </TouchableOpacity>
//             )}
//           </View>
//         );
//       } else {
//         return (
//           <View style={styles.unknownPreview}>
//             <Text style={styles.unknownIcon}>❓</Text>
//             <Text style={styles.unknownText}>ARCHIVO</Text>
//             {Platform.OS !== 'web' && (
//               <TouchableOpacity 
//                 style={styles.openButton}
//                 onPress={() => openMediaFile(item)}
//               >
//                 <Text style={styles.openButtonText}>ABRIR</Text>
//               </TouchableOpacity>
//             )}
//           </View>
//         );
//       }
//     };

//     return (
//       <View style={styles.itemContainer}>
//         <TouchableOpacity
//           style={styles.deleteButton}
//           onPress={() => handleDelete(item, index)}
//           hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
//         >
//           <Text style={styles.deleteButtonText}>×</Text>
//         </TouchableOpacity>

//         <TouchableWithoutFeedback
//           onPress={handlePress}
//           onLongPress={handleLongPress}
//         >
//           <View style={styles.itemContent}>
//             <View style={styles.previewContainer}>
//               {renderPreview()}
//             </View>

//             <View style={styles.infoContainer}>
//               <Text style={styles.fileLabel} numberOfLines={1}>
//                 {label || `Archivo ${index + 1}`}
//               </Text>
//               <Text style={styles.type}>
//                 {`Tipo: ${type?.toUpperCase() || "DESCONOCIDO"}`}
//               </Text>
//               {comment ? (
//                 <Text style={styles.comment} numberOfLines={2}>
//                   {comment}
//                 </Text>
//               ) : null}
//               <Text style={styles.dataSize}>
//                 {`Tamaño: ${size ? formatBytes(size) : 'N/A'}`}
//               </Text>
//             </View>
//           </View>
//         </TouchableWithoutFeedback>
//       </View>
//     );
//   };

//   const renderEmptyState = () => (
//     <View style={styles.emptyContainer}>
//       <Text style={styles.emptyIcon}>📁</Text>
//       <Text style={styles.emptyTitle}>No hay archivos</Text>
//       <Text style={styles.emptySubtitle}>
//         Agrega imágenes, videos o documentos para verlos aquí
//       </Text>
//     </View>
//   );

//   return (
//     <View
//       style={[
//         stylesFull.screen,
//         { backgroundColor: colors.background },
//         { paddingBottom: bottomInset },
//       ]}
//     >
//       <View
//         style={[
//           styles.header,
//           { backgroundColor: colors.card, borderBottomColor: colors.border },
//           { paddingTop: topInset - 10 },
//         ]}
//       >
//         <TouchableOpacity
//           onPress={() => navigation.goBack()}
//           style={styles.backButton}
//         >
//           <Ionicons name="arrow-back" size={24} color="#2c3e50" />
//         </TouchableOpacity>

//         <Text style={[styles.headerTitle, { color: colors.text }]}>
//           {t("nodeMedia") || "Archivos Multimedia"}
//         </Text>

//         <View style={{ flexDirection: "row" }}>
//           <View style={styles.headerActions}>
//             <TouchableOpacity 
//               onPress={handleAttachFile} 
//               style={styles.mapButton}
//               disabled={loading}
//             >
//               <Ionicons name="attach" size={24} color={loading ? "#ccc" : "#3498db"} />
//             </TouchableOpacity>
//             <TouchableOpacity 
//               disabled={loading} 
//               onPress={handleSave} 
//               style={styles.mapButton}
//             >
//               <Ionicons name="save" size={24} color="#3498db" />
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>

//       <FlatList
//         data={mediaData.filter((x) => !x.deleted)}
//         renderItem={renderMediaItem}
//         keyExtractor={(item, index) =>
//           item.id?.toString() || item.hash?.toString() || index.toString()
//         }
//         ListEmptyComponent={renderEmptyState}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={[
//           styles.listContainer,
//           mediaData.filter((x) => !x.deleted).length === 0 && { flex: 1 }
//         ]}
//         style={styles.content}
//       />

//       <Modal
//         visible={showAttachModal}
//         transparent={true}
//         animationType="fade"
//         onRequestClose={() => setShowAttachModal(false)}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalTitle}>Información del Archivo</Text>
//             <Text style={[styles.label, { color: colors.text }]}>
//               Descripción
//             </Text>
//             <TextInput
//               style={styles.input}
//               value={selectedMedia != null ? selectedMedia.label : ""}
//               onChangeText={(text) => {
//                 setSelectedMedia((prev) => ({
//                   ...prev,
//                   label: text,
//                 }));
//               }}
//             />
//             <Text style={[styles.label, { color: colors.text }]}>
//               Comentario
//             </Text>
//             <TextInput
//               style={[styles.input, styles.textArea]}
//               value={selectedMedia != null ? selectedMedia.comment : ""}
//               onChangeText={(text) => {
//                 setSelectedMedia((prev) => ({
//                   ...prev,
//                   comment: text,
//                 }));
//               }}
//               multiline
//             />
//             <Button
//               onPress={handleApplyChanges}
//               style={{ marginTop: 20 }}
//             >
//               OK
//             </Button>
//           </View>
//         </View>
//       </Modal>

//       {/* MODAL DE LOADING MEJORADO */}
//       {/* <Modal
//         visible={loading}
//         transparent={true}
//         animationType="fade"
//         onRequestClose={handleCancelLoading}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalTitle}>Importando Archivo</Text>
//             <View style={styles.loadingContent}>
//               <ActivityIndicator size="large" color="#3498db" />
//               <Text style={styles.modalItem}>{loadingMessage}</Text>
//               <TouchableOpacity 
//                 style={styles.cancelButton}
//                 onPress={handleCancelLoading}
//               >
//                 <Text style={styles.cancelButtonText}>Cancelar</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal> */}
//     </View>
//   );
// };

// export default NodeMedia;

import React, { useState, useEffect, useRef } from "react";

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
  TouchableWithoutFeedback,
  ActivityIndicator,
  Image as RNImage,
  Linking
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useApp } from "../context/AppContext";
import { useTranslation } from "../hooks/useTranslation";
import { useDevice } from "../context/DeviceContext";
import { useAdapter } from "@/api/contexts/DatabaseContext";

import { v4 as uuidv4 } from "uuid";
import RNPickerSelect from "react-native-picker-select";

import { useFiberPath, formatPathForDisplay } from "../hooks/useFiberPath";
import TimelineVertical from "@/utils/TimelineVertical";
import { Button, Input } from "native-base";

import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';

const NodeMedia = ({ route, navigation }) => {
  const { updateNode } = useAdapter()();

  const { topInset, bottomInset, stylesFull } = useDevice();
  const { isDarkMode, mimeTypesList, updateNodeMediaData } = useApp();
  const { t } = useTranslation();
  const { nodeId } = route.params;
  const { nodeHash } = route.params;
  const { media } = route.params;

  const [showAttachModal, setShowAttachModal] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [mediaData, setMediaData] = useState(media || []);
  const [loading, setLoading] = useState(false);

  // DEBUG: Verificar los datos iniciales
  useEffect(() => {
    console.log("NodeMedia - Datos iniciales:", {
      nodeId,
      nodeHash,
      mediaCount: media?.length || 0,
      mediaDataCount: mediaData.length
    });

    // VALIDAR Y LIMPIAR DATOS INICIALES
  if (media && Array.isArray(media)) {
    const validatedMedia = media.map(item => validateMediaItem(item));
    setMediaData(validatedMedia);
    console.log("Media validado:", validatedMedia);
  }
  }, []);

  const colors = {
    primary: "#3498db",
    success: "#2ecc71",
    warning: "#f39c12",
    danger: "#e74c3c",
    purple: "#9b59b6",
    background: isDarkMode ? "#121212" : "#ffffff",
    card: isDarkMode ? "#1e1e1e" : "#ffffff",
    text: isDarkMode ? "#ffffff" : "#2c3e50",
    subText: isDarkMode ? "#b0b0b0" : "#7f8c8d",
    border: isDarkMode ? "#333" : "#ecf0f1",
    inputBackground: isDarkMode ? "#2a2a2a" : "#f8f9fa",
    placeholder: isDarkMode ? "#888888" : "#a0a0a0",
    cardBackground: isDarkMode ? "#1e1e1e" : "white",
  };

  const styles = StyleSheet.create({
    // ... (mantener todos los estilos igual)
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
      minWidth: 300,
      alignItems: 'center',
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
      fontSize: 16,
      color: colors.text,
      textAlign: 'center',
    },
    input: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 10,
      padding: 14,
      fontSize: 16,
      backgroundColor: colors.inputBackground,
      color: colors.text,
      marginBottom: 15,
    },
    textArea: {
      height: 70,
      textAlignVertical: "top",
    },
    label: {
      fontSize: 15,
      fontWeight: "600",
      color: colors.text,
      marginBottom: 8,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: "#ffffff",
      padding: 16,
      paddingTop: 50,
      borderBottomWidth: 1,
      borderBottomColor: "#ecf0f1",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 3,
    },
    backButton: {
      padding: 4,
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: "600",
      color: "#2c3e50",
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
    listContainer: {
      flexGrow: 1,
      padding: 10,
    },
    list: {
      flex: 1,
    },
    itemContainer: {
      backgroundColor: "#fff",
      borderRadius: 12,
      marginBottom: 10,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 3,
      borderWidth: 1,
      borderColor: "#f0f0f0",
      position: "relative",
    },
    itemContent: {
      flexDirection: "row",
      padding: 12,
    },
    deleteButton: {
      position: "absolute",
      top: -8,
      right: -8,
      width: 28,
      height: 28,
      borderRadius: 14,
      backgroundColor: "#ff4444",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 10,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 3,
      borderWidth: 2,
      borderColor: "#fff",
    },
    deleteButtonText: {
      color: "#fff",
      fontSize: 18,
      fontWeight: "bold",
      lineHeight: 20,
      marginTop: -1,
    },
    previewContainer: {
      width: 80,
      height: 80,
      borderRadius: 8,
      overflow: "hidden",
      marginRight: 12,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f8f8f8",
    },
    imagePreview: {
      width: "100%",
      height: "100%",
    },
    errorPreview: {
      width: "100%",
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#ffebee",
    },
    errorIcon: {
      fontSize: 20,
      marginBottom: 4,
    },
    errorText: {
      fontSize: 10,
      color: "#d32f2f",
      fontWeight: "bold",
    },
    videoPreview: {
      width: "100%",
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#e3f2fd",
    },
    documentPreview: {
      width: "100%",
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#e8f5e8",
    },
    unknownPreview: {
      width: "100%",
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f5f5f5",
    },
    videoIcon: {
      fontSize: 24,
      marginBottom: 4,
      color: "#1976d2",
    },
    documentIcon: {
      fontSize: 24,
      marginBottom: 4,
      color: "#388e3c",
    },
    unknownIcon: {
      fontSize: 24,
      marginBottom: 4,
      color: "#757575",
    },
    videoText: {
      fontSize: 10,
      fontWeight: "bold",
      color: "#1976d2",
    },
    documentText: {
      fontSize: 10,
      fontWeight: "bold",
      color: "#388e3c",
    },
    unknownText: {
      fontSize: 10,
      fontWeight: "bold",
      color: "#757575",
    },
    infoContainer: {
      flex: 1,
      justifyContent: "space-between",
    },
    fileLabel: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#333",
      marginBottom: 4,
    },
    type: {
      fontSize: 12,
      color: "#666",
      marginBottom: 4,
    },
    comment: {
      fontSize: 12,
      color: "#888",
      fontStyle: "italic",
      marginBottom: 4,
    },
    dataSize: {
      fontSize: 11,
      color: "#999",
    },
    emptyContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 60,
    },
    emptyIcon: {
      fontSize: 64,
      marginBottom: 16,
      color: "#666",
    },
    emptyTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#666",
      marginBottom: 8,
    },
    emptySubtitle: {
      fontSize: 14,
      color: "#999",
      textAlign: "center",
      paddingHorizontal: 20,
    },
    errorContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ffebee',
    },
    openButton: {
      backgroundColor: '#3498db',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 6,
      marginTop: 5,
    },
    openButtonText: {
      color: '#fff',
      fontSize: 10,
      fontWeight: 'bold',
    },
  });

  // Función mejorada para mostrar el file picker
  const showFilePicker = () => {
    return new Promise((resolve, reject) => {
      Alert.alert(
        "Seleccionar archivo",
        "¿Cómo quieres agregar el archivo?",
        [
          {
            text: "Galería",
            onPress: async () => {
              try {
                console.log("Seleccionando desde galería...");
                const file = await pickFromGallery();
                resolve(file);
              } catch (error) {
                console.error("Error en galería:", error);
                reject(error);
              }
            }
          },
          {
            text: "Cámara",
            onPress: async () => {
              try {
                console.log("Abriendo cámara...");
                const file = await takePhoto();
                resolve(file);
              } catch (error) {
                console.error("Error en cámara:", error);
                reject(error);
              }
            }
          },
          {
            text: "Documentos",
            onPress: async () => {
              try {
                console.log("Seleccionando documento...");
                const file = await pickDocument();
                resolve(file);
              } catch (error) {
                console.error("Error en documentos:", error);
                reject(error);
              }
            }
          },
          {
            text: "Cancelar",
            style: "cancel",
            onPress: () => {
              console.log("Selección cancelada");
              resolve(null);
            }
          }
        ]
      );
    });
  };

  const pickFromGallery = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permiso denegado', 'Necesitamos permisos para acceder a tu galería.');
        return null;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: false,
        quality: 0.8,
        base64: false,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        const fileName = asset.fileName || `image_${Date.now()}.jpg`;
        
        return {
          uri: asset.uri,
          name: fileName,
          fileName: fileName,
          type: asset.type || 'image',
          mimeType: asset.mimeType || 'image/jpeg',
          size: asset.fileSize || 0,
        };
      }
      return null;
    } catch (error) {
      console.error("Error picking from gallery:", error);
      Alert.alert("Error", "No se pudo acceder a la galería");
      return null;
    }
  };
  
  const takePhoto = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permiso denegado', 'Necesitamos permisos para acceder a tu cámara.');
        return null;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: false,
        quality: 0.8,
        base64: false,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        const fileName = `photo_${Date.now()}.jpg`;
        
        return {
          uri: asset.uri,
          name: fileName,
          fileName: fileName,
          type: asset.type || 'image',
          mimeType: asset.mimeType || 'image/jpeg',
          size: asset.fileSize || 0,
        };
      }
      return null;
    } catch (error) {
      console.error("Error taking photo/video:", error);
      Alert.alert("Error", "No se pudo acceder a la cámara");
      return null;
    }
  };
  
  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: true,
      });

      if (result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        return {
          uri: asset.uri,
          name: asset.name,
          fileName: asset.name,
          type: getFileTypeFromMime(asset.mimeType),
          mimeType: asset.mimeType || 'application/octet-stream',
          size: asset.size || 0,
        };
      }
      return null;
    } catch (error) {
      console.error("Error picking document:", error);
      Alert.alert("Error", "No se pudo seleccionar el documento");
      return null;
    }
  };
  
  const getFileTypeFromMime = (mimeType) => {
    if (!mimeType) return 'document';
    
    if (mimeType.startsWith('image/')) return 'image';
    if (mimeType.startsWith('video/')) return 'video';
    if (mimeType.startsWith('audio/')) return 'audio';
    
    return 'document';
  };

  // FUNCIÓN MEJORADA PARA GUARDAR
  // const handleSave = async () => {
  //   console.log("Guardando media...", {
  //     nodeId,
  //     nodeHash,
  //     mediaCount: mediaData.filter(x => !x.deleted).length,
  //     mediaData: mediaData
  //   });

  //   try {
  //     if (route.params?.onSaveNodeMedia) {
  //       const upd = {
  //         nodeId: nodeId,
  //         nodeHash: nodeHash,
  //         media: mediaData.filter(x => !x.deleted), // Solo enviar los no eliminados
  //       };
        
  //       console.log("Enviando datos para guardar:", upd);
  //       route.params.onSaveNodeMedia(upd);
  //     } else {
  //       console.warn("No hay callback onSaveNodeMedia definido");
  //     }
      
  //     // También actualizar en la base de datos directamente por si acaso
  //     if (updateNode) {
  //       await updateNode(nodeId, { media: mediaData.filter(x => !x.deleted) });
  //       console.log("Nodo actualizado en BD");
  //     }
      
  //     navigation.goBack();
  //   } catch (error) {
  //     console.error("Error al guardar:", error);
  //     Alert.alert("Error", "No se pudieron guardar los cambios");
  //   }
  // };

  const handleSave = async () => {
  console.log("Guardando media...", {
    nodeId,
    nodeHash,
    mediaCount: mediaData.filter(x => !x.deleted).length,
    mediaData: mediaData
  });

  try {
    // VERIFICACIÓN MEJORADA
    if (route.params?.onSaveNodeMedia) {
      const upd = {
        nodeId: nodeId,
        nodeHash: nodeHash,
        media: mediaData.filter(x => !x.deleted),
      };
      
      console.log("Enviando datos para guardar:", upd);
      route.params.onSaveNodeMedia(upd);
    } else {
      console.warn("No hay callback onSaveNodeMedia definido, guardando directamente en BD");
      
      // Guardar directamente en la base de datos
      if (updateNode) {
        await updateNode(nodeId, { 
          media: mediaData.filter(x => !x.deleted) 
        });
        console.log("Nodo actualizado directamente en BD");
        
        // Mostrar confirmación al usuario
        Alert.alert(
          "Éxito", 
          "Archivos guardados correctamente",
          [{ text: "OK", onPress: () => navigation.goBack() }]
        );
        return; // Salir aquí para evitar navigation.goBack() duplicado
      } else {
        Alert.alert("Error", "No se pudo guardar - falta configuración");
        return;
      }
    }
    
    navigation.goBack();
  } catch (error) {
    console.error("Error al guardar:", error);
    Alert.alert("Error", "No se pudieron guardar los cambios");
  }
};

//  const handleSave = async () => {
//     try {
//       // Guardar en la base de datos
//       // await saveMediaToDatabase(nodeId, media);
      
//       // Actualizar el contexto
//       updateNodeMediaData(nodeId, media);
//       // console.log("✅ Node media updated in context for node:", nodeLabel);
      
//       // Navegar de vuelta
//       navigation.goBack();
      
//     } catch (error) {
//       console.error("❌ Error saving node media:", error);
//       Alert.alert("Error", "Failed to save media");
//     }
//   };

  // Función mejorada para abrir archivos en móvil
  const openMediaFile = async (item) => {
    try {
      const { content } = item;
      const { data, mimeType, type } = content;

      if (!data) {
        Alert.alert("Error", "No hay datos para mostrar");
        return;
      }

      if (data.startsWith('data:')) {
        const base64Data = data.split(',')[1];
        const fileName = `media_${Date.now()}.${getFileExtension(mimeType)}`;
        const fileUri = `${FileSystem.cacheDirectory}${fileName}`;
        
        await FileSystem.writeAsStringAsync(fileUri, base64Data, {
          encoding: FileSystem.EncodingType.Base64,
        });

        const canOpen = await Linking.canOpenURL(`file://${fileUri}`);
        if (canOpen) {
          await Linking.openURL(`file://${fileUri}`);
        } else {
          Alert.alert(
            "Abrir archivo",
            `No se pudo abrir el archivo automáticamente. Tipo: ${mimeType}`,
            [{ text: "OK", style: "cancel" }]
          );
        }
      } else {
        const canOpen = await Linking.canOpenURL(data);
        if (canOpen) {
          await Linking.openURL(data);
        } else {
          Alert.alert("Error", "No se puede abrir este tipo de archivo");
        }
      }
    } catch (error) {
      console.error("Error al abrir archivo:", error);
      Alert.alert("Error", "No se pudo abrir el archivo");
    }
  };

  const getFileExtension = (mimeType) => {
    const extensions = {
      'image/jpeg': 'jpg',
      'image/png': 'png',
      'image/gif': 'gif',
      'image/webp': 'webp',
      'video/mp4': 'mp4',
      'video/quicktime': 'mov',
      'application/pdf': 'pdf',
      'application/msword': 'doc',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
      'text/plain': 'txt',
    };
    return extensions[mimeType] || 'bin';
  };

  // FUNCIÓN MEJORADA PARA CONVERTIR A BASE64
  const convertFileToBase64 = async (file) => {
    try {
      console.log("Convirtiendo archivo a base64:", file.uri);
      
      // Para React Native, usar FileSystem es más confiable
      if (Platform.OS !== 'web') {
        try {
          const base64 = await FileSystem.readAsStringAsync(file.uri, {
            encoding: FileSystem.EncodingType.Base64,
          });
          return `data:${file.mimeType};base64,${base64}`;
        } catch (fsError) {
          console.log("FileSystem falló, usando fetch...", fsError);
        }
      }
      
      // Fallback a fetch
      const response = await fetch(file.uri);
      const blob = await response.blob();
      
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          console.log("Conversión a base64 completada");
          resolve(reader.result);
        };
        reader.onerror = (error) => {
          console.error("Error en FileReader:", error);
          reject(new Error("No se pudo leer el archivo"));
        };
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error('Error converting file to base64:', error);
      throw new Error(`Error al convertir el archivo: ${error.message}`);
    }
  };

  // FUNCIÓN MEJORADA PARA ADJUNTAR ARCHIVOS
  const handleAttachFile = async () => {
    console.log("handleAttachFile llamado");
    
    try {
      const file = await showFilePicker();
      
      if (!file) {
        return;
      }

      // Verificar tipo permitido
      const allowedTypes = mimeTypesList && mimeTypesList();
      if (allowedTypes && allowedTypes.length > 0 && !allowedTypes.includes(file.mimeType)) {
        Alert.alert("Error", "Tipo de archivo no permitido");
        return;
      }

      setLoading(true);

      const fileName = file.name || 
                     file.fileName || 
                     `file_${Date.now()}.${getFileExtension(file.mimeType)}`;
      
      console.log("Convirtiendo archivo:", fileName);
      
      const base64String = await convertFileToBase64(file);
      
      if (!base64String) {
        throw new Error("No se pudo convertir el archivo a base64");
      }

      const newMedia = validateMediaItem({
    hash: uuidv4(),
    label: fileName,
    comment: '',
    content: {
      mimeType: file.mimeType,
      fileType: file.type,
      size: file.size || 0,
      type: file.type,
      data: base64String
    }
  });

      console.log("Nuevo media creado:", newMedia);
      
      const upd = [...mediaData, newMedia];
      setMediaData(upd);
      
      console.log("MediaData actualizado. Total items:", upd.length);
      
      Alert.alert("Éxito", "Archivo agregado correctamente");
      
    } catch (error) {
      console.error("Error en handleAttachFile:", error);
      Alert.alert("Error", "No se pudo seleccionar el archivo: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const onItemPress = async (item, index) => {
    if (Platform.OS !== 'web') {
      await openMediaFile(item);
    } else {
      setSelectedMedia(item);
      setShowAttachModal(true);
    }
  };

  const handleApplyChanges = () => {
    let index = -1;
    if (selectedMedia?.id !== undefined)
      index = mediaData.findIndex((x) => x.id === selectedMedia.id);
    else if (selectedMedia?.hash !== undefined)
      index = mediaData.findIndex((x) => x.hash === selectedMedia.hash);

    if (index !== -1) {
      let upd = [...mediaData];
      upd[index] = selectedMedia;
      setMediaData(upd);
      setShowAttachModal(false);
      
      console.log("Media actualizado en índice:", index);
    }
  };

  const handleDelete = (item, index) => {
    Alert.alert(
      "Eliminar archivo",
      `¿Estás seguro de que quieres eliminar "${item.label}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => {
            let upd = [...mediaData];
            upd[index] = {
              ...mediaData[index],
              deleted: true,
            };
            setMediaData(upd);
            console.log("Archivo marcado como eliminado:", item.label);
          }
        },
      ]
    );
  };

  // DEBUG: Verificar cambios en mediaData
  useEffect(() => {
    console.log("MediaData actualizado:", {
      total: mediaData.length,
      noEliminados: mediaData.filter(x => !x.deleted).length,
      datos: mediaData
    });
  }, [mediaData]);
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleSave} style={{ marginRight: 15 }}>
          <Text style={{ color: '#007AFF', fontSize: 16 }}>Save</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, media]);

  const validateMediaItem = (item) => {
  if (!item) {
    return {
      hash: `invalid-${Date.now()}`,
      label: "Elemento inválido",
      comment: "",
      content: {
        mimeType: "application/octet-stream",
        fileType: "unknown",
        size: 0,
        type: "unknown",
        data: ""
      }
    };
  }
  
  const safeContent = item.content || {};
  return {
    hash: item.hash || `temp-${Date.now()}-${Math.random()}`,
    label: item.label || "Archivo sin nombre",
    comment: item.comment || "",
    content: {
      mimeType: safeContent.mimeType || "application/octet-stream",
      fileType: safeContent.fileType || "unknown",
      size: safeContent.size || 0,
      type: safeContent.type || "unknown",
      data: safeContent.data || ""
    },
    deleted: item.deleted || false
  };
};

  // Resto del código de renderMediaItem se mantiene igual...
  const renderMediaItem = ({ item, index }) => {
    if (item.deleted) return null;

    const safeItem = validateMediaItem(item);
    const meta = safeItem.content;
    const { label, comment } = item;
    const { type, size, data, mimeType } = meta;

    const handlePress = () => {
      onItemPress(item, index);
    };

    const handleLongPress = () => {
      Alert.alert("Opciones", `Archivo: ${label || "Sin nombre"}`, [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => handleDelete(item, index),
        },
        Platform.OS === 'web' && {
          text: "Editar",
          onPress: () => {
            setSelectedMedia(item);
            setShowAttachModal(true);
          }
        }
      ].filter(Boolean));
    };

    function formatBytes(bytes, decimals = 2) {
      if (!bytes || bytes === 0) return '0 B';
      const k = 1024;
      const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
      const i = Math.min(
        Math.floor(Math.log(bytes) / Math.log(k)),
        sizes.length - 1
      );
      let value = bytes / Math.pow(k, i);
      if (value >= 1023.995 && i < sizes.length - 1) {
        value = 1;
      }
      return `${parseFloat(value.toFixed(decimals))} ${sizes[i]}`;
    }

    const ImageRenderer = ({ source, style, resizeMode = 'cover' }) => {
      const [imageError, setImageError] = React.useState(false);

      if (Platform.OS === 'web') {
        if (imageError || !source?.uri) {
          return (
            <View style={[style, styles.errorContainer]}>
              <Text>No se puede cargar la imagen</Text>
            </View>
          );
        }
        return (
          <img
            src={source.uri}
            style={{
              width: '100%',
              height: '100%',
              objectFit: resizeMode,
              borderRadius: style?.borderRadius || 0,
            }}
            onError={() => setImageError(true)}
            alt="Preview"
          />
        );
      }

      return (
        <RNImage
          source={source}
          style={style}
          resizeMode={resizeMode}
          onError={() => setImageError(true)}
        />
      );
    };

    const getImageSource = (base64Data, mimeType = 'image/jpeg') => {
      if (!base64Data) return null;
      if (base64Data.startsWith('data:')) {
        return { uri: base64Data };
      }
      return { uri: `data:${mimeType};base64,${base64Data}` };
    };

    const imageSource = getImageSource(data, mimeType);

    const renderPreview = () => {
      if (type === "image" && data && imageSource) {
        return (
          <ImageRenderer
            source={imageSource}
            style={styles.imagePreview}
            resizeMode="cover"
          />
        );
      } else if (type === "image" && !data) {
        return (
          <View style={styles.errorPreview}>
            <Text style={styles.errorIcon}>❌</Text>
            <Text style={styles.errorText}>Error</Text>
          </View>
        );
      } else if (type === "video") {
        return (
          <View style={styles.videoPreview}>
            <Text style={styles.videoIcon}>🎬</Text>
            <Text style={styles.videoText}>VIDEO</Text>
            {Platform.OS !== 'web' && (
              <TouchableOpacity 
                style={styles.openButton}
                onPress={() => openMediaFile(item)}
              >
                <Text style={styles.openButtonText}>ABRIR</Text>
              </TouchableOpacity>
            )}
          </View>
        );
      } else if (type === "document") {
        return (
          <View style={styles.documentPreview}>
            <Text style={styles.documentIcon}>📄</Text>
            <Text style={styles.documentText}>DOC</Text>
            {Platform.OS !== 'web' && (
              <TouchableOpacity 
                style={styles.openButton}
                onPress={() => openMediaFile(item)}
              >
                <Text style={styles.openButtonText}>ABRIR</Text>
              </TouchableOpacity>
            )}
          </View>
        );
      } else {
        return (
          <View style={styles.unknownPreview}>
            <Text style={styles.unknownIcon}>❓</Text>
            <Text style={styles.unknownText}>ARCHIVO</Text>
            {Platform.OS !== 'web' && (
              <TouchableOpacity 
                style={styles.openButton}
                onPress={() => openMediaFile(item)}
              >
                <Text style={styles.openButtonText}>ABRIR</Text>
              </TouchableOpacity>
            )}
          </View>
        );
      }
    };

    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDelete(item, index)}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.deleteButtonText}>×</Text>
        </TouchableOpacity>

        <TouchableWithoutFeedback
          onPress={handlePress}
          onLongPress={handleLongPress}
        >
          <View style={styles.itemContent}>
            <View style={styles.previewContainer}>
              {renderPreview()}
            </View>

            <View style={styles.infoContainer}>
              <Text style={styles.fileLabel} numberOfLines={1}>
                {label || `Archivo ${index + 1}`}
              </Text>
              <Text style={styles.type}>
                {`Tipo: ${type?.toUpperCase() || "DESCONOCIDO"}`}
              </Text>
              {comment ? (
                <Text style={styles.comment} numberOfLines={2}>
                  {comment}
                </Text>
              ) : null}
              <Text style={styles.dataSize}>
                {`Tamaño: ${size ? formatBytes(size) : 'N/A'}`}
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>📁</Text>
      <Text style={styles.emptyTitle}>No hay archivos</Text>
      <Text style={styles.emptySubtitle}>
        Agrega imágenes, videos o documentos para verlos aquí
      </Text>
    </View>
  );

  return (
    <View
      style={[
        stylesFull.screen,
        { backgroundColor: colors.background },
        { paddingBottom: bottomInset },
      ]}
    >
      <View
        style={[
          styles.header,
          { backgroundColor: colors.card, borderBottomColor: colors.border },
          { paddingTop: topInset - 10 },
        ]}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#2c3e50" />
        </TouchableOpacity>

        <Text style={[styles.headerTitle, { color: colors.text }]}>
          {t("nodeMedia") || "Archivos Multimedia"}
        </Text>

        <View style={{ flexDirection: "row" }}>
          <View style={styles.headerActions}>
            <TouchableOpacity 
              onPress={handleAttachFile} 
              style={styles.mapButton}
              disabled={loading}
            >
              <Ionicons name="attach" size={24} color={loading ? "#ccc" : "#3498db"} />
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={handleSave} 
              style={styles.mapButton}
            >
              <Ionicons name="save" size={24} color="#3498db" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <FlatList
        data={mediaData.filter((x) => !x.deleted)}
        renderItem={renderMediaItem}
        keyExtractor={(item, index) =>
          item.hash?.toString() || `media-${index}`
        }
        ListEmptyComponent={renderEmptyState}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.listContainer,
          mediaData.filter((x) => !x.deleted).length === 0 && { flex: 1 }
        ]}
        style={styles.content}
      />

      <Modal
        visible={showAttachModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowAttachModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Información del Archivo</Text>
            <Text style={[styles.label, { color: colors.text }]}>
              Descripción
            </Text>
            <TextInput
              style={styles.input}
              value={selectedMedia != null ? selectedMedia.label : ""}
              onChangeText={(text) => {
                setSelectedMedia((prev) => ({
                  ...prev,
                  label: text,
                }));
              }}
            />
            <Text style={[styles.label, { color: colors.text }]}>
              Comentario
            </Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={selectedMedia != null ? selectedMedia.comment : ""}
              onChangeText={(text) => {
                setSelectedMedia((prev) => ({
                  ...prev,
                  comment: text,
                }));
              }}
              multiline
            />
            <Button
              onPress={handleApplyChanges}
              style={{ marginTop: 20 }}
            >
              OK
            </Button>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default NodeMedia;