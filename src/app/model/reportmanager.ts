export class reportmanagerUrlModel {
    id: number
    reportName: string
    reportDescription: string
    reportUrl: string
    datetime: string
    isselected: boolean
}
export class reportmanagerGroupmanagementModel {
    id: number
    groupName: string
    groupDescription: string
}
export class reportmanagerPermissionModel {
    id: number
    permission: number
    type: string
    user: number
}