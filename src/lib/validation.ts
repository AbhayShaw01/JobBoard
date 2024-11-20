
import {z} from "zod";
import { jobTypes } from "./job-types";
// const requiredString = z.string().min(1,"Required");


// export const createJobSchema = z.object({
//     title:requiredString.max(100),
//     type:requiredString.refine(
//         value => jobTypes.includes(value),
//         "Invalid job type"
//     ),
//     companyName:requiredString.max(100),
//     companyLogo:

// })
export const JobFilterSchema = z.object({
    query:z.string().optional(),
    type:z.string().optional(),
    location:z.string().optional(),
    remote:z.coerce.boolean().optional(),
})

export type JobFilterValues = z.infer<typeof JobFilterSchema>