import companyLogoPlaceholder from "@/assets/company-logo-placeholder.png";
import { formatMoney, relativeDate } from "@/lib/utils";
import { Job } from "@prisma/client";
import { BanknoteIcon, Briefcase, Clock, Globe2, MapPin } from "lucide-react";
import Image from "next/image";
import Badge from "./Badge";

interface JobListItemProps{
    job:Job,
}
export default function JobListItem({job:{title,type,location,locationType,salary,companyName,companyLogoUrl,createdAt}}:JobListItemProps){
    return (
        <article className="flex gap-3 border rounded-lg p-5 hover:bg-muted/60">
           <Image src={companyLogoUrl || companyLogoPlaceholder} alt={`${companyName} logo`} width={100} height={100} className="rounded-lg self-center" />
        <div className="flex-grow space-y-3">
            <div>
                <h2 className="text-xl font-medium ">
                    {title}
                </h2>
                <p className="text-muted-foreground">{companyName}</p>
            </div>
            <div className="text-muted-foreground ">
                <p className="flex items-center gap-1.5 sm:hidden">
                    <Briefcase size={16} className="shrink-0"/>
                    {type}
                </p>
                <p className="flex items-center gap-1.5">
                    <MapPin size={16} className="shrink-0"/>
                    {locationType}
                </p>
                <p className="flex items-center gap-1.5 ">
                    <Globe2 size={16} className="shrink-0"/>
                    {location || "Worldwide"}
                </p>
                <p className="flex items-center gap-1.5 ">
                    <BanknoteIcon size={16} className="shrink-0"/>
                    {formatMoney(salary)}
                </p>
                <p className="flex items-center gap-1.5 sm:hidden ">
                    <Clock size={16} className="shrink-0"/>
                    {relativeDate(createdAt)}
                </p>

            </div>
        </div>
        <div className="hidden sm:flex flex-col shrink-0 items-end justify-between">
            <Badge>{type}</Badge>
            <span className="flex items-center text-muted-foreground gap-1.5">
                <Clock size={16}/>
                {relativeDate(createdAt)}
            </span>
        </div>
        </article>

    )
}