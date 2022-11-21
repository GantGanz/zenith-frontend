import { AttachmentArticleData } from '../attachment-article/attachment-article-data' 

export interface ArticleData { 
	 id: string 
	 version: number 
	 articleTitle: string 
	 articleContent: string 
	 createdBy: string 
	 createdAt: string 
	 attachmentArticleDatas: AttachmentArticleData[] 
} 

