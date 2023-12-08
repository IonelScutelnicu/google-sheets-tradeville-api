/**
 * When app is open, append the "TradeVille" menu.
 */
function onOpen() {
  SpreadsheetApp.getUi().createMenu("TradeVille").addItem("Open", "showTradevilleSidebar").addToUi();
}

/**
 * Open the TradeVille sidebar.
 */
function showTradevilleSidebar() {
  var widget = HtmlService.createHtmlOutputFromFile("TradeVillePage.html");
  widget.setTitle("TradeVille API");
  SpreadsheetApp.getUi().showSidebar(widget);
}

/**
 * Update TradeVillePortfolio sheet.
 */
function updatePortfolio(data) {
  var sheet = SpreadsheetApp.getActive().getSheetByName("TradeVillePortfolio");
  if (!sheet) {
    SpreadsheetApp.getUi().alert("Please create a new sheet with the name: TradeVillePortfolio.");
    return;
  }

  // Count how many values the column has.
  var rowsCount = data["Account"].length;

  // Page headers.
  var rows = [["Account", "Symbol", "Quantity", "AvgPrice", "MarketPrice", "PType", "Ccy"]];

  // Convert columns to rows.
  var index = 0;
  do {
    rows.push([
      data["Account"][index],
      data["Symbol"][index],
      data["Quantity"][index],
      data["AvgPrice"][index],
      data["MarketPrice"][index],
      data["PType"][index],
      data["Ccy"][index],
    ]);
  } while (++index < rowsCount);

  // Clear the columns that will be used.
  sheet.getRange("A:G").clearContent();

  // Store rows to sheet.
  sheet.getRange(`A1:G${rowsCount + 1}`).setValues(rows);

  // Notify user about the updated.
  SpreadsheetApp.getUi().alert("TradeVille portfolio has been updated.");
}

/**
 * Update TradeVilleActivity sheet.
 */
function updateActivity(data) {
  var sheet = SpreadsheetApp.getActive().getSheetByName("TradeVilleActivity");
  if (!sheet) {
    SpreadsheetApp.getUi().alert("Please create new sheet with name: TradeVilleActivity.");
    return;
  }

  // Count how many values the column has.
  var rowsCount = data["Date"].length;

  // Page headers.
  var rows = [
    [
      "Date",
      "OpType",
      "Symbol",
      "Quantity",
      "Price",
      "Comission",
      "Ammount",
      "CashPos",
      "InstrPos",
      "Profit",
      "TranzNo",
      "Ccy",
      "Obs",
      "AvgPrice",
      "OrderId",
      "Tax",
      "Market"
    ],
  ];

  // Convert columns to rows.
  var index = 0;
  do {
    rows.push([
      new Date(data["Date"][index]) || "",
      data["OpType"][index] || "",
      data["Symbol"][index] || "",
      data["Quantity"][index] || "",
      data["Price"][index] || "",
      data["Comission"][index] || "",
      data["Ammount"][index] || "",
      data["CashPos"][index] || "",
      data["InstrPos"][index] || "",
      data["Profit"][index] || "",
      data["TranzNo"][index] || "",
      data["Ccy"][index] || "",
      data["Obs"][index] || "",
      data["AvgPrice"][index] || "",
      data["OrderId"][index] || "",
      data["Tax"][index] || "",
      data["Market"][index] || "",
    ]);
  } while (++index < rowsCount);

  // Clear the columns that will be used.
  sheet.getRange("A:Q").clearContent();

  // Store rows to sheet.
  sheet.getRange(`A1:Q${rowsCount + 1}`).setValues(rows);

  // Notify user about the updated.
  SpreadsheetApp.getUi().alert("TradeVille activity has been updated.");
}
