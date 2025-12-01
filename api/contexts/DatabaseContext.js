// import React, { createContext, useContext, useEffect, useState } from 'react';
// import { Platform, ActivityIndicator, View, Text, StyleSheet } from 'react-native';
// import { AdapterInitializator, getAdapter } from '../config/dataSource';

// const DatabaseContext = createContext();

// export const DatabaseProvider = ({ children }) => {
//   const [isReady, setIsReady] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const setupDatabase = async () => {
//       try {
//         console.log(`🔧 Initializing database for platform: ${Platform.OS}`);
//         const Initializator = AdapterInitializator();
//         await Initializator.init();
//         console.log('✅ Database initialized successfully');
//         setIsReady(true);
//       } catch (err) {
//         console.error('❌ Database initialization error:', err);
//         setError(err.message);
//       }
//     };

//     setupDatabase();
//   }, []);

//   if (error) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.errorTitle}>Error de Base de Datos</Text>
//         <Text style={styles.errorText}>{error}</Text>
//         <Text style={styles.errorHelp}>
//           Por favor, recarga la aplicación
//         </Text>
//       </View>
//     );
//   }

// //   if (!isReady) {
// //     return (
// //       <View style={styles.container}>
// //         <ActivityIndicator size="large" color="#007AFF" />
// //         <Text style={styles.loadingText}>
// //           Inicializando base de datos...
// //         </Text>
// //         <Text style={styles.platformText}>
// //           Plataforma: {Platform.OS}
// //         </Text>
// //       </View>
// //     );
// //   }

//   return (
//     <DatabaseContext.Provider value={{ isReady, platform: Platform.OS }}>
//       {children}
//     </DatabaseContext.Provider>
//   );
// };

// export const useDatabase = () => {
//   const context = useContext(DatabaseContext);
//   if (!context) {
//     throw new Error('useDatabase debe usarse dentro de DatabaseProvider');
//   }
//   return context;
// };

// export const useAdapter = () =>{
//   return getAdapter;
// }

// DatabaseContext.js
// import { initializeStorage } from '@/service/storage';
// DatabaseContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Platform, ActivityIndicator, View, Text, StyleSheet } from 'react-native';
import { AdapterInitializator, getAdapter } from '../config/dataSource';

const DatabaseContext = createContext();

export const DatabaseProvider = ({ children }) => {
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const setupDatabase = async () => {
      try {
        console.log(`🔧 Initializing database for platform: ${Platform.OS}`);
        const Initializator = AdapterInitializator();
        await Initializator.init();
        console.log('✅ Database initialized successfully');
        setIsReady(true);
      } catch (err) {
        console.error('❌ Database initialization error:', err);
        setError(err.message);
      }
    };

    setupDatabase();
  }, []);

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorTitle}>Error de Base de Datos</Text>
        <Text style={styles.errorText}>{error}</Text>
        <Text style={styles.errorHelp}>
          Por favor, recarga la aplicación
        </Text>
      </View>
    );
  }

  return (
    <DatabaseContext.Provider value={{ isReady, platform: Platform.OS }}>
      {children}
    </DatabaseContext.Provider>
  );
};

export const useDatabase = () => {
  const context = useContext(DatabaseContext);
  if (!context) {
    throw new Error('useDatabase debe usarse dentro de DatabaseProvider');
  }
  return context;
};

export const useAdapter = () => {
  return getAdapter;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#e74c3c',
    marginBottom: 10,
    textAlign: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#2c3e50',
    marginBottom: 20,
    textAlign: 'center',
  },
  errorHelp: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
    fontStyle: 'italic',
  }
});