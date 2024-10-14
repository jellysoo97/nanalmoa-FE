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
