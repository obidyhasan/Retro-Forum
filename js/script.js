// Get All Posts from API
const getPosts = async (categoryName = "") => {
  try {
    const response = await fetch(
      `https://openapi.programming-hero.com/api/retro-forum/posts?category=${categoryName}`
    );
    const data = await response.json();
    showPosts(data.posts);
  } catch (err) {
    console.log("Something went wrong");
  }
};

// Show All Posts
const postContainer = document.querySelector("#postContainer");
const showPosts = (posts) => {
  postContainer.innerHTML = "";
  posts.map((post) => {
    const item = document.createElement("div");
    item.className = "w-full bg-gray-100 p-4 sm:p-10 rounded-xl";
    item.innerHTML = `
      <div class="sm:flex items-start gap-5">
        <div class="avatar relative">
          <div class="w-14 rounded">
            <img
              src="${post.image}"
            />
          </div>
          ${
            post.isActive
              ? `<div
            class="w-4 h-4 bg-green-500 rounded-full absolute -right-1 -top-1 border-2 border-white"
          ></div>`
              : `<div
            class="w-4 h-4 bg-red-500 rounded-full absolute -right-1 -top-1 border-2 border-white"
          ></div>`
          }
          
        </div>
        <!--  -->
        <div class="w-full">
          <div
            class="flex items-center gap-5 font-bold text-sm text-gray-700 flex-wrap"
          >
            <p>#${post.category}</p>
            <p>Author : ${post.author?.name}</p>
          </div>
          <h3 class="font-extrabold text-lg mt-1">
            ${post.title}
          </h3>
          <p class="text-sm font-medium text-gray-500 my-3">
            ${post.description}
          </p>
          <div class="border-t-2 border-dashed mb-3"></div>
          <div
            class="flex gap-5 items-center justify-between flex-wrap"
          >
            <div
              class="flex items-center justify-between gap-5 flex-wrap"
            >
              <div
                class="flex items-center gap-2 text-gray-500 font-semibold"
              >
                <i class="bx bx-message-alt-detail text-xl"></i>
                <span class="text-sm">${post.comment_count}</span>
              </div>
              <div
                class="flex items-center gap-2 text-gray-500 font-semibold"
              >
                <i class="bx bx-show text-xl"></i>
                <span class="text-sm">${post.view_count}</span>
              </div>
              <div
                class="flex items-center gap-2 text-gray-500 font-semibold"
              >
                <i class="bx bx-time-five text-xl"></i>
                <span class="text-sm">${post.posted_time} min</span>
              </div>
            </div>
            <div
              onclick="showReadPosts('${post.description}',${post.view_count})"
              class="bg-green-500 cursor-pointer w-6 h-6 rounded-full flex items-center justify-center text-white"
            >
              <i class="bx bxs-envelope-open"></i>
            </div>
          </div>
        </div>
    </div>
    `;
    postContainer.appendChild(item);
  });
};

// Show Read Posts
const readPostContainer = document.querySelector("#readPostContainer");
const showReadPosts = (description = "", viewCount = 0) => {
  const item = document.createElement("div");
  item.className =
    "w-full bg-white flex items-center justify-between p-4 rounded-lg gap-5";
  item.innerHTML = `
    <h1 class="font-bold">
        ${description}
      </h1>
      <div
        class="flex items-center gap-2 text-gray-500 font-semibold"
      >
        <i class="bx bx-show text-xl"></i>
        <span class="text-sm">${viewCount}</span>
    </div>
  `;
  readPostContainer.appendChild(item);
};

// Get Latest Post Using API
const getLatestPost = () => {
  fetch("https://openapi.programming-hero.com/api/retro-forum/latest-posts")
    .then((res) => res.json())
    .then((data) => showLatestPost(data))
    .catch((err) => console.log("Error: ", err));
};

// Show Latest Post
const latestContainer = document.querySelector("#latestPostContainer");
const showLatestPost = (posts) => {
  posts.map((post) => {
    const item = document.createElement("div");
    item.className = "p-4 border rounded-lg flex flex-col justify-between";
    item.innerHTML = `
      <div class="w-full h-[200px] rounded-md">
        <img
          src="${post.cover_image}"
          class="bg-gray-100 w-full h-full object-cover rounded-md"
          alt=""
        />
      </div>
      <div class="flex gap-3 items-center my-4">
        <i class="bx bx-calendar-minus text-gray-500"></i>
        <p class="text-sm font-semibold text-gray-400">${
          post.author?.posted_date || "No Publish Date"
        }</p>
      </div>
      <h3 class="text-base font-extrabold mb-2">
        ${post.title}
      </h3>
      <p class="text-sm font-semibold text-gray-500 mb-3">
        ${post.description}
      </p>
      <div class="flex gap-4 items-center">
        <div>
          <img
            src="${post.profile_image}"
            class="w-10 h-10 object-cover bg-gray-100 rounded-full"
            alt=""
          />
        </div>
        <div>
          <h4 class="font-extrabold">${post.author.name}</h4>
          <p class="text-xs font-semibold text-gray-500">${
            post.author.designation || "Unknown"
          }</p>
        </div>
      </div>
    `;
    latestContainer.appendChild(item);
  });
};

const search = document.getElementById("search");
const searchPost = () => {
  getPosts(search.value);
};

getPosts();
getLatestPost();
