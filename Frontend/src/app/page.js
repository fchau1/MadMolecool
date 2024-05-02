
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Page() {
    return (
        <div className="flex flex-col min-h-[100vh]">
            <main className="flex-1">
                <section className="w-full pt-12 md:pt-24 lg:pt-32 border-y">
                    <div className="container space-y-10 px-4 sm:px-6 md:space-y-16 md:px-10">
                        <div className="flex flex-col items-center space-y-4 text-center">
                            <div className="space-y-2">
                                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                                    All-in-One Solution
                                </div>
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-green-700">Mad Molecool</h2>
                                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed dark:text-gray-400">
                                    Empower your molecular research with our comprehensive notebook solution. Designed for molecular biologists,
                                    our platform offers advanced features tailored to streamline your workflow and enhance productivity.
                                </p>
                            </div>
                        </div>
                        <div className="mx-auto grid max-w-5xl items-start gap-6 sm:grid-cols-2 md:gap-12 lg:max-w-none lg:grid-cols-3">
                            <div className="mx-auto flex w-full items-center justify-center p-4 sm:p-8">
                                <img
                                    alt="Lab Notebook"
                                    className="aspect-video overflow-hidden rounded-xl object-cover object-center"
                                    height="500"
                                    src="front.png"
                                    width="550"
                                />
                            </div>
                            <div className="mx-auto flex w-full items-center justify-center p-4 sm:p-8">
                                <img
                                    alt="GPT-2-Medium LLM"
                                    className="aspect-video overflow-hidden rounded-xl object-cover object-center"
                                    height="400"
                                    src="back.png"
                                    width="550"
                                />
                            </div>
                            <div className="mx-auto flex w-full items-center justify-center p-4 sm:p-8">
                                <img
                                    alt="Chemical Information"
                                    className="aspect-video overflow-hidden rounded-xl object-cover object-center"
                                    height="400"
                                    src="auth.png"
                                    width="550"
                                />
                            </div>
                        </div>
                    </div>
                </section>
                <section className="w-full py-12 md:py-24 lg:py-32">
                    <div className="container space-y-12 px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">Features</div>
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Elevate Your Molecular Research</h2>
                                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                                    Our platform simplifies the complexities of molecular research, enabling you to focus on what matters
                                    most: advancing scientific discovery.
                                </p>
                            </div>
                        </div>
                        <div className="mx-auto grid items-start gap-6 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
                            <FeatureCard title="Advanced Lab Notebook" description="Record your experimental protocols, observations, and results with ease using our advanced lab notebook, formatted with the latest Laboratory Electronic Software (LIM)." />
                            <FeatureCard title="Intelligent Assistance" description="Interact with a finely-tuned GPT-2-Medium LLM, trained with the BioASQ and PubmedQA datasets, providing intelligent assistance in literature review, data analysis, and hypothesis generation." />
                            <FeatureCard title="Chemical Information Retrieval" description="Query for the most up-to-date information on different chemicals, accompanied by aiding images, to enhance your understanding and decision-making process." />
                        </div>
                    </div>
                </section>
                <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
                    <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
                        <div className="space-y-2">
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                                Revolutionize Your Molecular Research Today
                            </h2>
                            <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                                Sign up to stay informed about our latest updates and enhancements.
                            </p>
                        </div>
                        <div className="mx-auto w-full max-w-sm space-y-2">
                            <form className="flex space-x-2">
                                <Input className="max-w-lg flex-1" placeholder="Enter your email" type="email" />
                                <Button type="submit">Sign Up</Button>
                            </form>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                Sign up to get notified when we launch.
                                <Link className="underline underline-offset-2" href="#">
                                    Terms & Conditions
                                </Link>
                            </p>
                        </div>
                    </div>
                </section>
            </main>
            <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
                <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 Mad Molecool Notebooks. All rights reserved.</p>
                <nav className="sm:ml-auto flex gap-4 sm:gap-6">
                    <Link className="text-xs hover:underline underline-offset-4" href="#">
                        Terms of Service
                    </Link>
                    <Link className="text-xs hover:underline underline-offset-4" href="#">
                        Privacy
                    </Link>
                </nav>
            </footer>
        </div>
    );
}
function MountainIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
        </svg>
    )
}

function FeatureCard({ title, description }) {
    return (
        <div className="grid gap-1">
            <h3 className="text-lg font-bold">{title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
        </div>
    );
}