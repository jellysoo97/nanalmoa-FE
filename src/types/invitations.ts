export enum InvitationTypeEnum {
  Group = 'group',
  Manager = 'manager',
}

export enum InvitationRoleEnum {
  MANAGER = 'MANAGER',
  SUBORDINATE = 'SUBORDINATE',
  GROUP_ADMIN = 'GROUP_ADMIN',
  GROUP_MEMBER = 'GROUP_MEMBER',
}

export enum InvitationStatusEnum {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  CANCELED = 'CANCELED',
  REMOVED = 'REMOVED',
}

export interface IInvitation {
  id: number
  type: InvitationTypeEnum
  role: InvitationRoleEnum
  status: InvitationStatusEnum
  createdAt: Date
  updatedAt: Date
  inviterUuid: string
  inviterName: string
  inviteeUuid: string
  inviteeName: string
  groupId: string
  groupName: string
}

export interface GetInvitationsUserRes extends Array<IInvitation> {}
