const users = [
  {name: 'Andrey'},
  {name: 'Dmitry'},
  {name: 'Ivan'},
  {name: 'Anna'},
  {name: 'Victoria'},
];

const indexByName = {
  'Anna': users[3],
};

function findByName(name) {
  return indexByName[name];
}

console.log(findByName('Anna'));
