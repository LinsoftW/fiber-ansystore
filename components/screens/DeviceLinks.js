// // // components/DetallesProyecto.js
// // import React, { useState, useEffect, useRef } from "react";

// // import {
// //   View,
// //   Text,
// //   StyleSheet,
// //   ScrollView,
// //   TouchableOpacity,
// //   TextInput,
// //   Alert,
// //   Modal,
// //   Share,
// //   Platform, 
// //   PermissionsAndroid,
// //   FlatList,
// //   Switch,
// //   Button,
// // } from "react-native";
// // import { Ionicons } from "@expo/vector-icons";
// // import { useApp } from "../context/AppContext";
// // import { useTranslation } from "../hooks/useTranslation";
// // import { useDevice } from "../context/DeviceContext";
// // import { useAdapter } from "@/api/contexts/DatabaseContext";

// // import { v4 as uuidv4 } from "uuid";
// // import RNPickerSelect from "react-native-picker-select";

// // const DeviceLinks = ({ route, navigation }) => {
// //   const { updateNode, getFibersByProjectId } = useAdapter()();

// //   const { topInset, bottomInset, stylesFull } = useDevice();
// //   const { isDarkMode, language } = useApp();
// //   const { t } = useTranslation();
// //   const { device } = route.params;
// //   const { node } = route.params;
// //   const { projectId } = route.params;

// //   const [fibersData, setFibersData] = useState([]);

// //   const [showLinkSetupModal, setShowLinkSetupModal] = useState(false);
// //   const [showThreadInUse, setShowThreadInUse] = useState(false);

// //   const [selectedPort, setSelectedPort] = useState(null);
// //   const [deviceData, setDeviceData] = useState(device);

// //   const [srcLink, setSrcLink] = useState({
// //     fiber: null,
// //     buffer: null,
// //     thread: null,
// //     threads: [],
// //   });

// //   const fiberColors12Hex = [
// //     { index: 0, color: "#0000FF" },
// //     { index: 1, color: "#FFA500" },
// //     { index: 2, color: "#008000" },
// //     { index: 3, color: "#A52A2A" },
// //     { index: 4, color: "#708090" },
// //     { index: 5, color: "#FFFFFF" },
// //     { index: 6, color: "#FF0000" },
// //     { index: 7, color: "#000000" },
// //     { index: 8, color: "#FFFF00" },
// //     { index: 9, color: "#EE82EE" },
// //     { index: 10, color: "#FFC0CB" },
// //     { index: 11, color: "#00FFFF" },
// //   ];

// //   const colors = {
// //     primary: "#3498db",
// //     success: "#2ecc71",
// //     warning: "#f39c12",
// //     danger: "#e74c3c",
// //     purple: "#9b59b6",
// //     background: isDarkMode ? "#121212" : "#ffffff",
// //     card: isDarkMode ? "#1e1e1e" : "#ffffff",
// //     text: isDarkMode ? "#ffffff" : "#2c3e50",
// //     subText: isDarkMode ? "#b0b0b0" : "#7f8c8d",
// //     border: isDarkMode ? "#333" : "#ecf0f1",
// //     inputBackground: isDarkMode ? "#2a2a2a" : "#f8f9fa",
// //     placeholder: isDarkMode ? "#888888" : "#a0a0a0",
// //     cardBackground: isDarkMode ? "#1e1e1e" : "white",
// //   };

// //   const styles = StyleSheet.create({
// //     projectList: {
// //       maxHeight: 300,
// //       marginBottom: 20,
// //     },
// //     successButton: {
// //       backgroundColor: colors.success,
// //       borderRadius: 8,
// //       height: 50,
// //       marginTop: 10,
// //       shadowColor: "#000",
// //       shadowOffset: {
// //         width: 0,
// //         height: 2,
// //       },
// //       shadowOpacity: 0.1,
// //       shadowRadius: 3,
// //       elevation: 3,
// //     },
// //     row: {
// //       flexDirection: "row",
// //       alignItems: "center",
// //       justifyContent: "space-between",
// //     },
// //     link: {
// //       fontSize: 15,
// //       fontWeight: "600",
// //       color: "#787575ff",
// //       marginBottom: 8,
// //     },
// //     enabledPort: {
// //       fontSize: 15,
// //       fontWeight: "600",
// //       color: colors.text,
// //       marginBottom: 8,
// //     },
// //     disabledPort: {
// //       fontSize: 15,
// //       fontWeight: "600",
// //       color: "#d3d3d3ff",
// //       marginBottom: 8,
// //     },
// //     modalOverlay: {
// //       flex: 1,
// //       backgroundColor: "rgba(0, 0, 0, 0.6)",
// //       justifyContent: "center",
// //       alignItems: "center",
// //       padding: 20,
// //     },
// //     modalContent: {
// //       backgroundColor: colors.cardBackground,
// //       padding: 25,
// //       borderRadius: 16,
// //     },
// //     modalTitle: {
// //       fontSize: 20,
// //       fontWeight: "700",
// //       color: colors.text,
// //       marginBottom: 20,
// //       textAlign: "center",
// //     },
// //     modalItem: {
// //       padding: 16,
// //       borderBottomWidth: 1,
// //       borderBottomColor: colors.border,
// //     },
// //     modalItemText: {
// //       fontSize: 16,
// //       color: colors.text,
// //     },
// //     section: {
// //       marginBottom: 3,
// //     },
// //     sectionTitle: {
// //       fontSize: 18,
// //       fontWeight: "700",
// //       color: colors.text,
// //       marginBottom: 15,
// //       paddingLeft: 5,
// //     },
// //     deviceCard: {
// //       backgroundColor: colors.cardBackground,
// //       borderRadius: 12,
// //       padding: 16,
// //       marginBottom: 12,
// //       shadowColor: "#000",
// //       shadowOffset: { width: 0, height: 1 },
// //       shadowOpacity: 0.1,
// //       shadowRadius: 3,
// //       elevation: 2,
// //     },
// //     deviceHeader: {
// //       flexDirection: "row",
// //       alignItems: "center",
// //       justifyContent: "space-between",
// //       marginBottom: 0,
// //       paddingBottom: 4,
// //     },
// //     deviceInfo: {
// //       flex: 1,
// //     },
// //     deviceName: {
// //       fontSize: 17,
// //       fontWeight: "500",
// //       color: colors.text,
// //     },
// //     deviceName2: {
// //       fontSize: 17,
// //       fontWeight: "500",
// //       color: "#3a3b3aff",
// //     },
// //     removeButton: {
// //       padding: 4,
// //     },
// //     deviceDescription: {
// //       fontSize: 12,
// //       color: colors.secondaryText,
// //       marginTop: 2,
// //     },
// //     configRow: {
// //       flexDirection: "row",
// //       alignItems: "center",
// //       justifyContent: "space-between",
// //       marginBottom: 8,
// //     },
// //     macAddressRow: {
// //       flexDirection: "row",
// //       alignItems: "center",
// //       justifyContent: "space-between",
// //       marginBottom: 8,
// //     },
// //     configLabel: {
// //       fontSize: 14,
// //       color: colors.text,
// //       fontWeight: "500",
// //     },
// //     configInput: {
// //       borderWidth: 1,
// //       borderColor: colors.border,
// //       borderRadius: 8,
// //       padding: 8,
// //       width: 80,
// //       textAlign: "center",
// //       backgroundColor: colors.inputBackground,
// //       color: colors.text,
// //     },
// //     scanButton: {
// //       backgroundColor: colors.purple,
// //       padding: 8,
// //       borderRadius: 6,
// //     },
// //     scanButtonText: {
// //       color: "#ffffff",
// //       fontSize: 12,
// //       fontWeight: "500",
// //     },
// //     macAddressInput: {
// //       borderWidth: 1,
// //       borderColor: colors.border,
// //       borderRadius: 8,
// //       padding: 8,
// //       flex: 1,
// //       marginRight: 8,
// //       backgroundColor: colors.inputBackground,
// //       color: colors.text,
// //     },
// //     clearButton: {
// //       padding: 5,
// //     },
// //     inputLabel: {
// //       fontSize: 16,
// //       fontWeight: "500",
// //       color: colors.text,
// //     },
// //     container: {
// //       flex: 1,
// //       backgroundColor: "#ffffff",
// //     },
// //     input: {
// //       borderWidth: 1,
// //       borderColor: colors.border,
// //       borderRadius: 10,
// //       padding: 14,
// //       fontSize: 16,
// //       backgroundColor: colors.inputBackground,
// //       color: colors.text,
// //     },
// //     label: {
// //       fontSize: 15,
// //       fontWeight: "600",
// //       color: colors.text,
// //       marginBottom: 8,
// //     },
// //     header: {
// //       flexDirection: "row",
// //       alignItems: "center",
// //       justifyContent: "space-between",
// //       backgroundColor: "#ffffff",
// //       padding: 16,
// //       paddingTop: 50,
// //       borderBottomWidth: 1,
// //       borderBottomColor: "#ecf0f1",
// //       shadowColor: "#000",
// //       shadowOffset: { width: 0, height: 2 },
// //       shadowOpacity: 0.1,
// //       shadowRadius: 3,
// //       elevation: 3,
// //     },
// //     backButton: {
// //       padding: 4,
// //     },
// //     headerTitle: {
// //       fontSize: 18,
// //       fontWeight: "600",
// //       color: "#2c3e50",
// //     },
// //     headerActions: {
// //       flexDirection: "row",
// //       alignItems: "center",
// //     },
// //     mapButton: {
// //       padding: 4,
// //     },
// //     content: {
// //       flex: 1,
// //       padding: 16,
// //     },
// //     card: {
// //       backgroundColor: "#ffffff",
// //       padding: 20,
// //       borderRadius: 12,
// //       marginBottom: 16,
// //       borderWidth: 1,
// //       borderColor: "#e9ecef",
// //       shadowColor: "#000",
// //       shadowOffset: { width: 0, height: 2 },
// //       shadowOpacity: 0.1,
// //       shadowRadius: 3,
// //       elevation: 2,
// //     },
// //     title: {
// //       fontSize: 18,
// //       fontWeight: "bold",
// //       color: "#2c3e50",
// //       marginBottom: 12,
// //     },
// //     description: {
// //       fontSize: 16,
// //       color: "#7f8c8d",
// //       marginBottom: 20,
// //       fontStyle: "italic",
// //       lineHeight: 22,
// //     },
// //     detailRow: {
// //       flexDirection: "row",
// //       alignItems: "center",
// //       marginBottom: 15,
// //       paddingBottom: 12,
// //       borderBottomWidth: 1,
// //       borderBottomColor: "#ecf0f1",
// //     },
// //     detailLabel: {
// //       fontSize: 16,
// //       color: "#7f8c8d",
// //       marginLeft: 10,
// //       marginRight: 6,
// //       fontWeight: "500",
// //       minWidth: 100,
// //     },
// //     detailValue: {
// //       fontSize: 16,
// //       color: "#2c3e50",
// //       fontWeight: "600",
// //       flex: 1,
// //     },
// //     mapButtonLarge: {
// //       flexDirection: "row",
// //       alignItems: "center",
// //       justifyContent: "center",
// //       backgroundColor: "#3498db",
// //       padding: 16,
// //       borderRadius: 10,
// //       marginBottom: 20,
// //     },
// //     mapButtonText: {
// //       color: "#ffffff",
// //       fontWeight: "600",
// //       fontSize: 16,
// //       marginLeft: 8,
// //     },
// //   });

// //   const pickerSelectStyles = StyleSheet.create({
// //     inputWeb: {
// //       fontSize: 16,
// //       paddingVertical: 15,
// //       paddingHorizontal: 20,
// //       borderWidth: 2,
// //       borderColor: "#E5E7EB",
// //       borderRadius: 12,
// //       color: "#1F2937",
// //       backgroundColor: "#F9FAFB",
// //       paddingRight: 50,
// //       marginVertical: 8,
// //       // outline: "none", // No soportado en React Native - removido
// //       cursor: "pointer",
// //     },
// //     inputIOS: {
// //       fontSize: 16,
// //       paddingVertical: 15,
// //       paddingHorizontal: 20,
// //       borderWidth: 2,
// //       borderColor: "#E5E7EB",
// //       borderRadius: 12,
// //       color: "#1F2937",
// //       backgroundColor: "#F9FAFB",
// //       paddingRight: 50,
// //       marginVertical: 8,
// //       shadowColor: "#000",
// //       shadowOffset: {
// //         width: 0,
// //         height: 2,
// //       },
// //       shadowOpacity: 0.1,
// //       shadowRadius: 3,
// //       elevation: 3,
// //     },
// //     inputAndroid: {
// //       fontSize: 16,
// //       paddingHorizontal: 20,
// //       paddingVertical: 15,
// //       borderWidth: 2,
// //       borderColor: "#E5E7EB",
// //       borderRadius: 12,
// //       color: "#1F2937",
// //       backgroundColor: "#197ee2ff",
// //       paddingRight: 50,
// //       marginVertical: 8,
// //       elevation: 3,
// //     },
// //     placeholder: {
// //       color: "#6B7280",
// //     },
// //     iconContainer: {
// //       top: 18,
// //       right: 15,
// //     },
// //   });

// //   const formatDate = (dateString) => {
// //     if (!dateString) return "Unknown date";
// //     const date = new Date(dateString);
// //     return date.toLocaleDateString() + " " + date.toLocaleTimeString();
// //   };

// //   const verEnMapa = () => {
// //     //navigation.navigate('ViewOnMap', { selectedProject: proyecto });
// //   };

// //   const handleSave = () => {
// //     console.log('💾 ==================== GUARDANDO DEVICE ====================');
// //     console.log('💾 Nodo:', node?.label, '(ID:', node?.id, ')');
// //     console.log('💾 Dispositivo:', deviceData?.label, deviceData?.description);
// //     console.log('💾 Total links:', deviceData.links?.length || 0);
// //     if (deviceData.links && deviceData.links.length > 0) {
// //       console.log('💾 Links detallados:');
// //       deviceData.links.forEach((link, idx) => {
// //         console.log(`💾   [${idx + 1}] Puerto: ${link.port} | Fiber: ${link.src?.fiberId} | Thread: ${link.src?.thread}`);
// //       });
// //     }
// //     console.log('💾 ===========================================================');
    
// //     // Ejecutar el callback si existe
// //     if (route.params?.onSaveDeviceData) {
// //       route.params.onSaveDeviceData(deviceData);
// //       console.log('✅ Device data sent to callback');
// //       navigation.goBack();
// //     } else {
// //       console.warn('⚠️ No callback found for onSaveDeviceData');
// //       navigation.goBack();
// //     }
// //   };

// //   // Constantes para el diseño
// //   const CONFIG = {
// //     ICON: {
// //       NAME: "link",
// //       SIZE: 20,
// //       COLOR: "#ffffff",
// //     },
// //     ICON_DEL: {
// //       NAME: "link",
// //       SIZE: 20,
// //       COLOR: "#ffffff",
// //     },
// //     COLORS: {
// //       PRIMARY: "#6366f1",
// //       PRIMARY_DARK: "#4f46e5",
// //       SECONDARY: "#8b5cf6",
// //       BACKGROUND: "#f8fafc",
// //       TEXT_PRIMARY: "#1e293b",
// //       TEXT_SECONDARY: "#64748b",
// //       BORDER: "#e2e8f0",
// //       SUCCESS: "#10b981",
// //     },
// //     SPACING: {
// //       SM: 8,
// //       MD: 12,
// //       LG: 10,
// //       XL: 20,
// //     },
// //     RADIUS: {
// //       SM: 8,
// //       MD: 12,
// //       LG: 16,
// //     },
// //   };

// //   // Styles mejorados con gradientes y sombras
// //   const styles2 = {
// //     container: {
// //       flexDirection: "row",
// //       alignItems: "center",
// //       justifyContent: "space-between",
// //       backgroundColor: CONFIG.COLORS.BACKGROUND,
// //       marginHorizontal: CONFIG.SPACING.MD,
// //       marginVertical: CONFIG.SPACING.SM,
// //       padding: CONFIG.SPACING.LG,
// //       borderRadius: CONFIG.RADIUS.LG,
// //       borderWidth: 1,
// //       borderColor: CONFIG.COLORS.BORDER,
// //       shadowColor: "#000",
// //       shadowOffset: {
// //         width: 0,
// //         height: 2,
// //       },
// //       shadowOpacity: 0.1,
// //       shadowRadius: 3,
// //       elevation: 3,
// //     },
// //     fiberThreadContainer: {
// //       flex: 1,
// //       flexDirection: "row",
// //       alignItems: "center",

// //       backgroundColor: "#ffffff",
// //       padding: CONFIG.SPACING.MD,
// //       borderRadius: CONFIG.RADIUS.MD,
// //       borderWidth: 1,
// //       borderColor: CONFIG.COLORS.BORDER,
// //     },
// //     sourceContainer: {
// //       borderLeftWidth: 4,
// //       borderLeftColor: CONFIG.COLORS.SUCCESS,
// //     },
// //     destinationContainer: {
// //       borderRightWidth: 4,
// //       borderRightColor: CONFIG.COLORS.PRIMARY,
// //     },
// //     fiberBadge: {
// //       backgroundColor: CONFIG.COLORS.PRIMARY,
// //       paddingHorizontal: CONFIG.SPACING.SM,
// //       paddingVertical: 4,
// //       borderRadius: CONFIG.RADIUS.SM,
// //       marginRight: CONFIG.SPACING.SM,
// //     },
// //     fiberLabel: {
// //       color: "#ffffff",
// //       fontSize: 10,
// //       fontWeight: "700",
// //       textTransform: "uppercase",
// //     },
// //     connectionInfo: {
// //       flex: 1,
// //     },
// //     fiberName: {
// //       fontSize: 14,
// //       fontWeight: "600",
// //       color: CONFIG.COLORS.TEXT_PRIMARY,
// //       marginBottom: 2,
// //     },
// //     threadContainer: {
// //       flexDirection: "row",
// //       alignItems: "center",
// //     },
// //     threadText: {
// //       fontSize: 12,
// //       color: CONFIG.COLORS.TEXT_SECONDARY,
// //       fontWeight: "500",
// //       marginLeft: 4,
// //     },
// //     arrowIcon: {},
// //     arrowIcon2: {
// //       marginRight: 8,
// //     },
// //     connectionCenter: {
// //       alignItems: "center",
// //       marginHorizontal: CONFIG.SPACING.MD,
// //     },
// //     iconContainer: {
// //       backgroundColor: CONFIG.COLORS.PRIMARY,
// //       width: 30,
// //       height: 30,
// //       borderRadius: 20,
// //       justifyContent: "center",
// //       alignItems: "center",
// //       shadowColor: CONFIG.COLORS.PRIMARY,
// //       shadowOffset: {
// //         width: 0,
// //         height: 2,
// //       },
// //       shadowOpacity: 0.3,
// //       shadowRadius: 4,
// //       elevation: 4,
// //       zIndex: 2,
// //     },
// //     iconContainer2: {
// //       backgroundColor: "salmon",
// //       width: 30,
// //       height: 30,
// //       borderRadius: 20,
// //       justifyContent: "center",
// //       alignItems: "center",
// //       shadowColor: CONFIG.COLORS.PRIMARY,
// //       shadowOffset: {
// //         width: 0,
// //         height: 2,
// //       },
// //       shadowOpacity: 0.3,
// //       shadowRadius: 4,
// //       elevation: 4,
// //       zIndex: 2,
// //     },
// //     connectionLine: {
// //       position: "absolute",
// //       top: "50%",
// //       left: "50%",
// //       width: 2,
// //       height: "200%",
// //       backgroundColor: CONFIG.COLORS.PRIMARY,
// //       opacity: 0.3,
// //       transform: [{ translateX: -1 }],
// //       zIndex: 1,
// //     },
// //   };

// //   const getContrastColor = (hexColor) => {
// //     // Si el color es muy claro, usar texto oscuro, sino claro
// //     const hex = hexColor.replace("#", "");
// //     const r = parseInt(hex.substr(0, 2), 16);
// //     const g = parseInt(hex.substr(2, 2), 16);
// //     const b = parseInt(hex.substr(4, 2), 16);

// //     // Fórmula de luminancia relativa
// //     const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

// //     return luminance > 0.5 ? "#000000" : "#FFFFFF";
// //   };

// //   // Componente para información de fibra con mejor diseño
// //   const FiberThreadInfo = ({
// //     fiberLabel,
// //     thread,
// //     buffer,
// //     direction = "source",
// //   }) => {
// //     const isSource = direction === "source";
// //     const bkColor = fiberColors12Hex[thread - 1].color;
// //     const textColor = getContrastColor(bkColor);
// //     return (
// //       <View>
// //         <View
// //           style={[
// //             styles2.fiberThreadContainer,
// //             isSource ? styles2.sourceContainer : styles2.destinationContainer,
// //           ]}
// //         >
// //           <View>
// //             <View style={{ flexDirection: "row", alignItems: "" }}>
// //               {isSource == false && (
// //                 <Ionicons
// //                   name={"arrow-back"}
// //                   size={16}
// //                   color={CONFIG.COLORS.TEXT_SECONDARY}
// //                   style={styles2.arrowIcon2}
// //                 />
// //               )}

// //               <View
// //                 style={{
// //                   backgroundColor: bkColor,
// //                   paddingHorizontal: CONFIG.SPACING.SM,
// //                   paddingVertical: 4,
// //                   borderRadius: CONFIG.RADIUS.SM,
// //                   marginRight: CONFIG.SPACING.SM,
// //                 }}
// //               >
// //                 <Text
// //                   style={{
// //                     color: textColor,
// //                     fontSize: 10,
// //                     fontWeight: "700",
// //                     textTransform: "uppercase",
// //                   }}
// //                 >
// //                   {t("threadShort")}{thread}
// //                 </Text>
// //               </View>

// //               {isSource && (
// //                 <Ionicons
// //                   name={"arrow-forward"}
// //                   size={16}
// //                   color={CONFIG.COLORS.TEXT_SECONDARY}
// //                   style={styles2.arrowIcon}
// //                 />
// //               )}
// //             </View>

// //             <View style={{ marginTop: 10 }}>
// //               <View style={styles2.connectionInfo}>
// //                 <View style={styles2.threadContainer}>
// //                   <Text style={styles2.threadText}>{t("fiberShort")} {fiberLabel}</Text>
// //                   {buffer != null && (
// //                     <View
// //                       style={{
// //                         flexDirection: "row",
// //                         alignItems: "center",
// //                         justifyContent: "space-between",
// //                       }}
// //                     >
// //                       <Ionicons
// //                         name={"caret-forward"}
// //                         size={16}
// //                         color={CONFIG.COLORS.TEXT_SECONDARY}
// //                       />
// //                       <Text style={styles2.threadText}>{t("bufferShort")} {buffer}</Text>
// //                     </View>
// //                   )}
// //                 </View>
// //               </View>
// //             </View>
// //           </View>
// //         </View>
// //         <View></View>
// //       </View>
// //     );
// //   };

// //   const handleSaveFusionLink = (link) => {
// //     let fusionLinks =
// //       nodeData.fusionLinks == undefined ? [] : nodeData.fusionLinks;

// //     const index = nodeData.fusionLinks.findIndex((x) => x.hash == link.hash);

// //     if (index == -1) {
// //       fusionLinks.push(link);
// //     } else {
// //       fusionLinks[index] = link;
// //     }

// //     const tmp = {
// //       ...nodeData,
// //       fusionLinks: fusionLinks,
// //     };

// //     setNodeData(tmp);
// //   };

// //   const buildThreads = (fiber, threads) => {
// //     let tmp = threads.filter((x) => x.active == true);

// //     let result = [];

// //     const links = deviceData.links || [];

// //     tmp.forEach((t) => {
// //       let found = false;
// //       const number = t.number;

// //       for (let i = 0; i < links.length; i++) {
// //         const lx = links[i].src;

// //         if (lx.fiberId == fiber.id || lx.bufferId == fiber.id) {
// //           if (lx.thread == number) {
// //             found = true;
// //             break;
// //           }
// //         }
// //       }

// //       if (!found) {
// //         result.push(t);
// //       }
// //     });

// //     return result.map((thread) => {
// //       return {
// //         ...thread,
// //         value: thread.number,
// //         label: `${t("thread")}-${thread.number}`,
// //       };
// //     });
// //   };

// //   const getFiberLabelFrom = (items, fiberId) => {
// //     for (let i = 0; i < items.length; i++) {
// //       const fiber = items[i];
// //       if (fiber.id == fiberId) {
// //         return fiber.label;
// //       }
// //     }
// //   };

// //   const getFiberLabel = (fiberId) => {
// //     for (let i = 0; i < fibersData.length; i++) {
// //       const fiber = fibersData[i];
// //       if (fiber.id == fiberId) {
// //         return fiber.label;
// //       } else {
// //         const label = getFiberLabelFrom(fiber.buffers, fiberId);
// //         if (label != undefined) return label;
// //       }
// //     }
// //   };

// //   const RenderLink = ({ port, enabled }) => {
// //     let link = null;
// //     if (
// //       deviceData != null &&
// //       deviceData.links != undefined &&
// //       deviceData.links != null
// //     ) {
// //       link = deviceData.links.find((x) => x.port == port);
// //     }

// //     let textColor = null;
// //     let prop = { ...styles.link };

// //     let fiberLabel = "Fibra";
// //     let bufferLabel = "Buffer";
// //     let bkColor = fiberColors12Hex[0];

// //     if (link != null) {
// //       // Verificar que thread sea válido antes de acceder al array
// //       const threadIndex = link.src.thread != null && link.src.thread > 0 ? link.src.thread - 1 : 0;
// //       const colorObj = fiberColors12Hex[threadIndex] || fiberColors12Hex[0];
// //       bkColor = colorObj.color;
// //       textColor = getContrastColor(bkColor);
// //       prop = { ...styles.link, color: textColor };
// //       fiberLabel = getFiberLabel(link.src.fiberId);
// //       bufferLabel = getFiberLabel(link.src.bufferId);
// //     }

// //     return (
// //       <View style={styles.row}>
// //         <Text style={enabled ? styles.enabledPort : styles.disabledPort}>
// //           {`${t("port")} - ${port}`}
// //         </Text>

// //         {link != null && (
// //           <View style={styles.row}>
// //             <Ionicons
// //               name="link"
// //               size={20}
// //               style={{ color: "#727272ff", margin: 10 }}
// //             />

// //             <View
// //               style={{
// //                 backgroundColor: bkColor,
// //                 paddingHorizontal: 2,
// //                 paddingVertical: 2,
// //                 borderRadius: 8,
// //                 marginRight: 2,
// //               }}
// //             >
// //               <Text style={prop} color={textColor}>
// //                 {`${t("threadShort")}${link.src.thread}`}
// //               </Text>
// //             </View>

// //             <Ionicons name={"caret-back"} size={16} color={"#a1a0a0ff"} />
// //             {link.src.bufferId != null && (
// //               <View style={styles.row}>
// //                 <Text style={styles.link}>{`${t("bufferShort")} ${bufferLabel}`}</Text>

// //                 <Ionicons name={"caret-back"} size={16} color={"#a1a0a0ff"} />
// //               </View>
// //             )}

// //             <Text style={styles.link}>{fiberLabel}</Text>
// //           </View>
// //         )}
// //       </View>
// //     );
// //   };

// //   const handleCloseModal = () => {
// //     setShowLinkSetupModal(false);

// //     // ✅ VALIDACIÓN: Solo guardar si hay fibra Y hilo seleccionados
// //     if (!srcLink.fiber || srcLink.thread == null) {
// //       console.log('⚠️ Link incompleto - no se guardará. Fiber:', srcLink.fiber?.label, 'Thread:', srcLink.thread);
// //       return;
// //     }

// //     let links = [];

// //     const src = {
// //       fiberId: srcLink.fiber.id,
// //       bufferId: srcLink.buffer,
// //       thread: srcLink.thread,
// //     };

// //     if (deviceData != null) {
// //       if (deviceData.links != undefined && deviceData.links != null) {
// //         links = deviceData.links;
// //       }

// //       let index = links.findIndex((x) => x.port == selectedPort);

// //       if (index == -1) {
// //         links.push({
// //           port: selectedPort,
// //           src: src,
// //         });
        
// //         console.log('📌 ==================== DEVICE LINK CREADO ====================');
// //         console.log('📌 Nodo:', node?.label);
// //         console.log('📌 Dispositivo:', deviceData?.label, deviceData?.description);
// //         console.log('📌 Puerto:', selectedPort);
// //         console.log('📌 Fibra ID:', srcLink.fiber?.id, '| Label:', srcLink.fiber?.label);
// //         console.log('📌 Buffer:', srcLink.buffer);
// //         console.log('📌 Hilo:', srcLink.thread);
// //         console.log('📌 Total links en dispositivo:', links.length);
// //         console.log('📌 ===========================================================');
// //       } else {
// //         links[index].src = src;
// //         console.log('📝 Device link actualizado en puerto:', selectedPort);
// //       }
// //     }

// //     setDeviceData({
// //       ...deviceData,
// //       links: links,
// //     });

// //     /**clear */
// //     setSrcLink({
// //       fiber: null,
// //       buffer: null,
// //       thread: null,
// //       threads: [],
// //     });
// //   };

// //   const handleSetupLink = (portNumber) => {
// //     console.log('🔧 Setup link for port:', portNumber);
// //     console.log('🔧 Available fibersData:', fibersData.length, fibersData);
// //     setSelectedPort(portNumber);
// //     setShowLinkSetupModal(true);
// //   };

// //   useEffect(() => {
// //     const loadFibers = async () => {
// //       let records = await getFibersByProjectId(projectId, null);

// //       // Filtrar fibras según el tipo de nodo
// //       if (node) {
// //         if (node.typeId === 4) {
// //           // UNIT: Solo mostrar la fibra DROP de esta UNIT específica
// //           const nodeIdentifier = node.id || node.hash; // Usar id de BD si existe, sino hash
// //           console.log('🔷 DeviceLinks - Filtering fibers for UNIT:', node.label, 'identifier:', nodeIdentifier);
// //           records = records.filter(f => {
// //             const isUnitFiber = f.nodeId === nodeIdentifier;
// //             console.log('  Fiber:', f.label, 'nodeId:', f.nodeId, 'matches:', isUnitFiber);
// //             return isUnitFiber;
// //           });
// //           console.log('🔷 DeviceLinks - Filtered fibers count:', records.length);
// //         } else if (node.typeId === 1) {
// //           // MDF (typeId===1): Excluir TODAS las fibras DROP (nunca conexión directa MDF→UNIT)
// //           console.log('🔷 DeviceLinks - MDF: Excluding all DROP fibers');
// //           records = records.filter(f => {
// //             const isNotDropFiber = !f.nodeId;
// //             if (f.nodeId) {
// //               console.log('  Excluding DROP fiber:', f.label);
// //             }
// //             return isNotDropFiber;
// //           });
// //           console.log('🔷 DeviceLinks - Available fibers after filter:', records.length);
// //         } else {
// //           // IDF (typeId===2) y Pedestal (typeId===3): Mostrar TODAS las fibras (incluidas DROP para fusionar a UNITs)
// //           console.log('🔷 DeviceLinks - IDF/Pedestal: Showing all fibers including DROP');
// //           console.log('🔷 DeviceLinks - Total fibers available:', records.length);
// //         }
// //       }

// //       for (let i = 0; i < records.length; i++) {
// //         let buffers = [
// //           {
// //             ...records[i],
// //             value: records[i].id,
// //           },
// //         ];

// //         let children = await getFibersByProjectId(projectId, records[i].id);

// //         children = children.map((b) => {
// //           return {
// //             ...b,
// //             value: b.id,
// //           };
// //         });

// //         buffers = [...buffers, ...children];

// //         let f = {
// //           ...records[i],
// //           buffers: buffers,
// //         };

// //         records[i] = f;
// //       }

// //       records = records.map((f) => {
// //         return {
// //           ...f,
// //           value: f.id != undefined ? f.id : f.hash,
// //           label: f.label, // Asegurar que tiene label para el picker
// //         };
// //       });
// //       console.log('🔷 Final fibersData for picker:', records.map(f => ({ label: f.label, value: f.value })));
// //       setFibersData(records);
// //       return records;
// //     };

// //     loadFibers()
// //       .then((fibers) => {})
// //       .catch((e) => {
// //         console.error(e);
// //       });

// //     if (device != undefined) setDeviceData(device);
// //   }, []);
// //   return (
// //     <View
// //       style={[
// //         stylesFull.screen,
// //         { backgroundColor: colors.background },
// //         { paddingBottom: bottomInset },
// //       ]}
// //     >
// //       {/* Header */}
// //       <View
// //         style={[
// //           styles.header,
// //           { backgroundColor: colors.card, borderBottomColor: colors.border },
// //           { paddingTop: topInset - 10 },
// //         ]}
// //       >
// //         <TouchableOpacity
// //           onPress={() => navigation.goBack()}
// //           style={styles.backButton}
// //         >
// //           <Ionicons name="arrow-back" size={24} color="#2c3e50" />
// //         </TouchableOpacity>

// //         <Text style={[styles.headerTitle, { color: colors.text }]}>
// //           {t("Links")}
// //         </Text>

// //         <View style={{ flexDirection: "row" }}>
// //           <View style={styles.headerActions}>
// //             <TouchableOpacity onPress={handleSave} style={styles.mapButton}>
// //               <Ionicons name="save" size={24} color="#3498db" />
// //             </TouchableOpacity>
// //           </View>
// //         </View>
// //       </View>

// //       {/* Contenido */}
// //       <ScrollView style={styles.content}>
// //         {/* Fusion links */}
// //         <View style={[styles.card, { backgroundColor: colors.card }]}>
// //           <FlatList
// //             data={deviceData.ports}
// //             extraData={deviceData.links}
// //             keyExtractor={(item) => item.number}
// //             renderItem={({ item }) => (
// //               <View>
// //                 <View style={styles.row}>
// //                   <RenderLink port={item.number} enabled={item.enabled} />

// //                   {/**Actions */}
// //                   <View
// //                     style={{
// //                       flexDirection: "row",
// //                       justifyContent: "flex-end",
// //                       gap: 8,
// //                     }}
// //                   >
// //                     <TouchableOpacity
// //                       onPress={() => {
// //                         handleSetupLink(item.number);
// //                       }}
// //                     >
// //                       <Ionicons name="settings" size={24} color="#727272ff" />
// //                     </TouchableOpacity>
// //                     <TouchableOpacity>
// //                       <Ionicons name="trash" size={24} color="salmon" />
// //                     </TouchableOpacity>
// //                   </View>
// //                 </View>
// //               </View>
// //             )}
// //           />
// //         </View>
// //       </ScrollView>

// //       {/**Link Modal */}
// //       <Modal
// //         visible={showLinkSetupModal}
// //         transparent={true}
// //         animationType="fade"
// //         onRequestClose={() => setShowLinkSetupModal(false)}
// //       >
// //         <View style={styles.modalOverlay}>
// //           <View style={styles.modalContent}>
// //             <Text style={styles.modalTitle}>{t("setupLink")}</Text>

// //             <ScrollView style={styles.projectList}>
// //               <View>
// //                 {/**Source */}
// //                 <View>
// //                   <Text style={styles.label}>{t("Source")}</Text>
// //                   <RNPickerSelect
// //                     style={pickerSelectStyles}
// //                     value={srcLink.fiber != null ? srcLink.fiber.value : null}
// //                     useNativeAndroidPickerStyle={false}
// //                     onValueChange={(value) => {
// //                       const fiber = fibersData.find((x) => x.value == value);

// //                       if (fiber != undefined) {
// //                         const tmp = {
// //                           ...srcLink,
// //                           fiber: fiber,
// //                           thread: null,
// //                           threads:
// //                             fiber.buffers.length <= 1
// //                               ? buildThreads(fiber, fiber.threads)
// //                               : [],
// //                         };

// //                         setSrcLink(tmp);
// //                       }
// //                     }}
// //                     items={fibersData}
// //                     placeholder={{ label: t("selectAnOption"), value: null }}
// //                   />
// //                 </View>

// //                 {/**Source Buffer - Solo mostrar si hay múltiples buffers */}
// //                 {srcLink.fiber != null && srcLink.fiber.buffers.length > 1 && (
// //                   <View>
// //                     <Text style={styles.label}>{t("Buffer")}</Text>
// //                     <RNPickerSelect
// //                       style={pickerSelectStyles}
// //                       value={
// //                         srcLink.buffer != null ? srcLink.buffer.value : null
// //                       }
// //                       useNativeAndroidPickerStyle={false}
// //                       onValueChange={(value) => {
// //                         const buffer = srcLink.fiber.buffers.find(
// //                           (x) => x.value == value
// //                         );

// //                         const tmp = {
// //                           ...srcLink,
// //                           buffer: value,
// //                           bufferLabel: buffer.label,
// //                           threads: buildThreads(buffer, buffer.threads),
// //                         };
// //                         setSrcLink(tmp);
// //                       }}
// //                       itemKey={(item) => item.value}
// //                       items={srcLink.fiber.buffers}
// //                       placeholder={{ label: t("selectAnOption"), value: null }}
// //                     />
// //                   </View>
// //                 )}

// //                 {/** LINK */}
// //                 <Text style={styles.label}>{t("Thread")}</Text>

// //                 <View style={styles.formCard}>
// //                   <View
// //                     style={{
// //                       flexDirection: "row",
// //                       justifyContent: "space-between",
// //                       alignItems: "center",
// //                     }}
// //                   >
// //                     <RNPickerSelect
// //                       style={pickerSelectStyles}
// //                       value={srcLink.thread != null ? srcLink.thread : null}
// //                       useNativeAndroidPickerStyle={false}
// //                       onValueChange={(value, index) => {
// //                         if (index != -1 && value != null) {
// //                           const tmp = {
// //                             ...srcLink,
// //                             thread: value,
// //                           };
// //                           setSrcLink(tmp);
// //                         }
// //                       }}
// //                       itemKey={(item) => item.value}
// //                       items={srcLink.threads}
// //                       placeholder={{ label: t("selectAnOption"), value: null }}
// //                     />
// //                   </View>
// //                 </View>
// //               </View>
// //             </ScrollView>

// //             <Button
// //               title={"ok"}
// //               color={colors.primary}
// //               onPress={() => handleCloseModal()}
// //             />
// //           </View>
// //         </View>
// //       </Modal>
// //     </View>
// //   );
// // };

// // export default DeviceLinks;

// // components/screens/DeviceLinks.js
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
//   Switch,
//   Button,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { useApp } from "../context/AppContext";
// import { useTranslation } from "../hooks/useTranslation";
// import { useDevice } from "../context/DeviceContext";
// import { useAdapter } from "@/api/contexts/DatabaseContext";

// import { v4 as uuidv4 } from "uuid";
// import RNPickerSelect from "react-native-picker-select";

// const DeviceLinks = ({ route, navigation }) => {
//   const { updateNode, getFibersByProjectId } = useAdapter()();

//   const { topInset, bottomInset, stylesFull } = useDevice();
//   const { isDarkMode, language } = useApp();
//   const { t } = useTranslation();
//   const { device } = route.params;
//   const { node } = route.params;
//   const { projectId } = route.params;

//   const [fibersData, setFibersData] = useState([]);

//   const [showLinkSetupModal, setShowLinkSetupModal] = useState(false);
//   const [showThreadInUse, setShowThreadInUse] = useState(false);

//   const [selectedPort, setSelectedPort] = useState(null);
//   const [deviceData, setDeviceData] = useState(device);

//   const [srcLink, setSrcLink] = useState({
//     fiber: null,
//     buffer: null,
//     thread: null,
//     threads: [],
//   });

//   const fiberColors12Hex = [
//     { index: 0, color: "#0000FF" },
//     { index: 1, color: "#FFA500" },
//     { index: 2, color: "#008000" },
//     { index: 3, color: "#A52A2A" },
//     { index: 4, color: "#708090" },
//     { index: 5, color: "#FFFFFF" },
//     { index: 6, color: "#FF0000" },
//     { index: 7, color: "#000000" },
//     { index: 8, color: "#FFFF00" },
//     { index: 9, color: "#EE82EE" },
//     { index: 10, color: "#FFC0CB" },
//     { index: 11, color: "#00FFFF" },
//   ];

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
//     projectList: {
//       maxHeight: 300,
//       marginBottom: 20,
//     },
//     successButton: {
//       backgroundColor: colors.success,
//       borderRadius: 8,
//       height: 50,
//       marginTop: 10,
//       shadowColor: "#000",
//       shadowOffset: {
//         width: 0,
//         height: 2,
//       },
//       shadowOpacity: 0.1,
//       shadowRadius: 3,
//       elevation: 3,
//       justifyContent: 'center',
//       alignItems: 'center',
//     },
//     row: {
//       flexDirection: "row",
//       alignItems: "center",
//       justifyContent: "space-between",
//     },
//     link: {
//       fontSize: 15,
//       fontWeight: "600",
//       color: "#787575ff",
//       marginBottom: 8,
//     },
//     enabledPort: {
//       fontSize: 15,
//       fontWeight: "600",
//       color: colors.text,
//       marginBottom: 8,
//     },
//     disabledPort: {
//       fontSize: 15,
//       fontWeight: "600",
//       color: "#d3d3d3ff",
//       marginBottom: 8,
//     },
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
//       width: '90%',
//       maxHeight: '80%',
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
//       borderBottomWidth: 1,
//       borderBottomColor: colors.border,
//     },
//     modalItemText: {
//       fontSize: 16,
//       color: colors.text,
//     },
//     section: {
//       marginBottom: 3,
//     },
//     sectionTitle: {
//       fontSize: 18,
//       fontWeight: "700",
//       color: colors.text,
//       marginBottom: 15,
//       paddingLeft: 5,
//     },
//     deviceCard: {
//       backgroundColor: colors.cardBackground,
//       borderRadius: 12,
//       padding: 16,
//       marginBottom: 12,
//       shadowColor: "#000",
//       shadowOffset: { width: 0, height: 1 },
//       shadowOpacity: 0.1,
//       shadowRadius: 3,
//       elevation: 2,
//     },
//     deviceHeader: {
//       flexDirection: "row",
//       alignItems: "center",
//       justifyContent: "space-between",
//       marginBottom: 0,
//       paddingBottom: 4,
//     },
//     deviceInfo: {
//       flex: 1,
//     },
//     deviceName: {
//       fontSize: 17,
//       fontWeight: "500",
//       color: colors.text,
//     },
//     deviceName2: {
//       fontSize: 17,
//       fontWeight: "500",
//       color: "#3a3b3aff",
//     },
//     removeButton: {
//       padding: 4,
//     },
//     deviceDescription: {
//       fontSize: 12,
//       color: colors.subText,
//       marginTop: 2,
//     },
//     configRow: {
//       flexDirection: "row",
//       alignItems: "center",
//       justifyContent: "space-between",
//       marginBottom: 8,
//     },
//     macAddressRow: {
//       flexDirection: "row",
//       alignItems: "center",
//       justifyContent: "space-between",
//       marginBottom: 8,
//     },
//     configLabel: {
//       fontSize: 14,
//       color: colors.text,
//       fontWeight: "500",
//     },
//     configInput: {
//       borderWidth: 1,
//       borderColor: colors.border,
//       borderRadius: 8,
//       padding: 8,
//       width: 80,
//       textAlign: "center",
//       backgroundColor: colors.inputBackground,
//       color: colors.text,
//     },
//     scanButton: {
//       backgroundColor: colors.purple,
//       padding: 8,
//       borderRadius: 6,
//     },
//     scanButtonText: {
//       color: "#ffffff",
//       fontSize: 12,
//       fontWeight: "500",
//     },
//     macAddressInput: {
//       borderWidth: 1,
//       borderColor: colors.border,
//       borderRadius: 8,
//       padding: 8,
//       flex: 1,
//       marginRight: 8,
//       backgroundColor: colors.inputBackground,
//       color: colors.text,
//     },
//     clearButton: {
//       padding: 5,
//     },
//     inputLabel: {
//       fontSize: 16,
//       fontWeight: "500",
//       color: colors.text,
//     },
//     container: {
//       flex: 1,
//       backgroundColor: "#ffffff",
//     },
//     input: {
//       borderWidth: 1,
//       borderColor: colors.border,
//       borderRadius: 10,
//       padding: 14,
//       fontSize: 16,
//       backgroundColor: colors.inputBackground,
//       color: colors.text,
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
//     },
//     content: {
//       flex: 1,
//       padding: 16,
//     },
//     card: {
//       backgroundColor: "#ffffff",
//       padding: 20,
//       borderRadius: 12,
//       marginBottom: 16,
//       borderWidth: 1,
//       borderColor: "#e9ecef",
//       shadowColor: "#000",
//       shadowOffset: { width: 0, height: 2 },
//       shadowOpacity: 0.1,
//       shadowRadius: 3,
//       elevation: 2,
//     },
//     title: {
//       fontSize: 18,
//       fontWeight: "bold",
//       color: "#2c3e50",
//       marginBottom: 12,
//     },
//     description: {
//       fontSize: 16,
//       color: "#7f8c8d",
//       marginBottom: 20,
//       fontStyle: "italic",
//       lineHeight: 22,
//     },
//     detailRow: {
//       flexDirection: "row",
//       alignItems: "center",
//       marginBottom: 15,
//       paddingBottom: 12,
//       borderBottomWidth: 1,
//       borderBottomColor: "#ecf0f1",
//     },
//     detailLabel: {
//       fontSize: 16,
//       color: "#7f8c8d",
//       marginLeft: 10,
//       marginRight: 6,
//       fontWeight: "500",
//       minWidth: 100,
//     },
//     detailValue: {
//       fontSize: 16,
//       color: "#2c3e50",
//       fontWeight: "600",
//       flex: 1,
//     },
//     mapButtonLarge: {
//       flexDirection: "row",
//       alignItems: "center",
//       justifyContent: "center",
//       backgroundColor: "#3498db",
//       padding: 16,
//       borderRadius: 10,
//       marginBottom: 20,
//     },
//     mapButtonText: {
//       color: "#ffffff",
//       fontWeight: "600",
//       fontSize: 16,
//       marginLeft: 8,
//     },
//     portsContainer: {
//       flex: 1,
//     },
//     portItem: {
//       paddingVertical: 12,
//       borderBottomWidth: 1,
//       borderBottomColor: colors.border,
//     },
//     formCard: {
//       backgroundColor: colors.cardBackground,
//       padding: 16,
//       borderRadius: 8,
//       marginBottom: 16,
//     },
//   });

//   const pickerSelectStyles = StyleSheet.create({
//     inputIOS: {
//       fontSize: 16,
//       paddingVertical: 12,
//       paddingHorizontal: 10,
//       borderWidth: 1,
//       borderColor: colors.border,
//       borderRadius: 8,
//       color: colors.text,
//       paddingRight: 30,
//       backgroundColor: colors.inputBackground,
//       marginVertical: 8,
//     },
//     inputAndroid: {
//       fontSize: 16,
//       paddingHorizontal: 10,
//       paddingVertical: 8,
//       borderWidth: 1,
//       borderColor: colors.border,
//       borderRadius: 8,
//       color: colors.text,
//       paddingRight: 30,
//       backgroundColor: colors.inputBackground,
//       marginVertical: 8,
//     },
//     placeholder: {
//       color: colors.placeholder,
//     },
//     iconContainer: {
//       top: 10,
//       right: 12,
//     },
//   });

//   const formatDate = (dateString) => {
//     if (!dateString) return "Unknown date";
//     const date = new Date(dateString);
//     return date.toLocaleDateString() + " " + date.toLocaleTimeString();
//   };

//   const verEnMapa = () => {
//     //navigation.navigate('ViewOnMap', { selectedProject: proyecto });
//   };

//   const handleSave = () => {
//     console.log('💾 ==================== GUARDANDO DEVICE ====================');
//     console.log('💾 Nodo:', node?.label, '(ID:', node?.id, ')');
//     console.log('💾 Dispositivo:', deviceData?.label, deviceData?.description);
//     console.log('💾 Total links:', deviceData.links?.length || 0);
//     if (deviceData.links && deviceData.links.length > 0) {
//       console.log('💾 Links detallados:');
//       deviceData.links.forEach((link, idx) => {
//         console.log(`💾   [${idx + 1}] Puerto: ${link.port} | Fiber: ${link.src?.fiberId} | Thread: ${link.src?.thread}`);
//       });
//     }
//     console.log('💾 ===========================================================');
    
//     // Ejecutar el callback si existe
//     if (route.params?.onSaveDeviceData) {
//       route.params.onSaveDeviceData(deviceData);
//       console.log('✅ Device data sent to callback');
//       navigation.goBack();
//     } else {
//       console.warn('⚠️ No callback found for onSaveDeviceData');
//       navigation.goBack();
//     }
//   };

//   // Constantes para el diseño
//   const CONFIG = {
//     ICON: {
//       NAME: "link",
//       SIZE: 20,
//       COLOR: "#ffffff",
//     },
//     ICON_DEL: {
//       NAME: "link",
//       SIZE: 20,
//       COLOR: "#ffffff",
//     },
//     COLORS: {
//       PRIMARY: "#6366f1",
//       PRIMARY_DARK: "#4f46e5",
//       SECONDARY: "#8b5cf6",
//       BACKGROUND: "#f8fafc",
//       TEXT_PRIMARY: "#1e293b",
//       TEXT_SECONDARY: "#64748b",
//       BORDER: "#e2e8f0",
//       SUCCESS: "#10b981",
//     },
//     SPACING: {
//       SM: 8,
//       MD: 12,
//       LG: 10,
//       XL: 20,
//     },
//     RADIUS: {
//       SM: 8,
//       MD: 12,
//       LG: 16,
//     },
//   };

//   // Styles mejorados con gradientes y sombras
//   const styles2 = {
//     container: {
//       flexDirection: "row",
//       alignItems: "center",
//       justifyContent: "space-between",
//       backgroundColor: CONFIG.COLORS.BACKGROUND,
//       marginHorizontal: CONFIG.SPACING.MD,
//       marginVertical: CONFIG.SPACING.SM,
//       padding: CONFIG.SPACING.LG,
//       borderRadius: CONFIG.RADIUS.LG,
//       borderWidth: 1,
//       borderColor: CONFIG.COLORS.BORDER,
//       shadowColor: "#000",
//       shadowOffset: {
//         width: 0,
//         height: 2,
//       },
//       shadowOpacity: 0.1,
//       shadowRadius: 3,
//       elevation: 3,
//     },
//     fiberThreadContainer: {
//       flex: 1,
//       flexDirection: "row",
//       alignItems: "center",

//       backgroundColor: "#ffffff",
//       padding: CONFIG.SPACING.MD,
//       borderRadius: CONFIG.RADIUS.MD,
//       borderWidth: 1,
//       borderColor: CONFIG.COLORS.BORDER,
//     },
//     sourceContainer: {
//       borderLeftWidth: 4,
//       borderLeftColor: CONFIG.COLORS.SUCCESS,
//     },
//     destinationContainer: {
//       borderRightWidth: 4,
//       borderRightColor: CONFIG.COLORS.PRIMARY,
//     },
//     fiberBadge: {
//       backgroundColor: CONFIG.COLORS.PRIMARY,
//       paddingHorizontal: CONFIG.SPACING.SM,
//       paddingVertical: 4,
//       borderRadius: CONFIG.RADIUS.SM,
//       marginRight: CONFIG.SPACING.SM,
//     },
//     fiberLabel: {
//       color: "#ffffff",
//       fontSize: 10,
//       fontWeight: "700",
//       textTransform: "uppercase",
//     },
//     connectionInfo: {
//       flex: 1,
//     },
//     fiberName: {
//       fontSize: 14,
//       fontWeight: "600",
//       color: CONFIG.COLORS.TEXT_PRIMARY,
//       marginBottom: 2,
//     },
//     threadContainer: {
//       flexDirection: "row",
//       alignItems: "center",
//     },
//     threadText: {
//       fontSize: 12,
//       color: CONFIG.COLORS.TEXT_SECONDARY,
//       fontWeight: "500",
//       marginLeft: 4,
//     },
//     arrowIcon: {},
//     arrowIcon2: {
//       marginRight: 8,
//     },
//     connectionCenter: {
//       alignItems: "center",
//       marginHorizontal: CONFIG.SPACING.MD,
//     },
//     iconContainer: {
//       backgroundColor: CONFIG.COLORS.PRIMARY,
//       width: 30,
//       height: 30,
//       borderRadius: 20,
//       justifyContent: "center",
//       alignItems: "center",
//       shadowColor: CONFIG.COLORS.PRIMARY,
//       shadowOffset: {
//         width: 0,
//         height: 2,
//       },
//       shadowOpacity: 0.3,
//       shadowRadius: 4,
//       elevation: 4,
//       zIndex: 2,
//     },
//     iconContainer2: {
//       backgroundColor: "salmon",
//       width: 30,
//       height: 30,
//       borderRadius: 20,
//       justifyContent: "center",
//       alignItems: "center",
//       shadowColor: CONFIG.COLORS.PRIMARY,
//       shadowOffset: {
//         width: 0,
//         height: 2,
//       },
//       shadowOpacity: 0.3,
//       shadowRadius: 4,
//       elevation: 4,
//       zIndex: 2,
//     },
//     connectionLine: {
//       position: "absolute",
//       top: "50%",
//       left: "50%",
//       width: 2,
//       height: "200%",
//       backgroundColor: CONFIG.COLORS.PRIMARY,
//       opacity: 0.3,
//       transform: [{ translateX: -1 }],
//       zIndex: 1,
//     },
//   };

//   const getContrastColor = (hexColor) => {
//     // Si el color es muy claro, usar texto oscuro, sino claro
//     const hex = hexColor.replace("#", "");
//     const r = parseInt(hex.substr(0, 2), 16);
//     const g = parseInt(hex.substr(2, 2), 16);
//     const b = parseInt(hex.substr(4, 2), 16);

//     // Fórmula de luminancia relativa
//     const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

//     return luminance > 0.5 ? "#000000" : "#FFFFFF";
//   };

//   // Componente para información de fibra con mejor diseño
//   const FiberThreadInfo = ({
//     fiberLabel,
//     thread,
//     buffer,
//     direction = "source",
//   }) => {
//     const isSource = direction === "source";
//     const bkColor = fiberColors12Hex[thread - 1].color;
//     const textColor = getContrastColor(bkColor);
//     return (
//       <View>
//         <View
//           style={[
//             styles2.fiberThreadContainer,
//             isSource ? styles2.sourceContainer : styles2.destinationContainer,
//           ]}
//         >
//           <View>
//             <View style={{ flexDirection: "row", alignItems: "" }}>
//               {isSource == false && (
//                 <Ionicons
//                   name={"arrow-back"}
//                   size={16}
//                   color={CONFIG.COLORS.TEXT_SECONDARY}
//                   style={styles2.arrowIcon2}
//                 />
//               )}

//               <View
//                 style={{
//                   backgroundColor: bkColor,
//                   paddingHorizontal: CONFIG.SPACING.SM,
//                   paddingVertical: 4,
//                   borderRadius: CONFIG.RADIUS.SM,
//                   marginRight: CONFIG.SPACING.SM,
//                 }}
//               >
//                 <Text
//                   style={{
//                     color: textColor,
//                     fontSize: 10,
//                     fontWeight: "700",
//                     textTransform: "uppercase",
//                   }}
//                 >
//                   {t("threadShort")}{thread}
//                 </Text>
//               </View>

//               {isSource && (
//                 <Ionicons
//                   name={"arrow-forward"}
//                   size={16}
//                   color={CONFIG.COLORS.TEXT_SECONDARY}
//                   style={styles2.arrowIcon}
//                 />
//               )}
//             </View>

//             <View style={{ marginTop: 10 }}>
//               <View style={styles2.connectionInfo}>
//                 <View style={styles2.threadContainer}>
//                   <Text style={styles2.threadText}>{t("fiberShort")} {fiberLabel}</Text>
//                   {buffer != null && (
//                     <View
//                       style={{
//                         flexDirection: "row",
//                         alignItems: "center",
//                         justifyContent: "space-between",
//                       }}
//                     >
//                       <Ionicons
//                         name={"caret-forward"}
//                         size={16}
//                         color={CONFIG.COLORS.TEXT_SECONDARY}
//                       />
//                       <Text style={styles2.threadText}>{t("bufferShort")} {buffer}</Text>
//                     </View>
//                   )}
//                 </View>
//               </View>
//             </View>
//           </View>
//         </View>
//         <View></View>
//       </View>
//     );
//   };

//   const handleSaveFusionLink = (link) => {
//     let fusionLinks =
//       nodeData.fusionLinks == undefined ? [] : nodeData.fusionLinks;

//     const index = nodeData.fusionLinks.findIndex((x) => x.hash == link.hash);

//     if (index == -1) {
//       fusionLinks.push(link);
//     } else {
//       fusionLinks[index] = link;
//     }

//     const tmp = {
//       ...nodeData,
//       fusionLinks: fusionLinks,
//     };

//     setNodeData(tmp);
//   };

//   const buildThreads = (fiber, threads) => {
//     let tmp = threads.filter((x) => x.active == true);

//     let result = [];

//     const links = deviceData.links || [];

//     tmp.forEach((t) => {
//       let found = false;
//       const number = t.number;

//       for (let i = 0; i < links.length; i++) {
//         const lx = links[i].src;

//         if (lx.fiberId == fiber.id || lx.bufferId == fiber.id) {
//           if (lx.thread == number) {
//             found = true;
//             break;
//           }
//         }
//       }

//       if (!found) {
//         result.push(t);
//       }
//     });

//     return result.map((thread) => {
//       return {
//         ...thread,
//         value: thread.number,
//         label: `${t("thread")}-${thread.number}`,
//       };
//     });
//   };

//   const getFiberLabelFrom = (items, fiberId) => {
//     for (let i = 0; i < items.length; i++) {
//       const fiber = items[i];
//       if (fiber.id == fiberId) {
//         return fiber.label;
//       }
//     }
//   };

//   const getFiberLabel = (fiberId) => {
//     for (let i = 0; i < fibersData.length; i++) {
//       const fiber = fibersData[i];
//       if (fiber.id == fiberId) {
//         return fiber.label;
//       } else {
//         const label = getFiberLabelFrom(fiber.buffers, fiberId);
//         if (label != undefined) return label;
//       }
//     }
//   };

//   // CORREGIDO: Función RenderLink con sintaxis corregida
//   const RenderLink = ({ port, enabled }) => {
//     let link = null;
//     if (
//       deviceData != null &&
//       deviceData.links != undefined &&
//       deviceData.links != null
//     ) {
//       link = deviceData.links.find((x) => x.port == port);
//     }

//     let textColor = null;
//     let prop = { ...styles.link }; // Inicializar correctamente

//     let fiberLabel = "Fibra";
//     let bufferLabel = "Buffer";
//     let bkColor = fiberColors12Hex[0];

//     if (link != null) {
//       // Verificar que thread sea válido antes de acceder al array
//       const threadIndex = link.src.thread != null && link.src.thread > 0 ? link.src.thread - 1 : 0;
//       const colorObj = fiberColors12Hex[threadIndex] || fiberColors12Hex[0];
//       bkColor = colorObj.color;
//       textColor = getContrastColor(bkColor);
      
//       // CORREGIDO: Asignar color correctamente
//       prop = { 
//         ...styles.link, 
//         color: textColor 
//       };
      
//       fiberLabel = getFiberLabel(link.src.fiberId);
//       bufferLabel = getFiberLabel(link.src.bufferId);
//     }

//     return (
//       <View style={styles.portItem}>
//         <View style={styles.row}>
//           <Text style={enabled ? styles.enabledPort : styles.disabledPort}>
//             {`${t("port")} - ${port}`}
//           </Text>

//           {link != null && (
//             <View style={styles.row}>
//               <Ionicons
//                 name="link"
//                 size={20}
//                 style={{ color: "#727272ff", margin: 10 }}
//               />

//               <View
//                 style={{
//                   backgroundColor: bkColor,
//                   paddingHorizontal: 8,
//                   paddingVertical: 4,
//                   borderRadius: 6,
//                   marginRight: 8,
//                 }}
//               >
//                 <Text style={prop}>
//                   {`${t("threadShort")}${link.src.thread}`}
//                 </Text>
//               </View>

//               <Ionicons name={"caret-back"} size={16} color={"#a1a0a0ff"} />
              
//               {link.src.bufferId != null && (
//                 <View style={styles.row}>
//                   <Text style={styles.link}>{`${t("bufferShort")} ${bufferLabel}`}</Text>
//                   <Ionicons name={"caret-back"} size={16} color={"#a1a0a0ff"} />
//                 </View>
//               )}

//               <Text style={styles.link}>{fiberLabel}</Text>
//             </View>
//           )}
//         </View>

//         {/** Actions */}
//         <View style={{
//           flexDirection: "row",
//           justifyContent: "flex-end",
//           gap: 8,
//           marginTop: 8,
//         }}>
//           <TouchableOpacity onPress={() => handleSetupLink(port)}>
//             <Ionicons name="settings" size={24} color="#727272ff" />
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => handleRemoveLink(port)}>
//             <Ionicons name="trash" size={24} color="salmon" />
//           </TouchableOpacity>
//         </View>
//       </View>
//     );
//   };

//   // AÑADIDO: Función para eliminar links
//   const handleRemoveLink = (portNumber) => {
//     if (deviceData?.links) {
//       const updatedLinks = deviceData.links.filter(link => link.port !== portNumber);
//       setDeviceData({
//         ...deviceData,
//         links: updatedLinks
//       });
//       console.log('🗑️ Link eliminado del puerto:', portNumber);
//     }
//   };

//   const handleCloseModal = () => {
//     setShowLinkSetupModal(false);

//     // ✅ VALIDACIÓN: Solo guardar si hay fibra Y hilo seleccionados
//     if (!srcLink.fiber || srcLink.thread == null) {
//       console.log('⚠️ Link incompleto - no se guardará. Fiber:', srcLink.fiber?.label, 'Thread:', srcLink.thread);
//       return;
//     }

//     let links = [];

//     const src = {
//       fiberId: srcLink.fiber.id,
//       bufferId: srcLink.buffer,
//       thread: srcLink.thread,
//     };

//     if (deviceData != null) {
//       if (deviceData.links != undefined && deviceData.links != null) {
//         links = deviceData.links;
//       }

//       let index = links.findIndex((x) => x.port == selectedPort);

//       if (index == -1) {
//         links.push({
//           port: selectedPort,
//           src: src,
//         });
        
//         console.log('📌 ==================== DEVICE LINK CREADO ====================');
//         console.log('📌 Nodo:', node?.label);
//         console.log('📌 Dispositivo:', deviceData?.label, deviceData?.description);
//         console.log('📌 Puerto:', selectedPort);
//         console.log('📌 Fibra ID:', srcLink.fiber?.id, '| Label:', srcLink.fiber?.label);
//         console.log('📌 Buffer:', srcLink.buffer);
//         console.log('📌 Hilo:', srcLink.thread);
//         console.log('📌 Total links en dispositivo:', links.length);
//         console.log('📌 ===========================================================');
//       } else {
//         links[index].src = src;
//         console.log('📝 Device link actualizado en puerto:', selectedPort);
//       }
//     }

//     setDeviceData({
//       ...deviceData,
//       links: links,
//     });

//     /**clear */
//     setSrcLink({
//       fiber: null,
//       buffer: null,
//       thread: null,
//       threads: [],
//     });
//   };

//   const handleSetupLink = (portNumber) => {
//     console.log('🔧 Setup link for port:', portNumber);
//     console.log('🔧 Available fibersData:', fibersData.length, fibersData);
//     setSelectedPort(portNumber);
//     setShowLinkSetupModal(true);
//   };

//   // CORREGIDO: Funciones para manejar cambios en los selectores
//   const handleFiberChange = (value) => {
//     const fiber = fibersData.find((x) => x.value == value);
//     if (fiber) {
//       const tmp = {
//         ...srcLink,
//         fiber: fiber,
//         buffer: null,
//         thread: null,
//         threads: fiber.buffers.length <= 1 ? buildThreads(fiber, fiber.threads) : [],
//       };
//       setSrcLink(tmp);
//     }
//   };

//   const handleBufferChange = (value) => {
//     if (!srcLink.fiber) return;
    
//     const buffer = srcLink.fiber.buffers.find((x) => x.value == value);
//     if (buffer) {
//       const tmp = {
//         ...srcLink,
//         buffer: buffer,
//         thread: null,
//         threads: buildThreads(buffer, buffer.threads),
//       };
//       setSrcLink(tmp);
//     }
//   };

//   const handleThreadChange = (value) => {
//     if (value) {
//       const tmp = {
//         ...srcLink,
//         thread: value,
//       };
//       setSrcLink(tmp);
//     }
//   };

//   // COMPONENTE PARA RENDERIZAR LA LISTA DE PUERTOS
//   const PortsList = () => {
//     return (
//       <View style={styles.portsContainer}>
//         {deviceData.ports && deviceData.ports.map((item, index) => (
//           <RenderLink 
//             key={item.number || index} 
//             port={item.number} 
//             enabled={item.enabled} 
//           />
//         ))}
//       </View>
//     );
//   };

//   useEffect(() => {
//     const loadFibers = async () => {
//       let records = await getFibersByProjectId(projectId, null);

//       // Filtrar fibras según el tipo de nodo
//       if (node) {
//         if (node.typeId === 4) {
//           // UNIT: Solo mostrar la fibra DROP de esta UNIT específica
//           const nodeIdentifier = node.id || node.hash; // Usar id de BD si existe, sino hash
//           console.log('🔷 DeviceLinks - Filtering fibers for UNIT:', node.label, 'identifier:', nodeIdentifier);
//           records = records.filter(f => {
//             const isUnitFiber = f.nodeId === nodeIdentifier;
//             console.log('  Fiber:', f.label, 'nodeId:', f.nodeId, 'matches:', isUnitFiber);
//             return isUnitFiber;
//           });
//           console.log('🔷 DeviceLinks - Filtered fibers count:', records.length);
//         } else if (node.typeId === 1) {
//           // MDF (typeId===1): Excluir TODAS las fibras DROP (nunca conexión directa MDF→UNIT)
//           console.log('🔷 DeviceLinks - MDF: Excluding all DROP fibers');
//           records = records.filter(f => {
//             const isNotDropFiber = !f.nodeId;
//             if (f.nodeId) {
//               console.log('  Excluding DROP fiber:', f.label);
//             }
//             return isNotDropFiber;
//           });
//           console.log('🔷 DeviceLinks - Available fibers after filter:', records.length);
//         } else {
//           // IDF (typeId===2) y Pedestal (typeId===3): Mostrar TODAS las fibras (incluidas DROP para fusionar a UNITs)
//           console.log('🔷 DeviceLinks - IDF/Pedestal: Showing all fibers including DROP');
//           console.log('🔷 DeviceLinks - Total fibers available:', records.length);
//         }
//       }

//       for (let i = 0; i < records.length; i++) {
//         let buffers = [
//           {
//             ...records[i],
//             value: records[i].id,
//           },
//         ];

//         let children = await getFibersByProjectId(projectId, records[i].id);

//         children = children.map((b) => {
//           return {
//             ...b,
//             value: b.id,
//           };
//         });

//         buffers = [...buffers, ...children];

//         let f = {
//           ...records[i],
//           buffers: buffers,
//         };

//         records[i] = f;
//       }

//       records = records.map((f) => {
//         return {
//           ...f,
//           value: f.id != undefined ? f.id : f.hash,
//           label: f.label, // Asegurar que tiene label para el picker
//         };
//       });
//       console.log('🔷 Final fibersData for picker:', records.map(f => ({ label: f.label, value: f.value })));
//       setFibersData(records);
//       return records;
//     };

//     loadFibers()
//       .then((fibers) => {})
//       .catch((e) => {
//         console.error(e);
//       });

//     if (device != undefined) setDeviceData(device);
//   }, []);

//   return (
//     <View
//       style={[
//         stylesFull.screen,
//         { backgroundColor: colors.background },
//         { paddingBottom: bottomInset },
//       ]}
//     >
//       {/* Header */}
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
//           <Ionicons name="arrow-back" size={24} color={colors.text} />
//         </TouchableOpacity>

//         <Text style={[styles.headerTitle, { color: colors.text }]}>
//           {t("Links")}
//         </Text>

//         <View style={styles.headerActions}>
//           <TouchableOpacity onPress={handleSave} style={styles.mapButton}>
//             <Ionicons name="save" size={24} color={colors.primary} />
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Contenido */}
//       <ScrollView style={styles.content}>
//         {/* Fusion links */}
//         <View style={[styles.card, { backgroundColor: colors.card }]}>
//           <PortsList />
//         </View>
//       </ScrollView>

//       {/** Modal de configuración de link - CORREGIDO */}
//       <Modal
//         visible={showLinkSetupModal}
//         transparent={true}
//         animationType="fade"
//         onRequestClose={() => setShowLinkSetupModal(false)}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalTitle}>{t("setupLink")}</Text>

//             <ScrollView style={styles.projectList}>
//               {/* Selector de Fibra */}
//               <View style={{ marginBottom: 16 }}>
//                 <Text style={styles.label}>{t("Source")}</Text>
//                 <RNPickerSelect
//                   onValueChange={handleFiberChange}
//                   items={fibersData}
//                   style={pickerSelectStyles}
//                   placeholder={{ label: t("selectAnOption"), value: null }}
//                   value={srcLink.fiber?.value}
//                   useNativeAndroidPickerStyle={false}
//                 />
//               </View>

//               {/* Selector de Buffer - Solo si hay múltiples buffers */}
//               {srcLink.fiber?.buffers?.length > 1 && (
//                 <View style={{ marginBottom: 16 }}>
//                   <Text style={styles.label}>{t("Buffer")}</Text>
//                   <RNPickerSelect
//                     onValueChange={handleBufferChange}
//                     items={srcLink.fiber.buffers}
//                     style={pickerSelectStyles}
//                     placeholder={{ label: t("selectAnOption"), value: null }}
//                     value={srcLink.buffer?.value}
//                     useNativeAndroidPickerStyle={false}
//                   />
//                 </View>
//               )}

//               {/* Selector de Hilo */}
//               <View style={{ marginBottom: 16 }}>
//                 <Text style={styles.label}>{t("Thread")}</Text>
//                 <RNPickerSelect
//                   onValueChange={handleThreadChange}
//                   items={srcLink.threads}
//                   style={pickerSelectStyles}
//                   placeholder={{ label: t("selectAnOption"), value: null }}
//                   value={srcLink.thread}
//                   useNativeAndroidPickerStyle={false}
//                   disabled={srcLink.threads.length === 0}
//                 />
//               </View>
//             </ScrollView>

//             <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
//               <TouchableOpacity 
//                 style={[styles.successButton, { flex: 1, marginRight: 8, backgroundColor: colors.primary }]}
//                 onPress={handleCloseModal}
//               >
//                 <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>
//                   {t("ok")}
//                 </Text>
//               </TouchableOpacity>
              
//               <TouchableOpacity 
//                 style={[styles.successButton, { flex: 1, marginLeft: 8, backgroundColor: colors.danger }]}
//                 onPress={() => setShowLinkSetupModal(false)}
//               >
//                 <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>
//                   {t("cancel")}
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// export default DeviceLinks;

// components/screens/DeviceLinks.js
import React, { useState, useEffect } from "react";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
  Platform
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useApp } from "../context/AppContext";
import { useTranslation } from "../hooks/useTranslation";
import { useDevice } from "../context/DeviceContext";
import { useAdapter } from "@/api/contexts/DatabaseContext";

import RNPickerSelect from "react-native-picker-select";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DeviceLinks = ({ route, navigation }) => {
  const { getFibersByProjectId } = useAdapter()();

  const { topInset, bottomInset, stylesFull } = useDevice();
  const { isDarkMode } = useApp();
  const { t } = useTranslation();
  const { device, node, projectId } = route.params;

  const [fibersData, setFibersData] = useState([]);
  const [showLinkSetupModal, setShowLinkSetupModal] = useState(false);
  const [selectedPort, setSelectedPort] = useState(null);
  const [deviceData, setDeviceData] = useState(device);
  const [isLoading, setIsLoading] = useState(true);

  const [srcLink, setSrcLink] = useState({
    fiber: null,
    buffer: null,
    thread: null,
    threads: [],
  });

  const fiberColors12Hex = [
    { index: 0, color: "#0000FF" },
    { index: 1, color: "#FFA500" },
    { index: 2, color: "#008000" },
    { index: 3, color: "#A52A2A" },
    { index: 4, color: "#708090" },
    { index: 5, color: "#FFFFFF" },
    { index: 6, color: "#FF0000" },
    { index: 7, color: "#000000" },
    { index: 8, color: "#FFFF00" },
    { index: 9, color: "#EE82EE" },
    { index: 10, color: "#FFC0CB" },
    { index: 11, color: "#00FFFF" },
  ];

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
    cardBackground: isDarkMode ? "#1e1e1e" : "white",
  };

  const styles = StyleSheet.create({
    projectList: {
      maxHeight: 300,
      marginBottom: 20,
    },
    button: {
      borderRadius: 8,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 16,
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    link: {
      fontSize: 15,
      fontWeight: "600",
      color: "#787575ff",
    },
    enabledPort: {
      fontSize: 15,
      fontWeight: "600",
      color: colors.text,
    },
    disabledPort: {
      fontSize: 15,
      fontWeight: "600",
      color: "#d3d3d3ff",
    },
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
    label: {
      fontSize: 15,
      fontWeight: "600",
      color: colors.text,
      marginBottom: 8,
      marginTop: 12,
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
    },
    content: {
      flex: 1,
      padding: 16,
    },
    card: {
      backgroundColor: colors.card,
      padding: 20,
      borderRadius: 12,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: colors.border,
    },
    portsContainer: {
      flex: 1,
    },
    portItem: {
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    buttonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
      gap: 12,
    },
    modalScrollContent: {
      paddingBottom: 10,
    },
    pickerContainer: {
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
    }
  });

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
    inputWeb: {
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
      width: '100%',
    },
    placeholder: {
      color: colors.placeholder,
    },
    iconContainer: {
      top: 12,
      right: 12,
    },
  };

  // Función para obtener el label de la fibra
  const getFiberLabel = (fiberId) => {
    if (!fiberId) return "Fibra";
    
    for (let i = 0; i < fibersData.length; i++) {
      const fiber = fibersData[i];
      if (fiber.id === fiberId) {
        return fiber.label;
      } else {
        const label = getFiberLabelFrom(fiber.buffers, fiberId);
        if (label !== undefined) return label;
      }
    }
    return "Fibra";
  };

  const getFiberLabelFrom = (items, fiberId) => {
    if (!items) return undefined;
    
    for (let i = 0; i < items.length; i++) {
      const fiber = items[i];
      if (fiber.id === fiberId) {
        return fiber.label;
      }
    }
    return undefined;
  };

  // Construir threads disponibles - MEMOIZADO para evitar renders infinitos
  const buildThreads = React.useCallback((fiber, threads) => {
    if (!fiber) {
      console.warn('⚠️ buildThreads llamado sin fiber');
      return [];
    }

    console.log('🔄 Construyendo threads para:', fiber?.label);
    
    if (!threads || !Array.isArray(threads)) {
      console.log('⚠️ No hay threads definidos, creando defaults');
      threads = Array.from({length: 12}, (_, index) => ({
        number: index + 1,
        active: true
      }));
    }

    let tmp = threads.filter((x) => x?.active === true);
    let result = [];
    const links = deviceData?.links || [];

    console.log('🔍 Threads activos:', tmp.length);
    console.log('🔍 Links existentes:', links.length);

    tmp.forEach((thread) => {
      if (!thread?.number) return; // Protección contra threads sin number
      
      let found = false;
      const number = thread.number;

      for (let i = 0; i < links.length; i++) {
        const lx = links[i]?.src;
        if (lx && (lx.fiberId === fiber.id || lx.bufferId === fiber.id)) {
          if (lx.thread === number) {
            found = true;
            console.log(`🔍 Thread ${number} ya está en uso`);
            break;
          }
        }
      }

      if (!found) {
        result.push(thread);
      }
    });

    const finalResult = result.map((thread) => ({
      ...thread,
      value: thread.number,
      label: `${t("thread") || "Hilo"}-${thread.number}`,
      key: `thread-${thread.number}`,
    }));

    console.log('✅ Threads disponibles:', finalResult.length);
    return finalResult;
  }, [deviceData?.links, t]);

  // Función para obtener color de contraste
  const getContrastColor = (hexColor) => {
    if (!hexColor) return "#000000";
    
    const hex = hexColor.replace("#", "");
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? "#000000" : "#FFFFFF";
  };

  // Componente RenderLink
  const RenderLink = ({ port, enabled }) => {
    let link = null;
    if (deviceData?.links) {
      link = deviceData.links.find((x) => x.port === port);
    }

    let textColor = null;
    let fiberLabel = "Fibra";
    let bufferLabel = "Buffer";
    let bkColor = fiberColors12Hex[0].color;

    if (link != null && link.src) {
      const threadIndex = link.src.thread != null && link.src.thread > 0 ? link.src.thread - 1 : 0;
      const colorObj = fiberColors12Hex[threadIndex] || fiberColors12Hex[0];
      bkColor = colorObj.color;
      textColor = getContrastColor(bkColor);
      fiberLabel = getFiberLabel(link.src.fiberId);
      bufferLabel = getFiberLabel(link.src.bufferId);
    }

    return (
      <View style={styles.portItem}>
        <View style={styles.row}>
          <Text style={enabled ? styles.enabledPort : styles.disabledPort}>
            {`${t("port") || "Puerto"} - ${port}`}
          </Text>

          {link != null && (
            <View style={styles.row}>
              <Ionicons
                name="link"
                size={20}
                style={{ color: "#727272ff", marginHorizontal: 10 }}
              />

              <View
                style={{
                  backgroundColor: bkColor,
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  borderRadius: 6,
                  marginRight: 8,
                }}
              >
                <Text style={[styles.link, { color: textColor }]}>
                  {`${t("threadShort") || "H"}${link.src.thread}`}
                </Text>
              </View>

              <Ionicons name={"caret-back"} size={16} color={"#a1a0a0ff"} />
              
              {link.src.bufferId != null && (
                <View style={styles.row}>
                  <Text style={styles.link}>{`${t("bufferShort") || "B"} ${bufferLabel}`}</Text>
                  <Ionicons name={"caret-back"} size={16} color={"#a1a0a0ff"} />
                </View>
              )}

              <Text style={styles.link}>{fiberLabel}</Text>
            </View>
          )}
        </View>

        <View style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          gap: 8,
          marginTop: 8,
        }}>
          <TouchableOpacity onPress={() => handleSetupLink(port)}>
            <Ionicons name="settings" size={24} color="#727272ff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleRemoveLink(port)}>
            <Ionicons name="trash" size={24} color="salmon" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // Función para eliminar links
  const handleRemoveLink = (portNumber) => {
    Alert.alert(
      t("confirmDelete") || "Confirmar eliminación",
      t("confirmDeleteLinkMessage") || "¿Estás seguro de que quieres eliminar este enlace?",
      [
        {
          text: t("cancel") || "Cancelar",
          style: "cancel"
        },
        {
          text: t("delete") || "Eliminar",
          style: "destructive",
          onPress: () => {
            if (deviceData?.links) {
              const updatedLinks = deviceData.links.filter(link => link.port !== portNumber);
              setDeviceData({
                ...deviceData,
                links: updatedLinks
              });
            }
          }
        }
      ]
    );
  };

  // Función para configurar link
  const handleSetupLink = (portNumber) => {
    console.log('🔧 Configurando link para puerto:', portNumber);
    setSelectedPort(portNumber);
    setSrcLink({
      fiber: null,
      buffer: null,
      thread: null,
      threads: [],
    });
    setShowLinkSetupModal(true);
  };

  // Manejadores de cambios en los selectores
  const handleFiberChange = (value) => {
    if (value === null || value === undefined) {
      console.warn('⚠️ Fiber value inválido:', value);
      setSrcLink({
        fiber: null,
        buffer: null,
        thread: null,
        threads: [],
      });
      return;
    }

    console.log('🎯 Fiber seleccionado:', value);
    const fiber = fibersData?.find((x) => x?.value === value);
    
    if (fiber) {
      console.log('🎯 Fiber encontrado:', fiber.label);
      const threads = fiber?.buffers && fiber.buffers.length <= 1 ? 
        buildThreads(fiber, fiber?.threads) : [];
      
      console.log('🎯 Threads disponibles:', threads.length);
      
      setSrcLink(prevState => ({
        ...prevState,
        fiber: fiber,
        buffer: null,
        thread: null,
        threads: threads,
      }));
    } else {
      console.log('❌ Fiber no encontrado con value:', value);
      setSrcLink({
        fiber: null,
        buffer: null,
        thread: null,
        threads: [],
      });
    }
  };

  const handleBufferChange = (value) => {
    if (value === null || value === undefined) {
      console.warn('⚠️ Buffer value inválido:', value);
      return;
    }

    console.log('🎯 Buffer seleccionado:', value);
    if (!srcLink?.fiber) {
      console.log('❌ No hay fiber seleccionado');
      return;
    }
    
    const buffer = srcLink.fiber?.buffers?.find((x) => x?.value === value);
    if (buffer) {
      console.log('🎯 Buffer encontrado:', buffer.label);
      const threads = buildThreads(buffer, buffer?.threads);
      console.log('🎯 Threads disponibles para buffer:', threads.length);
      
      setSrcLink(prevState => ({
        ...prevState,
        buffer: buffer,
        thread: null,
        threads: threads,
      }));
    } else {
      console.log('❌ Buffer no encontrado');
    }
  };

  const handleThreadChange = (value) => {
    if (value === null || value === undefined) {
      console.warn('⚠️ Thread value inválido:', value);
      return;
    }
    console.log('🎯 Thread seleccionado:', value);
    setSrcLink(prevState => ({
      ...prevState,
      thread: value,
    }));
  };

  // Guardar configuración del link - PROTEGIDO contra crashes
  const handleSaveLink = () => {
    if (!srcLink?.fiber || srcLink.thread == null) {
      Alert.alert(
        t("error") || "Error", 
        t("selectFiberAndThread") || "Por favor selecciona una fibra y un hilo"
      );
      return;
    }

    try {
      const links = deviceData?.links || [];
      const src = {
        fiberId: srcLink.fiber.id,
        bufferId: srcLink.buffer?.id || null,
        thread: srcLink.thread,
      };

      const existingIndex = links.findIndex((x) => x?.port === selectedPort);

      const newLinks = [...links];
      if (existingIndex === -1) {
        newLinks.push({ port: selectedPort, src: src });
      } else {
        newLinks[existingIndex].src = src;
      }

      setDeviceData(prevState => ({
        ...prevState,
        links: newLinks,
      }));

      console.log('💾 Link guardado:', {
        port: selectedPort,
        fiber: srcLink.fiber.label,
        buffer: srcLink.buffer?.label,
        thread: srcLink.thread
      });

      // Cerrar modal después de guardar
      setShowLinkSetupModal(false);
      setSrcLink({
        fiber: null,
        buffer: null,
        thread: null,
        threads: [],
      });
    } catch (error) {
      console.error('❌ Error guardando link:', error);
      Alert.alert("Error", "No se pudo guardar el enlace: " + error.message);
    }
  };

  // Cerrar modal sin guardar
  const handleCancelLink = () => {
    setShowLinkSetupModal(false);
    setSrcLink({
      fiber: null,
      buffer: null,
      thread: null,
      threads: [],
    });
  };

  // Guardar dispositivo
  const handleSave = () => {
    console.log('💾 Guardando dispositivo...');
    if (route.params?.onSaveDeviceData) {
      route.params.onSaveDeviceData(deviceData);
      console.log('✅ Datos del dispositivo enviados');
    } else {
      console.warn('⚠️ No se encontró callback onSaveDeviceData');
    }
    navigation.goBack();
  };

  // FUNCIÓN DEBUG PARA VERIFICAR DATOS
  const debugFibersData = () => {
    console.log('=== DEBUG FIBERS DATA ===');
    console.log('Total fibers:', fibersData.length);
    console.log('Is loading:', isLoading);
    
    if (fibersData.length === 0) {
      console.log('❌ NO HAY FIBRAS CARGADAS');
    } else {
      fibersData.forEach((fiber, index) => {
        console.log(`Fiber ${index}:`, {
          label: fiber.label,
          value: fiber.value,
          id: fiber.id,
          hash: fiber.hash,
          nodeId: fiber.nodeId,
          buffers: fiber.buffers?.length || 0,
          buffersList: fiber.buffers?.map(b => ({ 
            label: b.label, 
            value: b.value,
            id: b.id 
          }))
        });
      });
    }
    console.log('=== END DEBUG ===');
  };

  // Cargar fibras - VERSIÓN CORREGIDA CON ASYNCSTORAGE
  useEffect(() => {
    const loadFibers = async () => {
      try {
        setIsLoading(true);
        console.log('🔷 Cargando fibras para proyecto:', projectId);
        console.log('🔷 Nodo actual:', node?.label, 'Tipo:', node?.typeId);
        
        // 🔥 CAMBIO: Leer de AsyncStorage PRIMERO
        let records = [];
        const asyncKey = `@fibraoptica/fibers_project_${projectId}`;
        let asyncData = null;
        
        try {
          asyncData = await AsyncStorage.getItem(asyncKey);
          if (asyncData) {
            const allFibersFromAsync = JSON.parse(asyncData);
            console.log('✅ Fibras cargadas de AsyncStorage:', allFibersFromAsync.length);
            
            // Filtrar solo fibras principales (parentFiberId = null)
            records = allFibersFromAsync.filter(f => !f.parentFiberId);
            console.log('🔷 Fibras principales (sin buffer parent):', records.length);
          } else {
            console.log('⚠️ No hay fibras en AsyncStorage');
          }
        } catch (asyncError) {
          console.error('❌ Error leyendo AsyncStorage:', asyncError);
        }
        
        // Fallback: Si no hay en AsyncStorage, intenta BD
        if (records.length === 0) {
          console.log('📥 Fallback: Intentando BD...');
          records = await getFibersByProjectId(projectId, null);
          console.log('🔷 Fibras obtenidas de BD (fallback):', records.length);
        }
        
        if (records.length === 0) {
          console.log('❌ NO SE OBTUVIERON FIBRAS (ni AsyncStorage ni BD)');
        }

        // FILTRADO MÁS FLEXIBLE
        if (node && records.length > 0) {
          if (node.typeId === 4) {
            // UNIT: Mostrar fibra DROP específica
            const nodeIdentifier = node.id || node.hash;
            console.log('🔷 Filtrando para UNIT - identifier:', nodeIdentifier);
            const filteredRecords = records.filter(f => f.nodeId === nodeIdentifier);
            console.log('🔷 Fibras después de filtrar para UNIT:', filteredRecords.length);
            records = filteredRecords;
          } else if (node.typeId === 1) {
            // MDF: Mostrar TODAS las fibras (no excluir)
            console.log('🔷 Para MDF: Mostrando todas las fibras');
            records = records;
          } else if (node.typeId === 3) {
            // Pedestal: Mostrar todas las fibras
            console.log('🔷 Para Pedestal: Mostrando todas las fibras');
            records = records;
          }
        }

        // PROCESAR ESTRUCTURA DE DATOS PARA PICKERS
        // Parse AsyncStorage data ONCE (outside loop to avoid repeated parsing)
        let allFibersFromAsync = [];
        if (asyncData) {
          try {
            allFibersFromAsync = JSON.parse(asyncData);
            console.log('✅ Datos AsyncStorage parseados una sola vez:', allFibersFromAsync.length);
          } catch (e) {
            console.error('❌ Error parseando AsyncStorage:', e);
          }
        }

        const processedRecords = [];
        
        for (let i = 0; i < records.length; i++) {
          const fiber = records[i];
          
          // 🔥 CAMBIO: Usar threads del objeto, no crear ficticio
          let threads = fiber.metadata?.threads || fiber.threads || [];
          if (threads.length === 0) {
            threads = Array.from({length: 12}, (_, index) => ({
              number: index + 1,
              active: true
            }));
          }
          console.log(`📊 Threads de ${fiber.label}: ${threads.length}`);

          // Obtener buffers hijos - primero de AsyncStorage
          let buffers = [{ 
            ...fiber, 
            value: fiber.id || fiber.hash,
            label: fiber.label || `Fibra ${i + 1}`,
            key: `fiber-${fiber.id || fiber.hash}-main`,
            threads: threads
          }];
          
          try {
            let children = [];
            
            // 🔥 CAMBIO: Leer buffers de AsyncStorage primero (sin reparsear)
            if (allFibersFromAsync && allFibersFromAsync.length > 0) {
              children = allFibersFromAsync.filter(f => f.parentFiberId === fiber.id);
              if (children.length > 0) {
                console.log(`✅ Buffers de ${fiber.label} desde AsyncStorage:`, children.length);
              }
            }
            
            // Fallback a BD
            if (children.length === 0) {
              children = await getFibersByProjectId(projectId, fiber.id);
              if (children.length > 0) {
                console.log(`📥 Buffers de ${fiber.label} desde BD (fallback):`, children.length);
              }
            }
            
            const childBuffers = children.map((b, idx) => {
              const bufferThreads = b.metadata?.threads || b.threads || [];
              if (bufferThreads.length === 0) {
                bufferThreads.push(...Array.from({length: 12}, (_, index) => ({
                  number: index + 1,
                  active: true
                })));
              }
              
              return {
                ...b,
                value: b.id || b.hash,
                label: b.label || `Buffer ${idx + 1}`,
                key: `buffer-${b.id || b.hash}-${fiber.id}`,
                threads: bufferThreads
              };
            });

            buffers = [...buffers, ...childBuffers];
            console.log(`📦 Total items para ${fiber.label} (fibra + ${childBuffers.length} buffers):`, buffers.length);
          } catch (error) {
            console.error('Error cargando buffers:', error);
          }

          processedRecords.push({
            ...fiber,
            buffers: buffers,
            value: fiber.id || fiber.hash,
            label: fiber.label || `Fibra ${i + 1}`,
            key: `fiber-${fiber.id || fiber.hash}`,
            threads: threads
          });
        }

        console.log('🔷 Registros procesados para pickers:', processedRecords.length);
        console.log('🔷 Estructura final:', processedRecords.map(f => ({
          label: f.label,
          value: f.value,
          buffers: f.buffers?.length || 0
        })));

        setFibersData(processedRecords);
        
      } catch (error) {
        console.error('❌ Error crítico cargando fibras:', error);
        Alert.alert("Error", "No se pudieron cargar las fibras: " + error.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadFibers();
    if (device) setDeviceData(device);
  }, [projectId, node]);

  // Componente para lista de puertos
  const PortsList = () => {
    if (!deviceData.ports || deviceData.ports.length === 0) {
      return (
        <View style={{ padding: 20, alignItems: 'center' }}>
          <Text style={{ color: colors.text }}>
            {t("noPortsAvailable") || "No hay puertos disponibles"}
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.portsContainer}>
        {deviceData.ports.map((item, index) => (
          <RenderLink 
            key={item.number || `port-${index}`} 
            port={item.number} 
            enabled={item.enabled} 
          />
        ))}
      </View>
    );
  };

  // COMPONENTE ALTERNATIVO PARA WEB - Si RNPickerSelect no funciona
  const CustomPicker = ({ items, onValueChange, value, placeholder, disabled = false }) => {
    if (Platform.OS === 'web') {
      return (
        <View style={styles.pickerContainer}>
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

  return (
    <View style={[stylesFull.screen, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          {t("Links") || "Enlaces"}
        </Text>

        <View style={styles.headerActions}>
          {/* BOTÓN DEBUG */}
          <TouchableOpacity 
            onPress={debugFibersData} 
            style={[styles.mapButton, { marginRight: 10 }]}
          >
            <Ionicons name="bug" size={20} color={colors.warning} />
          </TouchableOpacity>
          
          <TouchableOpacity onPress={handleSave} style={styles.mapButton}>
            <Ionicons name="save" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Contenido */}
      <ScrollView style={styles.content}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <Text style={{ color: colors.text }}>Cargando fibras...</Text>
          </View>
        ) : (
          <View style={styles.card}>
            <PortsList />
          </View>
        )}
      </ScrollView>

      {/* Modal de configuración de link */}
      <Modal
        visible={showLinkSetupModal}
        transparent={true}
        animationType="slide"
        onRequestClose={handleCancelLink}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {t("setupLink") || "Configurar Enlace"} - {t("port") || "Puerto"} {selectedPort}
            </Text>

            {fibersData.length === 0 && !isLoading && (
              <View style={styles.warningBox}>
                <Text style={styles.warningText}>
                  No hay fibras disponibles para este nodo
                </Text>
              </View>
            )}

            <ScrollView 
              style={styles.projectList}
              contentContainerStyle={styles.modalScrollContent}
            >
              {/* Selector de Fibra */}
              <View>
                <Text style={styles.label}>{t("Source") || "Fuente"}</Text>
                <CustomPicker
                  onValueChange={handleFiberChange}
                  items={fibersData}
                  placeholder={{ 
                    label: fibersData.length === 0 
                      ? "No hay fibras disponibles" 
                      : (t("selectAnOption") || "Seleccione una fibra..."), 
                    value: null 
                  }}
                  value={srcLink.fiber?.value}
                  disabled={fibersData.length === 0}
                />
                <Text style={styles.debugInfo}>
                  {fibersData.length} {fibersData.length === 1 ? 'fibra disponible' : 'fibras disponibles'}
                </Text>
              </View>

              {/* Selector de Buffer - Solo si hay múltiples buffers */}
              {srcLink.fiber?.buffers && srcLink.fiber.buffers.length > 1 && (
                <View>
                  <Text style={styles.label}>{t("Buffer") || "Buffer"}</Text>
                  <CustomPicker
                    onValueChange={handleBufferChange}
                    items={srcLink.fiber.buffers}
                    placeholder={{ 
                      label: t("selectAnOption") || "Seleccione un buffer...", 
                      value: null 
                    }}
                    value={srcLink.buffer?.value}
                  />
                  <Text style={styles.debugInfo}>
                    {srcLink.fiber.buffers.length} buffers disponibles
                  </Text>
                </View>
              )}

              {/* Selector de Hilo */}
              <View>
                <Text style={styles.label}>{t("Thread") || "Hilo"}</Text>
                <CustomPicker
                  onValueChange={handleThreadChange}
                  items={srcLink.threads}
                  placeholder={{ 
                    label: srcLink.threads.length === 0 
                      ? (t("noThreadsAvailable") || "No hay hilos disponibles") 
                      : (t("selectAnOption") || "Seleccione un hilo..."), 
                    value: null 
                  }}
                  value={srcLink.thread}
                  disabled={srcLink.threads.length === 0}
                />
                {srcLink.threads.length === 0 && srcLink.fiber && (
                  <Text style={{ 
                    fontSize: 12, 
                    color: colors.warning, 
                    marginTop: 4,
                    fontStyle: 'italic'
                  }}>
                    {t("allThreadsInUse") || "Todos los hilos están en uso"}
                  </Text>
                )}
                <Text style={styles.debugInfo}>
                  {srcLink.threads.length} hilos disponibles
                </Text>
              </View>
            </ScrollView>

            <View style={styles.buttonsContainer}>
              <TouchableOpacity 
                style={[styles.button, { backgroundColor: colors.danger }]}
                onPress={handleCancelLink}
              >
                <Text style={styles.buttonText}>
                  {t("cancel") || "Cancelar"}
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.button, { 
                  backgroundColor: (srcLink.fiber && srcLink.thread) ? colors.success : '#cccccc'
                }]}
                onPress={handleSaveLink}
                disabled={!srcLink.fiber || !srcLink.thread}
              >
                <Text style={styles.buttonText}>
                  {t("save") || "Guardar"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DeviceLinks;