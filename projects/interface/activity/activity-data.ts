import { AttachmentActivityData } from "../attachment-activity/attachment-activity-data"

export interface ActivityData { 
	 id: string 
	 activityTitle: string 
	 version: number 
	 activityLocation: string 
	 startAt: string 
	 endAt: string 
	 fee: number 
	 activityTypeId: string 
	 activityTypeName: string 
	 activityTypeCode: string 
	 creatorName: string 
	 createdBy: string 
	 createdAt: string
	 updatedAt: string
	 isActive: boolean
	 attachmentActivityDatas: AttachmentActivityData[]
} 

