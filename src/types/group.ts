export interface GetGroupUserRes {
  groupId: number
  groupName: string
  createdAt: Date
  memberCount: number
  isAdmin: boolean
}

export interface getGroupInvitationRes {
  groupId: number
  inviteeUuid: string
  invitationId: number
  status: string
  inviterUuid: string
}
