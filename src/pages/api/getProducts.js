import ShopifyData from "@/lib/shopify";

// Fetch all products from Shopify
export default async function handler(req, res) {
  const query = `{
        products(first: 250) {
          edges {
            node {
              handle
              id
              description
              title
              seo {
                description
                title
              }
              featuredImage {
                altText
                height
                id
                url
              }
            }
          }
        }
      }`;

  const response = await ShopifyData(query);
  const slugs = response.data.products.edges
    ? response.data.products.edges
    : [];

  res.status(200).json(slugs);
}
