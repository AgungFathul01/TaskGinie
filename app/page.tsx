import Link from "next/link"
import { ArrowRight, Brain, CheckCircle, Clock, LineChart, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function LandingPage() {
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
            <Link href="#features" className="text-sm font-medium hover:text-primary">
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
      <section className="container flex flex-col items-center justify-center gap-4 py-24 md:py-32 text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Smart Task Management <br className="hidden sm:inline" />
          <span className="text-primary">Powered by AI</span>
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground md:text-xl">
          TaskGenie helps students manage academic workloads with AI-powered task analysis, time estimation, and
          productivity tracking.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <Link href="/dashboard">
            <Button size="lg" className="gap-2">
              Try TaskGenie <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/learn-more">
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section - Redesigned to be more modern */}
      <section id="features" className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background to-muted/50 pointer-events-none"></div>
        <div className="container relative z-10">
          <div className="text-center mb-16">
            <Badge className="mb-4" variant="outline">
              Features
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Supercharge Your Academic Productivity</h2>
            <p className="text-muted-foreground max-w-[800px] mx-auto">
              TaskGenie combines AI-powered analysis with proven productivity techniques to help you manage your
              academic workload more effectively.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group bg-card rounded-xl p-6 shadow-sm border border-border/50 hover:border-primary/20 hover:shadow-md transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 group-hover:bg-primary/10 transition-all duration-500"></div>
              <div className="mb-4 rounded-full w-12 h-12 flex items-center justify-center bg-primary/10 group-hover:bg-primary/20 transition-all duration-300">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                AI-Powered Task Analysis
              </h3>
              <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                Our AI analyzes your tasks, estimates completion time, and breaks them down into manageable subtasks.
              </p>
              <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Link href="/learn-more#ai-analysis" className="text-primary text-sm font-medium flex items-center">
                  Learn more <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group bg-card rounded-xl p-6 shadow-sm border border-border/50 hover:border-primary/20 hover:shadow-md transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 group-hover:bg-primary/10 transition-all duration-500"></div>
              <div className="mb-4 rounded-full w-12 h-12 flex items-center justify-center bg-primary/10 group-hover:bg-primary/20 transition-all duration-300">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                Pomodoro Timer Integration
              </h3>
              <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                Stay focused with customizable work/break intervals and track time spent on each task.
              </p>
              <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Link href="/learn-more#pomodoro" className="text-primary text-sm font-medium flex items-center">
                  Learn more <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group bg-card rounded-xl p-6 shadow-sm border border-border/50 hover:border-primary/20 hover:shadow-md transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 group-hover:bg-primary/10 transition-all duration-500"></div>
              <div className="mb-4 rounded-full w-12 h-12 flex items-center justify-center bg-primary/10 group-hover:bg-primary/20 transition-all duration-300">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                Progress Tracking
              </h3>
              <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                Visual progress indicators and automatic subtask tracking help you stay on top of your work.
              </p>
              <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Link href="/learn-more#progress" className="text-primary text-sm font-medium flex items-center">
                  Learn more <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="group bg-card rounded-xl p-6 shadow-sm border border-border/50 hover:border-primary/20 hover:shadow-md transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 group-hover:bg-primary/10 transition-all duration-500"></div>
              <div className="mb-4 rounded-full w-12 h-12 flex items-center justify-center bg-primary/10 group-hover:bg-primary/20 transition-all duration-300">
                <LineChart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                Productivity Analytics
              </h3>
              <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                Track study habits, identify productive times, and analyze subject-specific performance.
              </p>
              <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Link href="/learn-more#analytics" className="text-primary text-sm font-medium flex items-center">
                  Learn more <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </div>

            {/* Feature 5 */}
            <div className="group bg-card rounded-xl p-6 shadow-sm border border-border/50 hover:border-primary/20 hover:shadow-md transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 group-hover:bg-primary/10 transition-all duration-500"></div>
              <div className="mb-4 rounded-full w-12 h-12 flex items-center justify-center bg-primary/10 group-hover:bg-primary/20 transition-all duration-300">
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
                  className="h-6 w-6 text-primary"
                >
                  <path d="M14 4h6v6h-6z"></path>
                  <path d="M4 14h6v6H4z"></path>
                  <path d="M17 17v-3a4 4 0 0 0-4-4H9"></path>
                  <path d="M7 7V4"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                Smart Task Organization
              </h3>
              <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                Prioritize tasks based on due dates and difficulty, with visual indicators for high-priority items.
              </p>
              <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Link href="/learn-more#organization" className="text-primary text-sm font-medium flex items-center">
                  Learn more <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </div>

            {/* Feature 6 */}
            <div className="group bg-card rounded-xl p-6 shadow-sm border border-border/50 hover:border-primary/20 hover:shadow-md transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 group-hover:bg-primary/10 transition-all duration-500"></div>
              <div className="mb-4 rounded-full w-12 h-12 flex items-center justify-center bg-primary/10 group-hover:bg-primary/20 transition-all duration-300">
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
                  className="h-6 w-6 text-primary"
                >
                  <path d="M12 20h9"></path>
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                Natural Language Input
              </h3>
              <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                Add tasks through natural language chat with our AI or upload assignment files directly.
              </p>
              <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Link
                  href="/learn-more#natural-language"
                  className="text-primary text-sm font-medium flex items-center"
                >
                  Learn more <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section - Redesigned to be more modern */}
      <section id="how-it-works" className="py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <Badge className="mb-4" variant="outline">
              Process
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How TaskGenie Works</h2>
            <p className="text-muted-foreground max-w-[800px] mx-auto">
              Our streamlined process helps you manage your academic tasks from start to finish with AI assistance at
              every step.
            </p>
          </div>

          <div className="relative">
            {/* Connection line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-primary/20 hidden md:block"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
              {/* Step 1 */}
              <div className="md:text-right md:pr-16 relative">
                <div className="hidden md:block absolute right-0 top-0 w-8 h-8 rounded-full bg-primary/20 -mr-4 transform translate-x-1/2">
                  <div className="absolute inset-1 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                    1
                  </div>
                </div>
                <div className="md:hidden mb-4 rounded-full w-12 h-12 flex items-center justify-center bg-primary text-primary-foreground font-bold text-lg">
                  1
                </div>
                <h3 className="text-xl font-bold mb-2">Add Tasks</h3>
                <p className="text-muted-foreground">
                  Enter assignments through natural language chat or upload files directly. Our AI understands your
                  requirements and helps organize them.
                </p>
              </div>

              <div className="md:hidden"></div>

              <div className="md:hidden"></div>

              {/* Step 2 */}
              <div className="md:text-left md:pl-16 relative">
                <div className="hidden md:block absolute left-0 top-0 w-8 h-8 rounded-full bg-primary/20 -ml-4 transform -translate-x-1/2">
                  <div className="absolute inset-1 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                    2
                  </div>
                </div>
                <div className="md:hidden mb-4 rounded-full w-12 h-12 flex items-center justify-center bg-primary text-primary-foreground font-bold text-lg">
                  2
                </div>
                <h3 className="text-xl font-bold mb-2">AI Analysis</h3>
                <p className="text-muted-foreground">
                  Our system analyzes tasks, estimates completion time, and creates a structured breakdown with
                  intelligent subtasks and scheduling.
                </p>
              </div>

              {/* Step 3 */}
              <div className="md:text-right md:pr-16 relative">
                <div className="hidden md:block absolute right-0 top-0 w-8 h-8 rounded-full bg-primary/20 -mr-4 transform translate-x-1/2">
                  <div className="absolute inset-1 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                    3
                  </div>
                </div>
                <div className="md:hidden mb-4 rounded-full w-12 h-12 flex items-center justify-center bg-primary text-primary-foreground font-bold text-lg">
                  3
                </div>
                <h3 className="text-xl font-bold mb-2">Work & Track</h3>
                <p className="text-muted-foreground">
                  Use the Pomodoro timer to maintain focus while working, with automatic progress tracking and visual
                  indicators of your accomplishments.
                </p>
              </div>

              <div className="md:hidden"></div>

              <div className="md:hidden"></div>

              {/* Step 4 */}
              <div className="md:text-left md:pl-16 relative">
                <div className="hidden md:block absolute left-0 top-0 w-8 h-8 rounded-full bg-primary/20 -ml-4 transform -translate-x-1/2">
                  <div className="absolute inset-1 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                    4
                  </div>
                </div>
                <div className="md:hidden mb-4 rounded-full w-12 h-12 flex items-center justify-center bg-primary text-primary-foreground font-bold text-lg">
                  4
                </div>
                <h3 className="text-xl font-bold mb-2">Review & Improve</h3>
                <p className="text-muted-foreground">
                  Analyze productivity patterns and study habits to continuously improve your academic workflow with
                  personalized insights.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <Link href="/how-it-works">
              <Button variant="outline" size="lg" className="gap-2">
                See Detailed Process <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
       {/* CTA */}
        <div className="p-8 md:p-12 text-center">
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

