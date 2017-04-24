const request = require('request');
const sheetsu = require('sheetsu-node');

var client = sheetsu({ address: process.env.SHEETSU_SHEET })

exports.getPostage = (req, res) => {

  var options = {
    method: 'PUT',
    url: process.env.SHIPPING_URL,
    headers: {
      'shipping-authentication': process.env.SHIPPING_AUTHENTICATION
    },
    json: req.body
  };
  function callback(error, response, body) {
    if (error) {
      res.status(500).send('shipping error');
    }
    client.create(response.body).then(function(data) {
      res.send(data);
    }, function(err){
      res.status(500).send('sheet error');
    });
  }

  request(options, callback);

}

exports.updateRow = (req, res) => {
  client.update(
    "RequestID",
    req.params.id,
    { tracking_number: req.body.tracking_number }
  ).then(function(data) {
    res.send(data);
  }, function(err) {
    res.status(500).send('sheet update error');
  })
}
