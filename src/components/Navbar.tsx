import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from "@nextui-org/react";
import { useRouter } from "next/router";
import { default as NextLink } from 'next/link'
import { Inter, Unbounded } from "@next/font/google";

export const InterFont = Inter({
  subsets: ['latin'],
  weight: '500'
})

export const UnboundedFont = Unbounded({
  subsets: ['latin'],
  weight: '700'
})

const Logo = () => {
  return (
    <img src="/logo.jpg" className="w-8 h-8 rounded-full mr-3" />
  )
}

export default function NavbarComponent() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const router = useRouter()

  const menuItems: { href: string, title: string }[] = [
    {
      title: "🏠 Home",
      href: "/"
    },
    {
      title: "📃 Presentation",
      href: "/presentation.pptx"
    },
    {
      title: "💻 GitHub",
      href: "https://github.com/AvIsBeastMC/coding-ds23-2"
    },
  ];

  return (
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <Link href="/">
            <Logo />
            <p className={`text-inherit ${InterFont.className}`}>InnoVision</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="end">
        <NavbarBrand>
          <NextLink href="/" className="flex hover:opacity-50 transition">
            <Logo />
            <p className={`text-inherit flex self-center ${InterFont.className}`}>InnoVision</p>
          </NextLink>
        </NavbarBrand>

        {menuItems.map((m, i) => (
          <NavbarItem key={i} isActive={router.pathname == m.href}>
            <Link href={m.href} color={router.pathname !== m.href ? "danger" : undefined}>
              {m.title}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.title}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2 ? "warning" : index === menuItems.length - 1 ? "danger" : "foreground"
              }
              href={item.href}
              size="lg"
            >
              {item.title}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
