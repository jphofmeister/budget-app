// {
//   "userID": 3,
//   "firstName": "Joseph",
//   "lastName": "Hofmeister",
//   "email": "Joseph.Hofmeister@orbiseducation.com",
//   "username": "joseph.hofmeister",
//   "partnerID": null,
//   "partnerSiteID": null,
//   "shared": null,
//   "requestedBy": null,
//   "requestDate": null,
//   "notes": null,
//   "lastLogin": "2025-10-29 04:01:52",
//   "updatedBy": null,
//   "active": true,
//   "createDate": "2020-08-17T18:27:11.000Z",
//   "updateDate": "2022-05-24T18:41:18.000Z",
//   "inactiveDate": null,
//   "partnerName": null,
//   "partnerAbbreviation": null,
//   "applicationID?": 2,
//   "applicationName?": "Extended Reality Scheduling System",
//   "userRoleID": 6,
//   "userRole": "System Administrator",
//   "userApplicationsCreateDate": "2020-08-17T18:27:11.000Z",
//   "applications": "Extended Reality Scheduling System",
//   "previousLastLogin": "2025-10-29T04:00:59.000Z",
//   "enteredUsername": "joseph.hofmeister",
//   "enteredPassword": "test",
//   "status": "success",
//   "isSystemAdministrator": true,
//   "isAdministrator": true,
// }

// const user = {
//   active: true,
//   applicationID: 2,
//   applicationName: "Extended Reality Scheduling System",
//   applications: "Extended Reality Scheduling System",
//   createDate: "2020-08-17T18:27:11.000Z",
//   email: "Joseph.Hofmeister@orbiseducation.com",
//   firstName: "Joseph",
//   inactiveDate: null,
//   lastLogin: "2025-10-29T14:22:03.000Z",
//   lastName: "Hofmeister",
//   notes: null,
//   partnerAbbreviation: null,
//   partnerID: null,
//   partnerName: null,
//   partnerSiteID: null,
//   password: "",
//   requestDate: null,
//   requestedBy: null,
//   shared: null,
//   updateDate: "2022-05-24T18:41:18.000Z",
//   updatedBy: null,
//   userApplicationsCreateDate: "2020-08-17T18:27:11.000Z",
//   userID: 3,
//   userRole: "System Administrator",
//   userRoleID: 6,
//   username: "joseph.hofmeister"
// };

// const userRequest = {
//   city: "Indianapolis",
//   completed: true,
//   createDate: "2024-06-04T12:38:53.430Z",
//   details: "Testing",
//   email: "david.bain@orbiseducation.com",
//   firstName: "David",
//   lastName: "Bain",
//   partnerAbbreviation: "MAR",
//   partnerID: 17,
//   partnerName: "Marian University",
//   partnerSiteAbbreviation: "IND",
//   partnerSiteAddressID: 21,
//   partnerSiteAddressesActive: true,
//   partnerSiteID: 16,
//   partnerSiteName: "Indianapolis",
//   positionID: 7,
//   positionName: "Simulation Operations Specialist (SOS)",
//   requestStatus: "Completed",
//   requestTypeID: 5,
//   requestTypeName: "SOS Assistant User",
//   preferredDate: null,
//   state: "IN",
//   street: "9002 Purdue Road, Suite 400",
//   userRequestID: 9,
//   zipCode: "46268"
// };

// const loggedInUser = {
//   active: true,
//   applicationID: 7,
//   applicationName: "Users",
//   applications: "Users",
//   createDate: "2025-08-11T21:42:03.963Z",
//   email: "productdevweb@orbiseducation.com",
//   firstName: "Administrator",
//   inactiveDate: null,
//   lastLogin: "2026-02-17 11:18:43",
//   lastName: "User",
//   notes: null,
//   partnerAbbreviation: null,
//   partnerID: null,
//   partnerName: null,
//   partnerSiteID: null,
//   previousLastLogin: "2026-02-17T11:18:38.000Z",
//   requestDate: null,
//   requestedBy: null,
//   shared: null,
//   updateDate: "2025-08-11T21:42:39.000Z",
//   updatedBy: 1,
//   userApplicationsCreateDate: "2025-08-11T21:42:03.963Z",
//   userID: 554,
//   userRole: "Administrator",
//   userRoleID: 5,
//   username: "AdministratorUser"
// };

export interface User {
  active?: boolean;
  applicationID?: number | null;
  applicationName?: string;
  applications?: string; // ?
  createDate?: string;
  createdBy?: number | null;
  createdByUsername?: string | null;
  email: string;
  firstName: string;
  inactiveDate?: string;
  inactivatedBy?: number | null;
  inactivatedByUsername?: string | null;
  lastLogin?: string;
  lastName: string;
  notes?: string;
  partnerAbbreviation?: string;
  partnerID?: number | null;
  partnerName?: string;
  partnerSiteID?: number | null;
  password?: string;
  requestDate?: string;
  requestedBy?: string;
  shared?: boolean;
  updateDate?: string;
  updatedBy?: number | null;
  updatedByUsername?: string | null;
  userApplicationsCreateDate?: string;
  userID?: number;
  userRole?: string;
  userRoleID?: number;
  username: string;
}

export interface UserRequest extends User {
  city?: string;
  completed?: boolean;
  details?: string;
  partnerSiteAbbreviation: string;
  partnerSiteAddressID?: number;
  partnerSiteAddressesActive?: boolean;
  positionID?: number;
  positionName?: string;
  requestStatus?: string;
  requestTypeID?: number;
  requestTypeName?: string;
  preferredDate?: string;
  state?: string;
  street?: string;
  userRequestID?: number;
  zipCode?: string;
}

export interface LoggedInUser extends User {
  isViewer?: boolean;
  isViewerPlusSource?: boolean;
  isViewerPlusStatistics?: boolean;
  isEditor?: boolean;
  isSimulationOperationsSpecialist?: boolean;
  isLabAndSimulationResourceManager?: boolean;
  isAdministrator?: boolean;
  isSystemAdministrator?: boolean;
  enteredUsername?: string;
  enteredPassword?: string;
  status?: string;
}

export interface UserRole {
  userRoleID?: number;
  userRole?: string;
  createDate?: string;
  active?: boolean;
}

export interface ApplicationUserRole extends UserRole {
  applicationID?: number;
  applicationName?: string;
}
