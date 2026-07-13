const ENDPOINTS = Object.freeze({
  products: {
    sheetName: "Products",
    headers: ["id", "name", "price", "stock_quantity", "status"],
  },
  orders: {
    sheetName: "Orders",
    headers: ["id", "total", "status", "date_created", "customer_name"],
  },
});

function normalizeStoreUrl(storeUrl) {
  if (typeof storeUrl !== "string") {
    throw new TypeError("The WooCommerce store URL must be a string.");
  }

  const normalizedUrl = storeUrl.trim().replace(/\/+$/, "");
  if (!/^https:\/\/[a-z0-9.-]+(?::\d+)?(?:\/[^?#\s]*)?$/i.test(normalizedUrl)) {
    throw new Error("The WooCommerce store URL must be a valid HTTPS URL.");
  }

  return normalizedUrl;
}

function buildWooCommerceUrl(storeUrl, endpoint, queryParams) {
  if (!Object.prototype.hasOwnProperty.call(ENDPOINTS, endpoint)) {
    throw new Error(`Unsupported WooCommerce endpoint: ${endpoint}`);
  }

  const params = queryParams || {};
  const query = Object.keys(params)
    .filter((key) => params[key] !== undefined && params[key] !== null)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join("&");
  const baseUrl = `${normalizeStoreUrl(storeUrl)}/wp-json/wc/v3/${endpoint}`;

  return query ? `${baseUrl}?${query}` : baseUrl;
}

function buildRequestOptions(consumerKey, consumerSecret, base64Encode) {
  if (!consumerKey || !consumerSecret) {
    throw new Error("WooCommerce API credentials are not configured.");
  }

  return {
    method: "get",
    headers: {
      Authorization: `Basic ${base64Encode(`${consumerKey}:${consumerSecret}`)}`,
      Accept: "application/json",
    },
    muteHttpExceptions: true,
  };
}

function getWooCommerceSettings() {
  const properties = PropertiesService.getScriptProperties();
  return {
    storeUrl: properties.getProperty("WOOCOMMERCE_STORE_URL"),
    consumerKey: properties.getProperty("WOOCOMMERCE_CONSUMER_KEY"),
    consumerSecret: properties.getProperty("WOOCOMMERCE_CONSUMER_SECRET"),
  };
}

function fetchWooCommerceData(endpoint, queryParams) {
  const settings = getWooCommerceSettings();
  const url = buildWooCommerceUrl(settings.storeUrl, endpoint, queryParams);
  const options = buildRequestOptions(
    settings.consumerKey,
    settings.consumerSecret,
    Utilities.base64Encode,
  );
  const response = UrlFetchApp.fetch(url, options);
  const statusCode = response.getResponseCode();

  if (statusCode < 200 || statusCode >= 300) {
    throw new Error(`WooCommerce request failed with HTTP ${statusCode}.`);
  }

  const data = JSON.parse(response.getContentText());
  if (!Array.isArray(data)) {
    throw new Error("WooCommerce returned an unexpected response format.");
  }

  return data;
}

function getCustomerName(billing) {
  if (!billing || typeof billing !== "object") {
    return "";
  }

  return [billing.first_name, billing.last_name].filter(Boolean).join(" ");
}

function selectFields(endpoint, items) {
  const headers = ENDPOINTS[endpoint].headers;
  return items.map((item) => {
    const selected = {};
    headers.forEach((header) => {
      selected[header] = header === "customer_name"
        ? getCustomerName(item.billing)
        : (item[header] ?? "");
    });
    return selected;
  });
}

function writeToSheet(sheetName, data, headers) {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName(sheetName) || spreadsheet.insertSheet(sheetName);
  sheet.clearContents();
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

  if (data.length === 0) {
    return;
  }

  const values = data.map((item) => headers.map((header) => item[header] ?? ""));
  sheet.getRange(2, 1, values.length, headers.length).setValues(values);
}

function importEndpointToSheet(endpoint) {
  const definition = ENDPOINTS[endpoint];
  if (!definition) {
    throw new Error(`Unsupported WooCommerce endpoint: ${endpoint}`);
  }

  const data = selectFields(endpoint, fetchWooCommerceData(endpoint, { per_page: 100 }));
  writeToSheet(definition.sheetName, data, definition.headers);
  return data.length;
}

function saveWooCommerceDataToSheet() {
  return {
    products: importEndpointToSheet("products"),
    orders: importEndpointToSheet("orders"),
  };
}

function getWooCommerceDataForHTML(type) {
  if (!Object.prototype.hasOwnProperty.call(ENDPOINTS, type)) {
    throw new Error("Only products and orders can be displayed.");
  }

  return selectFields(type, fetchWooCommerceData(type, { per_page: 100 }));
}

function doGet() {
  return HtmlService.createHtmlOutputFromFile("index")
    .setTitle("WooCommerce Data Viewer");
}

if (typeof module !== "undefined") {
  module.exports = {
    ENDPOINTS,
    buildRequestOptions,
    buildWooCommerceUrl,
    getCustomerName,
    normalizeStoreUrl,
    selectFields,
  };
}
