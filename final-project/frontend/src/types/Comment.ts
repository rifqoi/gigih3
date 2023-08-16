export type Comments = {
  username: string;
  comment: string;
  timestamps: number;
};

export type GetCommentsByVideoAPI = {
  msg: string;
  data: Comments[];
};
