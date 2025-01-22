'use client'

import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { useAuth } from '../hooks/useAuth'

export default function Header() {
  const { session, logout } = useAuth()

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    } else {
      // If the target section doesn't exist, navigate back and scroll
      const href = (e.currentTarget as HTMLAnchorElement).getAttribute('href');
      if (href) {
        window.location.href = `/${href}`;

        // After a brief delay (to ensure the page loads), navigate to the target section
        setTimeout(() => {
          const hash = href.split('#')[1];
          if (hash) {
            const element = document.querySelector(`#${targetId}`);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }
        }, 500); // Adjust delay as needed
      }
    }
  };

  return (
    <section id="header">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-90 backdrop-blur-sm">
        <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
          <Link
            href="#HeroSection"
            onClick={(e) => handleScroll(e, "#HeroSection")}
            className="text-2xl font-bold text-primary"
          >
            AI Chatbot
          </Link>
          <div className="space-x-4">
            <Link
              href="#features"
              onClick={(e) => handleScroll(e, "#features")}
              className="text-gray-600 hover:text-primary transition-colors hover:scale-105"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              onClick={(e) => handleScroll(e, "#pricing")}
              className="text-gray-600 hover:text-primary transition-colors hover:scale-105"
            >
              Pricing
            </Link>
            {session ? (
              <>
                <span className="text-gray-600">Welcome, {session.user?.email}</span>
                <Button
                  onClick={logout}
                  variant="outline"
                  className="transition-transform transform hover:scale-105 hover:bg-gray-200 hover:border-gray-400"
                >
                  Log Out
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button
                    variant="outline"
                    className="transition-transform transform hover:scale-105 hover:bg-gray-200 hover:border-gray-400"
                  >
                    Log In
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button
                    className="transition-transform transform hover:scale-105 hover:bg-primary hover:text-white"
                  >
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </nav>
      </header>
    </section>
  )
}
