import API from "./api";

export const createPost = (postData, userId, categoryId) => {
  return API.post(
    `/user/${userId}/category/${categoryId}/posts`,
    postData
  );
};
