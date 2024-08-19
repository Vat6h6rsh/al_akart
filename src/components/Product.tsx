"use client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { Radio, RadioGroup } from "@headlessui/react";
import { useEffect } from "react";

const [product, setProduct] = useState(null);
const productId = 1; // You can dynamically set this if needed
const apiUrl = `https://dummyjson.com/products/${productId}`;

useEffect(() => {
  fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => {
      const mappedProduct = {
        id: data.id,
        title: data.title,
        description: data.description,
        category: data.category,
        price: data.price,
        discountPercentage: data.discountPercentage,
        rating: data.rating,
        stock: data.stock,
        tags: data.tags,
        brand: data.brand,
        sku: data.sku,
        weight: data.weight,
        dimensions: {
          width: data.dimensions.width,
          height: data.dimensions.height,
          depth: data.dimensions.depth,
        },
        warrantyInformation: data.warrantyInformation,
        shippingInformation: data.shippingInformation,
        availabilityStatus: data.availabilityStatus,
        reviews: data.reviews.map((review) => ({
          rating: review.rating,
          comment: review.comment,
          date: review.date,
          reviewerName: review.reviewerName,
          reviewerEmail: review.reviewerEmail,
        })),
        returnPolicy: data.returnPolicy,
        minimumOrderQuantity: data.minimumOrderQuantity,
        meta: {
          createdAt: data.meta.createdAt,
          updatedAt: data.meta.updatedAt,
          barcode: data.meta.barcode,
          qrCode: data.meta.qrCode,
        },
        thumbnail: data.thumbnail,
        images: data.images,
      };

      setProduct(mappedProduct);
    })
    .catch((error) => console.error("Error fetching product:", error));
}, [apiUrl]);

if (!product) {
  return <div>Loading...</div>;
}

export default function Ppage({ product }) {
  const [selectedColor, setSelectedColor] = useState(product.colors ? product.colors[0] : null);
  const [selectedSize, setSelectedSize] = useState(product.sizes ? product.sizes[0] : null);

  return (
    <div className="bg-white">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol
            role="list"
            className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
          >
            {/* Adjust breadcrumbs based on product data */}
            <li className="text-sm font-medium text-gray-500">
              <a href="/" className="text-gray-900 hover:text-gray-600">
                Home
              </a>
            </li>
            <li className="text-sm font-medium text-gray-500">
              <a href={`/products/category/${product.category}`} className="text-gray-900 hover:text-gray-600">
                {product.category}
              </a>
            </li>
            <li className="text-sm">
              <span aria-current="page" className="font-medium text-gray-500">
                {product.title}
              </span>
            </li>
          </ol>
        </nav>

        {/* Image gallery */}
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
            <img
              alt={product.title}
              src={product.images[0]}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
            {product.images.slice(1, 3).map((image, index) => (
              <div key={index} className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                <img
                  alt={`${product.title} - ${index + 2}`}
                  src={image}
                  className="h-full w-full object-cover object-center"
                />
              </div>
            ))}
          </div>
          <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
            <img
              alt={`${product.title} - 4`}
              src={product.images[3]}
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {product.title}
            </h1>
            <p className="text-3xl tracking-tight text-gray-900 mt-2">${product.price}</p>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>

            {/* Reviews */}
            <div className="mt-6">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      aria-hidden="true"
                      className={classNames(
                        product.rating > rating
                          ? "text-gray-900"
                          : "text-gray-200",
                        "h-5 w-5 flex-shrink-0"
                      )}
                    />
                  ))}
                </div>
                <p className="sr-only">{product.rating} out of 5 stars</p>
                <a
                  href="#reviews"
                  className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  {product.reviews.length} reviews
                </a>
              </div>
            </div>

            <form className="mt-10">
              {/* Colors */}
              <div>
                <h3 className="text-sm font-medium text-gray-900">Color</h3>

                <fieldset aria-label="Choose a color" className="mt-4">
                  <RadioGroup
                    value={selectedColor}
                    onChange={setSelectedColor}
                    className="flex items-center space-x-3"
                  >
                    {/* Map over product.colors if available */}
                    {product.colors && product.colors.map((color) => (
                      <Radio
                        key={color}
                        value={color}
                        aria-label={color}
                        className="relative flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none"
                      >
                        <span
                          aria-hidden="true"
                          className={classNames(
                            color === selectedColor ? "ring-2 ring-indigo-500" : "",
                            "h-8 w-8 rounded-full border border-black border-opacity-10"
                          )}
                          style={{ backgroundColor: color }}
                        />
                      </Radio>
                    ))}
                  </RadioGroup>
                </fieldset>
              </div>

              {/* Sizes */}
              <div className="mt-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">Size</h3>
                  <a
                    href="#size-guide"
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Size guide
                  </a>
                </div>

                <fieldset aria-label="Choose a size" className="mt-4">
                  <RadioGroup
                    value={selectedSize}
                    onChange={setSelectedSize}
                    className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4"
                  >
                    {product.sizes && product.sizes.map((size) => (
                      <Radio
                        key={size}
                        value={size}
                        disabled={!size.inStock}
                        className={classNames(
                          size.inStock
                            ? "cursor-pointer bg-white text-gray-900"
                            : "cursor-not-allowed bg-gray-50 text-gray-200",
                          "relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase hover:bg-gray-50"
                        )}
                      >
                        <span>{size.name}</span>
                        {!size.inStock && (
                          <span
                            aria-hidden="true"
                            className="absolute inset-0 rounded-md border-2 border-gray-200"
                          >
                            <svg
                              stroke="currentColor"
                              viewBox="0 0 100 100"
                              preserveAspectRatio="none"
                              className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                            >
                              <line
                                x1={0}
                                x2={100}
                                y1={100}
                                y2={0}
                                vectorEffect="non-scaling-stroke"
                              />
                            </svg>
                          </span>
                        )}
                      </Radio>
                    ))}
                  </RadioGroup>
                </fieldset>
              </div>

              <button
                type="submit"
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Add to bag
              </button>
            </form>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>
              <div className="space-y-6">
                <p className="text-base text-gray-900">{product.description}</p>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">Highlights</h3>
              <div className="mt-4">
                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                  {product.tags.map((tag) => (
                    <li key={tag} className="text-gray-400">
                      <span className="text-gray-600">{tag}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">Details</h2>
              <div className="mt-4 space-y-6">
                <p className="text-sm text-gray-600">SKU: {product.sku}</p>
                <p className="text-sm text-gray-600">Weight: {product.weight} kg</p>
                <p className="text-sm text-gray-600">Dimensions: {product.dimensions.width} x {product.dimensions.height} x {product.dimensions.depth} cm</p>
                <p className="text-sm text-gray-600">Warranty: {product.warrantyInformation}</p>
                <p className="text-sm text-gray-600">Shipping: {product.shippingInformation}</p>
                <p className="text-sm text-gray-600">Availability: {product.availabilityStatus}</p>
                <p className="text-sm text-gray-600">Return Policy: {product.returnPolicy}</p>
                <p className="text-sm text-gray-600">Minimum Order Quantity: {product.minimumOrderQuantity}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
