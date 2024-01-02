import ShopifyData from "@/lib/shopify";

// To Fetch customer details from shopify
export default async function handler(req, res) {
  const payload = JSON.parse(req.body);

  const query = `query {
    customer(customerAccessToken: "${payload.token}") {
      id
      firstName
      lastName
      acceptsMarketing
      email
      phone
    }
  }`;

  const response = await ShopifyData(query);
  const data = response.data ? response.data : {};
  res.status(200).json(data);
}

