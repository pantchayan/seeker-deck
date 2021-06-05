const closeBtn = document.querySelector(".top-bar-btns .close");
const detailsNavArr = document.querySelectorAll(".details-nav>div");
const midContainerArr = document.querySelectorAll(".mid-container>div");

const infoSaveBtn = document.querySelector(".info-container .save-btn");
const activitySaveBtn = document.querySelector(
  ".activities-container .save-btn"
);
const noteSaveBtn = document.querySelector(".notes-container .save-btn");
const contactSaveBtn = document.querySelector(
  ".contacts-container .create-btn"
);

closeBtn.addEventListener("click", () => hideJobDetails());

for (let i = 0; i < detailsNavArr.length; i++) {
  detailsNavArr[i].addEventListener("click", async () => {
    for (let k = 0; k < detailsNavArr.length; k++) {
      detailsNavArr[k].classList.remove("active-div");
      midContainerArr[k].classList.add("hide");
    }
    detailsNavArr[i].classList.add("active-div");

    const jobIdDiv = document.querySelector(
      ".main-description-container .job-id"
    );
    let id = jobIdDiv.attributes[1].value;

    if (midContainerArr[i].classList.contains("info-container")) {
      await renderJobDetails(id);
    } else if (midContainerArr[i].classList.contains("activities-container")) {
      await renderActivities(id);
    } else if (midContainerArr[i].classList.contains("notes-container")) {
      await renderNotes(id);
    } else if (midContainerArr[i].classList.contains("contacts-container")) {
      await renderContacts(id);
    }

    midContainerArr[i].classList.remove("hide");
  });
}

infoSaveBtn.addEventListener("click", async () => {
  let activityObjArr = [];
  let activityIdArr = [];
  const jobIdDiv = document.querySelector(
    ".main-description-container .job-id"
  );
  let id = jobIdDiv.attributes[1].value;

  let jobData = await getJobData(Number(id));
  let jobDetailsData = await getJobDetailsData(Number(id));

  // JOB DATA UPDATE
  const companyInput = document.querySelector("#company-detail");
  const titleInput = document.querySelector("#title-detail");
  const categoryInput = document.querySelector("#category-detail");

  let activityObject;
  if (companyInput.value != "" && companyInput.value != jobData.company) {
    activityObject = {
      id: activityId,
      tag: "Company changed",
      title: `Job company changed to ${companyInput.value}`,
      description: "",
      state: "complete",
      timestamp: Date.now(),
      jobsID: [Number(id)],
    };

    activityObjArr.push(activityObject);
    activityIdArr.push(activityId);
    // activity id increment
    activityId++;
    // DOM
    jobData.company = companyInput.value;
  }
  if (titleInput.value != "" && titleInput.value != jobData.title) {
    activityObject = {
      id: activityId,
      tag: "Role changed",
      title: `Job role changed to ${titleInput.value}`,
      description: "",
      state: "complete",
      timestamp: Date.now(),
      jobsID: [Number(id)],
    };

    activityObjArr.push(activityObject);
    activityIdArr.push(activityId);
    // activity id increment
    activityId++;
    jobData.title = titleInput.value;
  }
  if (categoryInput.value != "" && categoryInput.value != jobData.category) {
    activityObject = {
      id: activityId,
      tag: "Category changed",
      title: `Job category changed to ${categoryInput.value}`,
      description: "",
      state: "complete",
      timestamp: Date.now(),
      jobsID: [Number(id)],
    };

    activityObjArr.push(activityObject);
    activityIdArr.push(activityId);
    // activity id increment
    activityId++;
    jobData.category = categoryInput.value;
  }

  // JOB DETAILS DATA UPDATE
  const urlInput = document.querySelector("#url-input");
  const salaryInput = document.querySelector("#salary-input");
  const deadlineInput = document.querySelector("#deadline-input");
  const descriptionInput = document.querySelector("#description-input");
  const locationInput = document.querySelector("#location-input");

  if (urlInput.value != "" && urlInput.value != jobDetailsData.url) {
    activityObject = {
      id: activityId,
      tag: "URL added",
      title: `Post URL added`,
      description: "",
      state: "complete",
      timestamp: Date.now(),
      jobsID: [Number(id)],
    };

    activityObjArr.push(activityObject);
    activityIdArr.push(activityId);
    // activity id increment
    activityId++;
    jobDetailsData.url = urlInput.value;
  }
  if (salaryInput.value != "" && salaryInput.value != jobDetailsData.salary) {
    activityObject = {
      id: activityId,
      tag: "Salary added",
      title: `Salary was added`,
      description: "",
      state: "complete",
      timestamp: Date.now(),
      jobsID: [Number(id)],
    };

    activityObjArr.push(activityObject);
    activityIdArr.push(activityId);
    // activity id increment
    activityId++;
    jobDetailsData.salary = salaryInput.value;
  }
  if (
    deadlineInput.value != "" &&
    deadlineInput.value != jobDetailsData.deadline
  ) {
    activityObject = {
      id: activityId,
      tag: "Deadline added",
      title: `Deadline was added`,
      description: "",
      state: "complete",
      timestamp: Date.now(),
      jobsID: [Number(id)],
    };

    activityObjArr.push(activityObject);
    activityIdArr.push(activityId);
    // activity id increment
    activityId++;
    jobDetailsData.deadline = deadlineInput.value;
  }

  if (
    descriptionInput.value != "" &&
    descriptionInput.value != jobDetailsData.description
  ) {
    activityObject = {
      id: activityId,
      tag: "Description added",
      title: `Description was added`,
      description: "",
      state: "complete",
      timestamp: Date.now(),
      jobsID: [Number(id)],
    };

    activityObjArr.push(activityObject);
    activityIdArr.push(activityId);
    // activity id increment
    activityId++;
    jobDetailsData.description = descriptionInput.value;
  }
  if (
    locationInput.value != "" &&
    locationInput.value != jobDetailsData.location
  ) {
    activityObject = {
      id: activityId,
      tag: "Location added",
      title: `Location was added`,
      description: "",
      state: "complete",
      timestamp: Date.now(),
      jobsID: [Number(id)],
    };

    activityObjArr.push(activityObject);
    activityIdArr.push(activityId);
    // activity id increment
    activityId++;
    jobDetailsData.location = locationInput.value;
  }

  for (let i = 0; i < colorArr.length; i++) {
    if (colorArr[i].classList.contains("active-color")) {
      if (jobData.colorId != i) {
        activityObject = {
          id: activityId,
          tag: "Color changed",
          title: `Job color was changed`,
          description: "",
          state: "complete",
          timestamp: Date.now(),
          jobsID: [Number(id)],
        };

        activityObjArr.push(activityObject);
        activityIdArr.push(activityId);
        // activity id increment
        activityId++;
        jobData.colorId = i;
      }
      break;
    }
  }

  // job data array update
  jobData.activitiesId.push(...activityIdArr);
  // localstorage update
  myStorage.setItem(
    "seekerKeys",
    JSON.stringify({ jobId, activityId, contactId, colorId })
  );
  await db.jobs.put(jobData);
  if (activityObjArr.length > 0) await db.activities.bulkPut(activityObjArr);
  await db.jobsDetails.put(jobDetailsData);

  reloadJobCard(id, jobData);
  await renderJobDetails(id);
});

activitySaveBtn.addEventListener("click", async () => {
  try {
    const jobIdDiv = document.querySelector(
      ".main-description-container .job-id"
    );
    let id = jobIdDiv.attributes[1].value;
    let jobData = await getJobData(Number(id));

    const activityInput = document.querySelector("#activity-input");
    let tagContent;
    for (let i = 0; i < tagArr.length; i++) {
      if (tagArr[i].classList.contains("active")) {
        tagContent = tagArr[i].innerText;
      }
    }

    console.log(tagContent, activityInput);

    if (activityInput.value != "") {
      let activityObject = {
        id: activityId,
        tag: tagContent,
        title: activityInput.value,
        description: "",
        state: "complete",
        timestamp: Date.now(),
        jobsID: [Number(id)],
      };

      jobData.activitiesId.push(activityId);
      console.log(jobData, activityObject);
      await db.jobs.put(jobData);
      await db.activities.put(activityObject);
      // activity id increment
      activityId++;
      // localstorage update
      myStorage.setItem(
        "seekerKeys",
        JSON.stringify({ jobId, activityId, contactId, colorId })
      );
      await renderJobDetails(id);
      await renderActivities(id);
    }
  } catch (error) {
    console.log(error);
  }
});

noteSaveBtn.addEventListener("click", async () => {
  const jobIdDiv = document.querySelector(
    ".main-description-container .job-id"
  );
  let id = jobIdDiv.attributes[1].value;

  let jobData = await getJobData(Number(id));
  let jobDetailsData = await getJobDetailsData(Number(id));

  const notesInput = document.querySelector("#notes-input");

  let activityObject;
  if (notesInput.value != "") {
    activityObject = {
      id: activityId,
      tag: "New Note added",
      title: `Note was added`,
      description: "",
      state: "complete",
      timestamp: Date.now(),
      jobsID: [Number(id)],
    };

    jobData.activitiesId.push(activityId);
    // activity id increment
    activityId++;
    jobDetailsData.notes.push({
      noteContent: notesInput.value,
      timestamp: Date.now(),
    });
    myStorage.setItem(
      "seekerKeys",
      JSON.stringify({ jobId, activityId, contactId, colorId })
    );
    await db.jobs.put(jobData);
    await db.activities.put(activityObject);
    await db.jobsDetails.put(jobDetailsData);

    await renderNotes(id);
  }
});

contactSaveBtn.addEventListener("click", async () => {
  const firstNameInput = document.querySelector("#first-name-input");
  const lastNameInput = document.querySelector("#second-name-input");
  const titleInput = document.querySelector("#contact-title-input");
  const locationInput = document.querySelector("#contact-location-input");
  const phoneInput = document.querySelector("#contact-phone-input");
  const emailInput = document.querySelector("#contact-email-input");
  const linkedinInput = document.querySelector("#contact-linkedin-input");
  const jobIdDiv = document.querySelector(
    ".main-description-container .job-id"
  );

  if (firstNameInput.value == "") {
    alert("Please fill some details");
    return;
  }
  let id = jobIdDiv.attributes[1].value;

  let jobData = await getJobData(Number(id));
  let jobDetailsData = await getJobDetailsData(Number(id));

  // contacts: "id, name, company, title, location, phone, email, linkedin",
  let contactObject = {
    id: Number(contactId),
    name: firstNameInput.value + "" + lastNameInput.value,
    company: jobData.company,
    title: titleInput.value,
    location: locationInput.value,
    phone: phoneInput.value,
    email: emailInput.value,
    linkedin: linkedinInput.value,
  };

  let activityObject = {
    id: activityId,
    tag: "New contact added",
    title: `New contact added`,
    description: "",
    state: "complete",
    timestamp: Date.now(),
    jobsID: [Number(id)],
  };

  jobDetailsData.contactsId.push(Number(contactId));
  contactId++;
  activityId++;
  myStorage.setItem(
    "seekerKeys",
    JSON.stringify({ jobId, activityId, contactId, colorId })
  );
  await db.contacts.put(contactObject);
  await db.jobsDetails.put(jobDetailsData);
  await db.activities.put(activityObject);

  await renderContacts(id);
  await renderTimeline(id);
});
