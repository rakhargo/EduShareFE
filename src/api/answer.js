import axiosInstance from './axios';

export const postAnswer = async (content, questionId, authorId) => {
try {
    const response = await axiosInstance.post('/answer/answers', { content, questionId, authorId });
    return response.data;
} catch (error) {
    throw error.response?.data || error.message;
    }
};

export const fetchAllAnswer = async (questionId) => {
  try {
    const response = await axiosInstance.get('/answer/answers/question/' + questionId);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};