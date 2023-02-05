export const fieldsForObjectType: object = {
    jobs: ["name", "departments", "status", "offices", "hiring_managers","recruiters","job_posting_urls","createdAt"],
    candidates: ["first_name","last_name","company","title","email_addresses","applications","createdAt"],
    applications: ["job","current_stage","applied_at","rejected_at","source","candidate","credited_to","createdAt"],
    jobStages: ["name","job","createdAt"],
    offices: ["name","location","createdAt"],
    offers: ["application","creator","status","closed_at","sent_at"],
    interviews: ["job_interview_stage","application","organizer","interviewers","location","start_at","end_at","status"],
    greetrAssessments: ["application","greetrstage","greetrSubstage","description"],
    atsUsers: ["first_name","last_name","email","remote_created_at","access_role"],
    departments: ["name","createdAt"],
};
