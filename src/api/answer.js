import axiosInstance from './axios';

export const postAnswer = async (content, questionId, authorId) => {
try {
    const response = await axiosInstance.post('/answer/answers', { content, questionId, authorId });
    return response.data;
} catch (error) {
    throw error.response?.data || error.message;
    }
};

export const deleteAnswer = async (answerId) => {
  try {
    const response = await axiosInstance.delete('/answer/answers/' + answerId);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const fetchAllAnswer = async () => {
  try {
    const response = await axiosInstance.get('/answer/answers');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const fetchAllAnswerByQuestion = async (questionId) => {
  try {
    const response = await axiosInstance.get('/answer/answers/question/' + questionId);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const upvoteAnswer = async (answerId, userId) => {
  try {
    const response = await axiosInstance.put(`/answer/${userId}/upvote/answer/${answerId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const revokeUpvoteAnswer = async (answerId, userId) => {
  try {
    const response = await axiosInstance.put(`/answer/${userId}/revoke/answer/${answerId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};