"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { SheetClose } from "@/components/ui/sheet"
import { ChevronDown, User, ShoppingBag, Heart, LogOut } from "lucide-react"

interface MobileNavProps {
  items: { name: string; href: string }[]
}

export default function MobileNav({ items }: MobileNavProps) {
  const pathname = usePathname()
  const [openCategory, setOpenCategory] = useState<string | null>(null)

  const categories = [
    {
      name: "Collections",
      items: [
        { name: "Silk Sarees", href: "/collections/silk" },
        { name: "Cotton Sarees", href: "/collections/cotton" },
        { name: "Wedding Collection", href: "/collections/wedding" },
        { name: "Festive Collection", href: "/collections/festive" },
        { name: "Casual Wear", href: "/collections/casual" },
      ],
    },
    {
      name: "Account",
      items: [
        { name: "Profile", href: "/account", icon: User },
        { name: "Orders", href: "/account/orders", icon: ShoppingBag },
        { name: "Wishlist", href: "/account/wishlist", icon: Heart },
        { name: "Logout", href: "/logout", icon: LogOut },
      ],
    },
  ]

  const toggleCategory = (name: string) => {
    setOpenCategory(openCategory === name ? null : name)
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <Link href="/" className="font-playfair text-2xl font-medium">
          Saree Elegance
        </Link>
      </div>

      <div className="flex-1 overflow-auto py-4">
        <nav className="flex flex-col gap-1 px-2">
          {items.map((item) => (
            <SheetClose asChild key={item.name}>
              <Link
                href={item.href}
                className={`flex items-center h-10 px-4 rounded-md text-sm ${
                  pathname === item.href
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                {item.name}
              </Link>
            </SheetClose>
          ))}
        </nav>

        <div className="mt-4 px-2 space-y-1">
          {categories.map((category) => (
            <div key={category.name}>
              <Button
                variant="ghost"
                className="w-full justify-between font-medium"
                onClick={() => toggleCategory(category.name)}
              >
                {category.name}
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${openCategory === category.name ? "rotate-180" : ""}`}
                />
              </Button>

              {openCategory === category.name && (
                <div className="pl-4 space-y-1 mt-1">
                  {category.items.map((item) => (
                    <SheetClose asChild key={item.name}>
                      <Link
                        href={item.href}
                        className="flex items-center h-10 px-4 rounded-md text-sm text-muted-foreground hover:bg-muted"
                      >
                        {item.icon && <item.icon className="h-4 w-4 mr-2" />}
                        {item.name}
                      </Link>
                    </SheetClose>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 border-t">
        <div className="flex gap-4 justify-center">
          <Button variant="outline" size="sm" asChild>
            <Link href="/contact">Contact Us</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/products">Shop Now</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

