import Link from "next/link";

const Footer = () => {
  return (
    <footer className="fixed w-[99%] bg-gray-950 rounded-xl mx-[0.5%] p-4 bottom-1 mt-auto hover:bg-transparent ">
      <div className=" mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <div className="text-gray-300 text-center sm:text-left">
            <p>© 2024 DESCRIPTE Private Limited. All rights reserved.</p>
          </div>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <Link href="/" className="text-gray-300 hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/" className="text-gray-300 hover:text-white">
              Terms of Service
            </Link>
            <Link href="/" className="text-gray-300 hover:text-white">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
