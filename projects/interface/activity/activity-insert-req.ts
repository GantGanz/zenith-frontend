import { AttachmentActivityInsertReq } from './attachment-activity-insert-req' 

export interface ActivityInsertReq { 
	 activityTitle: string 
	 activityLocation: string 
	 startAt: string 
	 endAt: string 
	 fee: number 
	 activityTypeId: string 
	 attachmentActivityInsertReqs: AttachmentActivityInsertReq[] 
} 

