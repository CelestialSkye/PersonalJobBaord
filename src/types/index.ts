export type JobStatus = "Watching" | "Applied" | 'Interviewing' | "Rejected";
export type ConnestionType = "Alumni" | "Personal" | "Cold" | "None"; 

export interface Company {
    id:string;
    name:string;
    url:string;
    location:string;
    status:JobStatus;
    connection:ConnestionType;
    lastChecked:number;
}