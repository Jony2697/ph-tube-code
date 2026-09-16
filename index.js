function loadCategories() {
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
        .then(res => res.json())
        .then(data => {
            handleCategories(data.categories);

        })
}

const handleCategories = (categories) => {
    const categoryContainer = document.getElementById("category-container");
    for (let cat of categories) {
        const div = document.createElement("div");
        div.innerHTML = `
            <button class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
        `;
        categoryContainer.appendChild(div);

    }

}


function loadVideoes() {
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
        .then(res => res.json())
        .then(data => {
            handleLoadVideos(data.videos);


        })
}

const handleLoadVideos = (videos) => {
    const videoContainer = document.getElementById("loadVideo-container");
    videos.forEach((video) => {
        console.log(video);

        const div = document.createElement("div");
        div.innerHTML = `
            
            <div class="card bg-base-100 w-full h-full  shadow-sm">
  <figure>
    <img 
    
      src=${video.thumbnail}
      alt="Shoes"
      class="w-full h-50"
      />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${video.title}</h2>
    <p>${video.description}</p>
    <div class="card-actions justify-end">
      <button class="btn btn-primary">Buy Now</button>
    </div>
  </div>
</div>
        `
        videoContainer.appendChild(div);

    })



}




loadCategories();
loadVideoes();
