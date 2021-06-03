let coloumnsArr = document.querySelectorAll(".category");

let onDragStart = (event) => {
  // console.log("dragging");
  event.dataTransfer.setData("text/plain", event.target.id);
};

let onDragOver = (event) => {
  // console.log("dropping");
  event.preventDefault();
};

let onDrop = (event) => {
  // console.log("dropped");
  const id = event.dataTransfer.getData("text");
  const draggableElement = document.getElementById(id);
  const dropzone = event.target;

  // console.log(draggableElement);
  if (
    !(
      dropzone.classList.contains("category") &&
      draggableElement.classList.contains("job-container")
    )
  )
    return;

  dropzone.appendChild(draggableElement);

  event.dataTransfer.clearData();

  // changes in DB;
  updateDB(draggableElement.id, dropzone.id);
};

let updateDB = async (id, newCategory) => {
  try {
    // console.log(id, newCategory);
    await db.jobs.update(Number(id), { category: newCategory });

    let activityObject = {
      id: activityId,
      tag: "Moved",
      title: `Job of id ${id} was shifted to ${newCategory}`,
      description: "",
      state: "complete",
      timestamp: Date.now(),
      jobsID: [Number(id)],
    };

    await db.activities.put(activityObject);

    activityId++;
    myStorage.setItem(
      "seekerKeys",
      JSON.stringify({ jobId, activityId, contactId })
    );
  } catch (error) {
    console.log(error);
  }
};

for (let i = 0; i < coloumnsArr.length; i++) {
  coloumnsArr[i].addEventListener("dragover", (e) => {
    onDragOver(e);
  });
  coloumnsArr[i].addEventListener("drop", (e) => {
    onDrop(e);
  });
}

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

    jobContainer.addEventListener("dragstart", (e) => {
      onDragStart(e);
    });

    jobContainer.addEventListener("click", async (e) => {
      await renderJobDetails(jobContainer.id);
    });
  }
})();
