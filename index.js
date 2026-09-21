
const showLoader=()=>{
    document.getElementById("loader").classList.remove("hidden");
    document.getElementById("loadVideo-container").classList.add("hidden");
}
const hideLoader=()=>{
    document.getElementById("loader").classList.add("hidden");
    document.getElementById("loadVideo-container").classList.remove("hidden");
}


function loadCategories() {
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
        .then(res => res.json())
        .then(data => {
            handleCategories(data.categories);

        })
}


function removeActiveClass(){
    const removeClass=document.getElementsByClassName("active");
    for(const remove of removeClass){
        remove.classList.remove("active");
    }
    
}

function loadSingleVideos(id){
    fetch(`https://openapi.programming-hero.com/api/phero-tube/video/${id}`)
    .then(res=>res.json())
    .then(data=>loadSingleVideo(data.video)
    )
   
}


const loadSingleVideo=(singleVideos)=>{
    // console.log(singleVideos);
    document.getElementById("video_details").showModal();
    const detailsContainer=document.getElementById("details_container");
    detailsContainer.innerHTML=`
        <div class="card bg-base-100 image-full w-96 shadow-sm mx-auto">
  <figure>
    <img
      src=${singleVideos.thumbnail}
      alt="Shoes"
      class="w-full h-full object-cover" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${singleVideos.title}</h2>
    <p>${singleVideos.description}</p>
  </div>
</div>
    `
    
}


const handleCategories = (categories) => {
    const categoryContainer = document.getElementById("category-container");
    for (let cat of categories) {
        // console.log(cat.category_id);
        
        const div = document.createElement("div");
        div.innerHTML = `
            <button id="btn-${cat.category_id}" onclick="loadCategoriesVideo(${cat.category_id},this)"  class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
        `;
        categoryContainer.appendChild(div);

    }

}



const loadCategoriesVideo=(id)=>{
    showLoader();
    const loadCategoryContainer=document.getElementById("loadCategory-container");
    const url=`https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
    // console.log(id);

    fetch(url)
    .then((res) => res.json())
    .then((data) => {
        removeActiveClass();
        const clickButton=document.getElementById(`btn-${id}`);
        clickButton.classList.add("active");
        // console.log(clickButton);
        
        handleLoadVideos(data.category)
    });
  
     
}


function loadVideoes(searchText = "") {
    showLoader();
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
        .then(res => res.json())
        .then(data => {
            removeActiveClass();
            document.getElementById("btn-all").classList.add("active");
            handleLoadVideos(data.videos);


        })
}

const handleLoadVideos = (videos) => {
    showLoader();
    const videoContainer = document.getElementById("loadVideo-container");
    videoContainer.innerHTML="";
    if(videos.length == 0 ){
        videoContainer.innerHTML=`
         <div class="col-span-full flex flex-col justify-center items-center gap-6 py-18">
            <img class="w-36" src="img/Icon.png" alt="">
            <h1 class="text-2xl font-semibold text-center">Oops!! Sorry, There is <br> no content here</h1>
        </div>
        `;
        hideLoader();
        return;
    }

    videos.forEach((video) => {
        // console.log(video);

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
            <button onclick=loadSingleVideos('${video.video_id}') class="btn btn-block">Show details</button>
        </div>

        `
        videoContainer.appendChild(div);

    });
    hideLoader();

}


document.getElementById("search-input").addEventListener("keyup",(e)=>{
    const input=e.target.value;
    loadVideoes(input);
    
})




loadCategories();
loadVideoes();

