import { CheckCircle, Github } from "lucide-react";
import React from "react";

export default function About() {
    return (
        <div className="flex flex-col justify-start items-center p-4 px-8 lg:pr-0 gap-2 max-h-[calc(100dvh-105px)] overflow-y-auto">
            <h2 className="font-bold flex justify-center items-center gap-2 mb-3">
                <CheckCircle className="text-primary text-4xl" />
                <span className="text-lg">qTask</span>
            </h2>
            <div className="text-base">
                qTask is a simple todo list app built with Next.js, TailwindCSS
                and{" "}
                <a
                    target="_blank"
                    href="https://ui.shadcn.com/"
                    className="text-primary"
                >
                    shadcn/ui
                </a>
                .
            </div>
            <div className="text-base flex justify-center items-center gap-2 mt-5">
                <p>The source code can be found on</p>
                <a target="_blank" href="https://github.com/mhs003/qtask">
                    <Github
                        size={35}
                        className="border border-border/60 rounded-lg p-2"
                    />
                </a>
            </div>
        </div>
    );
}
