const sendMail = require('./libs/sendMail');

(async function() {
  const transportResponse = await sendMail({
    to: 's.zelenov@javascript.ru',
    subject: 'подтверждение регистрации',
    locals: {name: 'Сергей', url: 'http://localhost:3000/confirm/asdkfjaskf34f34flkj'},
    template: 'hello',
  });

  console.log(transportResponse);
})().catch(console.error);
