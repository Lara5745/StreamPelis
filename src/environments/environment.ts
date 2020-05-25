// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig:{ //Se obtiene de la consola de firebase
    apiKey: "AIzaSyB9cipKRZ9auIl6T9ecqUDPcOTZCOKPhLg",
    authDomain: "streaming-7917c.firebaseapp.com",
    databaseURL: "https://streaming-7917c.firebaseio.com",
    projectId: "streaming-7917c",
    storageBucket: "streaming-7917c.appspot.com",
    messagingSenderId: "432238289706",
    appId: "1:432238289706:web:6fc2437f2ec9a799fbb453",
    measurementId: "G-MGLJC9LPCF"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
