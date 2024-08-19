import { useState, useEffect } from "react";
import Link from "next/link";

export default function Eproducts() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const productsPerPage = 10;

  // Calculate the `skip` value based on the current page
  const skip = (currentPage - 1) * productsPerPage;

  useEffect(() => {
    // Fetch products whenever currentPage changes
    setLoading(true);

    fetch(
      `https://dummyjson.com/products?limit=${productsPerPage}&skip=${skip}&select=title,price,images`
    )
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, [currentPage]);

  // Function to handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        {!loading && (
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <Link key={product.id} href={`/product/${product.id}`} passHref>
                {" "}
                {/* Use product.id in the URL */}
                <div className="group cursor-pointer">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                    <img
                      alt={product.title}
                      src={product.images[0]}
                      className="h-full w-full object-cover object-center group-hover:opacity-75"
                    />
                  </div>
                  <h3 className="mt-4 text-sm text-gray-700">
                    {product.title}
                  </h3>
                  <p className="mt-1 text-lg font-medium text-gray-900">
                    ${product.price}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-l-md"
          >
            Previous
          </button>
          <span className="px-4 py-2 bg-gray-100 text-gray-700">
            Page {currentPage}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={products.length < productsPerPage}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-r-md"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
