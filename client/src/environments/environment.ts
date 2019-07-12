// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl: 'http://localhost:9000/api/',
    // baseUrl: 'http://52.66.16.188/api/',   //.................Dev
//  baseUrl: 'https://buyuat.amhi.in/api/', // --------------UAT
//   baseUrl: 'http://10.10.23.103:9011/api/',

  headerName: 'authorization',
  authScheme: 'Bearer ',
  whitelistedDomains: [],
  blacklistedRoutes: [],
  defaultErrorMessage: 'There is some problem while processing your request, Please try after sometime.',
  userIdle: {
  	idle: 1800, // time for which application can be in idle (sec)
  	timeout: 10, // time out for performing action before idle time expires (sec)
  	ping: 2, // time to make ping (sec)
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
