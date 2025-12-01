// export const DATA_SOURCE = 'web'; // o 'rest'

// import { restAdapter } from '../adapters/restAdapter';
// import { sqliteAdapter } from '../adapters/sqliteAdapter';
// import { sqliteWebAdapter, initDatabase } from '../adapters/sqliteWebAdapter';

// const BuildHandler = (h) => {
//   return {
//     init : () => h
//   }
// }

// export const AdapterInitializator = () => {

//   if (DATA_SOURCE === 'rest') {
//     return BuildHandler(undefined);
//   } else   if (DATA_SOURCE === 'web') {
//     return BuildHandler(initDatabase);
//   }

//   return BuildHandler(undefined);
// };

// export const getAdapter = () => {
//   if (DATA_SOURCE === 'rest') {
//     return restAdapter;
//   } else   if (DATA_SOURCE === 'web') {
//     return sqliteWebAdapter;
//   }

//   return sqliteAdapter;
// };


// config/dataSource.js
export const DATA_SOURCE = 'asyncstorage'; // Cambiado de 'web' a 'asyncstorage'

import { restAdapter } from '../adapters/restAdapter';
import { sqliteAdapter } from '../adapters/sqliteAdapter';
import { sqliteWebAdapter, initDatabase } from '../adapters/sqliteWebAdapter';
import { asyncStorageAdapter, initializeStorage } from '../adapters/asyncStorageAdapter';

const BuildHandler = (h) => {
  return {
    init: () => h
  }
}

export const AdapterInitializator = () => {
  if (DATA_SOURCE === 'rest') {
    return BuildHandler(undefined);
  } else if (DATA_SOURCE === 'web') {
    return BuildHandler(initDatabase);
  } else if (DATA_SOURCE === 'asyncstorage') {
    return BuildHandler(initializeStorage);
  }

  return BuildHandler(undefined);
};

export const getAdapter = () => {
  if (DATA_SOURCE === 'rest') {
    return restAdapter;
  } else if (DATA_SOURCE === 'web') {
    return sqliteWebAdapter;
  } else if (DATA_SOURCE === 'asyncstorage') {
    return asyncStorageAdapter;
  }

  return sqliteAdapter;
};