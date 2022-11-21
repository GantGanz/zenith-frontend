import { AttachmentArticleInsertReq } from './attachment-article-insert-req' 

export interface ArticleInsertReq { 
	 articleTitle: string 
	 articleContent: string 
	 attachmentArticleInsertReqs: AttachmentArticleInsertReq[] 
} 

