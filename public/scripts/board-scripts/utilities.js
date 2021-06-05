const overlay = document.querySelector(".overlay");
const jobDetailsHide = document.querySelector(".job-details-hiding");
const addCard = document.querySelector(".job-card-container");
const categoryCard = document.querySelector(".category-card-wrapper");
const colorArr = document.querySelectorAll(".color-box");
const tagArr = document.querySelectorAll(".tag");

const colors = [
  "#0070fb",
  "#25c47b",
  "#ff3300",
  "#6a4feb",
  "#ffcd60",
  "#1c3554",
];

let viewCategoryDetails = () => {
  overlay.classList.remove("hide");
  categoryCard.classList.remove("hide");
};

let hideCategoryDetails = () => {
  overlay.classList.add("hide");
  categoryCard.classList.add("hide");
};

let viewJobDetails = () => {
  overlay.classList.remove("hide");
  jobDetailsHide.classList.remove("hide");
};

let hideJobDetails = () => {
  overlay.classList.add("hide");
  jobDetailsHide.classList.add("hide");
};

let viewJobCard = () => {
  addCard.classList.remove("hide");
  overlay.classList.remove("hide");
};

let hideJobCard = () => {
  addCard.classList.add("hide");
  overlay.classList.add("hide");
  const companyInput = document.getElementById("company-input");
  const titleInput = document.getElementById("role-input");
  const categoryInput = document.querySelector(".category-dropbox");

  companyInput.value = "";
  titleInput.value = "";
  categoryInput.value = "applied";
};

overlay.addEventListener("click", () => {
  hideJobCard();
  hideJobDetails();
  hideCategoryDetails();
});

let getPassedTime = (timestamp) => {
  const currTime = Date.now();
  const second = 1000;
  const minute = 1000 * 60;
  const hour = 1000 * 60 * 60;
  const day = 1000 * 60 * 60 * 24;
  const week = 1000 * 60 * 60 * 24 * 7;
  const year = 1000 * 60 * 60 * 24 * 365;

  let timePassed = currTime - timestamp;
  let ans;
  if (timePassed < minute) {
    ans = Math.ceil(timePassed / second);
    return `${ans}s`;
  } else if (timePassed < hour) {
    ans = Math.ceil(timePassed / minute);
    return `${ans}m`;
  } else if (timePassed < day) {
    ans = Math.ceil(timePassed / hour);
    return `${ans}h`;
  } else if (timePassed < week) {
    ans = Math.ceil(timePassed / day);
    return `${ans}d`;
  } else if (timePassed < year) {
    ans = Math.ceil(timePassed / week);
    return `${ans}w`;
  } else {
    ans = Math.ceil(timePassed / year);
    return `${ans}y`;
  }
};

let getJobs = async () => {
  let jobsData = await db.jobs.toArray();
  return jobsData;
};

let renderBoardUI = async () => {
  let jobsData = await getJobs();
  //   console.table(jobsData);

  for (let i = 0; i < jobsData.length; i++) {
    let job = jobsData[i];
    let company = job.company;
    let title = job.title;
    let time = getPassedTime(job.timestamp);
    let category = job.category;
    let jobColor = colors[job.colorId];
    const containerCount = document.querySelector(`#${category} .count`);
    let count = containerCount.innerText.split(" ")[0];
    count++;
    containerCount.innerText = count + " JOBS";
    let jobCard = document.createElement("div");
    jobCard.innerHTML = `<div class="role-row">
                <img
                  src="https://logo.clearbit.com/${company}.com?size=40"
                  alt=""
                  height="30px"
                  width="30px"
                />
                <span class="role">${title}</span>
              </div>
              <span class="material-icons-outlined delete-btn hide"> delete </span>

              <div class="company-name">${company}</div>
              <span class="time-created"
                >${time}
                <span class="material-icons-outlined"> schedule </span></span
              >
            </div>`;
    jobCard.classList.add("job-container");
    jobCard.setAttribute("id", job.id);

    jobCard.setAttribute("draggable", true);

    jobCard.style.backgroundColor = jobColor;
    const categoryContainer = document.getElementById(category);
    categoryContainer.appendChild(jobCard);
  }
};

let getJobData = async (id) => {
  let jobData = await db.jobs.get(id);
  return jobData;
};

let getJobDetailsData = async (id) => {
  let jobDetailsData = await db.jobsDetails.get(id);
  return jobDetailsData;
};

let getActivitesData = async (id) => {
  let activitiesData = await db.activities.get(id);
  return activitiesData;
};

let getContactsData = async (id) => {
  let contactsData = await db.contacts.get(id);
  return contactsData;
};

for (let i = 0; i < tagArr.length; i++) {
  tagArr[i].addEventListener("click", () => {
    for (let k = 0; k < tagArr.length; k++) {
      tagArr[k].classList.remove("active");
    }
    tagArr[i].classList.add("active");
  });
}

for (let i = 0; i < colorArr.length; i++) {
  colorArr[i].style.backgroundColor = colors[i];

  colorArr[i].addEventListener("click", () => {
    for (let k = 0; k < colorArr.length; k++) {
      colorArr[k].classList.remove("active-color");
    }
    colorArr[i].classList.add("active-color");
  });
}

let reloadJobCard = (id, jobData) => {
  let jobCard = document.getElementById(id);
  jobCard.style.backgroundColor = colors[jobData.colorId];
  jobCard.childNodes[0].childNodes[3].innerText = jobData.title;
  jobCard.childNodes[0].childNodes[1].src = `https://logo.clearbit.com/${jobData.company}.com?size=40`;
  jobCard.childNodes[4].innerText = jobData.company;
};

let renderJobDetails = async (id) => {
  let jobData = await getJobData(Number(id));
  let jobDetailsData = await getJobDetailsData(Number(id));
  const logo = document.querySelector(".job-description-container .logo img");
  const role = document.querySelector(
    ".job-description-container .name-details .role"
  );
  const companyName = document.querySelector(
    ".job-description-container .name-details .company"
  );
  const jobIdDiv = document.querySelector(
    ".main-description-container .job-id"
  );

  jobIdDiv.innerText = `Job:#${jobData.id}`;
  jobIdDiv.setAttribute("jobid", jobData.id);
  const companyInput = document.querySelector("#company-detail");
  const titleInput = document.querySelector("#title-detail");
  const categoryInput = document.querySelector("#category-detail");

  const urlInput = document.querySelector("#url-input");
  const salaryInput = document.querySelector("#salary-input");
  const deadlineInput = document.querySelector("#deadline-input");
  const descriptionInput = document.querySelector("#description-input");
  const locationInput = document.querySelector("#location-input");

  logo.setAttribute(
    "src",
    `https://logo.clearbit.com/${jobData.company}.com?size=80`
  );

  for (let k = 0; k < colorArr.length; k++) {
    colorArr[k].classList.remove("active-color");
  }

  colorArr[jobData.colorId].classList.add("active-color");

  role.innerText = jobData.title;
  companyName.innerText = jobData.company;
  companyInput.value = jobData.company;
  titleInput.value = jobData.title;
  categoryInput.value = jobData.category;

  urlInput.value = "";
  salaryInput.value = "";
  deadlineInput.value = "";
  descriptionInput.value = "";
  locationInput.value = "";
  if (jobDetailsData.url != "") {
    urlInput.value = jobDetailsData.url;
  }
  if (jobDetailsData.salary != "") {
    salaryInput.value = jobDetailsData.salary;
  }
  if (jobDetailsData.deadline != "") {
    deadlineInput.value = jobDetailsData.deadline;
  }
  if (jobDetailsData.description != "") {
    descriptionInput.value = jobDetailsData.description;
  }
  if (jobDetailsData.location != "") {
    locationInput.value = jobDetailsData.location;
  }
  await renderTimeline(id);
  viewJobDetails();
};

let renderNotes = async (id) => {
  let jobDetailsData = await getJobDetailsData(Number(id));

  const notesArr = document.querySelectorAll(".note");
  for (let i = notesArr.length - 1; i >= 0; i--) {
    notesArr[i].remove();
  }

  for (let i = 0; i < jobDetailsData.notes.length; i++) {
    let note = jobDetailsData.notes[i];
    let timeCreated = "0s";
    if (note.timestamp) {
      timeCreated = getPassedTime(note.timestamp);
    }

    let noteDiv = document.createElement("div");
    noteDiv.classList.add("note");

    noteDiv.innerHTML = `<div class="note-content">${note.noteContent}</div>
                    <div class="note-details">
                      <span class="time">${timeCreated}</span>
                      <div class="note-delete-btn">
                        <span class="material-icons-outlined"> delete </span>
                      </div>
                    </div>`;

    const notesContainer = document.querySelector(".note-blocks");
    notesContainer.appendChild(noteDiv);
  }

  const noteDelBtnArr = document.querySelectorAll(".note-delete-btn");
  for (let i = 0; i < noteDelBtnArr.length; i++) {
    noteDelBtnArr[i].addEventListener("click", async (e) => {
      jobDetailsData.notes.splice(i, 1);
      await db.jobsDetails.put(jobDetailsData);
      await renderNotes(id);
    });
  }
};

let renderActivities = async (id) => {
  const activityArr = document.querySelectorAll(".activity-content");

  for (let i = 0; i < activityArr.length; i++) {
    activityArr[i].remove();
  }

  let jobData = await getJobData(Number(id));

  let activityIdArr = jobData.activitiesId;
  for (let i = 0; i < activityIdArr.length; i++) {
    let activityData = await getActivitesData(activityIdArr[i]);
    let timeCreated = getPassedTime(activityData.timestamp);
    let activityDiv = document.createElement("div");
    let tagColor = colors[i % 6];
    activityDiv.classList.add("activity-content");
    activityDiv.innerHTML = `<div class="content-value">${activityData.title}</div>
                  <div class="tag-value" style="background-color: ${tagColor}; color:#fff;">${activityData.tag}</div>
                  <div class="time-value">${timeCreated}</div>`;

    const activityContainer = document.querySelector(
      ".activities-container .activities"
    );
    activityContainer.appendChild(activityDiv);
  }
};

let renderContacts = async (id) => {
  const firstNameInput = document.querySelector("#first-name-input");
  const lastNameInput = document.querySelector("#second-name-input");
  const titleInput = document.querySelector("#contact-title-input");
  const locationInput = document.querySelector("#contact-location-input");
  const phoneInput = document.querySelector("#contact-phone-input");
  const emailInput = document.querySelector("#contact-email-input");
  const linkedinInput = document.querySelector("#contact-linkedin-input");

  firstNameInput.value = "";
  lastNameInput.value = "";
  titleInput.value = "";
  locationInput.value = "";
  phoneInput.value = "";
  emailInput.value = "";
  linkedinInput.value = "";

  const contactBlockArr = document.querySelectorAll(".contact-block");
  for (let i = 0; i < contactBlockArr.length; i++) {
    contactBlockArr[i].remove();
  }

  let jobDetailsData = await getJobDetailsData(Number(id));
  let contactIdArr = jobDetailsData.contactsId;

  for (let i = 0; i < contactIdArr.length; i++) {
    let contactData = await getContactsData(contactIdArr[i]);

    let contactDiv = document.createElement("div");
    contactDiv.classList.add("contact-block");

    contactDiv.innerHTML = `<div class="icon">
                      <span class="material-icons-outlined"> portrait </span>
                    </div>
                    <div class="contact-info">
                      <div class="contact-block-name">${contactData.name}</div>
                      <div class="block-row">
                        <div class="contact-block-title">${contactData.title}</div>
                        <div class="contact-block-location">${contactData.location}</div>
                      </div>
                      <div class="contact-block-phone">${contactData.phone}</div>
                      <div class="contact-block-email">${contactData.title}</div>
                      <div class="contact-block-linkedin">
                        <img src="./images/linkedin-svg.svg" alt="." height="15px" width="15px" />@${contactData.linkedin}
                      </div>
                    </div>`;

    const contactsContainer = document.querySelector(".contact-blocks");
    contactsContainer.appendChild(contactDiv);
  }
};

let renderTimeline = async (id) => {
  const stagesArr = document.querySelectorAll(".stage");
  for (let i = 0; i < stagesArr.length; i++) {
    stagesArr[i].remove();
  }

  let jobData = await getJobData(Number(id));

  let activityIdArr = jobData.activitiesId;
  for (let i = 0; i < activityIdArr.length; i++) {
    let activityData = await getActivitesData(activityIdArr[i]);
    let stageDiv = document.createElement("div");
    stageDiv.classList.add("stage");
    let dotColor = colors[i % 6];
    let timeCreated = getPassedTime(activityData.timestamp);

    stageDiv.innerHTML = `<div class="stage-container">
                <div class="dot" style="background-color: ${dotColor};"></div>
                <div class="activity-tag">${activityData.tag}</div>
              </div>
               <div class="activity-time">${timeCreated}</div>
              <div class="next-line"></div>`;

    const stagesContainer = document.querySelector(".stages");
    stagesContainer.appendChild(stageDiv);
  }
};

let renderCategoryDetails = async (categoryId) => {
  const cardContainer = document.querySelector(".category-detail-card");
  cardContainer.innerHTML = ``;
  const categoryArr = [
    "wishlist",
    "applied",
    "test",
    "interview",
    "offer",
    "rejected",
  ];
  const categoryIconArr = [
    "auto_fix_high",
    "content_paste",
    "quiz",
    "business_center",
    "emoji_events",
    "thumb_down",
  ];
  let category = categoryArr[categoryId];
  let jobsData = await getJobs();

  let activityCount = 0;
  let contactCount = 0;
  let jobCount = 0;
  let jobIdArr = [];
  for (let i = 0; i < jobsData.length; i++) {
    if (jobsData[i].category === category) {
      jobIdArr.push(jobsData[i].id);
      activityCount += jobsData[i].activitiesId.length;
      jobCount++;
    }
  }
  for (let i = 0; i < jobIdArr.length; i++) {
    let jobDetailsData = await getJobDetailsData(Number(jobIdArr[i]));
    contactCount += jobDetailsData.contactsId.length;
  }

  let categoryDetailDiv = document.createElement("div");
  categoryDetailDiv.classList.add("category-detail");

  categoryDetailDiv.innerHTML = `<div class="category-detail-name">
            <span class="material-icons-outlined"> ${
              categoryIconArr[categoryId]
            } </span>
            <span>${categoryArr[categoryId].toUpperCase()}</span>
          </div>
          <div class="category-job-count"><span>Jobs present</span>${jobCount}</div>
          <div class="category-contacts-count">
            <span>Contacts present</span>${contactCount}
          </div>
          <div class="category-activities-count">
            <span>Activities done</span>${activityCount}
          </div>
          <div class="category-del-btns">
            <button class="discard">Discard</button>
            <button class="delete">Clear category</button>
          </div>`;

  // const cardContainer = document.querySelector(".category-detail-card");
  cardContainer.appendChild(categoryDetailDiv);

  let discardBtn = document.querySelector(".category-del-btns .discard");
  discardBtn.addEventListener("click", () => {
    console.log("discard clicked");
    hideJobCard();
    hideCategoryDetails();
  });

  let clearBtn = document.querySelector(".category-del-btns .delete");
  clearBtn.addEventListener("click", async ()=>{
    for (let i = 0; i < jobsData.length; i++) {
      if (jobsData[i].category === category) {
        await db.jobs.delete(jobsData[i].id);
      }
    }
    location.reload();
    discardBtn.click();
  })
};
