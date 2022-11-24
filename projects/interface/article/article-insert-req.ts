import { AttachmentArticleInsertReq } from "../attachment-article/attachment-article-insert-req"

export interface ArticleInsertReq {
	articleTitle: string
	articleContent: string
	attachmentArticleInsertReqs: AttachmentArticleInsertReq[]
}

