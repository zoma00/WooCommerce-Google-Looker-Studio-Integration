<div style="display: flex; justify-content: space-between; align-items: center;">
  <p align="left">
    <a href="https://wordpress.org/documentation/" target="_blank">
      <img src="wordpress-logo-svgrepo-com.svg" width="200" alt="woocommerce- Logo">
      WordPress Documentation
    </a>
  </p>

  <p align="center">
    <a href="https://woocommerce.com/document/woocommerce-rest-api/" target="_blank">
      <img src="woocommerce-svgrepo-com.svg" width="200" alt="woocommerce- Logo">
      WooCommerce REST API Documentation
    </a>
  </p>

  <p align="right">
    <a href="https://developers.google.com/apps-script" target="_blank">
      <img src="looker-icon-svgrepo-com.svg" width="100" alt="looker-studio Logo">
      apps-script Google Developer
    </a>
  </p>
</div>






*** WooCommerce Data Viewer ***
-
-  Description

The WooCommerce Data Fetcher is a powerful API-based WordPress plugin that enables you to fetch data from your WooCommerce store and integrate it with Google Cloud Private Cloud for secure storage. The plugin uses the WooCommerce REST API v3 to retrieve data, such as product, order, and customer information, from your WordPress site. Once the data is fetched, it can be visualised in Google Sheets using Google Apps Script. Finally, you can connect your data to Looker Studio for creating real-time analytics, reports, and dashboards.
## Features

- Fetch and Display Product and Order Data: Easily retrieve detailed product and order information from your WooCommerce store.
- Direct Data Storage: Save your e-commerce data directly into Google Sheets, making it available for further manipulation and analysis.
- Simple and Intuitive User Interface: A clean, easy-to-navigate HTML interface that simplifies data management and viewing.
- Data Visualization: Use built-in Google Apps Script functions to generate charts and graphs, helping you visualize key e-commerce metrics.
- Looker Studio Integration: Connect Google Sheets data to Looker Studio for advanced analytics, custom dashboards, and comprehensive reports.

## Technologies Used
- Google Apps Script: Automates the fetching and processing of WooCommerce data within Google Sheets.
- WooCommerce REST API v3: Provides access to WooCommerce store data, enabling product, order, and customer queries.
- Google Sheets API: Facilitates direct communication between Google Apps Script and Google Sheets for seamless data storage and management.
- HTML/CSS: A minimalistic front-end interface to display and interact with the data in an organized and user-friendly way.
- Looker Studio: Used to visualize and analyze e-commerce data from Google Sheets for powerful reporting.

## Installation

1. Clone this repository to your local machine.

   ```bash
   git clone https://github.com/yourusername/WooCommerce-Data-Viewer.git
   ```

2. Open Google Sheets and create a new spreadsheet.

3. In the spreadsheet, go to **Extensions > Apps Script**.

4. Copy the contents of the `Code.gs` file from this repository and paste it into the Apps Script editor.

5. Create a new HTML file in the Apps Script editor named `index.html` and copy the corresponding HTML code.

6. Replace the placeholder values for `storeUrl`, `consumerKey`, and `consumerSecret` in the code with your WooCommerce API credentials.

7. Save the project and run the `saveWooCommerceDataToSheet` function to fetch data from your WooCommerce store.

## Usage

- Run the `saveWooCommerceDataToSheet` function to fetch and save products and order data into Google Sheets.
- Access the deployed web app URL by using the HTML interface to view the data.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

-Hazem Elbatawy 


