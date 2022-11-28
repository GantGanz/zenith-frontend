import { AttachmentPostData } from '../attachment-post/attachment-post-data' 
import { PollData } from '../poll/poll-data' 

export interface PostData extends AttachmentPostData{ 
	 id: string 
	 version: number 
	 postTitle: string 
	 postContent: string 
	 postTypeId: string 
	 postTypeCode: String
	 userId: string 
	 creatorName: string 
	 createdBy: string 
	 createdAt: string 
	 updatedAt: string 
	 attachmentPostDatas: AttachmentPostData[] 
	 pollData: PollData 
} 

