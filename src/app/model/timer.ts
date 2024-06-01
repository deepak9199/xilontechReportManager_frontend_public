export class CustomersList {
    constructor() {
        this.companyname = ''
        this.email = ''
        this.contactnumber = 0
        this.firstName = ''
        this.middleName = ''
        this.lastName = ''
        this.address = ''
        this.city = ''
        this.country = ''
        this.postalcode = 0
        this.about = ''
        this.employeetype = ''
        this.organisationmanager = ''
    }
    id: number;
    email: string
    firstName: string;
    middleName: string
    lastName: string;
    orgCode: string;
    user: string;
    accountAuthority: string;
    about: string;
    address: string;
    city: string;
    companyname: string;
    contactnumber: number
    country: string
    postalcode: number
    employeetype: string
    joiningdate: Date
    dateofbirth: Date
    marriageanniversary: Date
    dateofrelieving: Date
    organisationmanager: string
    role: []
    isselected: boolean
}
export class TimeClock {
    constructor() {
        this.id = 0
        this.user = ''
        this.username = ''
        this.status = ''
        this.timeType = ''
        this.date = ''
        this.sun = 0
        this.sunDescription = ''
        this.mon = 0
        this.monDescription = ''
        this.tue = 0
        this.tueDescription = ''
        this.wed = 0
        this.wedDescription = ''
        this.thu = 0
        this.thuDescription = ''
        this.fri = 0
        this.friDescription = ''
        this.sat = 0
        this.satDescription = ''
        this.totalworkinghour = 0
        this.activitiesCode = ''
        this.activitiesname = ''
        this.projectCode = ''
        this.projectname = ''
        this.daterange = ''
    }
    id: number;
    user: string;
    username: string
    status: string;
    timeType: string;
    date: string;
    sun: number;
    sunDescription: string;
    mon: number;
    monDescription: string;
    tue: number;
    tueDescription: string;
    wed: number;
    wedDescription: string;
    thu: number;
    thuDescription: string;
    fri: number;
    friDescription: string;
    sat: number;
    satDescription: string;
    totalworkinghour: number;
    activitiesCode: string;
    activitiesname: string
    projectCode: string
    projectname: string
    daterange: string
}
export class TimeClockReport {
    constructor() {
        this.id = 0
        this.user = ''
        this.username = ''
        this.email = ''
        this.userType = ''
        this.status = ''
        this.projectCode = ''
        this.projectName = ''
        this.projectDescription = ''
        this.activityCode = ''
        this.activityName = ''
        this.activityDescription = ''
        this.timeType = ''
        this.date = null
        this.day = ''
        this.hours = 0
        this.comment = ''

    }
    id: number;
    user: string;
    username: string
    email: string
    userType: string
    status: string;
    projectCode: string
    projectName: string
    projectDescription: string
    activityCode: string
    activityName: string
    activityDescription: string
    timeType: string;
    date: Date;
    day: string;
    hours: number;
    comment: string
}
export class activities {
    constructor() {
        this.id = 0
        this.activitiesCode = ""
        this.activitiesname = ""
        this.activitiesDescription = ""
        this.projectCode = ""
        this.billingType = ""
    }
    id: number;
    activitiesCode: string;
    activitiesname: string;
    activitiesDescription: string;
    projectCode: string;
    billingType: string;
}
export class projects {
    id: number;
    projectCode: string;
    projectname: string;
    projectDescription: string;
    projectmanager: string;

}
export class projectsAssine {
    constructor() {
        this.id = 0
        this.user = ""
        this.type = ""
        this.permission = ""
    }
    id: number;
    user: string;
    type: string;
    permission: string;

}
export class productsList {
    id: number;
    productCode: string;
    productDesc: string;
    productName: string;

}

export class employeeProjectActivieAssign {
    user: string
    email: string
    projects: string[];
    activities: string[][];
    workingHrs: number
}
export class AssignManagerModel {
    // constructor() {
    //     this.projectsId = 0
    //     this.projects = ''
    //     this.activities1Select = false
    //     this.activities1Id = 0;
    //     this.activities1 = '';
    //     this.activities2Select = false
    //     this.activities2Id = 0;
    //     this.activities2 = '';
    //     this.activities3Select = false
    //     this.activities3Id = 0;
    //     this.activities3 = '';
    //     this.activities4Select = false
    //     this.activities4Id = 0;
    //     this.activities4 = '';
    //     this.activities5Select = false
    //     this.activities5Id = 0;
    //     this.activities5 = '';
    // }
    projectsId: number;
    projects: string;
    activities1Select: boolean
    activities1Id: number;
    activities1: string;
    activities2Select: boolean
    activities2Id: number;
    activities2: string;
    activities3Select: boolean
    activities3Id: number;
    activities3: string;
    activities4Select: boolean
    activities4Id: number;
    activities4: string;
    activities5Select: boolean
    activities5Id: number;
    activities5: string;
}
export class activityModel {
    activitiy: string;

}
export class userListModel {
    constructor() {
        this.user = ''
    }
    user: string;
}
export class TimeApproveModel {
    status: string
    user: string
    email: string
    workingHrs: number
    weekDate: string
    weekDateRange: string
}

