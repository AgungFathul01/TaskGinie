"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Check, CreditCard, Shield, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function UpgradePage() {
  const [billingCycle, setBillingCycle] = useState("monthly")
  const [selectedPlan, setSelectedPlan] = useState("premium")

  const plans = [
    {
      id: "premium",
      name: "Premium",
      description: "Enhanced features for serious students",
      price: {
        monthly: "Rp 150.000",
        yearly: "Rp 1.600.000",
      },
      yearlyDiscount: "Save Rp 200.000",
      features: [
        { name: "Basic task input via chat/file", included: true },
        { name: "Simple checklist and progress tracking", included: true },
        { name: "Unlimited Pomodoro sessions", included: true },
        { name: "Advanced AI task analysis", included: true },
        { name: "Unlimited subtasks", included: true },
        { name: "Smart task prioritization", included: true },
        { name: "Detailed analytics and reports", included: true },
        { name: "Ad-free experience", included: true },
        { name: "Priority support", included: true },
        { name: "Calendar integration", included: true },
        { name: "File storage (1GB)", included: true },
      ],
      popular: true,
    },
    {
      id: "institutional",
      name: "Institutional",
      description: "For schools and educational organizations",
      price: {
        monthly: "Rp 500.000",
        yearly: "Rp 5.400.000",
      },
      yearlyDiscount: "Save Rp 600.000",
      features: [
        { name: "All Premium features", included: true },
        { name: "Bulk user management", included: true },
        { name: "Admin dashboard", included: true },
        { name: "Student progress monitoring", included: true },
        { name: "Custom branding", included: true },
        { name: "API access", included: true },
        { name: "Dedicated account manager", included: true },
        { name: "Custom integrations", included: true },
        { name: "Onboarding training", included: true },
        { name: "Advanced analytics", included: true },
      ],
      popular: false,
    },
  ]

  const selectedPlanData = plans.find((plan) => plan.id === selectedPlan)

  return (
    <div className="w-full p-4 sm:p-8 max-w-[1600px] mx-auto">
      <div className="mb-8 flex items-center">
        <Link href="/dashboard/subscription">
          <Button variant="ghost" size="icon" className="mr-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-xl sm:text-2xl font-bold">Upgrade Subscription</h1>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Left side - Plan Selection */}
        <div>
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-2">Choose Your Plan</h2>
            <p className="text-muted-foreground">Select the plan that best fits your academic needs.</p>
          </div>

          <div className="mb-6">
            <Tabs defaultValue="monthly" className="w-full" onValueChange={setBillingCycle}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="monthly">Monthly Billing</TabsTrigger>
                <TabsTrigger value="yearly">
                  Yearly Billing
                  <Badge
                    variant="secondary"
                    className="ml-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                  >
                    Save 10%
                  </Badge>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="space-y-4">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className={`cursor-pointer transition-all hover:border-primary ${selectedPlan === plan.id ? "border-primary ring-1 ring-primary" : ""}`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {plan.id === "premium" ? (
                        <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                          <Star className="h-4 w-4" />
                        </div>
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                          <Shield className="h-4 w-4" />
                        </div>
                      )}
                      <CardTitle>{plan.name}</CardTitle>
                    </div>
                    {plan.popular && <Badge className="bg-primary text-primary-foreground">Popular</Badge>}
                  </div>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-2">
                    <span className="text-2xl font-bold">{plan.price[billingCycle]}</span>
                    <span className="text-muted-foreground ml-1">/{billingCycle === "monthly" ? "month" : "year"}</span>
                  </div>
                  {plan.yearlyDiscount && billingCycle === "yearly" && (
                    <Badge
                      variant="outline"
                      className="bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800"
                    >
                      {plan.yearlyDiscount}
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Right side - Payment Details */}
        <div>
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-2">Payment Details</h2>
            <p className="text-muted-foreground">Enter your payment information to complete your subscription.</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
              <CardDescription>
                {selectedPlanData?.name} Plan ({billingCycle === "monthly" ? "Monthly" : "Yearly"})
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Subscription Fee</span>
                  <span className="font-medium">{selectedPlanData?.price[billingCycle]}</span>
                </div>
                {billingCycle === "yearly" && (
                  <div className="flex justify-between text-green-600">
                    <span>Yearly Discount</span>
                    <span>-{selectedPlanData?.yearlyDiscount?.replace("Save ", "")}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>{selectedPlanData?.price[billingCycle]}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="card-name">Name on Card</Label>
                  <Input id="card-name" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="card-number">Card Number</Label>
                  <Input id="card-number" placeholder="1234 5678 9012 3456" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input id="expiry" placeholder="MM/YY" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvc">CVC</Label>
                    <Input id="cvc" placeholder="123" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <CreditCard className="mr-2 h-4 w-4" />
                Complete Purchase
              </Button>
            </CardFooter>
          </Card>

          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Shield className="h-4 w-4" />
            <span>Secure payment processing</span>
          </div>
        </div>
      </div>

      <div className="mt-12 bg-muted rounded-lg p-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="text-xl font-bold mb-2">Subscription Benefits</h3>
            <div className="space-y-3 mt-4">
              {selectedPlanData?.features.slice(0, 5).map((feature, index) => (
                <div key={index} className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span>{feature.name}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Need Help?</h3>
            <p className="text-muted-foreground mb-4">
              Our team is ready to assist you with any questions about your subscription.
            </p>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 mr-2"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
                Chat with Support
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 mr-2"
                >
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <path d="M16 13H8"></path>
                  <path d="M16 17H8"></path>
                  <path d="M10 9H8"></path>
                </svg>
                View FAQ
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

