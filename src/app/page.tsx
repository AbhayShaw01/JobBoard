import JobFilterSideBar from "@/components/JobFilterSideBar";
import JobResults from "@/components/JobResults";
import H1 from "@/components/ui/h1";
import { JobFilterValues } from "@/lib/validation";


interface PageProps{
  searchParams:{
    query?:string,
    type?:string,
    location?:string,
    remote?:string,
  }
}

export  default async function Home({searchParams:{query,type,remote,location}}:PageProps) {
  const filterValues:JobFilterValues={
    query,
    type,
    remote:remote === "true",
    location
  }
  return (
    <main className="max-w-5xl m-auto px-3 my-10 space-y-10">
      <div className="space-y-5 text-center">
        <H1>
          Developers Job
        </H1>
        <p className="text-muted-foreground">
          Find your dream job
        </p>
      </div>
      <section className="flex flex-col md:flex-row gap-4">
        <JobFilterSideBar defaultValues={filterValues}/>
        <JobResults filterValues={filterValues} />
      </section>
    </main>
  );
}
