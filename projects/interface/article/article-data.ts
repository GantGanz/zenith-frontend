import { AttachmentArticleData } from '../attachment-article/attachment-article-data'

export interface ArticleData extends AttachmentArticleData {
	id: string
	version: number
	articleTitle: string
	articleContent: string
	createdBy: string
	createdAt: string
	isActive: boolean
	attachmentArticleDatas: AttachmentArticleData[]
}

