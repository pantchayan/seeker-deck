let jobObjArr = [];

let myStorage = window.localStorage;

let jobId = 0;
let activityId = 0;
let contactId = 0;
let colorId = 0;



if (myStorage.getItem("seekerKeys") != null) {
  let keys = JSON.parse(myStorage.getItem("seekerKeys"));
  jobId = keys.jobId;
  activityId = keys.activityId;
  contactId = keys.contactId;
  colorId = keys.colorId;
} else {
}

// DATABASE AND SCHEMA => opens the database
const db = new Dexie("seekerDB");
db.version(1).stores({
  jobs: "id, title, company, timestamp, color, category, activitesId",
  activities: "id, tag, title, description, state, jobsId",
  contacts: "id, name, company, link",
  jobsDetails:
    "id, deadline, url, salary, location, description, contactsId, activitesId",
});

// // UPDATE/ADD DATA
// (async () => {
//   const result = await db.jobs.bulkPut(jobObjArr);
//   console.log(result);
// })();
// // RETRIEVE DATA
// (async () => {
//   let newJobsData = await db.jobs.toArray();
//   console.table(newJobsData);
// })();

// // DELETE DATA
// (async () => {
//   let newJobsData = await db.jobs.delete(id);
//   console.table(newJobsData);
// })();
