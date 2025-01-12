export default function Footer() {
  return (
    <footer className="bg-secondary mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">© {new Date().getFullYear()} MovieReview. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-accent transition-colors">
              Twitter
            </a>
            <a href="#" className="text-gray-400 hover:text-accent transition-colors">
              Facebook
            </a>
            <a href="#" className="text-gray-400 hover:text-accent transition-colors">
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
