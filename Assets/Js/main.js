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
          const svGalleryTemplate = document.querySelector("#svGalleryTemplate").content.cloneNode(true);
          const svGallerySection = document.querySelector("#svGallerySection");
          svGallerySection.appendChild(svGalleryTemplate);
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
                         const currEleImg = currEle.querySelector("img");
                         currEleImg.setAttribute("elementTiming", "thumb" + eval(index + 1));

                         const observer2 = new PerformanceObserver((imageNodes) => {
                              imageNodes.getEntries().forEach((image) => {
                                   const thumbEle = `thumb${index + 1}.webp`;
                                   if (image.identifier === ("thumb" + eval(index + 1))) {
                                        console.log(image.identifier);
                                        const loadingEle = currEle.querySelector(".galImgPreloader");
                                        loadingEle.style.display = "none";
                                   }
                              });
                         });
                         observer2.observe({ type: "element", buffered: true });
                         
                         
                         // Add click event to open image in lightbox
                         currEle.addEventListener("click", ()=>{
                              const dialog = document.querySelector(".svGallerySection dialog");
                              const closeLightbox = document.querySelector(".closeLightbox");
                              dialog.showModal();
                              dialog.addEventListener("blur", ()=>dialog.close());   
                              closeLightbox.addEventListener("click", ()=>dialog.close());
                              const lightbox = document.querySelector(".lightbox");
                              lightbox.style.display = "block";
                              const lightboxImg = document.querySelector(".lightboxImgViewer img");
                              lightboxImg.src = `Assets/Images/Gallery/thumbs/thumb${index + 1}.webp`;
                              lightboxImg.alt = "Sri Vinayaka Mini Function Hall image in Beechupally Gadwal";
                              // const closeLightbox = document.querySelector(".closeLightbox");
                              // closeLightbox.addEventListener("click", ()=>{
                              //      lightbox.style.display = "none";
                              // });
                         }); 
                 
                    }
               }
               imageLoader();
          })
          
          footerSectionLoader();
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
                                       // persformanceTiming Observer    
                                       const aboutImg = document.querySelector("#aboutImg");   
                                        const observer = new PerformanceObserver((list) => {
                                             list.getEntries().forEach((entry) => {
                                                  if (entry.identifier === "abt-img") {
                                                       document.querySelector(".imgLoading").style.display = "none";
                                               imgOverlay.classList.add("overlay");
                                             }
                                       
                                           });
                                         });
                                         if(aboutImg.elementTiming === "abt-img"){
                                              observer.observe({ type: "element", buffered: true });
                                         }
                                         else{
                                             aboutImg.addEventListener("load", ()=>{
                                                  document.querySelector(".imgLoading").style.display = "none";
                                                  imgOverlay.classList.add("overlay");    
                                             })
                                         }
                                        //  if(Element.elementTiming) {
                                   
                                    
                         }
               })
          });
          intObsever.observe(aboutContentWrapper);
               galleryImagesLoader();
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