import { AttachmentPostData } from '../attachment-post/attachment-post-data' 
import { CommentData } from '../comment/comment-data'
import { PollData } from '../poll/poll-data' 

export interface PostData{ 
	 id: string 
	 version: number 
	 postTitle: string 
	 postContent: string 
	 postTypeId: string 
	 postTypeCode: String
	 countLike: number
	 isLiked: boolean
	 isBookmarked: boolean
	 userId: string
	 fileId: string
	 creatorName: string 
	 createdBy: string 
	 createdAt: string 
	 updatedAt: string 
	 attachmentPostDatas: AttachmentPostData[] 
	 pollData: PollData 
	 commentDatas: CommentData[]
	 countComment: number
	 commentStatus: boolean
	 moreComment: boolean
	 showMoreComment: boolean
	 commentOffset: number
	 showImg: boolean
} 

