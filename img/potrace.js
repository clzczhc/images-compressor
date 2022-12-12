const potrace = require('potrace')
const fs = require('fs')

const params = {
  background: '#000',
  color: '#c7d4d8',
  threshold: 120
};
 
potrace.trace('./22.png', params, function(err, svg) {
  fs.writeFileSync('./22.svg', svg);
});