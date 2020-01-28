const IncrementStream = require('./IncrementStream');

const inc = new IncrementStream();

inc.on('data', chunk => console.log(chunk));

/*
* возвращает инкремент если значение меньше 10
* если больше 10 - запоминает в памяти, в следующий вызов - возвращает сумму
* */

inc.write(1); // 5
inc.write(2); // 3
inc.write(3); // 2
inc.write(4); // 4

inc.write(11); // NO 'data'
inc.write(4); // 15

inc.end();

/*
*
* unit
* functional
* integration / e2e
*
* load testing
* contract testing
* generative|property / mutating
*
*
* (code coverage) 60%
* */
