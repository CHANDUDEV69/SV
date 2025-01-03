document.addEventListener("DOMContentLoaded", ()=>{
     const hamButton = document.querySelector("#hamburgerIcon");
     const svNav = document.querySelector(".svNav");
     const bannerBg = document.querySelector(".bannerBg");
     const bannerContent = document.querySelector(".bannerContent");
     const servicesFrame = document.querySelector(".svServicesSection");

     hamButton.addEventListener("click", ()=>{
          svNav.classList.toggle("show");
     });

     const footerSectionLoader = () => {
          const footerContent = document.querySelector("#footerTemplate").content.cloneNode(true);
          const footerFrame = document.querySelector(".svFooterSection");
          footerFrame.classList.add("active");
          footerFrame.appendChild(footerContent);
     }
     const galleryImagesLoader = () => {
          const galleryImages = document.querySelector(".galleryImages");
          const allImages = document.querySelectorAll(".galleryImages .thumb");
          allImages.forEach((image, index)=>{
               async function imageLoader() {
                    const imageUrl = `Assets/Images/Gallery/thumbs/thumb${index + 1}.webp`;
                    const result = await fetch(imageUrl);
                    if(result.status == 200){
                         const img = new Image();
                         img.src = imageUrl;
                         img.alt = "Sri Vinayaka Mini Function Hall image in Beechupally Gadwal";
                         img.style.width = "100%";
                         img.style.objectFit = "cover";
                         const currEle = allImages[index];
                         currEle.appendChild(img);
                         const testEle = currEle.querySelector(".galImgPreloader");
                         testEle.style.display = "none";
                         console.log(testEle);
                         
                    }
               }
               imageLoader();
          })
     }
     const aboutSectionLoader = () => {
          const aboutContent = document.querySelector("#svAboutTemplate").content.cloneNode(true);
          const aboutFrame = document.querySelector(".svAboutSection");
          aboutFrame.classList.add("active");
          aboutFrame.appendChild(aboutContent);
          const aboutContentWrapper = document.querySelector(".aboutContentWrapper");
          const intObsever = new IntersectionObserver((entries)=>{
                    entries.forEach(entry => {
                         if(entry.isIntersecting){
                              const imgOverlay = document.querySelector(".aboutContentWrapper figure");
                              imgOverlay.style.transition = "0.6s ease-in-out";
                              imgOverlay.classList.add("overlay");
                         }
               })
          });
          intObsever.observe(aboutContentWrapper);
               galleryImagesLoader();
               footerSectionLoader();
     }
     const servicesSection = () => {
          const servicesContent = document.querySelector("#servicesTemplate").content.cloneNode(true);
          servicesFrame.classList.add("active");
          servicesFrame.appendChild(servicesContent);
          aboutSectionLoader();
     }
     async function imageLoader() {
          const imgLoadinSpinner = document.querySelector(".imgLoadinSpinner");
          imgLoadinSpinner.style.display = "block";
          const imgUrl = bannerBg.dataset.background;
          const result = await fetch(imgUrl);
          if(result.status == 200){
               const bannerImg = new Image();
               const bannerURL = result.url;
               bannerImg.src = bannerURL;
               bannerImg.classList.add("loading");
               bannerImg.style.transition = "0.6s ease-in-out";
               bannerImg.alt = "Sri Vinayaka Lodge image in Beechupally Gadwal";
               bannerImg.addEventListener("load", ()=>{
                    bannerImg.classList.remove("loading");
                    bannerImg.setAttribute("id","bannerImg");
                    bannerBg.appendChild(bannerImg);
                    imgLoadinSpinner.style.display = "none";
                    bannerContent.classList.add("active");
                    // Load services section
                    servicesSection();
               })
          }
     }
     imageLoader();
})