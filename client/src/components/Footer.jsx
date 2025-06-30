import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black relative z-10">
      <div className="border-t border-opacity-40 py-8 lg:mt-[30px]">
        <div className="flex flex-wrap mx-4">
          <div className="w-full md:w-2/3 lg:w-1/2 px-4">
            <div className="my-1">
              <div className="flex items-center justify-center md:justify-start-mx-3">
                <a href="/" className="text-base text-[#f3f4fe] hover:text-primary px-3">
                  Privacy policy
                </a>
                <a href="/" className="text-base text-[#f3f4fe] hover:text-primary px-3">
                  Legal notice
                </a>
                <a href="/" className="text-base text-[#f3f4fe] hover:text-primary px-3">
                  Terms of service
                </a>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/3 lg:w-1/2 px-4">
            <div className="flex justify-center md:justify-end my-1">
              <p className="text-base text-[#f3f4fe]">
                Designed and Developed by
                <a href="google.com" rel="nofollow noopener" className="text-primary hover:underline">
                  Team DevLance
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;