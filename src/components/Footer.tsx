import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950 px-6 py-8 text-center text-sm text-gray-300">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <span>© 2025 Molargik Software LLC</span>
        <div className="flex gap-6">
          <Link to="/privacy" className="text-gray-300 underline-offset-4 hover:underline">Privacy Policy</Link>
          <Link to="/contact" className="text-gray-300 underline-offset-4 hover:underline">Contact</Link>
        </div>
        <div className="flex gap-5">
          <a href="mailto:nick@molargiksoftware.com" className="text-gray-300 hover:text-white">Email</a>
          <a href="https://www.linkedin.com/in/nicholas-molargik/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">LinkedIn</a>
          <a href="https://github.com/nmolargik" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">GitHub</a>
        </div>
      </div>
    </footer>
  );
}