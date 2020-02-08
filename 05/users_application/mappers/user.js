module.exports = function map(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    gender: user.gender,
  };
};
