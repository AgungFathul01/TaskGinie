import Link from "next/link"
import { ArrowLeft, ArrowRight, Brain, CheckCircle, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function LearnMorePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">TaskGenie</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/#features" className="text-sm font-medium hover:text-primary">
              Features
            </Link>
            <Link href="/how-it-works" className="text-sm font-medium hover:text-primary">
              How It Works
            </Link>
            <Link href="/learn-more" className="text-sm font-medium hover:text-primary">
              Learn More
            </Link>
            <Link href="/dashboard" className="text-sm font-medium hover:text-primary">
              Dashboard
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full px-4 sm:container py-16 md:py-24">
        <div className="flex flex-col items-center text-center mb-16">
          <Link href="/" className="mb-8 flex items-center text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
          <Badge className="mb-4">Learn More</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Discover TaskGenie</h1>
          <p className="text-xl text-muted-foreground max-w-[800px]">
            Explore how our AI-powered platform can transform your academic experience
          </p>
        </div>

        {/* Feature Tabs */}
        <Tabs defaultValue="ai-analysis" className="mb-24">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-1 mb-8">
            <TabsTrigger value="ai-analysis">AI Analysis</TabsTrigger>
            <TabsTrigger value="pomodoro">Pomodoro Timer</TabsTrigger>
            <TabsTrigger value="organization">Task Organization</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="ai-analysis" id="ai-analysis">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <Badge variant="outline" className="mb-4">
                  Feature Spotlight
                </Badge>
                <h2 className="text-3xl font-bold mb-4">AI-Powered Task Analysis</h2>
                <p className="text-muted-foreground mb-6">
                  Our advanced AI analyzes your assignments and breaks them down into manageable subtasks, making even
                  the most complex projects feel achievable.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start">
                    <div className="mr-4 mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary/20">
                      <CheckCircle className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Intelligent Task Breakdown</h4>
                      <p className="text-muted-foreground">
                        Automatically divides complex assignments into logical, sequential subtasks
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="mr-4 mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary/20">
                      <CheckCircle className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Time Estimation</h4>
                      <p className="text-muted-foreground">
                        Provides realistic time estimates for each subtask based on complexity and your past performance
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="mr-4 mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary/20">
                      <CheckCircle className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Resource Suggestions</h4>
                      <p className="text-muted-foreground">
                        Recommends relevant resources and references to help you complete your tasks efficiently
                      </p>
                    </div>
                  </div>
                </div>

                <Link href="/how-it-works">
                  <Button className="gap-2">
                    See How It Works <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>

              <div className="bg-muted/30 rounded-xl p-8 aspect-square flex items-center justify-center">
                <div className="relative w-full max-w-[300px] aspect-square">
                  <div className="absolute inset-0 bg-primary/5 rounded-xl"></div>
                  <div className="absolute inset-4 bg-primary/10 rounded-xl transform rotate-3"></div>
                  <div className="absolute inset-8 bg-card rounded-xl shadow-lg p-6 -rotate-2 flex flex-col">
                    <div className="flex items-center mb-4">
                      <FileText className="h-5 w-5 text-primary mr-2" />
                      <div className="h-3 bg-muted-foreground/20 rounded-full w-24"></div>
                    </div>
                    <div className="space-y-2 flex-grow">
                      <div className="h-2 bg-muted-foreground/20 rounded-full w-full"></div>
                      <div className="h-2 bg-muted-foreground/20 rounded-full w-5/6"></div>
                      <div className="h-2 bg-muted-foreground/20 rounded-full w-4/6"></div>
                    </div>
                    <div className="mt-4 space-y-2">
                      <div className="h-3 bg-primary/20 rounded-full w-full"></div>
                      <div className="h-3 bg-primary/20 rounded-full w-5/6"></div>
                      <div className="h-3 bg-primary/20 rounded-full w-4/6"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="pomodoro" id="pomodoro">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <Badge variant="outline" className="mb-4">
                  Feature Spotlight
                </Badge>
                <h2 className="text-3xl font-bold mb-4">Pomodoro Timer Integration</h2>
                <p className="text-muted-foreground mb-6">
                  Our integrated Pomodoro timer helps you maintain focus and avoid burnout by alternating between
                  focused work sessions and short breaks.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start">
                    <div className="mr-4 mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary/20">
                      <CheckCircle className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Customizable Intervals</h4>
                      <p className="text-muted-foreground">
                        Adjust work and break durations to match your personal productivity rhythm
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="mr-4 mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary/20">
                      <CheckCircle className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Session Tracking</h4>
                      <p className="text-muted-foreground">
                        Automatically records your focus sessions and links them to specific tasks and subtasks
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="mr-4 mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary/20">
                      <CheckCircle className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Focus Mode</h4>
                      <p className="text-muted-foreground">
                        Minimizes distractions during work sessions to help you maintain deep focus
                      </p>
                    </div>
                  </div>
                </div>

                <Link href="/how-it-works">
                  <Button className="gap-2">
                    See How It Works <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>

              <div className="order-1 md:order-2 bg-muted/30 rounded-xl p-8 aspect-square flex items-center justify-center">
                <div className="relative w-full max-w-[300px] aspect-square">
                  <div className="absolute inset-0 bg-primary/5 rounded-full"></div>
                  <div className="absolute inset-4 bg-card rounded-full shadow-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-primary mb-2">25:00</div>
                      <div className="text-sm text-muted-foreground">Focus Time</div>
                      <div className="mt-4 flex justify-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                          <div className="h-3 w-3 bg-primary rounded-sm"></div>
                        </div>
                        <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                          <div className="h-3 w-3 bg-primary/50 rounded-sm"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="organization" id="organization">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <Badge variant="outline" className="mb-4">
                  Feature Spotlight
                </Badge>
                <h2 className="text-3xl font-bold mb-4">Smart Task Organization</h2>
                <p className="text-muted-foreground mb-6">
                  Our intelligent organization system helps you prioritize tasks, manage deadlines, and maintain a clear
                  overview of your academic workload.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start">
                    <div className="mr-4 mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary/20">
                      <CheckCircle className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Automatic Prioritization</h4>
                      <p className="text-muted-foreground">
                        Tasks are automatically prioritized based on deadlines, importance, and estimated effort
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="mr-4 mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary/20">
                      <CheckCircle className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Visual Indicators</h4>
                      <p className="text-muted-foreground">
                        Clear visual cues help you identify high-priority tasks and approaching deadlines at a glance
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="mr-4 mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary/20">
                      <CheckCircle className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Flexible Views</h4>
                      <p className="text-muted-foreground">
                        Switch between list, grid, and calendar views to visualize your tasks in the most helpful way
                      </p>
                    </div>
                  </div>
                </div>

                <Link href="/how-it-works">
                  <Button className="gap-2">
                    See How It Works <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>

              <div className="bg-muted/30 rounded-xl p-8 aspect-square flex items-center justify-center">
                <div className="relative w-full max-w-[300px] aspect-square">
                  <div className="absolute inset-0 bg-primary/5 rounded-xl"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-card rounded-xl shadow-lg p-6 w-full max-w-[250px]">
                      <div className="flex justify-between items-center mb-4">
                        <div className="h-3 bg-muted-foreground/20 rounded-full w-20"></div>
                        <div className="h-3 bg-primary/40 rounded-full w-16"></div>
                      </div>
                      <div className="space-y-3 mb-4">
                        <div className="flex items-center">
                          <div className="h-4 w-4 rounded-full bg-primary/20 mr-2"></div>
                          <div className="h-2 bg-muted-foreground/20 rounded-full w-full"></div>
                        </div>
                        <div className="flex items-center">
                          <div className="h-4 w-4 rounded-full bg-primary/20 mr-2"></div>
                          <div className="h-2 bg-muted-foreground/20 rounded-full w-full"></div>
                        </div>
                        <div className="flex items-center">
                          <div className="h-4 w-4 rounded-full bg-primary/20 mr-2"></div>
                          <div className="h-2 bg-muted-foreground/20 rounded-full w-full"></div>
                        </div>
                      </div>
                      <div className="h-2 bg-primary/30 rounded-full w-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="analytics" id="analytics">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <Badge variant="outline" className="mb-4">
                  Feature Spotlight
                </Badge>
                <h2 className="text-3xl font-bold mb-4">Productivity Analytics</h2>
                <p className="text-muted-foreground mb-6">
                  Gain valuable insights into your study habits and productivity patterns with our comprehensive
                  analytics dashboard.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start">
                    <div className="mr-4 mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary/20">
                      <CheckCircle className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Productivity Patterns</h4>
                      <p className="text-muted-foreground">
                        Identify your most productive times of day and days of the week
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="mr-4 mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary/20">
                      <CheckCircle className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Subject Analysis</h4>
                      <p className="text-muted-foreground">
                        Track time spent on different subjects and identify areas that need more attention
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="mr-4 mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary/20">
                      <CheckCircle className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">AI Recommendations</h4>
                      <p className="text-muted-foreground">
                        Receive personalized suggestions to improve your study habits based on your data
                      </p>
                    </div>
                  </div>
                </div>

                <Link href="/how-it-works">
                  <Button className="gap-2">
                    See How It Works <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>

              <div className="order-1 md:order-2 bg-muted/30 rounded-xl p-8 aspect-square flex items-center justify-center">
                <div className="relative w-full max-w-[300px] aspect-square">
                  <div className="absolute inset-0 bg-primary/5 rounded-xl"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-card rounded-xl shadow-lg p-6 w-full max-w-[250px]">
                      <div className="flex justify-between items-center mb-6">
                        <div className="h-3 bg-muted-foreground/20 rounded-full w-20"></div>
                        <div className="h-3 bg-primary/40 rounded-full w-16"></div>
                      </div>
                      <div className="space-y-4">
                        <div className="h-24 bg-muted-foreground/10 rounded-lg flex items-center justify-center">
                          <div className="w-4/5 h-4/5">
                            <div className="h-full w-2/3 bg-primary/30 rounded-md"></div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="h-12 bg-muted-foreground/10 rounded-lg"></div>
                          <div className="h-12 bg-muted-foreground/10 rounded-lg"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Comparison Table */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <Badge className="mb-4">Plans</Badge>
            <h2 className="text-3xl font-bold mb-4">Choose the Right Plan for You</h2>
            <p className="text-muted-foreground max-w-[700px] mx-auto">
              Compare our plans to find the perfect fit for your academic needs
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left p-4 border-b"></th>
                  <th className="p-4 border-b">
                    <div className="font-medium">Free</div>
                    <div className="text-sm text-muted-foreground">Basic features</div>
                  </th>
                  <th className="p-4 border-b bg-primary/5">
                    <div className="font-medium">Premium</div>
                    <div className="text-sm text-muted-foreground">Full access</div>
                    <Badge className="mt-1">Popular</Badge>
                  </th>
                  <th className="p-4 border-b">
                    <div className="font-medium">Institutional</div>
                    <div className="text-sm text-muted-foreground">For schools</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-4 border-b font-medium">Task Input</td>
                  <td className="p-4 border-b text-center">Basic</td>
                  <td className="p-4 border-b text-center bg-primary/5">Advanced</td>
                  <td className="p-4 border-b text-center">Advanced</td>
                </tr>
                <tr>
                  <td className="p-4 border-b font-medium">AI Task Analysis</td>
                  <td className="p-4 border-b text-center">Limited</td>
                  <td className="p-4 border-b text-center bg-primary/5">Unlimited</td>
                  <td className="p-4 border-b text-center">Unlimited</td>
                </tr>
                <tr>
                  <td className="p-4 border-b font-medium">Pomodoro Sessions</td>
                  <td className="p-4 border-b text-center">5/day</td>
                  <td className="p-4 border-b text-center bg-primary/5">Unlimited</td>
                  <td className="p-4 border-b text-center">Unlimited</td>
                </tr>
                <tr>
                  <td className="p-4 border-b font-medium">Subtasks</td>
                  <td className="p-4 border-b text-center">3 per task</td>
                  <td className="p-4 border-b text-center bg-primary/5">Unlimited</td>
                  <td className="p-4 border-b text-center">Unlimited</td>
                </tr>
                <tr>
                  <td className="p-4 border-b font-medium">Analytics</td>
                  <td className="p-4 border-b text-center">Basic</td>
                  <td className="p-4 border-b text-center bg-primary/5">Advanced</td>
                  <td className="p-4 border-b text-center">Advanced + Admin</td>
                </tr>
                <tr>
                  <td className="p-4 border-b font-medium">Ad-Free Experience</td>
                  <td className="p-4 border-b text-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-muted-foreground mx-auto"
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </td>
                  <td className="p-4 border-b text-center bg-primary/5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary mx-auto"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </td>
                  <td className="p-4 border-b text-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary mx-auto"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </td>
                </tr>
                <tr>
                  <td className="p-4 border-b font-medium">Price</td>
                  <td className="p-4 border-b text-center">Free</td>
                  <td className="p-4 border-b text-center bg-primary/5">Rp 150.000/month</td>
                  <td className="p-4 border-b text-center">Custom</td>
                </tr>
                <tr>
                  <td className="p-4 border-b"></td>
                  <td className="p-4 border-b text-center">
                    <Button variant="outline" disabled>
                      Current Plan
                    </Button>
                  </td>
                  <td className="p-4 border-b text-center bg-primary/5">
                    <Link href="/dashboard/subscription">
                      <Button>Upgrade</Button>
                    </Link>
                  </td>
                  <td className="p-4 border-b text-center">
                    <Link href="/dashboard/subscription">
                      <Button variant="outline">Contact Sales</Button>
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <Badge className="mb-4">FAQ</Badge>
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground max-w-[700px] mx-auto">
              Find answers to common questions about TaskGenie
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-card rounded-xl p-6 border shadow-sm">
              <h3 className="text-xl font-medium mb-2">How does the AI analyze my tasks?</h3>
              <p className="text-muted-foreground">
                Our AI uses natural language processing to understand your task descriptions and requirements. It then
                applies academic knowledge and task management principles to break down assignments into logical
                subtasks with time estimates.
              </p>
            </div>

            <div className="bg-card rounded-xl p-6 border shadow-sm">
              <h3 className="text-xl font-medium mb-2">Can I use TaskGenie for group projects?</h3>
              <p className="text-muted-foreground">
                Yes! Premium users can create shared tasks and collaborate with team members. Each person can see their
                assigned subtasks and track overall project progress in real-time.
              </p>
            </div>

            <div className="bg-card rounded-xl p-6 border shadow-sm">
              <h3 className="text-xl font-medium mb-2">Is my data secure?</h3>
              <p className="text-muted-foreground">
                Absolutely. We use industry-standard encryption to protect your data, and we never share your personal
                information with third parties. Your academic work remains private and secure.
              </p>
            </div>

            <div className="bg-card rounded-xl p-6 border shadow-sm">
              <h3 className="text-xl font-medium mb-2">Can I switch between plans?</h3>
              <p className="text-muted-foreground">
                Yes, you can upgrade or downgrade your plan at any time. When upgrading, you'll immediately gain access
                to premium features. If you downgrade, you'll retain premium access until the end of your current
                billing period.
              </p>
            </div>

            <div className="bg-card rounded-xl p-6 border shadow-sm">
              <h3 className="text-xl font-medium mb-2">Does TaskGenie work on mobile devices?</h3>
              <p className="text-muted-foreground">
                Yes, TaskGenie is fully responsive and works on smartphones and tablets. We also offer dedicated mobile
                apps for iOS and Android for an optimized mobile experience.
              </p>
            </div>

            <div className="bg-card rounded-xl p-6 border shadow-sm">
              <h3 className="text-xl font-medium mb-2">Is there a student discount?</h3>
              <p className="text-muted-foreground">
                Yes! Students with a valid .edu email address can get 20% off any premium plan. Contact our support team
                after signing up to apply your student discount.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-primary/10 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Transform Your Academic Workflow?</h2>
          <p className="text-muted-foreground max-w-[700px] mx-auto mb-8">
            Join thousands of students who are using TaskGenie to manage their assignments more effectively and boost
            their productivity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <Button size="lg" className="gap-2">
                Get Started Now <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/how-it-works">
              <Button size="lg" variant="outline">
                How It Works
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <Brain className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">TaskGenie</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                AI-powered task management for students. Simplify your academic life.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-muted-foreground hover:text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-3">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-primary">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/learn-more#features" className="text-sm text-muted-foreground hover:text-primary">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/how-it-works" className="text-sm text-muted-foreground hover:text-primary">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/subscription" className="text-sm text-muted-foreground hover:text-primary">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-3">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                    Community
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                    Webinars
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-3">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} TaskGenie. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <select className="bg-transparent text-sm text-muted-foreground border rounded px-2 py-1">
                <option value="en">English</option>
                <option value="id">Bahasa Indonesia</option>
                <option value="es">Español</option>
              </select>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

