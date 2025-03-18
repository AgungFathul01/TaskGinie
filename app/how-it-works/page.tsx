import Link from "next/link"
import { ArrowLeft, ArrowRight, Brain, CheckCircle, Clock, FileText, LineChart, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function HowItWorksPage() {
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
            <Link href="/#how-it-works" className="text-sm font-medium hover:text-primary">
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
      <section className="container py-16 md:py-24">
        <div className="flex flex-col items-center text-center mb-16">
          <Link href="/" className="mb-8 flex items-center text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
          <Badge className="mb-4">Process</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">How TaskGenie Works</h1>
          <p className="text-xl text-muted-foreground max-w-[800px]">
            Discover how our AI-powered platform transforms the way students manage their academic workload
          </p>
        </div>

        {/* Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <div className="bg-muted/30 rounded-xl p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Zap className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Intelligent Analysis</h3>
            <p className="text-muted-foreground">
              Our AI analyzes your assignments and breaks them down into manageable subtasks
            </p>
          </div>

          <div className="bg-muted/30 rounded-xl p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Clock className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Focus & Productivity</h3>
            <p className="text-muted-foreground">
              Integrated Pomodoro timer and focus techniques help you maintain productivity
            </p>
          </div>

          <div className="bg-muted/30 rounded-xl p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <LineChart className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Data-Driven Insights</h3>
            <p className="text-muted-foreground">
              Track your progress and receive personalized recommendations to improve your study habits
            </p>
          </div>
        </div>

        {/* Detailed Process */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">The TaskGenie Process</h2>
            <p className="text-muted-foreground max-w-[700px] mx-auto">
              Our comprehensive approach to academic task management combines AI technology with proven productivity
              methods
            </p>
          </div>

          {/* Step 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24 items-center">
            <div className="order-2 md:order-1">
              <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
                Step 1
              </div>
              <h3 className="text-2xl font-bold mb-4">Task Input & Analysis</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="mr-4 mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary/20">
                    <CheckCircle className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Natural Language Input</h4>
                    <p className="text-muted-foreground">
                      Describe your assignment in your own words or upload assignment files directly
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-4 mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary/20">
                    <CheckCircle className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">AI Processing</h4>
                    <p className="text-muted-foreground">
                      Our AI analyzes your task, identifying key requirements, deadlines, and complexity
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-4 mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary/20">
                    <CheckCircle className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Task Breakdown</h4>
                    <p className="text-muted-foreground">
                      Your assignment is broken down into logical, manageable subtasks with time estimates
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 md:order-2 bg-muted/30 rounded-xl p-8 aspect-square flex items-center justify-center">
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

          {/* Step 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24 items-center">
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

            <div>
              <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
                Step 2
              </div>
              <h3 className="text-2xl font-bold mb-4">Planning & Scheduling</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="mr-4 mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary/20">
                    <CheckCircle className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Intelligent Scheduling</h4>
                    <p className="text-muted-foreground">
                      AI creates an optimal schedule based on your deadline, task complexity, and available time
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-4 mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary/20">
                    <CheckCircle className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Priority Management</h4>
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
                    <h4 className="font-medium">Calendar Integration</h4>
                    <p className="text-muted-foreground">
                      View all your tasks in a calendar format to manage your academic schedule effectively
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24 items-center">
            <div className="order-2 md:order-1">
              <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
                Step 3
              </div>
              <h3 className="text-2xl font-bold mb-4">Focused Work Sessions</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="mr-4 mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary/20">
                    <CheckCircle className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Pomodoro Technique</h4>
                    <p className="text-muted-foreground">
                      Use our integrated Pomodoro timer to work in focused intervals with scheduled breaks
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-4 mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary/20">
                    <CheckCircle className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Progress Tracking</h4>
                    <p className="text-muted-foreground">
                      Mark subtasks as complete and watch your progress bar fill up in real-time
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
                      Eliminate distractions with our dedicated focus mode that helps you concentrate on the current
                      task
                    </p>
                  </div>
                </div>
              </div>
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

          {/* Step 4 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="bg-muted/30 rounded-xl p-8 aspect-square flex items-center justify-center">
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

            <div>
              <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
                Step 4
              </div>
              <h3 className="text-2xl font-bold mb-4">Analysis & Improvement</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="mr-4 mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary/20">
                    <CheckCircle className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Productivity Analytics</h4>
                    <p className="text-muted-foreground">
                      Review detailed analytics about your work patterns, focus time, and task completion rates
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
                      Receive personalized suggestions to improve your study habits based on your performance data
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-4 mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary/20">
                    <CheckCircle className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Continuous Learning</h4>
                    <p className="text-muted-foreground">
                      Our AI learns from your habits and preferences to provide increasingly accurate estimates and
                      suggestions
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">What Students Say</h2>
            <p className="text-muted-foreground max-w-[700px] mx-auto">
              Hear from students who have transformed their academic workflow with TaskGenie
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card rounded-xl p-8 border shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 mr-4"></div>
                <div>
                  <h4 className="font-medium">Agung Fathul Muhtadin</h4>
                  <p className="text-sm text-muted-foreground">Computer Science Major</p>
                </div>
              </div>
              <p className="text-muted-foreground mb-4">
                "TaskGenie has completely changed how I manage my programming assignments. The AI breakdown of complex
                coding tasks has saved me countless hours of planning."
              </p>
              <div className="flex text-amber-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
              </div>
            </div>

            <div className="bg-card rounded-xl p-8 border shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 mr-4"></div>
                <div>
                  <h4 className="font-medium">M Salam Pararta</h4>
                  <p className="text-sm text-muted-foreground">Computer Science Major</p>
                </div>
              </div>
              <p className="text-muted-foreground mb-4">
                "The Pomodoro timer integration has been a game-changer for my study habits. I'm more focused during
                study sessions and the analytics help me understand when I'm most productive."
              </p>
              <div className="flex text-amber-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
              </div>
            </div>

            <div className="bg-card rounded-xl p-8 border shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 mr-4"></div>
                <div>
                  <h4 className="font-medium">Hafiz rizki</h4>
                  <p className="text-sm text-muted-foreground">Computer Science</p>
                </div>
              </div>
              <p className="text-muted-foreground mb-4">
                "I was skeptical about AI helping with literature essays, but TaskGenie surprised me. It breaks down
                research and writing into manageable chunks that make even the longest papers feel doable."
              </p>
              <div className="flex text-amber-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
              </div>
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
            <Link href="/learn-more">
              <Button size="lg" variant="outline">
                Learn More
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

