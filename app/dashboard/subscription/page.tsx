"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Check, CreditCard, School, Star, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function SubscriptionPage() {
  const [billingCycle, setBillingCycle] = useState("monthly")

  const plans = [
    {
      name: "Free",
      description: "Basic features for students getting started",
      price: {
        monthly: "Rp 0",
        yearly: "Rp 0",
      },
      features: [
        { name: "Basic task input via chat/file", included: true },
        { name: "Simple checklist and progress tracking", included: true },
        { name: "Limited Pomodoro sessions (5/day)", included: true },
        { name: "Basic AI task analysis", included: true },
        { name: "Limited subtasks (3 per task)", included: true },
        { name: "Ad-supported experience", included: true },
        { name: "Unlimited Pomodoro sessions", included: false },
        { name: "Advanced AI task breakdown", included: false },
        { name: "Smart task prioritization", included: false },
        { name: "Detailed analytics and reports", included: false },
        { name: "Ad-free experience", included: false },
      ],
      cta: "Current Plan",
      disabled: true,
      popular: false,
    },
    {
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
      cta: "Upgrade Now",
      disabled: false,
      popular: true,
    },
    {
      name: "Institutional",
      description: "For schools and educational organizations",
      price: {
        monthly: "Custom",
        yearly: "Custom",
      },
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
      cta: "Contact Sales",
      disabled: false,
      popular: false,
    },
  ]

  return (
    <div className="w-full p-4 sm:p-8 max-w-[1600px] mx-auto">
      <div className="mb-8 flex items-center">
        <Link href="/dashboard">
          <Button variant="ghost" size="icon" className="mr-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-xl sm:text-2xl font-bold">Subscription Plans</h1>
      </div>

      <div className="mb-8 text-center max-w-3xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">Choose the Right Plan for Your Academic Success</h2>
        <p className="text-muted-foreground">
          Unlock the full potential of TaskGenie with our premium features designed to boost your productivity and
          academic performance.
        </p>
      </div>

      <div className="flex justify-center mb-8">
        <Tabs defaultValue="monthly" className="w-full max-w-[400px]" onValueChange={setBillingCycle}>
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

      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan, index) => (
          <Card key={index} className={`flex flex-col ${plan.popular ? "border-primary shadow-md" : ""}`}>
            {plan.popular && (
              <div className="bg-primary text-primary-foreground text-center py-1 text-sm font-medium">
                Most Popular
              </div>
            )}
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {index === 0 ? (
                  <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
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
                      className="h-4 w-4"
                    >
                      <path d="M12 20h9"></path>
                      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                    </svg>
                  </div>
                ) : index === 1 ? (
                  <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                    <Star className="h-4 w-4" />
                  </div>
                ) : (
                  <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                    <School className="h-4 w-4" />
                  </div>
                )}
                {plan.name}
              </CardTitle>
              <CardDescription>{plan.description}</CardDescription>
              <div className="mt-4">
                <span className="text-3xl font-bold">{plan.price[billingCycle]}</span>
                {plan.price[billingCycle] !== "Custom" && (
                  <span className="text-muted-foreground ml-1">/{billingCycle === "monthly" ? "month" : "year"}</span>
                )}
                {plan.yearlyDiscount && billingCycle === "yearly" && (
                  <div className="mt-1">
                    <Badge
                      variant="outline"
                      className="bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800"
                    >
                      {plan.yearlyDiscount}
                    </Badge>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <Separator className="mb-4" />
              <div className="space-y-3">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start">
                    {feature.included ? (
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    ) : (
                      <X className="h-5 w-5 text-muted-foreground mr-2 shrink-0" />
                    )}
                    <span className={feature.included ? "" : "text-muted-foreground"}>{feature.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              {index === 1 ? (
                <Link href="/dashboard/upgrade" className="w-full">
                  <Button className="w-full" variant={plan.popular ? "default" : "outline"} disabled={plan.disabled}>
                    {plan.cta}
                  </Button>
                </Link>
              ) : (
                <Button className="w-full" variant={plan.popular ? "default" : "outline"} disabled={plan.disabled}>
                  {index === 2 ? (
                    <>
                      <CreditCard className="mr-2 h-4 w-4" />
                      {plan.cta}
                    </>
                  ) : (
                    plan.cta
                  )}
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-12 bg-muted rounded-lg p-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="text-xl font-bold mb-2">Frequently Asked Questions</h3>
            <div className="space-y-4 mt-4">
              <div>
                <h4 className="font-medium mb-1">What happens when my free plan limits are reached?</h4>
                <p className="text-sm text-muted-foreground">
                  You can continue using basic features, but you'll be prompted to upgrade for additional Pomodoro
                  sessions and subtasks.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-1">Can I switch between monthly and yearly billing?</h4>
                <p className="text-sm text-muted-foreground">
                  Yes, you can switch your billing cycle when renewing your subscription. Yearly plans offer a 10%
                  discount.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-1">Is there a student discount available?</h4>
                <p className="text-sm text-muted-foreground">
                  Yes! Students with a valid .edu email address can get 20% off any premium plan. Contact support to
                  apply.
                </p>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Need Help Choosing?</h3>
            <p className="text-muted-foreground mb-4">
              Our team is ready to help you find the perfect plan for your academic needs.
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
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <path d="M16 13H8"></path>
                  <path d="M16 17H8"></path>
                  <path d="M10 9H8"></path>
                </svg>
                View Feature Comparison
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
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="3" y1="9" x2="21" y2="9"></line>
                  <line x1="9" y1="21" x2="9" y2="9"></line>
                </svg>
                Schedule a Demo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

