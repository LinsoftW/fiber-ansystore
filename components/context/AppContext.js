// contexts/AppContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { useColorScheme, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { mimeTypes } from "@/utils/mimeTypes";

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [language, setLanguage] = useState("es");
  const [theme, setTheme] = useState("light"); // 'light', 'dark', 'system'
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Efecto para aplicar el tema según la selección
  useEffect(() => {
    if (theme === "system") {
      setIsDarkMode(systemColorScheme === "dark");
    } else {
      setIsDarkMode(theme === "dark");
    }
  }, [theme, systemColorScheme]);

  useEffect(() => {
    initializeApp();
    // checkAuthentication();
    loadThemePreference();
  }, []);

  const initializeApp = async () => {
    try {
      setIsLoading(true);
      
      // Cargar todas las preferencias en paralelo
      const [authStatus, themePreference, languagePreference] =
        await Promise.all([
          AsyncStorage.getItem("@user_authenticated"),
          AsyncStorage.getItem("@theme_preference"),
          AsyncStorage.getItem("@language_preference"),
        ]);
      
      // Establecer estado de autenticación correctamente
      setIsAuthenticated(authStatus === "true");

      if (themePreference) {
        setTheme(themePreference);
      }

      if (languagePreference) {
        setLanguage(languagePreference);
      }
    } catch (error) {
      console.error("Error initializing app:", error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  // 🔥 NUEVO: Estado y funciones para manejar actualizaciones de fibras
  const [fiberUpdates, setFiberUpdates] = useState({});

  const updateFiberData = (fiberId, data) => {
    setFiberUpdates(prev => ({
      ...prev,
      [fiberId]: {
        data,
        timestamp: Date.now()
      }
    }));
  };

  const getFiberUpdate = (fiberId) => {
    return fiberUpdates[fiberId];
  };

  const clearFiberUpdate = (fiberId) => {
    setFiberUpdates(prev => {
      const newUpdates = { ...prev };
      delete newUpdates[fiberId];
      return newUpdates;
    });
  };

  // 🔥 NUEVO: Estado y funciones para manejar medios de nodos
  const [nodeMediaUpdates, setNodeMediaUpdates] = useState({});

  const updateNodeMediaData = (nodeId, mediaData) => {
    setNodeMediaUpdates(prev => ({
      ...prev,
      [nodeId]: {
        media: mediaData,
        timestamp: Date.now()
      }
    }));
  };

  const getNodeMediaUpdate = (nodeId) => {
    return nodeMediaUpdates[nodeId];
  };

  const clearNodeMediaUpdate = (nodeId) => {
    setNodeMediaUpdates(prev => {
      const newUpdates = { ...prev };
      delete newUpdates[nodeId];
      return newUpdates;
    });
  };

  const login = async (username, password) => {
    setIsLoading(true);
    try {
      if (username.toLowerCase() !== "admin" || password !== "123456") {
        Alert.alert(t("error"), t("incorrectCredentials"));
        setIsLoading(false);
        return;
      }
      await AsyncStorage.setItem("@user_authenticated", "true");
      await AsyncStorage.setItem("@user_username", username);
      setIsAuthenticated(true);
      setIsLoading(false);
    } catch (error) {
      console.error("Error during logout:", error);
      setIsAuthenticated(false);
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("@user_authenticated");
      await AsyncStorage.removeItem("@user_username");
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const checkAuthentication = async () => {
    try {
      const authenticated = await AsyncStorage.getItem("@user_authenticated");
      setIsAuthenticated(authenticated === "true");
    } catch (error) {
      console.error("Error checking authentication:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadThemePreference = async () => {
    try {
      const themePreference = await AsyncStorage.getItem("@theme_preference");
      if (themePreference) {
        setTheme(themePreference);
      }
    } catch (error) {
      console.error("Error loading theme preference:", error);
    }
  };

  // Traducciones
  const translations = {
    en: {
      importFile: "Import file",
      comment: "Comment",
      information: "Information",
      nodeMedia: "Multimedia data",
      thread: "Thread",
      threadShort: "T",
      fiberShort: "F",
      bufferShort: "B",
      device: "Device",
      nodePath: "Node path to MDF",
      maxUnits: "You have already created the maximum number of units allowed.",
      buttonNo: "No, go back",
      buttonYes: "Yes, continue",
      projectSaved: "Project saved, do you want to continue working?",
      unit: "Unit",
      threadInUse: "Thread in use",
      setupLink: "Setup link",
      Links: "Links",
      Link: "Link",
      Source: "Source",
      Thread: "Thread number",
      Destiny: "Destiny",
      fusionPoint: "Fusion point",
      fusionLinks: "Fusion links",
      fusionLink: "Fusion link",
      nodeLinks: "Enlaces del nodo",
      allNodeFilter: "All",
      filterNodesModalTitle: "Filter nodes",
      noneSelectedBuffer: "None buffer selected",
      label: "Label",
      fiberDetails: "Fiber details",
      port: "Port",
      number: "Número",
      enabed: "Enabed",
      portsDetailsLabel: "Ports details",
      serialNumber: "Serial number",
      selectAnOption: "Select an option",
      devicesEmpty: "No devices added",
      addDevice: "Add device",
      editDevice: "Edit device",
      deviceModel: "Model",
      devicesLabel: "Conectivity devices",
      nodeDetails: "Node details",
      netNodes: "Network nodes",
      netFibers: "Fibers",
      settings: "Settings",
      language: "Language",
      appearance: "Appearance",
      notifications: "Notifications",
      privacyLocation: "Privacy & Location",
      dataManagement: "Data Management",
      legal: "Legal",
      appLanguage: "App Language",
      selectLanguage: "Select your preferred language",
      darkMode: "Dark Mode",
      enableDarkTheme: "Enable dark theme",
      pushNotifications: "Push Notifications",
      receiveNotifications: "Receive app notifications",
      locationServices: "Location Services",
      useLocationMaps: "Use your location for maps",
      autoSync: "Auto Sync",
      autoDataSync: "Automatic data synchronization",
      dataSaving: "Data Saving",
      reduceDataUsage: "Reduce data usage",
      clearCache: "Clear Cache",
      removeTempFiles: "Remove temporary files",
      exportData: "Export Data",
      backupData: "Backup your data",
      privacyPolicy: "Privacy Policy",
      handleData: "How we handle your data",
      termsService: "Terms of Service",
      appUsageTerms: "App usage terms",
      createProject: "New project",
      editProject: "Edit Project",
      scanQR: "Scan QR",
      createMaintenance: "Create Maintenance",
      viewOnMap: "View on Map",
      tools: "Tools",
      userProfile: "User Profile",
      settings: "Settings",
      logout1: "Logout",
      fiberOpticManagementSystem: "Fiber Optic Management System",
      mainMenu: "Main Menu",
      quickStats: "Quick Stats",
      activeProjects: "Active Projects",
      completed: "Completed",
      pending: "Pending",
      teamMembers: "Team Members",
      connected: "Connected",
      user: "User",
      password: "Password",
      login: "Login",
      loggingIn: "Logging in...",
      accessToSystem: "Access to the system",
      userRequired: "User is required",
      passwordRequired: "Password is required",
      minCharacters: "Minimum 6 characters",
      error: "Error",
      incorrectCredentials: "Incorrect credentials",
      forgotPassword: "Forgot your password?",
      ftthManager: "FTTH Manager",
      userProfile: "User Profile",
      personalInformation: "Personal Information",
      info: "Information",
      email: "Email",
      phone: "Phone",
      employeeId: "Employee ID",
      joinDate: "Join Date",
      status: "Status",
      completed: "Completed",
      active: "Active",
      rating: "Rating",
      actions: "Actions",
      changePassword: "Change Password",
      helpSupport: "Help & Support",
      privacyPolicy: "Privacy Policy",
      logoutConfirmation: "Are you sure you want to logout?",
      cancel: "Cancel",
      editProfile: "Edit Profile",
      editProfileComingSoon: "Profile editing functionality coming soon!",
      changePasswordComingSoon: "Password change functionality coming soon!",
      helpSupportComingSoon: "Help and support functionality coming soon!",
      privacyPolicyComingSoon: "Privacy policy documentation coming soon!",
      propertyInformation: "Property Information",
      unitInformation: "Unit Information",
      projectType: "Project Type",
      attachments: "Attachments",
      editProject: "Edit Project",
      propertyName: "Property Name",
      propertyAddress: "Property Address",
      city: "City",
      state: "State",
      description: "Description",
      projectDescription: "Project Description",
      // Campos del formulario
      propertyName: "Project name",
      propertyAddress: "Property address",
      city: "City",
      state: "State",
      description: "Description",
      enterAddress: "Enter address",
      projectDescription: "Project description",

      // Unidades
      livingUnits: "Living units",
      officesAmenities: "Offices/Amenities",
      commercialUnits: "Commercial units",
      totalUnits: "Total units",

      // Tipos de proyecto
      buildType: "Build type",
      jobType: "Job type",
      buildingType: "Building type",
      residential: "Residential",
      commercial: "Commercial",
      mixedUse: "Mixed Use",
      gardenStyle: "Garden Style",
      midRise: "Mid Rise",
      highRise: "High Rise",
      townhome: "Townhome",
      singleFamily: "Single Family",

      // Archivos
      attachFile: "Attach File",

      // Botones de acción
      generateQR: "QR",
      share: "Share",
      save: "Save",
      update: "Update",
      project: "Project",
      saving: "Saving...",

      // Modales
      projectQRCode: "Project QR Code",
      scanQRDescription: "Scan this QR code to quickly access project details",
      selectProjectToEdit: "Select Project to Edit",
      noProjectsFound: "No projects found",
      close: "Close",
      cancel: "Cancel",

      // Alertas y mensajes
      success: "Success",
      error: "Error",
      existingMaps: "Existing Maps",
      failedToLoadProject: "Failed to load project data",
      fileAttachedSuccess: "File attached successfully",
      failedToAttachFile: "Failed to attach file: ",
      nameAndAddressRequired: "Property name and address are required",
      projectCreated: "Project created successfully!",
      projectUpdated: "Project updated successfully!",
      failedToSave: "Failed to save project. Please try again.",
      failedToUpdate: "Failed to update project. Please try again.",
      failedToShare: "Failed to share project",

      // Compartir
      ftthProject: "FTTH Project",
      address: "Address",
      scanQRForDetails: "Scan the QR code for complete details",
      ftthProjectDetails: "FTTH Project Details",

      // Navegación
      configureNetwork: "Configure Network",
      viewProject: "View Project",
      // Títulos y textos generales
      connectivityDevices: "Connectivity Devices",
      networkDevices: "Network Devices",
      fiberTypes: "Fiber Types",
      configurationSummary: "Configuration Summary",

      // Subtítulos y descripciones
      selectDevicesConfigurePorts: "Select devices and configure ports",
      selectFiberTypesQuantities: "Fiber",
      selectedEquipment: "Selected Equipment",
      selectedFiberTypes: "Selected Fiber Types",
      fibersEmpty: "No fibers added",
      nodesEmpty: "Empty nodes",

      // Estadísticas
      devices: "Devices",
      totalPorts: "Total Ports",
      totalFibers: "Total Fibers",

      // Descripciones de dispositivos
      ethernetSwitching: "Ethernet switching",
      networkRouting: "Network routing",
      wirelessConnectivity: "Wireless connectivity",
      opticalLineTerminal: "Optical Line Terminal",
      opticalNetworkTerminal: "Optical Network Terminal",
      opticalSignalSplitting: "Optical signal splitting",

      // Descripciones de fibra
      fiber12FDescription: "12 fibers - Small capacity",
      fiber24FDescription: "24 fibers - Standard capacity",
      fiber48FDescription: "48 fibers - Medium capacity",
      fiber96FDescription: "96 fibers - High capacity",
      fiber192FDescription: "192 fibers - Very high capacity",

      // Campos de configuración
      quantity: "Quantity",
      ports: "Ports",
      portsEach: "ports each",
      fiberCable: "fiber cable",
      fibers: "fibers",
      total: "Total",

      // Botones y acciones
      continueNetworkConfiguration: "Continue Network Configuration",
      configureNetworkMap: "Configure Network Map",

      // Alertas y mensajes
      selectAtLeastOneDevice: "Please select at least one device",
      configurationSaved: "Configuration saved successfully!",
      configurationSaved1:
        "Configuration saved successfully! To open the network map, you must acquire the Google Maps APY_KEY.",
      viewmap:
        "To open the network map, you must acquire the Google Maps APY_KEY.",
      failedToSaveConfig: "Failed to save configuration",
      ok: "OK",
      permissionDenied: "Permission denied",
      locationAccessDenied: "Could not access location",
      errorGettingLocation: "Error getting location:",
      openingConfigModal: "Opening config modal:",
      error: "Error",
      configItemNotFound: "Configuration item not found",
      cleanConfigItem: "Clean config item:",
      configModalVisible: "Config modal should be visible now",
      gettingStandardColors: "Getting standard colors for fiber type:",
      nonNumericFiberType: "Non-numeric fiber type, returning generic colors",
      fiberCount: "Fiber count:",
      multiplesOf12: "Multiples of 12, colors:",
      nonMultiplesOf12: "Non-multiples of 12, colors:",
      loadingData: "=== LOADING DATA ===",
      nodesLoaded: "Nodes loaded:",
      errorLoadingData: "Error loading data:",
      failedLoadNetworkData: "Failed to load network data",
      addressNotAvailable: "Address not available",
      errorGettingAddress: "Error getting address:",
      notAvailable: "Not available",
      onlyAvailable: "Only available",
      errorSavingNetworkMap: "Error saving network map:",
      couldNotSaveNetworkMap: "Could not save network map",
      nameYourMap: "Name Your Map",
      enterMapName: "Enter a name for your network map:",
      mapNamePlaceholder: "e.g., Main Network Layout",
      mapNameRequired: "Map name is required",
      networkMapLoaded: "Network map loaded:",
      nodes: "nodes",
      errorLoadingNetworkMap: "Error loading saved network map:",
      success: "Success",
      networkMapSaved: "Network map saved successfully",
      nodeAdded: "node added successfully",
      errorAddingNode: "Error adding node:",
      failedAddNode: "Failed to add node",
      node: "Node",
      updated: "updated",
      errorUpdatingNode: "Error updating node:",
      failedUpdateNode: "Failed to update node",
      confirmDelete: "Confirm Delete",
      confirmDeleteMapMessage:
        "Are you sure you want to delete this network map? This action cannot be undone.",
      confirmDeleteNode:
        "Are you sure you want to delete this node? This action cannot be undone.",
      allMapsDeletedSuccessfully:
        "Are you sure you want to delete all maps? This action cannot be undone.",
      mapDeletedSuccessfully: "Map successfully removed",
      couldNotDeleteMap: "Could not delete map",
      confirmDeleteAll: "Confirm Delete All",
      noMapsToDelete: "No maps to delete",
      confirmDeleteAllMapsMessage:
        "Are you sure you want to delete ALL maps? This action cannot be undone.",
      cancel: "Cancel",
      delete: "Delete",
      nodeDeleted: "Node deleted successfully",
      nodeNotDeleted: "Node could not be deleted",
      errorDeletingNode: "Error deleting node:",
      failedDeleteNode: "Failed to delete node from database",
      errorDeleteConfirmation: "Error showing delete confirmation:",
      couldNotInitiateDelete: "Could not initiate delete operation",
      confirmClearAll: "Confirm Clear All",
      confirmClearAllNodes:
        "Are you sure you want to delete ALL nodes? This action cannot be undone.",
      deleteAll: "Delete All",
      allNodesDeleted: "All nodes have been deleted",
      errorDeletingAllNodes: "Error deleting all nodes:",
      failedDeleteAllNodes: "Failed to delete all nodes",
      errorClearAllConfirmation: "Error showing clear all confirmation:",
      couldNotInitiateClearAll: "Could not initiate clear all operation",
      renderingConnections: "Rendering connections:",
      connection: "Connection",
      skippingInvalidConnection: "Skipping invalid connection:",
      fiberConfig: "FiberConfig - fiber:",
      fiberColors: "FiberConfig - fiber.colors:",
      standardColors: "FiberConfig - standard colors:",
      ports: "ports",
      description: "Description",
      connectedTo: "Connected to",
      saveConfiguration: "Save Configuration",
      fiber: "Fiber",
      fibersWithStandardColors: "fibers with standard colors",
      quantity: "Quantity",
      unit: "unit",
      configureAll: "Configure all",
      fibers: "fibers",
      addNode: "Add Node",
      pedestal: "Pereston",
      unit: "Unit",
      saveNetwork: "Save Network",
      clearAll: "Clear all",
      editNode: "Edit Node",
      nodeName: "Node Name",
      enterNodeName: "Enter node name",
      owner: "Owner",
      enterOwnerName: "Enter owner name",
      address: "Address",
      addressFromCoordinates: "Address will be retrieved from coordinates",
      devices: "Devices",
      available: "Available",
      configure: "Configure",
      noDevicesConfigured: "No devices configured for this project",
      fiberTypes: "Fiber Types",
      noFiberTypesConfigured: "No fiber types configured for this project",
      noConfigNeededForNode:
        "No devices or fiber configuration needed for {nodeType} nodes.",
      blue: "Blue",
      orange: "Orange",
      green: "Green",
      brown: "Brown",
      slate: "Slate",
      white: "White",
      red: "Red",
      black: "Black",
      yellow: "Yellow",
      violet: "Violet",
      rose: "Rose",
      aqua: "Aqua",
      clear: "Clear",
      confirmClearCache: "Are you sure you want to clear all cached data?",
      cacheCleared: "Cache Cleared",
      cacheRemoved: "All cached data has been removed.",
      exportDataSoon: "Data export functionality coming soon!",
      privacyPolicySoon: "Privacy policy documentation coming soon!",
      termsServiceSoon: "Terms of service documentation coming soon!",
      build: "Build",
      lastUpdated: "Last updated",
      fiberOpticTools: "Fiber Optic Tools",
      fiberBreakageDetector: "Fiber Breakage Detector",
      detectFiberBreaks: "Detect fiber breaks with distance measurement",
      autoDistanceMeasurement: "Auto Distance Measurement",
      autoDistanceCalc: "Automatic distance calculation to fault points",
      maintenanceManagement: "Maintenance Management",
      maintenanceHistory: "Maintenance History",
      viewMaintenanceRecords: "View complete maintenance records",
      maintenanceJobs: "Maintenance Jobs",
      maintenanceByDate: "All maintenance work ordered by date",
      multimediaManagement: "Multimedia Management",
      multimediaGallery: "Multimedia Gallery",
      mediaByDate: "All media files ordered by date",
      reportMultimedia: "Report Multimedia",
      mediaForReports: "Media files assigned to specific reports",
      reports: "Reports",
      reportDetails: "Report Details",
      detailedMaintenanceReports: "Detailed view of maintenance reports",
      otdrDescription:
        "This feature uses OTDR technology to detect fiber breaks and measure distance to fault points.",
      fiberToolsPackage: "Fiber Tools Package",
      securityLevel: "Security Level: Enterprise",
      savedNetworkMaps: "Saved Network Maps",
      searchMapsPlaceholder: "Search maps by project ID...",
      noSavedMaps: "No saved maps found",
      createMapsToSeeHere:
        "Create network maps in the Projects section to see them here",
      project: "Project",
      nodes: "nodes",
      connections: "connections",
      created: "Created",
      updated: "Updated",
      loadingSavedMaps: "Loading saved maps...",
      error: "Error",
      couldNotLoadMaps: "Could not load saved maps",
      location: "Location",
      userLocationNotAvailable: "User location not available",
      invalidCoordinatesForNode: "Invalid coordinates for this node",
      yourLocation: "Your Location",
      currentPosition: "Current position",
      type: "Type",
      status: "Status",
      address: "Address",
      owner: "Owner",
      description: "Description",
      devices: "Devices",
      fibers: "Fibers",
      ports: "Ports",
      quantity: "Quantity",
      model: "Model",
      cores: "Cores",
      length: "Length",
      changeMap: "Change Map",
      close: "Close",
      createMaintenance: "Create Maintenance",
      basicInformation: "Basic Information",
      maintenanceTitle: "Maintenance Title",
      description: "Description",
      technicianName: "Technician Name",
      location: "Location",
      equipment: "Equipment",
      date: "Date",
      maintenanceDetails: "Maintenance Details",
      maintenanceType: "Maintenance Type",
      priority: "Priority",
      status: "Status",
      beforeMaintenance: "Before Maintenance",
      afterMaintenance: "After Maintenance",
      takePhoto: "Take Photo",
      chooseFromLibrary: "Choose from Library",
      startRecording: "Start Recording",
      stopRecording: "Stop Recording",
      duration: "Duration",
      listOfProjects: "List of Projects",
      additionalNotes: "Additional Notes",
      additionalNotesPlaceholder: "Any additional notes or observations...",
      createMaintenanceRecord: "Create Maintenance Record",
      creatingMaintenanceRecord: "Creating maintenance record...",
      fillRequiredFields: "Please fill in all required fields",
      failedToTakePicture: "Failed to take picture",
      accessTools: "Access Tools",
      failedToPickImage: "Failed to pick image",
      failedToStartRecording: "Failed to start recording",
      maintenanceRecordCreated: "Maintenance record created successfully!",
      accesosCamara: "Camera Access Required",
      needAccess: "We need access to your camera to scan QR codes",
      grantPermission: "Grant Permission",
      simulateScan: "Simulate Scan",
      alignScan: "Align QR code within the frame",
      scanQrCode: "Scan QR Code",

      userRequired: "User is requerid",
      passwordRequired: "Password is requerid",
      minCharacters: "Minimum 6 characters",
      accessToSystem: "System access",
      user: "User",
      password: "Password",
      login: "Login",
      loggingIn: "Logging in...",
      forgotPassword: "Forgot your password?",
      ftthManager: "FTTH Manager",
      incorrectCredentials: "Incorrect credentials. Use: admin/123456",
      loginError: "Login error",
      loading: "Loading...",
      confirmLogout: "Confirm logout",
      confirmLogoutMessage: "Are you sure you want to log out?",
      cancel: "Cancelar",
      // logout: 'Sign out',
      logoutError: "Logout error",
      projectsList: "Project List",
      loadingProjects: "Loading projects...",
      noProjects: "There are no saved projects",
      createProjectsToSeeHere: "Create projects to view them here",
      searchProjectsPlaceholder: "Search projects...",
      confirmDeleteProjectMessage:
        'Are you sure you want to delete the project "{name}"?',
      projectDeletedSuccessfully: "Successfully deleted project",
      couldNotDeleteProject: "The project could not be deleted",
      confirmDeleteAllProjectsMessage:
        "Are you sure you want to delete all {count} projects?",
      allProjectsDeletedSuccessfully:
        "All projects have been successfully deleted",
      couldNotDeleteAllProjects: "Not all projects could be deleted",
      noProjectsToDelete: "There are no projects to eliminate",
      pullToRefresh: "Swipe down to refresh",
      refreshing: "Updating...",
      lastUpdate: "Last update",
      couldNotLoadProjects: "Projects could not be loaded",
      projectQRCode: "QR code of Project",
      containsCompleteProjectData: "Contain all data of project",
      couldNotGenerateQR: "Could not generate the QR code",
      share: "Share",
      qrCodeNote:
        "This QR code contains all the project data. Scan it with the app to import the entire project.",
      shareFeatureComingSoon: "Sharing feature coming soon",
      saveFeatureComingSoon: "Save coming soon function",
      storagePermissionTitle: "Storage permission",
      storagePermissionMessage:
        "The app needs access to storage to save the QR code.",
      storagePermissionDenied: "Storage permission denied",
      photoLibraryPermissionDenied: "Gallery permission denied",
      shareProjectQR: "Share the projects QR code",
      shareProjectMessage: "Project QR code: {projectName}",
      qrSharedSuccessfully: "QR code shared successfully",
      couldNotShareQR: "Could not share QR code",
      qrSavedSuccessfully: "QR code saved in gallery",
      couldNotSaveQR: "Could not save QR code",
      shareQRCode: "Share QR code",
      chooseShareOption: "How do you want to share?",
      shareAsData: "Share as data",
      shareProjectData: "Share project data",
      shareProjectDataMessage: "Project data {projectName}:\n{projectData}",
      dataSharedSuccessfully: "Data shared successfully",
      couldNotShareData: "Data could not be shared",
      saveQRCode: "Save QR code",
      confirmSaveQR: "Save this QR code to your gallery?",
      processing: "Processing...",
      askMeLater: "ask later",
      loadFromGallery: "Load from gallery",
      permissionDenied: "permission denied",
      galleryPermissionMessage: "Gallery access is required to upload images",
      noQRFound: "No QR found",
      noQRCodeInImage: "No QR code was detected in the image",
      errorPickingImage: "Error when selecting image",
      errorProcessingQRImage: "Error processing QR image",
      featureUnavailable: "Feature Unavailable",
      galleryScanningUnavailable:
        "QR scanning from gallery is temporarily unavailable. Please use manual input.",
      manualInput: "Manual Input",
      enterQRCodeData: "Enter QR Code Data",
      submit: "Submit",
      invalidQRCodeData: "Invalid QR code data",
      manualQRInput: "Manual QR Input",
      enterQRCodeManually: "Enter QR code data manually",
      processingImage: "Processing image...",
      process: "Process",
      importingProject: "Importing project...",
      projectImported: "Project imported successfully!",
      couldNotImportProject:
        "Could not import project. Invalid or incomplete data.",
      scanAnother: "Scan another",
      openLink: "Open Link",
      copyToClipboard: "Copy to Clipboard",
      scanResults: "Scan Results",
      scannedContent: "Scanned Content",
      scanSuccessful: "Scan Successful",
      qrCodeProcessed: "QR code processed:",
      scanAnotherCode: "Scan another code",
      couldNotImportProject:
        "Could not import project. Invalid or incomplete data.",
      largeData: "Data Too Large",
      largeDataMessage:
        "The QR code contains too much data to be displayed fully. Do you want to see a summarized version?",
      largeDataContent: "Content (summarized)",
      largeDataInfo:
        "The data is too large to be displayed fully. It has been copied to the clipboard.",
      saveQR: "Save QR",
      saveQRMessage:
        "Do you want to save the QR code as an image in your gallery?",
      saveQRInfo: "QR code saving feature available in full version",
      shareAsImage: "Share as image",
      shareAsData: "Share as data",
      shareQR: "Share QR",
      shareQRImageMessage: "Do you want to share the QR code as an image?",
      qrData: "QR data",
      projectData: "Project Data",
      failedToSaveQR: "Could not save QR code",
      failedToShareQR: "Could not share QR code",
      failedToShareData: "Data could not be shared",
      addDevice: "Add device",
      addFiberType: "Add fiber type",
      enlazarNodoNew: "Link new nodes from here",
      enlazarNode: "Link to existing node",
      modoEnlace: "Link mode activated",
      touchNode: "Tap another existing node to create a connection",
      optionEnlace: "Link Options",
      nodoSelec: "Selected node:",
      newNode:
        "New nodes you create will automatically connect to this node. Select a node type to begin..",
      dejarEnlace: "Stop linking",
      macAddressScanned: "Mac address scanned",
      macAddress: "MAC",
      scanMacAddress: "Scan MAC",
      enterMacAddress: "Enter MAC address",
      scan: "Scan",
      fromGallery: "From Gallery",
      noMacAddressFound: "No MAC address found",
      noMacAddressFoundMessage: "No valid MAC address was detected in the scanned content. Would you like to view the full content?",
      viewContent: "View content",
      noCodeFound: "Code not found",
      noCodeFoundMessage: "No QR code or barcode was detected in the image",
      errorProcessingData: "Error processing data",
      cameraPermissionRequired: "Camera permission required",
      cameraPermissionMessage: "Camera access is needed to scan barcodes and QR codes",
      grantPermission: "Grant permission",
      useGallery: "Use gallery instead",
      alignCodeInFrame: "Align the code in the frame",
      macScanInstruction: "Scan QR codes or barcodes that contain MAC addresses",
      macAddressFound: "MAC Address Found",
      useMacAddress: "Use this MAC address",
      noMacDetected: "No valid MAC address detected. You can enter one manually.",
      enterManually: "Enter manually",
      manualMacInput: "Manual MAC input",
      enterMacAddressManually: "Enter the MAC address:",
      use: "Use",
      invalidMac: "Invalid MAC",
      invalidMacMessage: "The entered MAC address is not valid",
      processingImage: "Processing image...",
      codeProcessed: "Code processed",
      scanAnotherCode: "Scan another code",
      warning: "Warning",
      fiberHasFusions: "This fiber has {{count}} active fusion link(s). If you delete it, all associated fusion links will also be removed. Do you want to continue?",
      continueAnyway: "Continue anyway",
      someDevicesMissingMac: "Some Device Missing Mac",
      alignQrInFrame: "Align QR in frame",
      permissionRequired: "Permission required",
      galleryPermissionMessage:
        "Permission is required to access the photo gallery",
      errorSelectingImage: "Error selecting image",
      noQRFound: "QR not found",
      noQRFoundMessage: "No QR code was detected in the selected image",
      errorProcessingQR: "Error processing QR code",
      processing: "Processing...",
      tryAgain: "try again",
      scanQrCode: "Escanear QR",
      // loadFromGallery: "Desde Galería",
      manualInput: "Entrada Manual",
      alignQrInFrame: "Alinea el código QR en el marco",
      permissionRequired: "Permiso requerido",
      galleryPermissionMessage:
        "Se necesita permiso para acceder a la galería de fotos",
      errorSelectingImage: "Error al seleccionar la imagen",
      noQRFound: "QR no encontrado",
      noQRFoundMessage:
        "No se detectó ningún código QR en la imagen seleccionada",
      errorProcessingQR: "Error al procesar el código QR",
      processing: "Procesando...",
      tryAgain: "Intentar otra vez",
      scanSuccessful: "Escaneo exitoso",
      qrCodeProcessed: "Código QR procesado correctamente",
      fiberProjectDetected: "Fiber project detected",
      checkAndSave: "Check and save",
      fiberProjectOptions: "Fiber project options",
      viewDetailsOnly: "View details only",
      projectSavedSuccessfully: "Project saved successfully",
      projectAlreadyExists: "Project already exists",
      projectAlreadyExistsMessage: "Project already exists message",
      copiedToClipboard: "Copied to clipboard",
    },
    es: {
      size: "Tamaño",
      importFile: "Importar archivo",
      comment: "Commentario",
      information: "Informacion",
      nodeMedia: "Datos de multimedia",
      thread: "Hilo",
      threadShort: "H",
      fiberShort: "F",
      bufferShort: "B",
      device: "Dispositivo",
      nodePath: "Ruta del nodo hasta el MDF",
      maxUnits: "Ya ha creado el máximo número de unidades permitidas.",
      buttonNo: "No, regresar",
      buttonYes: "Si, continuar",
      projectSaved: "Proyecto guardado, desea continuar trabajando?",
      unit: "Unidad",
      threadInUse: "Hilo en uso",
      setupLink: "Configurar enlace",
      Links: "Enlaces",
      Link: "Enlace",
      Source: "Origen",
      Thread: "Número del hilo",
      Destiny: "Destino",
      fusionPoint: "Punto de fusión",
      fusionLinks: "Enlaces de fusión",
      fusionLink: "Enlace de fusión",
      nodeLinks: "Enlaces del nodo",
      allNodeFilter: "Todos",
      filterNodesModalTitle: "Filtrar nodos",
      noneSelectedBuffer: "Ningún búfer seleccionado",
      label: "Nombre",
      fiberDetails: "Detalles de la fibra",
      port: "Puerto",
      number: "Número",
      enabed: "Habilitado",
      portsDetailsLabel: "Detalle de los puertos",
      serialNumber: "Número de serie",
      selectAnOption: "Seleccione una opción",
      devicesEmpty: "Ningún dispositivo agregado",
      addDevice: "Agregar dispositivo",
      editDevice: "Editar dispositivo",
      deviceModel: "Modelo",
      devicesLabel: "Dispositivos de conectividad",
      generalData: "Datos generales",
      nodeDetails: "Detalles del nodo",
      netNodes: "Nodos de la red",
      netFibers: "Fibras ópticas",
      projectAlreadyExists: "Proyecto ya exitente",
      copiedToClipboard: "Copiado en el porta papeles",
      projectAlreadyExistsMessage: "El proyecto ya existe",
      projectSavedSuccessfully: "Proyecto salvado satisfactoriamente",
      fiberProjectDetected: "Proyecto de fibra detectado",
      viewDetailsOnly: "Ver solo los detalles",
      fiberProjectOptions: "Opciones del proyecto de fibra",
      checkAndSave: "Chequear y guardar",
      scanQrCode: "Escanear QR",
      // loadFromGallery: "Desde Galería",
      manualInput: "Entrada Manual",
      alignQrInFrame: "Alinea el código QR en el marco",
      permissionRequired: "Permiso requerido",
      galleryPermissionMessage:
        "Se necesita permiso para acceder a la galería de fotos",
      errorSelectingImage: "Error al seleccionar la imagen",
      noQRFound: "QR no encontrado",
      noQRFoundMessage:
        "No se detectó ningún código QR en la imagen seleccionada",
      errorProcessingQR: "Error al procesar el código QR",
      processing: "Procesando...",
      tryAgain: "Intentar otra vez",
      scanSuccessful: "Escaneo exitoso",
      qrCodeProcessed: "Código QR procesado correctamente",
      permissionRequired: "Permiso requerido",
      galleryPermissionMessage:
        "Se necesita permiso para acceder a la galería de fotos",
      errorSelectingImage: "Error al seleccionar la imagen",
      noQRFound: "QR no encontrado",
      noQRFoundMessage:
        "No se detectó ningún código QR en la imagen seleccionada",
      errorProcessingQR: "Error al procesar el código QR",
      processing: "Procesando...",
      tryAgain: "Intentar otra vez",
      alignQrInFrame: "Alinear QR en el marco",
      someDevicesMissingMac: "Falta algún dispositivo Mac",
      continueAnyway: "Continue guardando",
      warning: "Alerta",
      fiberHasFusions: "Esta fibra tiene {{count}} fusión(es) activa(s). Si la eliminas, todos los enlaces de fusión asociados también serán eliminados. ¿Deseas continuar?",
      macAddress: "MAC",
      macAddressScanned: "Dirección MAC escaneada",
      scanMacAddress: "Escanear MAC",
      enterMacAddress: "Ingresar dirección MAC",
      scan: "Escanear",
      fromGallery: "Desde Galería",
      noMacAddressFound: "Dirección MAC no encontrada",
      noMacAddressFoundMessage: "No se detectó una dirección MAC válida en el contenido escaneado. ¿Deseas ver el contenido completo?",
      viewContent: "Ver contenido",
      noCodeFound: "Código no encontrado",
      noCodeFoundMessage: "No se detectó código QR o de barras en la imagen",
      errorProcessingData: "Error al procesar los datos",
      cameraPermissionRequired: "Permiso de cámara requerido",
      cameraPermissionMessage: "Se necesita acceso a la cámara para escanear códigos de barras y QR",
      grantPermission: "Conceder permiso",
      useGallery: "Usar galería en su lugar",
      alignCodeInFrame: "Alinea el código en el marco",
      macScanInstruction: "Escanea códigos QR o de barras que contengan direcciones MAC",
      macAddressFound: "Dirección MAC Encontrada",
      useMacAddress: "Usar esta dirección MAC",
      noMacDetected: "No se detectó una dirección MAC válida. Puedes ingresar una manualmente.",
      enterManually: "Ingresar manualmente",
      manualMacInput: "Entrada manual de MAC",
      enterMacAddressManually: "Ingresa la dirección MAC:",
      use: "Usar",
      invalidMac: "MAC inválida",
      invalidMacMessage: "La dirección MAC ingresada no es válida",
      processingImage: "Procesando imagen...",
      codeProcessed: "Código procesado",
      scanAnotherCode: "Escanear otro",
      dejarEnlace: "Dejar de enlazar",
      newNode:
        "Los nuevos nodos que crees se conectarán automáticamente a este nodo. Selecciona un tipo de nodo para comenzar.",
      optionEnlace: "Opciones de enlace",
      nodoSelec: "Nodo seleccionado:",
      modoEnlace: "Modo enlace activado",
      touchNode: "Toca otro nodo existente para crear una conexión",
      addFiberType: "Agregar tipo de fibra",
      enlazarNodoNew: "Enlazar nuevos nodos desde aquí",
      enlazarNode: "Enlazar con nodo existente",
      saveQR: "Guardar QR",
      saveQRMessage: "¿Deseas guardar el código QR como imagen en tu galería?",
      saveQRInfo: "Función de guardado de QR disponible en versión completa",
      shareAsImage: "Compartir imagen",
      shareAsData: "Compartir como dato",
      shareQR: "Compartir QR",
      shareQRImageMessage: "¿Deseas compartir el código QR como imagen?",
      qrData: "Datos del QR",
      projectData: "Datos del Proyecto",
      failedToSaveQR: "No se pudo guardar el código QR",
      failedToShareQR: "No se pudo compartir el código QR",
      failedToShareData: "No se pudo compartir los datos",
      largeData: "Datos Demasiado Grandes",
      largeDataMessage:
        "El código QR contiene demasiados datos para mostrarse completamente. ¿Deseas ver una versión resumida?",
      largeDataContent: "Contenido (resumido)",
      largeDataInfo:
        "Los datos son demasiado grandes para mostrarse completamente. Se ha copiado al portapapeles.",
      couldNotImportProject:
        "No se pudo importar el proyecto. Datos inválidos o incompletos.",
      scanAnotherCode: "Escanear otro código",
      qrCodeProcessed: "Código QR procesado:",
      scanSuccessful: "Escaneo exitoso",
      scannedContent: "Contenido Escaneado",
      scanResults: "Resultados del Escaneo",
      copyToClipboard: "Copiar al portapapeles",
      openLink: "Abrir enlace",
      scanAnother: "Escanear otro",
      importingProject: "Importando proyecto...",
      processingImage: "Procesando imagen...",
      process: "Procesar",
      enterQRCodeManually: "Ingresar datos del código QR manualmente",
      manualQRInput: "Entrada Manual de QR",
      manualInput: "Entrada Manual",
      enterQRCodeData: "Ingresar Datos del Código QR",
      submit: "Enviar",
      featureUnavailable: "Función no disponible",
      galleryScanningUnavailable:
        "El escaneo de QR desde galería no está disponible temporalmente. Por favor usa la entrada manual.",
      loadFromGallery: "Cargar desde galería",
      permissionDenied: "Permiso denegado",
      galleryPermissionMessage:
        "Se necesita acceso a la galería para cargar imágenes",
      noQRFound: "No se encontró QR",
      noQRCodeInImage: "No se detectó ningún código QR en la imagen",
      errorPickingImage: "Error al seleccionar imagen",
      errorProcessingQRImage: "Error al procesar la imagen del QR",
      storagePermissionTitle: "Permiso de almacenamiento",
      storagePermissionMessage:
        "La app necesita acceso al almacenamiento para guardar el código QR",
      storagePermissionDenied: "Permiso de almacenamiento denegado",
      photoLibraryPermissionDenied: "Permiso de galería denegado",
      shareProjectQR: "Compartir código QR del proyecto",
      shareProjectMessage: "Código QR del proyecto: {projectName}",
      addDevice: "Agregar dispositivo",
      qrSharedSuccessfully: "Código QR compartido exitosamente",
      couldNotShareQR: "No se pudo compartir el código QR",
      qrSavedSuccessfully: "Código QR guardado en la galería",
      couldNotSaveQR: "No se pudo guardar el código QR",
      shareQRCode: "Compartir código QR",
      chooseShareOption: "¿Cómo quieres compartir?",
      shareAsData: "Compartir como datos",
      shareProjectData: "Compartir datos del proyecto",
      shareProjectDataMessage:
        "Datos del proyecto {projectName}:\n{projectData}",
      dataSharedSuccessfully: "Datos compartidos exitosamente",
      couldNotShareData: "No se pudieron compartir los datos",
      saveQRCode: "Guardar código QR",
      confirmSaveQR: "¿Guardar este código QR en tu galería?",
      processing: "Procesando...",
      askMeLater: "Preguntar después",
      pullToRefresh: "Desliza hacia abajo para actualizar",
      existingMaps: "Mapas Existentes",
      projectQRCode: "Código QR del Proyecto",
      containsCompleteProjectData: "Contiene todos los datos del proyecto",
      couldNotGenerateQR: "No se pudo generar el código QR",
      share: "Compartir",
      save: "Guardar",
      qrCodeNote:
        "Este código QR contiene todos los datos del proyecto. Escanéelo con la app para importar el proyecto completo.",
      shareFeatureComingSoon: "Función de compartir próximamente",
      saveFeatureComingSoon: "Función de guardar próximamente",
      refreshing: "Actualizando...",
      lastUpdate: "Última actualización",
      couldNotLoadProjects: "No se pudieron cargar los proyectos",
      settings: "Configuración",
      language: "Idioma",
      appearance: "Apariencia",
      info: "Información",
      notifications: "Notificaciones",
      privacyLocation: "Privacidad & Ubicación",
      dataManagement: "Gestión de Datos",
      legal: "Legal",
      appLanguage: "Idioma de la App",
      selectLanguage: "Selecciona tu idioma preferido",
      darkMode: "Modo Oscuro",
      enableDarkTheme: "Activar tema oscuro",
      pushNotifications: "Notificaciones Push",
      receiveNotifications: "Recibir notificaciones de la app",
      locationServices: "Servicios de Ubicación",
      useLocationMaps: "Usar tu ubicación para mapas",
      autoSync: "Sincronización Automática",
      autoDataSync: "Sincronización automática de datos",
      dataSaving: "Ahorro de Datos",
      reduceDataUsage: "Reducir uso de datos",
      clearCache: "Limpiar Caché",
      removeTempFiles: "Eliminar archivos temporales",
      exportData: "Exportar Datos",
      noMapsToDelete: "No hay mapas para eliminar",
      backupData: "Hacer copia de seguridad",
      privacyPolicy: "Política de Privacidad",
      handleData: "Cómo manejamos tus datos",
      termsService: "Términos de Servicio",
      appUsageTerms: "Términos de uso de la app",
      createProject: "Nuevo proyecto",
      editProject: "Edit Project",
      nameYourMap: "Nombre del Mapa",
      projectsList: "Lista de Proyectos",
      loadingProjects: "Cargando proyectos...",
      noProjects: "No hay proyectos guardados",
      createProjectsToSeeHere: "Crea proyectos para verlos aquí",
      searchProjectsPlaceholder: "Buscar proyectos...",
      confirmDeleteProjectMessage:
        '¿Estás seguro de que quieres eliminar el proyecto "{name}"?',
      projectDeletedSuccessfully: "Proyecto eliminado correctamente",
      couldNotDeleteProject: "No se pudo eliminar el proyecto",
      confirmDeleteAllProjectsMessage:
        "¿Estás seguro de que quieres eliminar todos los {count} proyectos?",
      allProjectsDeletedSuccessfully:
        "Todos los proyectos han sido eliminados correctamente",
      couldNotDeleteAllProjects: "No se pudieron eliminar todos los proyectos",
      noProjectsToDelete: "No hay proyectos para eliminar",
      enterMapName: "Ingresa un nombre para tu mapa de red:",
      mapNamePlaceholder: "ej., Diseño Principal de Red",
      mapNameRequired: "El nombre del mapa es requerido",
      scanQR: "Escanear QR",
      createMaintenance: "Crear Mantenimiento",
      viewOnMap: "Ver en Mapa",
      tools: "Herramientas",
      userProfile: "Perfil de Usuario",
      accessTools: "Acceder a Herramientas",
      settings: "Configuración",
      fiberOpticManagementSystem: "Sistema de Gestión de Fibra Óptica",
      mainMenu: "Menú Principal",
      quickStats: "Estadísticas Rápidas",
      activeProjects: "Proyectos Activos",
      completed: "Completados",
      pending: "Pendientes",
      teamMembers: "Miembros del Equipo",
      connected: "Conectado",
      user: "Usuario",
      password: "Contraseña",
      login: "Iniciar Sesión",
      loggingIn: "Iniciando sesión...",
      accessToSystem: "Acceso al sistema",
      userRequired: "Usuario es requerido",
      passwordRequired: "Contraseña es requerida",
      minCharacters: "Mínimo 6 caracteres",
      error: "Error",
      incorrectCredentials: "Credenciales incorrectas",
      forgotPassword: "¿Olvidaste tu contraseña?",
      ftthManager: "FTTH Manager",
      userProfile: "Perfil de Usuario",
      personalInformation: "Información Personal",
      email: "Correo Electrónico",
      phone: "Teléfono",
      employeeId: "ID de Empleado",
      joinDate: "Fecha de Ingreso",
      status: "Estado",
      next: "Next",
      completed: "Completados",
      attachFile: "Cargar archivo",
      active: "Activos",
      rating: "Calificación",
      actions: "Acciones",
      changePassword: "Cambiar Contraseña",
      helpSupport: "Ayuda y Soporte",
      privacyPolicy: "Política de Privacidad",
      logout1: "Cerrar Sesión",
      logoutConfirmation: "¿Estás seguro de que quieres cerrar sesión?",
      cancel: "Cancelar",
      editProfile: "Editar Perfil",
      editProfileComingSoon:
        "¡Funcionalidad de edición de perfil próximamente!",
      changePasswordComingSoon:
        "¡Funcionalidad de cambio de contraseña próximamente!",
      helpSupportComingSoon: "¡Funcionalidad de ayuda y soporte próximamente!",
      privacyPolicyComingSoon:
        "¡Documentación de política de privacidad próximamente!",
      propertyInformation: "Información del proyecto",
      unitInformation: "Información de Unidades",
      projectType: "Tipo de Proyecto",
      attachments: "Adjuntos",
      editProject: "Editar Proyecto",
      // Campos del formulario
      propertyName: "Nombre del proyecto",
      propertyAddress: "Dirección del proyecto",
      city: "Ciudad",
      state: "Estado",
      description: "Descripción",
      enterAddress: "Ingresar dirección",
      projectDescription: "Descripción del proyecto",

      // Unidades
      livingUnits: "Unids. habitacionales",
      officesAmenities: "Oficinas/Amenidades",
      commercialUnits: "Unidades comerciales",
      totalUnits: "Total de unidades",

      // Tipos de proyecto
      buildType: "Tipo de construcción",
      jobType: "Tipo de trabajo",
      buildingType: "Tipo de edificio",
      residential: "Residencial",
      commercial: "Comercial",
      mixedUse: "Uso mixto",
      gardenStyle: "Estilo jardín",
      midRise: "Mediana altura",
      highRise: "Gran altura",
      townhome: "Casa townhouse",
      singleFamily: "Casa unifamiliar",
      // Botones de acción
      generateQR: "QR",
      share: "Compartir",
      save: "Guardar",
      update: "Actualizar",
      project: "Proyecto",
      saving: "Guardando...",

      // Modales
      projectQRCode: "Código QR del Proyecto",
      scanQRDescription:
        "Escanea este código QR para acceder rápidamente a los detalles del proyecto",
      selectProjectToEdit: "Seleccionar Proyecto para Editar",
      noProjectsFound: "No se encontraron proyectos",
      close: "Cerrar",
      cancel: "Cancelar",

      // Alertas y mensajes
      success: "Éxito",
      error: "Error",
      failedToLoadProject: "Error al cargar los datos del proyecto",
      fileAttachedSuccess: "Archivo adjuntado exitosamente",
      failedToAttachFile: "Error al adjuntar archivo: ",
      nameAndAddressRequired:
        "El nombre y la dirección de donde se realizará el proyecto son requeridos",
      projectCreated: "¡Proyecto creado exitosamente!",
      projectUpdated: "¡Proyecto actualizado exitosamente!",
      failedToSave:
        "Error al guardar el proyecto. Por favor, intente nuevamente.",
      failedToUpdate:
        "Error al actualizar el proyecto. Por favor, intente nuevamente.",
      failedToShare: "Error al compartir el proyecto",

      // Compartir
      ftthProject: "Proyecto FTTH",
      address: "Dirección",
      scanQRForDetails: "Escanea el código QR para detalles completos",
      ftthProjectDetails: "Detalles del Proyecto FTTH",

      // Navegación
      configureNetwork: "Configurar Red",
      viewProject: "Ver Proyecto",
      // Títulos y textos generales
      connectivityDevices: "Dispositivos de Conectividad",
      networkDevices: "Dispositivos de Red",
      fiberTypes: "Tipos de Fibra",
      configurationSummary: "Resumen de Configuración",

      // Subtítulos y descripciones
      selectDevicesConfigurePorts:
        "Selecciona dispositivos y configura puertos",
      selectFiberTypesQuantities: "Tipo",
      selectedEquipment: "Equipo Seleccionado",
      selectedFiberTypes: "Tipos de Fibra Seleccionados",
      fibersEmpty: "No haz agregado ninguna",
      nodesEmpty: "Ningún nodo",

      // Estadísticas
      devices: "Dispositivos",
      totalPorts: "Puertos Totales",
      totalFibers: "Fibras Totales",

      // Descripciones de dispositivos
      ethernetSwitching: "Conmutación Ethernet",
      networkRouting: "Enrutamiento de red",
      wirelessConnectivity: "Conectividad inalámbrica",
      opticalLineTerminal: "Terminal de Línea Óptica",
      opticalNetworkTerminal: "Terminal de Red Óptica",
      opticalSignalSplitting: "División de señal óptica",

      // Descripciones de fibra
      fiber12FDescription: "12 fibras - Capacidad pequeña",
      fiber24FDescription: "24 fibras - Capacidad estándar",
      fiber48FDescription: "48 fibras - Capacidad media",
      fiber96FDescription: "96 fibras - Alta capacidad",
      fiber192FDescription: "192 fibras - Muy alta capacidad",

      // Campos de configuración
      quantity: "Cantidad",
      ports: "Puertos",
      portsEach: "puertos c/u",
      fiberCable: "cable de fibra",
      fibers: "fibras",
      total: "Total",

      // Botones y acciones
      continueNetworkConfiguration: "Continuar Configuración de Red",
      configureNetworkMap: "Configurar Mapa de Red",

      // Alertas y mensajes
      selectAtLeastOneDevice: "Por favor selecciona al menos un dispositivo",
      configurationSaved: "¡Configuración guardada exitosamente!",
      configurationSaved1:
        "¡Configuración guardada exitosamente!, Para abrir el mapa de la red, debe adquirir la APY_KEY de Google Maps.",
      viewmap:
        "Para abrir el mapa de la red, debe adquirir la APY_KEY de Google Maps.",
      failedToSaveConfig: "Error al guardar la configuración",
      ok: "OK",
      permissionDenied: "Permiso denegado",
      locationAccessDenied: "No se pudo acceder a la ubicación",
      errorGettingLocation: "Error obteniendo ubicación:",
      openingConfigModal: "Abriendo modal de configuración:",
      error: "Error",
      configItemNotFound: "Elemento de configuración no encontrado",
      cleanConfigItem: "Elemento de configuración limpio:",
      configModalVisible: "Modal de configuración debería ser visible ahora",
      gettingStandardColors: "Obteniendo colores estándar para tipo de fibra:",
      nonNumericFiberType:
        "Tipo de fibra no numérico, devolviendo colores genéricos",
      fiberCount: "Conteo de fibras:",
      multiplesOf12: "Múltiplos de 12, colores:",
      nonMultiplesOf12: "No múltiplos de 12, colores:",
      loadingData: "=== CARGANDO DATOS ===",
      nodesLoaded: "Nodos cargados:",
      errorLoadingData: "Error cargando datos:",
      failedLoadNetworkData: "Error al cargar datos de red",
      addressNotAvailable: "Dirección no disponible",
      errorGettingAddress: "Error obteniendo dirección:",
      notAvailable: "No disponible",
      onlyAvailable: "Solo disponible",
      errorSavingNetworkMap: "Error guardando mapa de red:",
      couldNotSaveNetworkMap: "No se pudo guardar el mapa de red",
      networkMapLoaded: "Mapa de red cargado:",
      nodes: "nodos",
      errorLoadingNetworkMap: "Error cargando mapa de red guardado:",
      success: "Éxito",
      networkMapSaved: "Mapa de red guardado exitosamente",
      nodeAdded: "nodo agregado exitosamente",
      errorAddingNode: "Error agregando nodo:",
      failedAddNode: "Error al agregar nodo",
      node: "Nodo",
      updated: "actualizado",
      errorUpdatingNode: "Error actualizando nodo:",
      failedUpdateNode: "Error al actualizar nodo",
      confirmDelete: "Confirmar eliminación",
      mapDeletedSuccessfully: "Mapa eliminado exitosamente",
      confirmDeleteMapMessage:
        "¿Estás seguro de que quieres eliminar este mapa de red? Esta acción no se puede deshacer.",
      confirmDeleteNode:
        "¿Estás seguro de que quieres eliminar este nodo? Esta acción no se puede deshacer.",
      allMapsDeletedSuccessfully:
        "¿Seguro que quieres eliminar todos los mapas? Esta acción no se puede deshacer.",
      couldNotDeleteMap: "No se pudo eliminar el mapa",
      confirmDeleteAll: "Confirmar eliminar todo",
      confirmDeleteAllMapsMessage:
        "¿Estás seguro de que quieres eliminar TODOS los mapas? Esta acción no se puede deshacer.",
      cancel: "Cancelar",
      delete: "Eliminar",
      nodeDeleted: "Nodo eliminado exitosamente",
      nodeNotDeleted: "No se pudo eliminar el nodo",
      errorDeletingNode: "Error eliminando nodo:",
      failedDeleteNode: "Error al eliminar nodo de la base de datos",
      errorDeleteConfirmation: "Error mostrando confirmación de eliminación:",
      couldNotInitiateDelete: "No se pudo iniciar la operación de eliminación",
      confirmClearAll: "Confirmar eliminar todo",
      confirmClearAllNodes:
        "¿Estás seguro de que quieres eliminar TODOS los nodos? Esta acción no se puede deshacer.",
      deleteAll: "Eliminar todo",
      allNodesDeleted: "Todos los nodos han sido eliminados",
      errorDeletingAllNodes: "Error eliminando todos los nodos:",
      failedDeleteAllNodes: "Error al eliminar todos los nodos",
      errorClearAllConfirmation:
        "Error mostrando confirmación de eliminar todo:",
      couldNotInitiateClearAll:
        "No se pudo iniciar la operación de eliminar todo",
      renderingConnections: "Renderizando conexiones:",
      connection: "Conexión",
      skippingInvalidConnection: "Omitiendo conexión inválida:",
      fiberConfig: "Configuración de fibra - fibra:",
      fiberColors: "Configuración de fibra - colores de fibra:",
      standardColors: "Configuración de fibra - colores estándar:",
      ports: "puertos",
      description: "Descripción",
      connectedTo: "Conectado a",
      saveConfiguration: "Guardar configuración",
      fiber: "Fibra",
      fibersWithStandardColors: "fibras con colores estándar",
      quantity: "Cantidad",
      unit: "unidad",
      configureAll: "Configurar todas las",
      fibers: "fibras",
      addNode: "Agregar nodo",
      pedestal: "Pedestal",
      unit: "Unidad",
      saveNetwork: "Guardar red",
      clearAll: "Limpiar todo",
      editNode: "Editar nodo",
      nodeName: "Nombre del nodo",
      enterNodeName: "Ingresar nombre del nodo",
      owner: "Propietario",
      enterOwnerName: "Ingresar nombre del propietario",
      address: "Dirección",
      addressFromCoordinates: "La dirección se obtendrá de las coordenadas",
      devices: "Dispositivos",
      available: "Disponible",
      configure: "Configurar",
      noDevicesConfigured:
        "No hay dispositivos configurados para este proyecto",
      fiberTypes: "Tipos de fibra",
      noFiberTypesConfigured:
        "No hay tipos de fibra configurados para este proyecto",
      noConfigNeededForNode:
        "No se necesitan dispositivos o configuración de fibra para nodos {nodeType}.",
      blue: "Azul",
      orange: "Naranja",
      green: "Verde",
      brown: "Marrón",
      slate: "Pizarra",
      white: "Blanco",
      red: "Rojo",
      black: "Negro",
      yellow: "Amarillo",
      violet: "Violeta",
      rose: "Rosa",
      aqua: "Agua",
      clear: "Limpiar",
      confirmClearCache: "¿Seguro que quieres borrar todos los datos en caché?",
      cacheCleared: "Caché limpiada",
      cacheRemoved: "Se han eliminado todos los archivos temporales.",
      exportDataSoon: "¡Función de exportar datos muy pronto!",
      privacyPolicySoon:
        "¡Documentación de política de privacidad próximamente!",
      termsServiceSoon: "¡Documentación de términos de servicio próximamente!",
      build: "Compilación",
      lastUpdated: "Última actualización",
      fiberOpticTools: "Herramientas de Fibra Óptica",
      fiberBreakageDetector: "Detector de Roturas de Fibra",
      detectFiberBreaks: "Detecta roturas de fibra con medición de distancia",
      autoDistanceMeasurement: "Medición Automática de Distancia",
      autoDistanceCalc: "Cálculo automático de distancia hasta puntos de fallo",
      maintenanceManagement: "Gestión de Mantenimiento",
      maintenanceHistory: "Historial de Mantenimiento",
      viewMaintenanceRecords: "Ver registros completos de mantenimiento",
      maintenanceJobs: "Trabajos de Mantenimiento",
      maintenanceByDate:
        "Todos los trabajos de mantenimiento ordenados por fecha",
      multimediaManagement: "Gestión de Multimedia",
      multimediaGallery: "Galería Multimedia",
      mediaByDate: "Todos los archivos multimedia ordenados por fecha",
      reportMultimedia: "Multimedia de Informes",
      mediaForReports: "Archivos multimedia asignados a informes específicos",
      reports: "Informes",
      reportDetails: "Detalles del Informe",
      detailedMaintenanceReports:
        "Vista detallada de informes de mantenimiento",
      otdrDescription:
        "Esta función utiliza tecnología OTDR para detectar roturas de fibra y medir la distancia hasta puntos de fallo.",
      fiberToolsPackage: "Paquete de Herramientas de Fibra",
      securityLevel: "Nivel de Seguridad: Empresarial",
      savedNetworkMaps: "Mapas guardados",
      searchMapsPlaceholder: "Buscar mapas por ID de proyecto...",
      noSavedMaps: "No se encontraron mapas guardados",
      createMapsToSeeHere:
        "Crea mapas de red en la sección de Proyectos para verlos aquí",
      listOfProjects: "Lista de Proyectos",
      project: "Proyecto",
      nodes: "nodos",
      connections: "conexiones",
      created: "Creado",
      updated: "Actualizado",
      loadingSavedMaps: "Cargando mapas guardados...",
      error: "Error",
      couldNotLoadMaps: "No se pudieron cargar los mapas guardados",
      location: "Ubicación",
      userLocationNotAvailable: "La ubicación del usuario no está disponible",
      invalidCoordinatesForNode: "Coordenadas inválidas para este nodo",
      yourLocation: "Tu ubicación",
      currentPosition: "Posición actual",
      type: "Tipo",
      status: "Estado",
      address: "Dirección",
      owner: "Propietario",
      description: "Descripción",
      devices: "Dispositivos",
      fibers: "Fibras",
      ports: "Puertos",
      quantity: "Cantidad",
      model: "Modelo",
      cores: "Núcleos",
      length: "Longitud",
      changeMap: "Cambiar mapa",
      close: "Cerrar",
      createMaintenance: "Crear Mantenimiento",
      basicInformation: "Información Básica",
      maintenanceTitle: "Título del Mantenimiento",
      description: "Descripción",
      technicianName: "Nombre del Técnico",
      location: "Ubicación",
      equipment: "Equipo",
      date: "Fecha",
      maintenanceDetails: "Detalles del Mantenimiento",
      maintenanceType: "Tipo de Mantenimiento",
      priority: "Prioridad",
      status: "Estado",
      beforeMaintenance: "Antes del Mantenimiento",
      afterMaintenance: "Después del Mantenimiento",
      takePhoto: "Tomar Foto",
      chooseFromLibrary: "Elegir de Galería",
      startRecording: "Iniciar Grabación",
      stopRecording: "Detener Grabación",
      duration: "Duración",
      additionalNotes: "Notas Adicionales",
      additionalNotesPlaceholder: "Cualquier nota u observación adicional...",
      createMaintenanceRecord: "Crear Registro de Mantenimiento",
      creatingMaintenanceRecord: "Creando registro de mantenimiento...",
      fillRequiredFields: "Por favor completa todos los campos requeridos",
      failedToTakePicture: "Error al tomar la foto",
      failedToPickImage: "Error al elegir la imagen",
      failedToStartRecording: "Error al iniciar la grabación",
      maintenanceRecordCreated:
        "¡Registro de mantenimiento creado exitosamente!",
      accesosCamara: "Acceso requerido para usar la cámara",
      needAccess: "Necesitamos acceso a su cámara para escanear códigos QR",
      grantPermission: "Conceder permisios",
      simulateScan: "Simular Scan",
      alignScan: "Alinea el código QR dentro del marco",
      scanQrCode: "Escanear código QR",
      userRequired: "Usuario es requerido",
      passwordRequired: "Contraseña es requerida",
      minCharacters: "Mínimo 6 caracteres",
      accessToSystem: "Acceso al sistema",
      user: "Usuario",
      password: "Contraseña",
      login: "Iniciar sesión",
      loggingIn: "Iniciando sesión...",
      forgotPassword: "¿Olvidaste tu contraseña?",
      ftthManager: "FTTH Manager",
      incorrectCredentials: "Credenciales incorrectas. Use: admin/123456",
      loginError: "Error al iniciar sesión",
      loading: "Cargando...",
      confirmLogout: "Confirmar cierre de sesión",
      confirmLogoutMessage: "¿Estás seguro de que quieres cerrar sesión?",
      cancel: "Cancelar",
      logoutError: "Error al cerrar sesión",
      next: "Siguiente",
    },
  };

  const t = (key, params = {}) => {
    let translation = translations[language]?.[key] || key;
    
    // Replace {{variable}} placeholders with actual values
    Object.keys(params).forEach(param => {
      const regex = new RegExp(`{{${param}}}`, 'g');
      translation = translation.replace(regex, params[param]);
    });
    
    return translation;
  };

  const nodesTypesList = () => {
    return [
      { id: 1, name: "MDF", type: "MDF", visible: false, alowDevices: true },
      { id: 2, name: "IDF", type: "IDF", visible: true, alowDevices: false },
      { id: 3, name: t("pedestal"), type: "P", visible: true, alowDevices: false},
      { id: 4, name: t("unit"), type: "U", visible: true, alowDevices: true },
    ];
  };

  const mimeTypesList = () => {
    return mimeTypes;
  }

  const changeLanguage = async (newLanguage) => {
    try {
      setLanguage(newLanguage);
      await AsyncStorage.setItem("@language_preference", newLanguage);
    } catch (error) {
      console.error("Error saving language preference:", error);
      Alert.alert(t("error"), "Error saving language preference");
    }
  };

  const changeTheme = async (newTheme) => {
    try {
      setTheme(newTheme);
      await AsyncStorage.setItem("@theme_preference", newTheme);
    } catch (error) {
      console.error("Error saving theme preference:", error);
      Alert.alert(t("error"), "Error saving theme preference");
    }
  };

  const value = {
    language,
    theme,
    isDarkMode,
    t,
    changeLanguage,
    changeTheme,
    isAuthenticated,
    setIsAuthenticated,
    isLoading,
    setIsLoading,
    logout,
    login,
    nodesTypesList,
    mimeTypesList,
    // 🔥 NUEVO: Exportar las funciones de manejo de fibras y medios
    fiberUpdates,
    updateFiberData,
    getFiberUpdate,
    clearFiberUpdate,
    nodeMediaUpdates,
    updateNodeMediaData,
    getNodeMediaUpdate,
    clearNodeMediaUpdate,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
