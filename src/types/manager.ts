export enum ManagerInvitationEnum {
  PENDING = '요청중',
}

export interface IManagerInvitation {
  managerInvitationId: number
  managerUuid: string
  managerName: string
  subordinateUuid: string
  subordinateName: string
  status: string
  createdAt: string
  updatedAt: string
}

export interface IPostManagerInvitationRes extends IManagerInvitation {}

export interface IGetManagerInvitationRes extends Array<IManagerInvitation> {}

export interface IRejectManagerInvitationRes extends IManagerInvitation {}

export interface IPatchManagerInvitationRes extends IManagerInvitation {}

export interface IManagerUser {
  userUuid: string
  name: string
  profileImage: string
  email: string
  isManager: boolean
}

export interface IGetMyManagersRes extends Array<IManagerUser> {}

export interface IGetMySubordinatesRes extends Array<IManagerUser> {}
