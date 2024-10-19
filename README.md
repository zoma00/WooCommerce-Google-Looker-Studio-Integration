---
*** WooCommerce Data Viewer ***
-
-  Description

The **WooCommerce Data Viewer** is a Google Apps Script application that fetches data from a WooCommerce store and displays it in Google Sheets. The app allows users to retrieve product and order information using the WooCommerce REST API, making it easy to manage and analyze e-commerce data.

## Features

- Fetch and display products and orders from WooCommerce
- Save data directly to Google Sheets
- Simple HTML interface for viewing the data

## Technologies Used

- Google Apps Script
- WooCommerce REST API v3
- Google Sheets API
- HTML/CSS for the frontend

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
---

