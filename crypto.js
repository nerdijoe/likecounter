const crypto = require('crypto');

const secret = 'b817691f1db44b46a751f9a61f1d8c6c';
const endpoint = '/users/187611459/media/recent|access_token=493881988.0b9e96a.779354c34d7b459d8ed3de0e077a7f2b'
const hash = crypto.createHmac('sha256', secret)
                   .update(endpoint)
                   .digest('hex');

console.log(hash);

