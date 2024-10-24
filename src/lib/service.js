import axios from 'axios';

const getData = async (userId) => {
  try {
    const userResponse = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
    const user = userResponse.data;

    const postsResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    const posts = postsResponse.data;

    const result = {
      ...user,
      posts
    };

    return result;
  } catch (error) {
    console.error('Veri çekme sırasında bir hata oluştu:', error);
    return null;
  }
};

export default getData;
