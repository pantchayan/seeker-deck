(async () => {
  await renderBoardUI();

  let jobContainerArr = document.querySelectorAll(".job-container");

  for (let i = 0; i < jobContainerArr.length; i++) {
    let jobContainer = jobContainerArr[i];
    let deleteBtn = jobContainer.childNodes[2];

    deleteBtn.addEventListener("click", (e) => {
      jobContainer.remove();
      let company = jobContainer.childNodes[4].innerText;
      let title = jobContainer.childNodes[0].childNodes[3].innerText;
      console.log(jobContainer.id, company, title);
      deleteJobData(Number(jobContainer.id), title, company);
    });

    jobContainer.addEventListener("mouseover", () => {
      deleteBtn.classList.remove("hide");
    });

    jobContainer.addEventListener("mouseout", () => {
      deleteBtn.classList.add("hide");
    });
  }
})();



// let deleteJobData = (id, title, company) => {
//   (async () => {
//     let newJobsData = await db.jobs.delete(id);
//     console.table(newJobsData);
//   })();

//   let activityObject = {
//     id: activityId,
//     tag: "Deleted",
//     title: `Job for ${title} at ${company} was deleted`,
//     description: "",
//     state: "complete",
//     jobsID: [id],
//   };

//   (async () => {
//     await db.activities.put(activityObject);
//   })();
// };
