import { jobTypes } from "@/lib/job-types";
import prisma from "@/lib/prisma";
import { JobFilterSchema, JobFilterValues } from "@/lib/validation";
import { redirect } from "next/navigation";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import Select from "./ui/select";
import FormSubmitButton from "./FormSubmitButton";

interface JobFilterValuesProps{
    defaultValues:JobFilterValues,

}
async function filterJobs(formData:FormData) {
"use server"
const values = Object.fromEntries(formData.entries());
const {query,type,remote,location} = JobFilterSchema.parse(values);

const searchParams = new URLSearchParams({
    ...(query && {query:query.trim()}),
    ...(type && {type}),
    ...(location &&{location}),
    ...(remote && {remote:"true"})
})

    redirect(`/?${searchParams.toString()}`)
}

export default async  function JobFilterSideBar({defaultValues}:JobFilterValuesProps) {

    const distinctLocation = (await prisma.job.findMany({
        where:{approved:true},
        select:{location:true},
        distinct:["location"]
    }).then(locations => 
        locations.map(({location})=>location).filter(Boolean)
    )) as string[] 

    return <aside className="md:w-[260px] p-4 sticky top-0 h-fit bg-background border rounded-lg">
        <form action={filterJobs}>
            <div className="space-y-4">
                <div className="flex flex-col gap-2">
                <Label htmlFor="query">
                    Search
                </Label>
                <Input id="query" name="query" placeholder="Title,company,etc."
                defaultValue={defaultValues.query}
                >
                </Input>
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="type">Type</Label>
                    <Select id="type" name="type" defaultValue={defaultValues.type || ""}>
                    <option  value="">
                    All Types
                    </option>
                    {jobTypes.map((type)=>(
                        <option key={type} value={type}>
                            {type}
                        </option>
                    ))}
                    </Select>

                </div>
                <div className="flex flex-col gap-2">
                    <Label  htmlFor="location">
                        Location
                    </Label>
                    <Select id="location" name="location" defaultValue={defaultValues.location || ""}>
                    <option  value="">
                    All locations
                    </option>
                    {distinctLocation.map((location)=>(
                        <option key={location} value={location}>
                            {location}
                        </option>
                    ))}
                    </Select>
                </div>
                <div className="flex items-center gap-2">
                    <input 
                    id="remote"
                    name="remote"
                    type="checkbox"
                    className="scale-125 accent-black" defaultChecked={defaultValues.remote} />
                    <Label htmlFor="remote">
                        Remote jobs
                    </Label>
                </div>
                <FormSubmitButton className="w-full ">
                    Filter jobs
                </FormSubmitButton>
                
                </div>        
        </form>
    </aside>
    
}