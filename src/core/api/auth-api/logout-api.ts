import axios from 'axios';

export const logOutUser = async () => {
  await axios.post('/api/logout');
};
