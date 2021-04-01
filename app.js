const searchBtn = document.getElementById('searchBtn');
const photoContainer = document.querySelector('.photo-container');
const photoInfo = document.querySelector(".photo-info");

showPhoto("")
searchBtn.addEventListener('click',(e)=>{
    photoContainer.innerHTML =""
    e.preventDefault()
    getSearchResult();
})

getRandomSearchResult()

async function getRandomSearchResult(){
    
    const searchText = ""
    const res =await fetch(`https://pixabay.com/api/?key=15827863-aa46d1474e83bb6e56d23734f&q=${searchText}s&image_type=photo&pretty=true`);
    const resData  =await res.json();
    
 
        for(let i=0;i<resData.hits.length;i++){
           showPhoto(resData.hits[i]);
          
        }
}


async function getSearchResult(){
    document.querySelector('.banner').style.display="none"
    const searchText = document.getElementById('searchText').value;
    const res =await fetch(`https://pixabay.com/api/?key=15827863-aa46d1474e83bb6e56d23734f&q=${searchText}s&image_type=photo&pretty=true`);
    const resData  =await res.json();

      console.log(resData);
      if(resData.hits.length===0){
          const photo = document.createElement("div");
          photo.classList.add('photo');
          photo.innerHTML = `<h1>No Search found about ${searchText}</h1>`
          photoContainer.appendChild(photo)
      }
        for(let i=0;i<resData.hits.length;i++){
           showPhoto(resData.hits[i],searchText);
          
        }
}



function showPhoto(photoData,searchText=""){
    if(photoData.userImageURL){
        const photo = document.createElement("div");
        photo.classList.add("photo");
    
        photo.innerHTML = `
     
        <div class="photo-header">
            
                <img src="${photoData.userImageURL}" class="avatar" alt="userImage">
                <strong>${photoData.user}</strong>
           
        </div>
        <div class="img-container">
            <img class="photo-img" src="${photoData.largeImageURL}" alt="Image">
        </div>
        <div class="photo-body">
                <div class="photo-left">
                    <button class="like-btn"><i class="fas fa-heart"></i></button>
                    <button class="add-btn"><i class="fas fa-plus"></i></button>
                    
                </div>
                <div class="photo-right">
                    <button><a target="_blank" href="${photoData.largeImageURL}" download="${photoData.largeImageURL}">Download</a></button>
                </div>
         
        </div>
    
        `

        const likeBtn = photo.querySelector(".like-btn");
        likeBtn.addEventListener('click',()=>{
            likeBtn.classList.toggle("red")
        })
        
        const addBtn = photo.querySelector(".add-btn");
        addBtn.addEventListener('click',()=>{
            alert("added to fav")
        })



        const image  = photo.querySelector(".photo-img");
        image.addEventListener("click",()=>{
            console.log("Suhas")
            photoInfo.innerHTML = ""
            photoInfo.style.visibility = 'visible'
            const infoContainer = document.createElement("div");
            infoContainer.classList.add("info-container");

            infoContainer.innerHTML = ` 
            <h2>Image Info</h2>
            <button class="close-btn"><i class="fas fa-times"></i></button>
            <img src="${photoData.largeImageURL}" alt="Image">
            <div class="info-body">
                <div class="info-box">
                      <strong>Views</strong><span>${photoData.views}</span>
                    
                </div>
                <div class="info-box">
                    <strong>Likes</strong><span>${photoData.likes}</span>
                  
              </div>
              <div class="info-box">
                <strong>Downloads</strong><span>${photoData.downloads}</span>
              
          </div> 
 
            </div>
        `
        const closeBtn = infoContainer.addEventListener('click',()=>{
            photoInfo.style.visibility = 'hidden'
        })
        photoInfo.appendChild(infoContainer);
        })
        
        photoContainer.appendChild(photo)
    }
   
}

