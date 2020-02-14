module.exports = {
  mongodb: {
    uri: (process.env.NODE_ENV === 'test')
      ? 'mongodb://localhost/06-test'
      : 'mongodb://localhost/06',
  },
  crypto: {
    iterations: (process.env.NODE_ENV === 'test' ? 1 : 12000),
    length: 128,
    digest: 'sha512',
  },
};
