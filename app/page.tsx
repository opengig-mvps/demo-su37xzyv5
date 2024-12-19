'use client' ;
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, DollarSign, Star } from "lucide-react";
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-pink-100">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl xl:text-7xl text-pink-600">
                    Support My Cause with a Donation
                  </h1>
                  <p className="max-w-[600px] text-pink-800 md:text-xl">
                    Your generous donations help me continue my work and make a difference. Every dollar counts!
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button className="inline-flex h-12 items-center justify-center rounded-md bg-pink-600 px-8 text-lg font-medium text-white shadow transition-colors hover:bg-pink-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500">
                    Donate Now
                  </Button>
                  <Button className="inline-flex h-12 items-center justify-center rounded-md border border-pink-600 bg-transparent px-8 text-lg font-medium text-pink-600 shadow-sm transition-colors hover:bg-pink-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500">
                    Learn More
                  </Button>
                </div>
              </div>
              <img
                src="https://placehold.co/600x400.png"
                width="550"
                height="550"
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-bottom sm:w-full lg:order-last lg:aspect-square"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-pink-200">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-pink-600">
                  Why Donate?
                </h2>
                <p className="max-w-[900px] text-pink-800 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Your donations help support my mission and ensure that I can continue to impact lives positively.
                </p>
              </div>
              <div className="mx-auto grid max-w-5xl items-center gap-6 pt-12 lg:grid-cols-3 lg:gap-12">
                <Card className="flex flex-col items-center justify-center space-y-4 p-6 bg-white shadow-md rounded-md">
                  <Heart className="h-12 w-12 text-pink-600" />
                  <div className="space-y-1 text-center">
                    <h3 className="text-lg font-bold">Make a Difference</h3>
                    <p className="text-pink-800">
                      Your donations go a long way in helping others and making a significant impact.
                    </p>
                  </div>
                </Card>
                <Card className="flex flex-col items-center justify-center space-y-4 p-6 bg-white shadow-md rounded-md">
                  <DollarSign className="h-12 w-12 text-pink-600" />
                  <div className="space-y-1 text-center">
                    <h3 className="text-lg font-bold">Support the Cause</h3>
                    <p className="text-pink-800">
                      Every contribution helps me achieve my goals and continue my work.
                    </p>
                  </div>
                </Card>
                <Card className="flex flex-col items-center justify-center space-y-4 p-6 bg-white shadow-md rounded-md">
                  <Star className="h-12 w-12 text-pink-600" />
                  <div className="space-y-1 text-center">
                    <h3 className="text-lg font-bold">Be a Hero</h3>
                    <p className="text-pink-800">
                      Your support makes you a hero in the eyes of those who benefit from my work.
                    </p>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-pink-600">
                  Testimonials
                </h2>
                <p className="max-w-[900px] text-pink-800 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Hear from those who have been positively impacted by your generosity.
                </p>
              </div>
              <div className="grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 pt-12">
                <Card className="flex flex-col items-start space-y-4 p-6 bg-white shadow-md rounded-md">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="https://placehold.co/600x400.png" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none">John Doe</p>
                      <p className="text-xs text-pink-800">Beneficiary</p>
                    </div>
                  </div>
                  <p className="text-pink-800">
                    "Your donations have made a world of difference in my life. Thank you for your support!"
                  </p>
                </Card>
                <Card className="flex flex-col items-start space-y-4 p-6 bg-white shadow-md rounded-md">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="https://placehold.co/600x400.png" />
                      <AvatarFallback>SM</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none">Sarah Miller</p>
                      <p className="text-xs text-pink-800">Supporter</p>
                    </div>
                  </div>
                  <p className="text-pink-800">
                    "I'm so glad I could help. It's amazing to see the impact my donation has made."
                  </p>
                </Card>
                <Card className="flex flex-col items-start space-y-4 p-6 bg-white shadow-md rounded-md">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="https://placehold.co/600x400.png" />
                      <AvatarFallback>MJ</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none">Michael Johnson</p>
                      <p className="text-xs text-pink-800">Beneficiary</p>
                    </div>
                  </div>
                  <p className="text-pink-800">
                    "Thank you for your generous support. It has truly made a positive impact in my life."
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-pink-300 p-6 md:py-12 w-full">
        <div className="container max-w-7xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 text-sm text-pink-800">
          <div className="grid gap-1">
            <h3 className="font-semibold">About</h3>
            <a href="#">Our Mission</a>
            <a href="#">Team</a>
            <a href="#">Careers</a>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Support</h3>
            <a href="#">Help Center</a>
            <a href="#">Contact Us</a>
            <a href="#">FAQs</a>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Legal</h3>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Social</h3>
            <a href="#">Facebook</a>
            <a href="#">Twitter</a>
            <a href="#">Instagram</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;