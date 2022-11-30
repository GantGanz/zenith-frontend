import { PollOptionData } from "../poll-option/poll-option-data"

export interface PollData { 
	 id: string 
	 pollTitle: string 
	 endAt: string 
	 postId: string 
	 isActive: boolean 
	 countVote: number
	 isVoted: boolean
	 pollOptionDatas: PollOptionData[]
} 

