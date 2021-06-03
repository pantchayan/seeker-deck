const overlay = document.querySelector(".overlay");
const jobDetailsHide = document.querySelector(".job-details-hiding");
const addCard = document.querySelector(".job-card-container");

const colors = [
  "#0070fb",
  "#25c47b",
  "#ff3300",
  "#6a4feb",
  "#ffcd60",
  "#1c3554",
];

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

let renderJobDetails = async (id) => {
  let jobData = await getJobData(Number(id));

  const logo = document.querySelector(".job-description-container .logo img");
  const role = document.querySelector(
    ".job-description-container .name-details .role"
  );
  const companyName = document.querySelector(
    ".job-description-container .name-details .company"
  );

  logo.setAttribute(
    "src",
    `https://logo.clearbit.com/${jobData.company}.com?size=80`
  );

  role.innerText = jobData.title;
  companyName.innerText = jobData.company;

  viewJobDetails();
};
