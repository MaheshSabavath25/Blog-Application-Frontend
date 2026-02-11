import API from "./api";

// add comment
export const addComment = (postId, content) => {
  return API.post(`/api/comments/post/${postId}`, {
    content,
  });
};

// get comments by post
export const getCommentsByPost = (postId) => {
  return API.get(`/api/comments/post/${postId}`);
};

// delete comment
export const deleteComment = (commentId) => {
  return API.delete(`/api/comments/${commentId}`);
};
