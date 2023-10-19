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

//Leave Request
const API_CREATE_LEAVE_REQUEST = API_URL_BASE + '/api/leaveRequest'
const API_GET_ALL_LEAVE_REQUESTS = API_URL_BASE + '/api/leaveRequest'
const API_GET_SINGLE_LEAVE_REQUEST = API_URL_BASE + '/api/leaveRequest/'
const API_GET_EMPLOYEE_LEAVE_REQUESTS = API_URL_BASE + '/api/leaveRequest/employee/'
const API_UPDATE_LEAVE_REQUEST = API_URL_BASE + '/api/leaveRequest'
const API_DELETE_LEAVE_REQUEST = API_URL_BASE + '/api/leaveRequest/'

//Leave Type
const API_CREATE_LEAVE_TYPE = API_URL_BASE + '/api/leaveType'
const API_GET_ALL_LEAVE_TYPES = API_URL_BASE + '/api/leaveType'
const API_GET_SINGLE_LEAVE_TYPE = API_URL_BASE + '/api/leaveType/'
const API_UPDATE_LEAVE_TYPE = API_URL_BASE + '/api/leaveType'
const API_DELETE_LEAVE_TYPE = API_URL_BASE + '/api/leaveType/'

export { 
    PORT,
    API_URL_BASE,
    API_CREATE_EMPLOYEE,
    API_GET_ALL_EMPLOYEES,
    API_GET_SINGLE_EMPLOYEE,
    API_UPDATE_EMPLOYEE,
    API_DELETE_EMPLOYEE,
    API_LOGIN,
    API_CREATE_LEAVE_REQUEST,
    API_GET_ALL_LEAVE_REQUESTS,
    API_GET_SINGLE_LEAVE_REQUEST,
    API_GET_EMPLOYEE_LEAVE_REQUESTS,
    API_UPDATE_LEAVE_REQUEST,
    API_DELETE_LEAVE_REQUEST,
    API_CREATE_LEAVE_TYPE,
    API_GET_ALL_LEAVE_TYPES,
    API_GET_SINGLE_LEAVE_TYPE,
    API_UPDATE_LEAVE_TYPE,
    API_DELETE_LEAVE_TYPE
}