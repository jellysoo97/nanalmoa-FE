export interface GetGroupUserRes {
  groupId: number
  groupName: string
  createdAt: Date
  memberCount: number
  isAdmin: boolean
}

export interface GetGroupInvitationRes {
  groupId: number
  inviteeUuid: string
  invitationId: number
  status: string
  inviterUuid: string
}

export interface PostGroupReq {
  groupName: string
}

export interface PostGroupRes extends GetGroupUserRes {}

export interface PostInviteReq {
  groupId: number
  inviteeUuids: [string]
}

export interface GetGroupDetail extends GetGroupUserRes {
  members: [
    {
      userUuid: string
      name: string
      isAdmin: boolean
      joinedAt: Date
    },
  ]
}

export interface PatchGroupAcceptReq {
  id: number
}

export interface PatchGroupAcceptRes {}

export interface PatchGroupRejectReq extends PatchGroupAcceptReq {}

export interface PatchGroupRejectRes extends PatchGroupAcceptRes {}
