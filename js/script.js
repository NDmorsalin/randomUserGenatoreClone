const loadUser = async () => {
  const url = `https://randomuser.me/api/`;
  const res = await fetch(url);

  const user = await res.json();
  displayUserInfo(user.results[0]);
};

loadUser();

const displayUserInfo = (user) => {
  console.log(user.picture.medium);

  const avatar = document.getElementById("avatar");
  const property = document.getElementById("property");
  const value = document.getElementById("value");

  console.log(Object.keys(user).find((key) => key === "name"));

  property.innerText = `My ${Object.keys(user).find(
    (key) => key === "name"
  )} is  `;
  value.innerText = `${Object.values(user.name).join(" ")}`;

  avatar.setAttribute("src", user.picture.medium);
};
