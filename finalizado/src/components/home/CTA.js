import React from "react";
import { Link } from "react-router-dom";

export default function CTA() {
  return (
    <div className="bg-transparent">
      <div className="mx-auto lg:mx-12 max-w-full py-12 px-4 sm:px-6 lg:flex lg:items-center lg:justify-between lg:py-16 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          <span className="block">Ready to testing?</span>
          <span className="block text-blue-600">Request your free sample testing now!</span>
        </h2>
        <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
          <div className="inline-flex rounded-md shadow">
            <Link
              to="/calendar"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-5 py-3 text-base font-medium text-white hover:bg-blue-700"
            >
              Get started
            </Link>
          </div>
          <div className="ml-3 inline-flex rounded-md shadow">
            <Link
              to="/products"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-white px-5 py-3 text-base font-medium text-blue-600 hover:bg-blue-50"
            >
              Learn more
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
