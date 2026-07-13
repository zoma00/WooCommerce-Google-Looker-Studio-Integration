const assert = require("node:assert/strict");
const test = require("node:test");

const {
  buildRequestOptions,
  buildWooCommerceUrl,
  getCustomerName,
  normalizeStoreUrl,
  selectFields,
} = require("../Code.js");

test("normalizes an HTTPS store URL", () => {
  assert.equal(normalizeStoreUrl(" https://store.example.com/// "), "https://store.example.com");
});

test("rejects non-HTTPS store URLs", () => {
  assert.throws(
    () => normalizeStoreUrl("http://store.example.com"),
    /valid HTTPS URL/,
  );
});

test("builds an encoded WooCommerce URL without credentials", () => {
  const url = buildWooCommerceUrl("https://store.example.com/", "products", {
    per_page: 100,
    search: "red & blue",
  });

  assert.equal(
    url,
    "https://store.example.com/wp-json/wc/v3/products?per_page=100&search=red%20%26%20blue",
  );
  assert.doesNotMatch(url, /consumer_(?:key|secret)/);
});

test("rejects unsupported endpoints", () => {
  assert.throws(
    () => buildWooCommerceUrl("https://store.example.com", "customers", {}),
    /Unsupported WooCommerce endpoint/,
  );
});

test("places credentials in a Basic authorization header", () => {
  const options = buildRequestOptions("ck_example", "cs_example", (value) => `encoded:${value}`);

  assert.deepEqual(options, {
    method: "get",
    headers: {
      Authorization: "Basic encoded:ck_example:cs_example",
      Accept: "application/json",
    },
    muteHttpExceptions: true,
  });
});

test("requires both API credential values", () => {
  assert.throws(
    () => buildRequestOptions("ck_example", "", (value) => value),
    /credentials are not configured/,
  );
});

test("joins available billing name fields safely", () => {
  assert.equal(getCustomerName({ first_name: "Ada", last_name: "Lovelace" }), "Ada Lovelace");
  assert.equal(getCustomerName(null), "");
});

test("selects only the declared product fields", () => {
  const result = selectFields("products", [{
    id: 7,
    name: "Guide",
    price: "12.00",
    stock_quantity: 4,
    status: "publish",
    secret_internal_field: "not exported",
  }]);

  assert.deepEqual(result, [{
    id: 7,
    name: "Guide",
    price: "12.00",
    stock_quantity: 4,
    status: "publish",
  }]);
});

test("flattens order billing data for Sheets and HTML", () => {
  const result = selectFields("orders", [{
    id: 21,
    total: "29.00",
    status: "processing",
    date_created: "2026-01-10T09:30:00",
    billing: { first_name: "Grace", last_name: "Hopper" },
  }]);

  assert.deepEqual(result[0], {
    id: 21,
    total: "29.00",
    status: "processing",
    date_created: "2026-01-10T09:30:00",
    customer_name: "Grace Hopper",
  });
});
