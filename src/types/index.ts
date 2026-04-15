export type JobStatus = "Watching" | "Applied" | 'Interviewing' | "Rejected";
export type ConnestionType = "Alumni" | "Personal" | "Cold" | "None"; 

export interface Company {
    id?:string;
    created_at?: string; 
    name:string;
    url:string;
    location:string;
    status:JobStatus;
    connection:ConnestionType;
    lastChecked:number;
    last_noted_activity:number;
    last_applied:number;
}