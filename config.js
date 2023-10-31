//Configure file for different variables that are used all over the React project!

//Uncomment this if you want to local host the website and database
// const PORT = "7154" 
// const API_URL_BASE = 'https://localhost:' + PORT
//And comment this
const API_URL_BASE = 'sut22employeeapi.azurewebsites.net';

//Different EndPoints URLs for the API-Calls
//Employee
const API_CREATE_EMPLOYEE = API_URL_BASE + '/api/employee'
const API_GET_ALL_EMPLOYEES = API_URL_BASE + '/api/employee'
const API_GET_SINGLE_EMPLOYEE = API_URL_BASE + '/api/employee/'
const API_UPDATE_EMPLOYEE = API_URL_BASE + '/api/employee'
const API_DELETE_EMPLOYEE = API_URL_BASE + '/api/employee/'

// Login
const API_LOGIN = API_URL_BASE + '/api/Login'

// SendMail
const API_SEND_EMAIL = API_URL_BASE + '/api/SendMail'

//Leave Request
const API_CREATE_LEAVEREQUEST = API_URL_BASE + '/api/leaveRequest'
const API_GET_ALL_LEAVEREQUESTS = API_URL_BASE + '/api/leaveRequest'
const API_GET_SINGLE_LEAVEREQUEST = API_URL_BASE + '/api/leaveRequest/'
const API_GET_EMPLOYEE_LEAVEREQUESTS = API_URL_BASE + '/api/leaveRequest/employee/'
const API_UPDATE_LEAVEREQUEST = API_URL_BASE + '/api/leaveRequest'
const API_DELETE_LEAVEREQUEST = API_URL_BASE + '/api/leaveRequest/'

//Leave Type
const API_CREATE_LEAVETYPE = API_URL_BASE + '/api/leaveType'
const API_GET_ALL_LEAVETYPES = API_URL_BASE + '/api/leaveType'
const API_GET_SINGLE_LEAVETYPE = API_URL_BASE + '/api/leaveType/'
const API_UPDATE_LEAVETYPE = API_URL_BASE + '/api/leaveType'
const API_DELETE_LEAVETYPE = API_URL_BASE + '/api/leaveType/'

//Used Leave Days
const API_GET_ALL_USEDLEAVEDAYS_EMPLOYEE = API_URL_BASE + '/api/usedLeaveDays/employee/'
const API_Get_ALL_USEDLEAVEDAYS = API_URL_BASE + '/api/usedLeaveDays'

export { 
    // PORT,
    API_URL_BASE,
    API_CREATE_EMPLOYEE,
    API_GET_ALL_EMPLOYEES,
    API_GET_SINGLE_EMPLOYEE,
    API_UPDATE_EMPLOYEE,
    API_DELETE_EMPLOYEE,
    API_LOGIN,
    API_CREATE_LEAVEREQUEST,
    API_GET_ALL_LEAVEREQUESTS,
    API_GET_SINGLE_LEAVEREQUEST,
    API_GET_EMPLOYEE_LEAVEREQUESTS,
    API_UPDATE_LEAVEREQUEST,
    API_DELETE_LEAVEREQUEST,
    API_CREATE_LEAVETYPE,
    API_GET_ALL_LEAVETYPES,
    API_GET_SINGLE_LEAVETYPE,
    API_UPDATE_LEAVETYPE,
    API_DELETE_LEAVETYPE,
    API_SEND_EMAIL,
    API_GET_ALL_USEDLEAVEDAYS_EMPLOYEE,
    API_Get_ALL_USEDLEAVEDAYS
}

