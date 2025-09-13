export const getUserId = () => {
  let id = localStorage.getItem('watchle-user-id');
  return id;
};

export const setUserId = (id) => {
  localStorage.setItem('watchle-user-id', id);
  return id;
};