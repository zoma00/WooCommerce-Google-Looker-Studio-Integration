// doGet function to serve the HTML interface
function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('WooCommerce Data Viewer')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

// Function to fetch WooCommerce data
function fetchWooCommerceData(config) {
  if (!config || !config.dataSource) {
    Logger.log('Invalid config object or missing dataSource.');
    return null;
  }
  
  const { storeUrl, consumerKey, consumerSecret, endpoint, queryParams } = config.dataSource;

  // Build the WooCommerce API URL
  let url = `${storeUrl}/wp-json/wc/v3/${endpoint}?consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`;

  // Append additional query parameters dynamically
  if (queryParams) {
    Object.keys(queryParams).forEach(param => {
      url += `&${param}=${encodeURIComponent(queryParams[param])}`;
    });
  }

  try {
    // Make the request to the WooCommerce API
    const response = UrlFetchApp.fetch(url, { method: 'GET' });
    const responseData = JSON.parse(response.getContentText());
    return responseData;
  } catch (error) {
    Logger.log(`Error fetching data: ${error}`);
    return null; // Return null on error
  }
}

// Function to write data to Google Sheets
function writeToSheet(sheetName, data, headers) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(Woo);

  // Clear existing content
  sheet.clear();

  // Set headers in the first row
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

  // Set the data in the subsequent rows
  const values = data.map(item => headers.map(header => item[header]));
  sheet.getRange(2, 1, values.length, headers.length).setValues(values);
}

// Function to save WooCommerce products and orders into Google Sheets
function saveWooCommerceDataToSheet() {
  const storeUrl = "https://api.zoma.com/"; // Replace with your WooCommerce store URL
  const consumerKey = "ck consumer key"; // Replace with your consumer key
  const consumerSecret = "cs. consumer secret"; // Replace with your consumer secret

  // Config for products
  const productConfig = {
    dataSource: {
      storeUrl: storeUrl,
      consumerKey: consumerKey,
      consumerSecret: consumerSecret,
      endpoint: "products",
      queryParams: {} // Add any additional query parameters if needed
    }
  };

  // Config for orders
  const orderConfig = {
    dataSource: {
      storeUrl: storeUrl,
      consumerKey: consumerKey,
      consumerSecret: consumerSecret,
      endpoint: "orders",
      queryParams: {} // Add any additional query parameters if needed
    }
  };

  // Fetch WooCommerce products
  const products = fetchWooCommerceData(productConfig);
  if (products) {
    Logger.log("Fetched Products Count: " + products.length);

    // Define product headers
    const productHeaders = ["id", "name", "price", "stock_quantity", "status"];
    writeToSheet("Products", products, productHeaders);
  }

  // Fetch WooCommerce orders
  const orders = fetchWooCommerceData(orderConfig);
  if (orders) {
    Logger.log("Fetched Orders Count: " + orders.length);

    // Define order headers
    const orderHeaders = ["id", "total", "status", "date_created", "billing"];
    writeToSheet("Orders", orders, orderHeaders);
  }
}

// Call the function to fetch and save data into sheets
saveWooCommerceDataToSheet();


// Function to write data to Google Sheets
function writeToSheet(sheetName, data, headers) {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(sheetName);

  // If the sheet doesn't exist, create it
  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName);
  }

  // Clear existing content
  sheet.clear();

  // Set headers in the first row
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

  // Set the data in the subsequent rows
  const values = data.map(item => headers.map(header => item[header] || ""));
  sheet.getRange(2, 1, values.length, headers.length).setValues(values);
}

// Function to save WooCommerce products and orders into Google Sheets
function saveWooCommerceDataToSheet() {
  const storeUrl = "https://api.asherbiny.com/"; // Replace with your WooCommerce store URL
  const consumerKey = "CK put your consumer key"; // Replace with your consumer key
  const consumerSecret = "cs consumer secret"; // Replace with your consumer secret

  // Config for products
  const productConfig = {
    dataSource: {
      storeUrl: storeUrl,
      consumerKey: consumerKey,
      consumerSecret: consumerSecret,
      endpoint: "products",
      queryParams: {} // Add any additional query parameters if needed
    }
  };

  // Config for orders
  const orderConfig = {
    dataSource: {
      storeUrl: storeUrl,
      consumerKey: consumerKey,
      consumerSecret: consumerSecret,
      endpoint: "orders",
      queryParams: {} // Add any additional query parameters if needed
    }
  };

  // Fetch WooCommerce products
  const products = fetchWooCommerceData(productConfig);
  if (products) {
    Logger.log("Fetched Products Count: " + products.length);

    // Define product headers
    const productHeaders = ["id", "name", "price", "stock_quantity", "status"];
    writeToSheet("Products", products, productHeaders);
  }

  // Fetch WooCommerce orders
  const orders = fetchWooCommerceData(orderConfig);
  if (orders) {
    Logger.log("Fetched Orders Count: " + orders.length);

    // Define order headers
    const orderHeaders = ["id", "total", "status", "date_created", "billing"];
    writeToSheet("Orders", orders, orderHeaders);
  }
}

// Call the function to fetch and save data into sheets
saveWooCommerceDataToSheet();


// doGet function to serve the HTML interface
function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('WooCommerce Data Viewer')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

// Function to get WooCommerce products and orders for the HTML
function getWooCommerceDataForHTML(type) {
  const storeUrl = "https://api.asherbiny.com/"; // Replace with your WooCommerce store URL
  const consumerKey = "ck"; // Replace with your consumer key
  const consumerSecret = "cs"; // Replace with your consumer secret

  // Configurations for products and orders
  const config = {
    products: {
      dataSource: {
        storeUrl: storeUrl,
        consumerKey: consumerKey,
        consumerSecret: consumerSecret,
        endpoint: "products",
        queryParams: {}
      }
    },
    orders: {
      dataSource: {
        storeUrl: storeUrl,
        consumerKey: consumerKey,
        consumerSecret: consumerSecret,
        endpoint: "orders",
        queryParams: {}
      }
    }
  };

  // Fetching the respective data based on the type passed
  const data = fetchWooCommerceData(config[type]);
  if (!data) return [];

  // Prepare data to return for HTML
  const result = data.map(item => {
    return type === 'products'
      ? {
          id: item.id,
          name: item.name,
          price: item.price,
          stock_quantity: item.stock_quantity,
          status: item.status
        }
      : {
          id: item.id,
          total: item.total,
          status: item.status,
          date_created: item.date_created,
          customer_name: item.billing.first_name + ' ' + item.billing.last_name
        };
  });

  return result;
}







