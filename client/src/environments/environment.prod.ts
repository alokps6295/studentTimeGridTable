export const environment = {
  production: true,
 // baseUrl: 'https://buy.amhi.in/api/',
  headerName: 'authorization',
  authScheme: 'Bearer ',
  whitelistedDomains: [],
  blacklistedRoutes: [],
  defaultErrorMessage: 'There is some problem while processing your request, Please try after sometime.',
  userIdle: {
  	idle: 1800, 
  	timeout: 300, 
  	ping: 100, 
  }
};
