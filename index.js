const {
  getAllClients,
  addClientAlert,
  addClientAlerts,
  removeClientAlert,
} = require('./lib');

(async function() {
  const clients = await getAllClients({SearchText: 'Test'});

  console.log(clients.length);
})();
