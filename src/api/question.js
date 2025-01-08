import axiosInstance from './axios';

export const postQuestion = async (title, content, tags, authorId) => {
  try {
    const response = await axiosInstance.post('/question/questions', { title, content, tags, authorId });
    return response.data;
  } catch (error) {
      throw error.response?.data || error.message;
    }
};

export const fetchAllQuestion = async () => {
  try {
    const response = await axiosInstance.get('/question/questions/');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const fetchQuestionById = async (questionId) => {
  try {
    const response = await axiosInstance.get('/question/questions/' + questionId);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};