import ShopifyData from "@/lib/shopify";

// To get user access token from Shopify
export default async function handler(req, res) {
  const payload = JSON.parse(req.body);
  const variables = {
    input: {
      email: payload.username,
      password: payload.password,
    },
  };
  const query = `mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      customerUserErrors {
        code
        field
        message
      }
      customerAccessToken {
        accessToken
        expiresAt
      }
    }
  }`;

  const response = await ShopifyData(query, variables);
  res.status(200).json(response);
}
