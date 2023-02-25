const loadUser = async () => {
  const url = `https://randomuser.me/api/`;
  const res = await fetch(url);

  const user = await res.json();
  displayUserInfo(user.results[0]);
};

loadUser();

const displayUserInfo = (user) => {
  const avatar = document.getElementById("avatar");
  const property = document.getElementById("property");
  const value = document.getElementById("value");

  // after load
  property.innerText = `My ${Object.keys(user).find(
    (key) => key === "name"
  )} is  `;
  value.innerText = `${Object.values(user.name).join(" ")}`;
  document.getElementById(
    "selected"
  ).style.top = `calc(calc(100% - 0.5rem)*-1)`;

  // set image
  avatar.setAttribute("src", user.picture.medium);

  // get all buttons
  const allButtons = document.getElementById("btnContainer").children;

  for (const button of allButtons) {
    button.addEventListener("mouseenter", (event) => {
      // remove previous styles
      for (const eachChild of event.target.parentNode.children) {
        eachChild.children[0].style.top = "0.5rem";
      }
      // add new styles
      event.target.children[0].style.top = `calc(calc(100% - 0.5rem)*-1)`;

      // when hover update properties
      //
      property.innerText = `My ${event.target.dataset.name} is`;
      // update value
      // value.innerText = `${Object.values(user[event.target.dataset.value]).join(" ")}`;

      switch (event.target.dataset.value) {
        case "name":
          value.innerText = `${Object.values(
            user[event.target.dataset.value]
          ).join(" ")}`;
          break;
        case "login":
          value.innerText = user[event.target.dataset.value].password;
          break;

        case "location":
          value.innerText = `${Object.values(
            user[event.target.dataset.value].street
          ).join(" ")}`;
          break;
        case "dob":
          value.innerText =
            user[event.target.dataset.value].date.toLocaleString();
          break;
        default:
          value.innerText = user[event.target.dataset.value];
          break;
      }
    });
  }
};

// reload

document.getElementById("reload").addEventListener("click", loadUser);
