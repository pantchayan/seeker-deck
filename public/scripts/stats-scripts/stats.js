// Role wise average Salary
let renderChart1 = (jobsData, jobsDetailData, contactsData) => {
  let roleVsSalaryArr = [];

  for (let i = 0; i < jobsData.length; i++) {
    let j = i;
    while (jobsData[i].id != jobsDetailData[j].id) {
      j++;
    }
    let role = jobsData[i].title;
    let salary = jobsDetailData[j].salary;
    if (salary != "") {
      let check = (elem) => {
        return elem["role"] === role;
      };

      if (roleVsSalaryArr.some(check)) {
        let idx = roleVsSalaryArr.findIndex(check);
        let currSalary = Number(roleVsSalaryArr[idx]["salary"]);
        let currCount = roleVsSalaryArr[idx]["roleCount"];
        roleVsSalaryArr[idx] = {
          role: role,
          salary: Number(salary) + currSalary,
          roleCount: currCount + 1,
        };
      } else {
        roleVsSalaryArr.push({
          role: role,
          salary: Number(salary),
          roleCount: 1,
        });
      }
    }
  }

  for (let i = 0; i < roleVsSalaryArr.length; i++) {
    let { role, salary, roleCount } = roleVsSalaryArr[i];
    let averageSalary = salary / roleCount;
    roleVsSalaryArr[i] = { role: role, avgSalary: averageSalary };
  }

  console.log(roleVsSalaryArr);

  let roles = roleVsSalaryArr.map((elem) => {
    return elem["role"];
  });

  let salaries = roleVsSalaryArr.map((elem) => {
    return elem["avgSalary"];
  });

  console.log(roles);
  console.log(salaries);
  const chart1Ctx = document.getElementById("chart-1").getContext("2d");

  let roleVsSalaryChart = new Chart(chart1Ctx, {
    type: "bar", // bar, horizontalBar, pie, line, doughnut, radar, polarArea
    data: {
      labels: roles,
      datasets: [
        {
          label: "Average Salary",
          data: salaries,
          //backgroundColor:'green',
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
            "rgba(153, 102, 255, 0.6)",
            "rgba(255, 159, 64, 0.6)",
            "rgba(255, 99, 132, 0.6)",
          ],
          borderWidth: 1,
          borderColor: "#777",
          hoverBorderWidth: 3,
          hoverBorderColor: "#000",
        },
      ],
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: "Role wise Average Salaries",
          font: {
            size: 17,
          },
          position: "bottom",
        },
        legend: {
          display: false,
          position: "right",
          labels: {
            fontColor: "#000",
          },
        },
        layout: {
          padding: {
            left: 50,
            right: 0,
            bottom: 0,
            top: 0,
          },
        },
        tooltips: {
          enabled: true,
        },
      },
    },
  });
};

// Company wise average Salary
let renderChart2 = (jobsData, jobsDetailData, contactsData) => {
  let companyVsSalaryArr = [];

  for (let i = 0; i < jobsData.length; i++) {
    let j = i;
    while (jobsData[i].id != jobsDetailData[j].id) {
      j++;
    }
    let company = jobsData[i].company;
    let salary = jobsDetailData[j].salary;
    if (salary != "") {
      let check = (elem) => {
        return elem["company"] === company;
      };

      if (companyVsSalaryArr.some(check)) {
        let idx = companyVsSalaryArr.findIndex(check);
        let currSalary = Number(companyVsSalaryArr[idx]["salary"]);
        let currCount = companyVsSalaryArr[idx]["companyCount"];
        companyVsSalaryArr[idx] = {
          company: company,
          salary: Number(salary) + currSalary,
          companyCount: currCount + 1,
        };
      } else {
        companyVsSalaryArr.push({
          company: company,
          salary: Number(salary),
          companyCount: 1,
        });
      }
    }
  }

  for (let i = 0; i < companyVsSalaryArr.length; i++) {
    let { company, salary, companyCount } = companyVsSalaryArr[i];
    let averageSalary = salary / companyCount;
    companyVsSalaryArr[i] = { company: company, avgSalary: averageSalary };
  }

  console.log(companyVsSalaryArr);

  let companies = companyVsSalaryArr.map((elem) => {
    return elem["company"];
  });

  let salaries = companyVsSalaryArr.map((elem) => {
    return elem["avgSalary"];
  });

  console.log(companies);
  console.log(salaries);
  const chart2Ctx = document.getElementById("chart-2").getContext("2d");

  let companyVsSalaryChart = new Chart(chart2Ctx, {
    type: "bar", // bar, horizontalBar, pie, line, doughnut, radar, polarArea
    data: {
      labels: companies,
      datasets: [
        {
          label: "Average Salary",
          data: salaries,
          //backgroundColor:'green',
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
            "rgba(153, 102, 255, 0.6)",
            "rgba(255, 159, 64, 0.6)",
            "rgba(255, 99, 132, 0.6)",
          ],
          borderWidth: 1,
          borderColor: "#777",
          hoverBorderWidth: 3,
          hoverBorderColor: "#000",
        },
      ],
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: "Company wise Average Salaries",
          font: {
            size: 17,
          },
          position: "bottom",
        },
        legend: {
          display: false,
          position: "right",
          labels: {
            fontColor: "#000",
          },
        },
        layout: {
          padding: {
            left: 50,
            right: 0,
            bottom: 0,
            top: 0,
          },
        },
        tooltips: {
          enabled: true,
        },
      },
    },
  });
};

// Category wise average Salary
let renderChart3 = (jobsData, jobsDetailData, contactsData) => {
  let categoryVsSalaryArr = [];

  for (let i = 0; i < jobsData.length; i++) {
    let j = i;
    while (jobsData[i].id != jobsDetailData[j].id) {
      j++;
    }
    let category = jobsData[i].category;
    let salary = jobsDetailData[j].salary;
    if (salary != "") {
      let check = (elem) => {
        return elem["category"] === category;
      };

      if (categoryVsSalaryArr.some(check)) {
        let idx = categoryVsSalaryArr.findIndex(check);
        let currSalary = Number(categoryVsSalaryArr[idx]["salary"]);
        let currCount = categoryVsSalaryArr[idx]["categoryCount"];
        categoryVsSalaryArr[idx] = {
          category: category,
          salary: Number(salary) + currSalary,
          categoryCount: currCount + 1,
        };
      } else {
        categoryVsSalaryArr.push({
          category: category,
          salary: Number(salary),
          categoryCount: 1,
        });
      }
    }
  }

  for (let i = 0; i < categoryVsSalaryArr.length; i++) {
    let { category, salary, categoryCount } = categoryVsSalaryArr[i];
    let averageSalary = salary / categoryCount;
    categoryVsSalaryArr[i] = { category: category, avgSalary: averageSalary };
  }

  console.log(categoryVsSalaryArr);

  let categories = categoryVsSalaryArr.map((elem) => {
    return elem["category"];
  });

  let salaries = categoryVsSalaryArr.map((elem) => {
    return elem["avgSalary"];
  });

  console.log(categories);
  console.log(salaries);
  const chart3Ctx = document.getElementById("chart-3").getContext("2d");

  let categoryVsSalaryChart = new Chart(chart3Ctx, {
    type: "bar", // bar, horizontalBar, pie, line, doughnut, radar, polarArea
    data: {
      labels: categories,
      datasets: [
        {
          label: "Average Salary",
          data: salaries,
          //backgroundColor:'green',
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
            "rgba(153, 102, 255, 0.6)",
            "rgba(255, 159, 64, 0.6)",
            "rgba(255, 99, 132, 0.6)",
          ],
          borderWidth: 1,
          borderColor: "#777",
          hoverBorderWidth: 3,
          hoverBorderColor: "#000",
        },
      ],
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: "Category wise Average Salaries",
          font: {
            size: 17,
          },
          position: "bottom",
        },
        legend: {
          display: false,
          position: "right",
          labels: {
            fontColor: "#000",
          },
        },
        layout: {
          padding: {
            left: 50,
            right: 0,
            bottom: 0,
            top: 0,
          },
        },
        tooltips: {
          enabled: true,
        },
      },
    },
  });
};

// Role wise number of activities
let renderChart4 = (jobsData, jobsDetailData, contactsData) => {
  let roleVsActivityArr = [];

  for (let i = 0; i < jobsData.length; i++) {
    let role = jobsData[i].title;
    let activityCount = jobsData[i].activitiesId.length;
    if (activityCount != "") {
      let check = (elem) => {
        return elem["role"] === role;
      };

      if (roleVsActivityArr.some(check)) {
        let idx = roleVsActivityArr.findIndex(check);
        let currCount = Number(roleVsActivityArr[idx]["count"]);
        roleVsActivityArr[idx] = {
          role: role,
          count: Number(activityCount) + currCount,
        };
      } else {
        roleVsActivityArr.push({
          role: role,
          count: Number(activityCount),
        });
      }
    }
  }

  console.log(roleVsActivityArr);

  let roles = roleVsActivityArr.map((elem) => {
    return elem["role"];
  });

  let count = roleVsActivityArr.map((elem) => {
    return elem["count"];
  });

  console.log(roles);
  console.log(count);
  const chart4Ctx = document.getElementById("chart-4").getContext("2d");

  let roleVsActivityChart = new Chart(chart4Ctx, {
    type: "doughnut", // bar, horizontalBar, pie, line, doughnut, radar, polarArea
    data: {
      labels: roles,
      datasets: [
        {
          label: "Activities",
          data: count,
          //backgroundColor:'green',
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
            "rgba(153, 102, 255, 0.6)",
            "rgba(255, 159, 64, 0.6)",
            "rgba(255, 99, 132, 0.6)",
          ],
          borderWidth: 1,
          borderColor: "#777",
          hoverBorderWidth: 3,
          hoverBorderColor: "#000",
        },
      ],
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: "Role wise Activity Frequency",
          font: {
            size: 17,
          },
          position: "bottom",
        },
        legend: {
          display: true,
          position: "right",
          labels: {
            fontColor: "#000",
          },
        },
        layout: {
          padding: {
            left: 50,
            right: 0,
            bottom: 0,
            top: 0,
          },
        },
        tooltips: {
          enabled: true,
        },
      },
    },
  });
};

// Company wise number of activities
let renderChart5 = (jobsData, jobsDetailData, contactsData) => {
  let companyVsActivityArr = [];

  for (let i = 0; i < jobsData.length; i++) {
    let company = jobsData[i].company;
    let activityCount = jobsData[i].activitiesId.length;
    if (activityCount != "") {
      let check = (elem) => {
        return elem["company"] === company;
      };

      if (companyVsActivityArr.some(check)) {
        let idx = companyVsActivityArr.findIndex(check);
        let currCount = Number(companyVsActivityArr[idx]["count"]);
        companyVsActivityArr[idx] = {
          company: company,
          count: Number(activityCount) + currCount,
        };
      } else {
        companyVsActivityArr.push({
          company: company,
          count: Number(activityCount),
        });
      }
    }
  }

  console.log(companyVsActivityArr);

  let companies = companyVsActivityArr.map((elem) => {
    return elem["company"];
  });

  let count = companyVsActivityArr.map((elem) => {
    return elem["count"];
  });

  console.log(companies);
  console.log(count);
  const chart5Ctx = document.getElementById("chart-5").getContext("2d");

  let companyVsActivityChart = new Chart(chart5Ctx, {
    type: "pie", // bar, horizontalBar, pie, line, doughnut, radar, polarArea
    data: {
      labels: companies,
      datasets: [
        {
          label: "Activities",
          data: count,
          //backgroundColor:'green',
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
            "rgba(153, 102, 255, 0.6)",
            "rgba(255, 159, 64, 0.6)",
            "rgba(255, 99, 132, 0.6)",
          ],
          borderWidth: 1,
          borderColor: "#777",
          hoverBorderWidth: 3,
          hoverBorderColor: "#000",
        },
      ],
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: "Company wise Activity Frequency",
          font: {
            size: 17,
          },
          position: "bottom",
        },
        legend: {
          display: true,
          position: "right",
          labels: {
            fontColor: "#000",
          },
        },
        layout: {
          padding: {
            left: 50,
            right: 0,
            bottom: 0,
            top: 0,
          },
        },
        tooltips: {
          enabled: true,
        },
      },
    },
  });
};

// Category wise number of activities
let renderChart6 = (jobsData, jobsDetailData, contactsData) => {
  let categoryVsActivityArr = [];

  for (let i = 0; i < jobsData.length; i++) {
    let category = jobsData[i].category;
    let activityCount = jobsData[i].activitiesId.length;
    if (activityCount != "") {
      let check = (elem) => {
        return elem["category"] === category;
      };

      if (categoryVsActivityArr.some(check)) {
        let idx = categoryVsActivityArr.findIndex(check);
        let currCount = Number(categoryVsActivityArr[idx]["count"]);
        categoryVsActivityArr[idx] = {
          category: category,
          count: Number(activityCount) + currCount,
        };
      } else {
        categoryVsActivityArr.push({
          category: category,
          count: Number(activityCount),
        });
      }
    }
  }

  console.log(categoryVsActivityArr);

  let categories = categoryVsActivityArr.map((elem) => {
    return elem["category"];
  });

  let count = categoryVsActivityArr.map((elem) => {
    return elem["count"];
  });

  console.log(categories);
  console.log(count);
  const chart6Ctx = document.getElementById("chart-6").getContext("2d");

  let categoryVsActivityChart = new Chart(chart6Ctx, {
    type: "doughnut", // bar, horizontalBar, pie, line, doughnut, radar, polarArea
    data: {
      labels: categories,
      datasets: [
        {
          label: "Activities",
          data: count,
          //backgroundColor:'green',
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
            "rgba(153, 102, 255, 0.6)",
            "rgba(255, 159, 64, 0.6)",
            "rgba(255, 99, 132, 0.6)",
          ],
          borderWidth: 1,
          borderColor: "#777",
          hoverBorderWidth: 3,
          hoverBorderColor: "#000",
        },
      ],
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: "Category wise Activity Frequency",
          font: {
            size: 17,
          },
          position: "bottom",
          align: "center",
        },
        legend: {
          display: true,
          position: "right",
          labels: {
            fontColor: "#000",
          },
        },
        layout: {
          padding: {
            left: 50,
            right: 0,
            bottom: 0,
            top: 0,
          },
        },
        tooltips: {
          enabled: true,
        },
      },
    },
  });
};

let renderCharts = async () => {
  let jobsData = await getJobs();
  let jobsDetailData = await getAllJobsDetail();
  let contactsData = await getAllContacts();
  console.log(jobsData, jobsDetailData, contactsData);

  renderChart1(jobsData, jobsDetailData, contactsData);

  renderChart2(jobsData, jobsDetailData, contactsData);

  renderChart3(jobsData, jobsDetailData, contactsData);

  renderChart4(jobsData, jobsDetailData, contactsData);

  renderChart5(jobsData, jobsDetailData, contactsData);
  renderChart6(jobsData, jobsDetailData, contactsData);
};

renderCharts();
