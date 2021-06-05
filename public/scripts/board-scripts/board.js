const jobAddBtnArr = document.querySelectorAll(".add-btn");
const categoryBtnArr = document.querySelectorAll(".name span:nth-child(3)");
let discardBtnArr = document.querySelectorAll(".discard");
let saveBtn = document.querySelector(".create-btns>.save");
const categoriesArr = document.querySelectorAll(".category");





for (let i = 0; i < discardBtnArr.length; i++) {
  discardBtnArr[i].addEventListener("click", () => {
    console.log("discard clicked");
    hideJobCard();
    hideCategoryDetails();
  });
}

saveBtn.addEventListener("click", () => getJobInput());
// Applying click events to plus buttons ====================================
for (let i = 0; i < jobAddBtnArr.length; i++) {
  let jobAddBtn = jobAddBtnArr[i];
  jobAddBtn.addEventListener("click", (e) => {
    viewJobCard();
  });
}

for (let i = 0; i < categoryBtnArr.length; i++) {
  categoryBtnArr[i].addEventListener("click", async () => {
    await renderCategoryDetails(i);
    // console.log()
    viewCategoryDetails();
  });
}

// "TAKE JOB INPUT" ============================
let getJobInput = () => {
  const companyInput = document.getElementById("company-input");
  const titleInput = document.getElementById("role-input");
  const categoryInput = document.querySelector(".category-dropbox");

  let company = companyInput.value;
  let title = titleInput.value;
  let category = categoryInput.value;
  if (company == "" || title == "") {
    alert("Enter all the details");
    return;
  }

  hideJobCard();
  saveJobInput(company, title, category);
};

let saveJobInput = (company, title, category) => {
  //   console.log(jobId, activityId);

  let jobObject = {
    id: jobId,
    title: title,
    company: company,
    timestamp: Date.now(),
    colorId: Number(colorId),
    category: category,
    activitiesId: [activityId],
  };

  let activityObject = {
    id: activityId,
    tag: "Created",
    title: `Applied for ${title} at ${company}`,
    description: "",
    state: "complete",
    timestamp: Date.now(),
    jobsID: [jobId],
  };

  let jobDetailsObject = {
    id: jobId,
    deadline: "",
    url: "",
    salary: "",
    location: "",
    description: "",
    notes: [],
    contactsId: [],
  };

  (async () => {
    await db.jobs.put(jobObject);
    await db.activities.put(activityObject);
    await db.jobsDetails.put(jobDetailsObject);
  })();

  jobId++;
  activityId++;
  colorId = (colorId + 1) % 6;
  myStorage.setItem(
    "seekerKeys",
    JSON.stringify({ jobId, activityId, contactId, colorId })
  );

  renderJobCard(jobObject);
};

let renderJobCard = (job) => {
  let company = job.company;
  let title = job.title;
  let time = getPassedTime(job.timestamp);
  let category = job.category;
  let jobColor = colors[job.colorId];
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
  //  draggable = "true";
  jobCard.setAttribute("draggable", true);

  jobCard.style.backgroundColor = jobColor;

  const categoryContainer = document.getElementById(category);
  //   console.log(categoryContainer, category);
  categoryContainer.appendChild(jobCard);
  const containerCount = document.querySelector(`#${category} .count`);
  let count  = containerCount.innerText.split(" ")[0];
  count++;
  containerCount.innerText = count+" JOBS";
  console.log(jobCard.childNodes[2]);
  let deleteBtn = jobCard.childNodes[2];

  deleteBtn.addEventListener("click", () => {
    jobCard.remove();
    deleteJobData(job.id, title, company);
  });
  jobCard.addEventListener("mouseover", (e) => {
    deleteBtn.classList.remove("hide");
  });

  jobCard.addEventListener("mouseout", (e) => {
    deleteBtn.classList.add("hide");
  });

  jobCard.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", e.target.id);
  });

  jobCard.addEventListener("click", async (e) => {
    await renderJobDetails(job.id);
    detailsNavArr[0].click();
  });
};

let deleteJobData = (id, title, company) => {
  (async () => {
    await db.jobs.delete(id);
    await db.jobsDetails.delete(id);
  })();

  let activityObject = {
    id: activityId,
    tag: "Deleted",
    title: `Job for ${title} at ${company} was deleted`,
    description: "",
    state: "complete",
    timestamp: Date.now(),
    jobsID: [id],
  };

  (async () => {
    await db.activities.put(activityObject);
  })();

  activityId++;
  myStorage.setItem(
    "seekerKeys",
    JSON.stringify({ jobId, activityId, contactId, colorId })
  );
};
