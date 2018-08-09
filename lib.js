const MindBodyAPI = require('mindbody-node-client');
const mindBodyAPI = new MindBodyAPI();

const getAllClients = data =>
  new Promise(resolve => _getAllClients(resolve, data));

const _getAllClients = async (
  resolve,
  data = {},
  CurrentPageIndex = 0,
  TotalClients = [],
) => {
  const result = await mindBodyAPI.GetClients({
    PageSize: data.PageSize || '500',
    SearchText: data.SearchText || '',
    CurrentPageIndex,
  });

  const PageClients = result.GetClientsResult.Clients.Client;
  const TotalPageCount = result.GetClientsResult.TotalPageCount;

  const combinedClients = TotalClients.concat(PageClients);

  if (CurrentPageIndex < TotalPageCount - 1)
    _getAllClients(resolve, PageSize, CurrentPageIndex + 1, combinedClients);
  else resolve(combinedClients);
};

const addClientAlert = (ID, YellowAlert) =>
  mindBodyAPI.AddOrUpdateClients({ID, YellowAlert});

const removeClientAlert = ID =>
  mindBodyAPI.AddOrUpdateClients({ID, YellowAlert: ''});

const addClientAlerts = async SearchText => {
  const params = {
    PageSize: '500',
    SearchText: SearchText || '',
  };

  const clients = await getAllClients(params);

  clients.map(async client => {
    addClientAlert(
      client.ID,
      `Waiver not signed for ${new Date().getFullYear()}`,
    );
    console.log(
      `Alert added for: ${client.ID} - ${client.FirstName} ${client.LastName}`,
    );
  });
};

module.exports = {
  getAllClients,
  addClientAlert,
  addClientAlerts,
  removeClientAlert,
};
