export type PostBody = {
  text: string
  username:string
  profileImage:string
  image?:string
  _type:"post"
}

export interface Post extends PostBody {
  _id:string
  _createdAt:string
  _updatedAt:string
  _rev:string
  blockTweet:boolean
}
export type CommentBody = {
  text:string
  username:string
  profileImage:string
  post:{
    _ref:string,
    _type:'reference'
  }
}

export interface Comment extends CommentBody {
  _id:string
  _createdAt:string
  _updatedAt:string
  _rev:string
  _type:'comment'
}