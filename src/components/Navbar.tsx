"use client";

import { Fragment, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const navigation = {
  categories: [
    {
      id: "beauty",
      name: "Beauty & Personal Care",
      sections: [
        {
          id: "beauty",
          name: "Beauty",
          items: [
            { name: "Beauty Products", href: "#" },
            { name: "Skin Care", href: "#" },
            { name: "Fragrances", href: "#" },
          ],
        },
      ],
    },
    {
      id: "home-kitchen",
      name: "Home & Kitchen",
      sections: [
        {
          id: "home",
          name: "Home Decoration",
          items: [
            { name: "Furniture", href: "#" },
            { name: "Home Decor", href: "#" },
            { name: "Kitchen Accessories", href: "#" },
            { name: "Groceries", href: "#" },
          ],
        },
      ],
    },
    {
      id: "electronics",
      name: "Electronics",
      sections: [
        {
          id: "electronics",
          name: "Electronics",
          items: [
            { name: "Laptops", href: "#" },
            { name: "Mobile Accessories", href: "#" },
            { name: "Smartphones", href: "#" },
            { name: "Tablets", href: "#" },
          ],
        },
      ],
    },
    {
      id: "mens-fashion",
      name: "Men's Fashion",
      sections: [
        {
          id: "mens-clothing",
          name: "Clothing",
          items: [
            { name: "Shirts", href: "#" },
            { name: "Shoes", href: "#" },
            { name: "Watches", href: "#" },
          ],
        },
      ],
    },
    {
      id: "womens-fashion",
      name: "Women's Fashion",
      sections: [
        {
          id: "womens-clothing",
          name: "Clothing",
          items: [
            { name: "Bags", href: "#" },
            { name: "Dresses", href: "#" },
            { name: "Jewellery", href: "#" },
            { name: "Shoes", href: "#" },
            { name: "Watches", href: "#" },
          ],
        },
      ],
    },
    {
      id: "accessories",
      name: "Accessories",
      sections: [
        {
          id: "accessories",
          name: "Accessories",
          items: [
            { name: "Sports Accessories", href: "#" },
            { name: "Sunglasses", href: "#" },
          ],
        },
      ],
    },
    {
      id: "vehicles-motorcycle",
      name: "Vehicles & Motorcycle",
      sections: [
        {
          id: "vehicles",
          name: "Vehicles & Motorcycle",
          items: [
            { name: "Vehicles", href: "#" },
            { name: "Motorcycle", href: "#" },
          ],
        },
      ],
    },
  ],
  pages: [],
};

export default function ENav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white">
      {/* Mobile menu */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        className="relative z-40 lg:hidden"
      >
        <div
          className="fixed inset-0 bg-black bg-opacity-25"
          aria-hidden="true"
        />
        <div className="fixed inset-0 z-40 flex">
          <div className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white shadow-xl">
            <div className="flex px-4 pb-2 pt-5">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-gray-400"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>

            {/* Mobile menu links */}
            <Tab.Group>
              <Tab.List className="flex space-x-8 px-4 border-b border-gray-200">
                {navigation.categories.map((category) => (
                  <Tab
                    key={category.id}
                    className="text-base font-medium text-gray-900"
                  >
                    {category.name}
                  </Tab>
                ))}
              </Tab.List>
              <Tab.Panels>
                {navigation.categories.map((category) => (
                  <Tab.Panel key={category.id} className="px-4 py-6">
                    {category.sections.map((section) => (
                      <div key={section.id}>
                        <p className="font-medium text-gray-900">
                          {section.name}
                        </p>
                        <ul className="mt-6 space-y-6">
                          {section.items.map((item) => (
                            <li key={item.name}>
                              <a href={item.href} className="text-gray-500">
                                {item.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </Tab.Group>

            <div className="px-4 py-6 border-t border-gray-200">
              {navigation.pages.map((page) => (
                <div key={page.name} className="py-2">
                  <a href={page.href} className="text-gray-900">
                    {page.name}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Dialog>

      {/* Desktop menu */}
      <header className="relative bg-white">
        <nav
          aria-label="Top"
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              {/* Mobile menu button */}
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="lg:hidden text-gray-400"
              >
                <span className="sr-only">Open menu</span>
                <Bars3Icon aria-hidden="true" className="h-6 w-6" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <a href="#">
                  <span className="sr-only">Your Company</span>
                  <img
                    alt=""
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    className="h-8 w-auto"
                  />
                </a>
              </div>

              {/* Desktop navigation */}
              <div className="hidden lg:flex lg:space-x-8 lg:ml-8">
                {navigation.categories.map((category) => (
                  <Popover key={category.id} className="relative">
                    <Popover.Button className="text-sm font-medium text-gray-700">
                      {category.name}
                    </Popover.Button>
                    <Popover.Panel className="absolute inset-x-0 top-full mt-2 bg-white shadow-lg">
                      <div className="mx-auto max-w-7xl px-8 py-6">
                        <div className="grid grid-cols-3 gap-x-8">
                          {category.sections.map((section) => (
                            <div key={section.id}>
                              <p className="font-medium text-gray-900">
                                {section.name}
                              </p>
                              <ul className="mt-4 space-y-4">
                                {section.items.map((item) => (
                                  <li key={item.name}>
                                    <a
                                      href={item.href}
                                      className="text-gray-500 hover:text-gray-800"
                                    >
                                      {item.name}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    </Popover.Panel>
                  </Popover>
                ))}

                {navigation.pages.map((page) => (
                  <a
                    key={page.name}
                    href={page.href}
                    className="text-sm font-medium text-gray-700 hover:text-gray-800"
                  >
                    {page.name}
                  </a>
                ))}
              </div>

              {/* Right side icons */}
              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:space-x-6">
                  <a
                    href="#"
                    className="text-sm font-medium text-gray-700 hover:text-gray-800"
                  >
                    Sign in
                  </a>
                  <span className="h-6 w-px bg-gray-200" />
                  <a
                    href="#"
                    className="text-sm font-medium text-gray-700 hover:text-gray-800"
                  >
                    Create account
                  </a>
                </div>

                {/* Search icon */}
                <div className="flex lg:ml-6">
                  <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Search</span>
                    <MagnifyingGlassIcon
                      aria-hidden="true"
                      className="h-6 w-6"
                    />
                  </a>
                </div>

                {/* Cart icon */}
                <div className="ml-4 lg:ml-6">
                  <Link href="/ShoppingCart" passHref>
                    <div className="flex items-center p-2 text-gray-400 hover:text-gray-500">
                      <ShoppingBagIcon aria-hidden="true" className="h-6 w-6" />
                      <span className="ml-2 text-sm font-medium text-gray-700">
                        0
                      </span>
                      <span className="sr-only">items in cart, view bag</span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
