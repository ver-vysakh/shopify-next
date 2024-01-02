import React from "react";
import Link from "next/link";
import Image from "next/image";
// import { filterProducts } from "@/utils/helper";

const CategoryPage = ({ products = [] }) => {
  // return(<p>
  //   {JSON.stringify(products)}
  // </p>)
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="mb-6 font-bold">
          <Link className="text-blue-800" href={"/"}>
            {" "}
            Home
          </Link>
          <span>{" > Products"}</span>
        </div>
        <h2 className="sr-only">Products</h2>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.length &&
            products.map((product, index) => {
              const item = product.node;
              return (
                <Link
                  key={item.id}
                  href={`products/${item.handle}`}
                  className="group"
                  prefetch={true}
                >
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                    <Image
                      src={item?.featuredImage?.url}
                      alt={item?.featuredImage?.altText}
                      className="h-full w-full object-cover object-center group-hover:opacity-75"
                      width={500}
                      height={500}
                    />
                  </div>
                  <h3 className="mt-4 text-sm text-gray-700">{item?.title}</h3>
                  <p className="mt-1 text-lg font-medium text-gray-900">
                    {item?.price || 10}$
                  </p>
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  let products = [];
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/getProducts`
    );
    products = await response.json();
  } catch (error) {
    console.error(error);
  }
  return { props: { products } };
}

export default CategoryPage;
