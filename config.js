// Configure file for different variables that are used all over the React project!
const PORT = "7154" 
const API_URL_BASE = 'https://localhost:' + PORT

// Different EndPoints URLs for the API-Calls
const API_CREATE_EMPLOYEE = API_URL_BASE + '/api/employee'
const API_GET_ALL_EMPLOYEES = API_URL_BASE + '/api/employee'
const API_GET_SINGLE_EMPLOYEE = API_URL_BASE + '/api/employee/'
const API_UPDATE_EMPLOYEE = API_URL_BASE + '/api/employee'
const API_DELETE_EMPLOYEE = API_URL_BASE + '/api/employee/'
const API_LOGIN = API_URL_BASE + '/api/Login'

export { 
    PORT,
    API_URL_BASE,
    API_CREATE_EMPLOYEE,
    API_GET_ALL_EMPLOYEES,
    API_GET_SINGLE_EMPLOYEE,
    API_UPDATE_EMPLOYEE,
    API_DELETE_EMPLOYEE,
    API_LOGIN
 }