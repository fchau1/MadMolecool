

import "./Book.css";
import {cn, getRandomColor} from "@/lib/utils";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card";


export default function Book({name, summary, className}){

    return (
        <HoverCard>
            <HoverCardTrigger>
                <div className={cn(`book bg-gray-400 font-semibold w-64 h-80 rounded-r-lg border-l-dotted border-8 border-white flex justify-center items-center`, className)}>
                    <div className="text-white text-center">
                        <h1 className="text-2xl">{name}</h1>
                    </div>
                    <HoverCardContent>
                        <span className={"text-sm"}>
                            {summary}
                        </span>
                    </HoverCardContent>
                </div>
            </HoverCardTrigger>
        </HoverCard>
    );
}
