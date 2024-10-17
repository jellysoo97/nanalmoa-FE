export interface GetGroupUserRes {
  groupId: number
  groupName: string
  createdAt: Date
  memberCount: number
  isAdmin: boolean
}

export interface PostGroupReq {
  groupName: string
}

export interface PostGroupRes extends GetGroupUserRes {}

export interface PostInviteReq {
  groupId: number
  inviteeUuids: string[]
}

export interface GetGroupDetail extends GetGroupUserRes {
  members: {
    userUuid: string
    name: string
    isAdmin: boolean
    joinedAt: Date
  }[]
}

export enum GroupInvitationEnum {
  PENDING = '요청중',
}

export interface GetGroupInvitationRes {
  invitationId: number
  groupId: number
  groupName: string
  inviterUuid: string
  inviterName: string
  inviteeUuid: string
  inviteeName: string
  createdAt?: Date
  updatedAt?: Date
  status: string
}

export interface PatchGroupRejectRes extends GetGroupInvitationRes {}
export interface PatchGroupAcceptRes extends GetGroupInvitationRes {}
export interface PatchGroupCancelRes extends GetGroupInvitationRes {}

export interface DeleteGroupUserPa {
  groupId: number
  memberUuid: string
}

export interface PatchGroupAcceptReq {
  id: number
}

export interface PatchGroupAcceptRes {}

export interface PatchGroupRejectReq extends PatchGroupAcceptReq {}

export interface PatchGroupRejectRes extends PatchGroupAcceptRes {}

export interface PatchGroupCancelReq extends PatchGroupAcceptReq {}

export interface PatchGroupCancelRes extends PatchGroupAcceptRes {}
