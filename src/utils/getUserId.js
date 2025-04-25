import { v4 as uuidv4 } from 'uuid';

export const getUserId = () => {
  let id = localStorage.getItem('watchle-user-id');
  if (!id) {
    id = uuidv4();
    localStorage.setItem('watchle-user-id', id);
  }
  return id;
};