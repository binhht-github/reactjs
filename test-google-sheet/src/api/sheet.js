import config from "./api/config";

export const load = (callback) => {
  window.gapi.client.load("sheets", "v4", () => {
    window.gapi.client.sheets.spreadsheets.values
      .get({
        spreadsheetId: config.spreadsheetId,
        range: "ThangTD!A3:L3",
      })
      .then(
        (response) => {
          const data = response.result.values;
          console.log(data);
          const items =
            data.map((item) => ({
              year: item[0],
              make: item[1],
              model: item[2],
            })) || [];
          callback({
            items,
          });
        },
        (response) => {
          callback(false, response.result.error);
        }
      );
  });
};
