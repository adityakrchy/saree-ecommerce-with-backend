"use client"

import type React from "react"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { User, Package, Heart, LogOut } from "lucide-react"
import Link from "next/link"

export default function AccountPage() {
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)

  const handleSaveProfile = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsEditing(false)

    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully.",
    })
  }

  return (
    <div className="container px-4 md:px-6 py-8 md:py-12">
      <h1 className="text-3xl md:text-4xl font-playfair font-medium mb-8">My Account</h1>

      <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8">
        <aside className="space-y-4">
          <div className="flex flex-col items-center p-4 bg-muted/50 rounded-lg">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-3">
              <User className="h-10 w-10 text-primary" />
            </div>
            <h2 className="font-medium">Priya Sharma</h2>
            <p className="text-sm text-muted-foreground">Member since Jan 2023</p>
          </div>

          <nav className="space-y-1">
            <Link
              href="/account"
              className="flex items-center gap-2 p-2 rounded-md bg-primary/10 text-primary font-medium"
            >
              <User className="h-4 w-4" />
              <span>Profile</span>
            </Link>
            <Link href="/account/orders" className="flex items-center gap-2 p-2 rounded-md hover:bg-muted">
              <Package className="h-4 w-4" />
              <span>Orders</span>
            </Link>
            <Link href="/account/wishlist" className="flex items-center gap-2 p-2 rounded-md hover:bg-muted">
              <Heart className="h-4 w-4" />
              <span>Wishlist</span>
            </Link>
            <Link href="/logout" className="flex items-center gap-2 p-2 rounded-md hover:bg-muted text-destructive">
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Link>
          </nav>
        </aside>

        <div>
          <Tabs defaultValue="profile">
            <TabsList className="mb-6">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="addresses">Addresses</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-medium">Personal Information</h2>
                  <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
                    {isEditing ? "Cancel" : "Edit"}
                  </Button>
                </div>

                <form onSubmit={handleSaveProfile}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" defaultValue="Priya" readOnly={!isEditing} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" defaultValue="Sharma" readOnly={!isEditing} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue="priya.sharma@example.com" readOnly={!isEditing} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" type="tel" defaultValue="+91 98765 43210" readOnly={!isEditing} />
                    </div>
                  </div>

                  {isEditing && (
                    <Button type="submit" className="mt-6">
                      Save Changes
                    </Button>
                  )}
                </form>
              </div>
            </TabsContent>

            <TabsContent value="addresses">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-medium">Saved Addresses</h2>
                  <Button variant="outline">Add New Address</Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4 relative">
                    <div className="absolute top-4 right-4 px-2 py-1 bg-primary/10 text-primary text-xs rounded">
                      Default
                    </div>
                    <h3 className="font-medium mb-2">Home</h3>
                    <p className="text-sm text-muted-foreground">
                      Priya Sharma
                      <br />
                      123 Main Street, Apartment 4B
                      <br />
                      Bangalore, Karnataka 560001
                      <br />
                      India
                      <br />
                      +91 98765 43210
                    </p>
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        Delete
                      </Button>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Office</h3>
                    <p className="text-sm text-muted-foreground">
                      Priya Sharma
                      <br />
                      456 Tech Park, Building C<br />
                      Bangalore, Karnataka 560037
                      <br />
                      India
                      <br />
                      +91 98765 43210
                    </p>
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        Delete
                      </Button>
                      <Button variant="outline" size="sm">
                        Set as Default
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="password">
              <div className="space-y-6">
                <h2 className="text-xl font-medium">Change Password</h2>

                <form className="space-y-4 max-w-md">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input id="currentPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input id="confirmPassword" type="password" />
                  </div>

                  <Button type="submit">Update Password</Button>
                </form>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

