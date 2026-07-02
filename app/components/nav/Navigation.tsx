'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { MdMovie } from 'react-icons/md'
import { HiMenu, HiX } from 'react-icons/hi'
import { Catamaran } from "next/font/google"
import { usePathname } from 'next/navigation'

const catamaran = Catamaran({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
})

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Reviews', href: '/reviews' },
  { label: 'Discover', href: '/discover' },
  { label: 'About us', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const pathname = usePathname()

  const isTransparentPage =
    pathname === "/contact" ||
    pathname.startsWith("/movie")

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const showSolidNavbar =
    !isTransparentPage || scrolled

  return (
    <div
      className={`
        ${catamaran.className}
        fixed top-0 left-0 w-full z-50
        transition-all duration-500
        ${
          showSolidNavbar
            ? "bg-[#07263a] shadow-[0_2px_20px_rgba(0,0,0,0.8)] border-b border-white/10"
            : "bg-transparent"
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between h-20">

        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer">
          <MdMovie className="text-5xl text-[#f1b722]" />
          <span className="text-white text-2xl">
            <span className="font-bold">Cine</span>
            <span className="font-normal">Match</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-16">
            {navLinks.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`
                    text-[17px] font-semibold relative group transition-colors duration-300 py-2
                    ${
                      pathname === href
                        ? "text-white"
                        : "text-[#899ead] hover:text-white"
                    }
                  `}
                >
                  {label}
                  <span
                    className={`
                      absolute -bottom-1 left-0 h-[2px] bg-[#f1b722] transition-all duration-300
                      ${
                        pathname === href
                          ? "w-full"
                          : "w-0 group-hover:w-full"
                      }
                    `}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Button */}
        <button
          className="md:hidden text-white text-3xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <HiX className="text-[#f1b722]" />
          ) : (
            <HiMenu />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`
          md:hidden overflow-hidden transition-all duration-300
          ${
            showSolidNavbar
              ? "bg-[#081b27]"
              : "bg-blue-950/80"
          }
          ${
            isOpen
              ? "max-h-96 border-t border-white/10"
              : "max-h-0"
          }
        `}
      >
        <ul className="flex flex-col px-6 py-4 gap-5">
          {navLinks.map(({ label, href }) => (
            <li key={href}>
              <Link
                href={href}
                onClick={() => setIsOpen(false)}
                className="text-[#899ead] hover:text-white"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Navigation