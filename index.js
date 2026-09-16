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
            <figure class="relative">
                <img src=${video.thumbnail} alt="Shoes" class="w-full h-50" />
                <span class="absolute bottom-2 right-2 px-2 bg-[#171717] text-white rounded-sm">3hrs 56 min ago</span>
            </figure>
            <div class="flex gap-3 px-1 py-5">
                <div class="profile">
                    <div class="avatar">
                        <div class="ring-primary ring-offset-base-100 w-10 rounded-full ">
                            <img alt="Tailwind-CSS-Avatar-component"
                                src=${video.authors[0].profile_picture} />
                        </div>
                    </div>
                </div>
                <div class="intro">
                    <h2 class="card-title">${video.title}</h2>
                    <p class="flex items-center gap-2 text-[#17171770]">${video.authors[0].profile_name}  
                    ${
                        video.authors[0].verified === true ? `<img class="w-4 h-4"
                            src="https://img.icons8.com/?size=96&id=98A4yZTt9abw&format=png" alt="verified badge"></img>`: ""
                    }</p>
                    <p class="text-[#17171770]">${video.others.views}</p>
                </div>
            </div>
        </div>

        `
        videoContainer.appendChild(div);

    })



}




loadCategories();

