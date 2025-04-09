"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { User, Package, Heart, LogOut, Save } from "lucide-react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"

export default function SettingsPage() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSaveProfile = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Settings updated",
        description: "Your account settings have been updated successfully.",
      })
    }, 1000)
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
            <Link href="/account" className="flex items-center gap-2 p-2 rounded-md hover:bg-muted">
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
            <Link
              href="/account/settings"
              className="flex items-center gap-2 p-2 rounded-md bg-primary/10 text-primary font-medium"
            >
              <User className="h-4 w-4" />
              <span>Settings</span>
            </Link>
            <Link href="/logout" className="flex items-center gap-2 p-2 rounded-md hover:bg-muted text-destructive">
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Link>
          </nav>
        </aside>

        <div>
          <Tabs defaultValue="account" className="space-y-6">
            <TabsList>
              <TabsTrigger value="account">Account Settings</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="privacy">Privacy & Security</TabsTrigger>
            </TabsList>

            <TabsContent value="account" className="space-y-6">
              <div className="border rounded-lg">
                <div className="bg-muted/50 p-4">
                  <h2 className="font-medium">Personal Information</h2>
                </div>
                <div className="p-4">
                  <form onSubmit={handleSaveProfile} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" defaultValue="Priya" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" defaultValue="Sharma" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue="priya.sharma@example.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" type="tel" defaultValue="+91 98765 43210" />
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? (
                          "Saving..."
                        ) : (
                          <>
                            <Save className="h-4 w-4 mr-2" />
                            Save Changes
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </div>
              </div>

              <div className="border rounded-lg">
                <div className="bg-muted/50 p-4">
                  <h2 className="font-medium">Change Password</h2>
                </div>
                <div className="p-4">
                  <form className="space-y-4">
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

                    <div className="flex justify-end">
                      <Button type="submit">Update Password</Button>
                    </div>
                  </form>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6">
              <div className="border rounded-lg">
                <div className="bg-muted/50 p-4">
                  <h2 className="font-medium">Email Notifications</h2>
                </div>
                <div className="p-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Order Updates</Label>
                        <p className="text-sm text-muted-foreground">Receive emails about your order status</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Promotions & Offers</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive emails about sales, discounts, and special offers
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">New Arrivals</Label>
                        <p className="text-sm text-muted-foreground">Get notified when new products are added</p>
                      </div>
                      <Switch />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Newsletter</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive our weekly newsletter with trends and tips
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>

                  <div className="flex justify-end mt-6">
                    <Button>Save Preferences</Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="privacy" className="space-y-6">
              <div className="border rounded-lg">
                <div className="bg-muted/50 p-4">
                  <h2 className="font-medium">Privacy Settings</h2>
                </div>
                <div className="p-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Profile Visibility</Label>
                        <p className="text-sm text-muted-foreground">
                          Allow others to see your profile reviews and ratings
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Data Usage</Label>
                        <p className="text-sm text-muted-foreground">
                          Allow us to use your browsing data to improve your shopping experience
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Personalized Ads</Label>
                        <p className="text-sm text-muted-foreground">
                          Allow us to show you personalized advertisements based on your interests
                        </p>
                      </div>
                      <Switch />
                    </div>
                  </div>

                  <div className="mt-6 space-y-4">
                    <h3 className="font-medium">Account Actions</h3>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button variant="outline">Download My Data</Button>
                      <Button variant="destructive">Delete Account</Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

