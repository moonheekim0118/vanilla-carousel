!(function(d){
    let itemClassName="carousel__photo";
    let descriptionClassName="description";
    let items = d.getElementsByClassName(itemClassName);
    let descriptions = d.getElementsByClassName(descriptionClassName);
    let totalItems = items.length;
    let slide = 0;
    let moving = true;

    const disalbeInteraction=()=>{ // 캐러셀 움직이는동안 클릭 이벤트 못받도록 함 
                                  // moving === false일때 클릭이벤트 받을 수 있음 
        moving=true;
        setTimeout(()=>moving=false, 500);
    }

    const moveCarouselTo=(slide)=>{
        if(!moving){
            disalbeInteraction(); // true 
            let newPrevious = slide -1; // 새로운 previous
            let newNext = slide +1; // 새로운 next 
            let oldPrevious= slide -2; // 이전 previous
            let oldNext = slide +2; // 이전 next 
            
            if((totalItems-1) > 3){ // 총 image 가 3개 이상이라면 
                if(newPrevious <= 0){  // 새로운 previous가 0이거나 그보다 작다면 
                    oldPrevious=(totalItems-1); // 이전 previous는 끝에서 첫번째 
                }else if(newNext >= (totalItems-1)){  // 새로운 next가 맨 끝이거나 그보다 크다면 
                    oldNext=0; // 이전 next는 0
                }

                if(slide === 0){ // 슬라이드가 0 일경우 
                    newPrevious = (totalItems - 1); //새로운 previous는 마지막 
                    oldPrevious = (totalItems -2 );  
                    oldNext = slide +1;
                } else if(slide === (totalItems-1)){ // 슬라이드가 마지막 요소일경우 
                    newPrevious= slide -1;
                    newNext=0;
                    oldNext=1;
                }

                // oldPrevious, oldNext className에 prev, next붙은것 제거 
                items[oldPrevious].className = itemClassName;
                items[oldNext].className=itemClassName;

                descriptions[newPrevious].className=descriptionClassName;
                descriptions[newPrevious].className=descriptionClassName;
                
                items[newPrevious].className=itemClassName+ " prev";
                items[slide].className=itemClassName+ " active";
                items[newNext].className=itemClassName+" next";

                descriptions[slide].className=descriptionClassName+" active";
            }
        }
    }


    const moveNext=()=>{ // next 
        if(!moving){
            if(slide === (totalItems -1)){ // 마지막 슬라이드라면 0으로 리셋하기 
                slide=0;
            }else{
                slide++;
            }

            moveCarouselTo(slide);
        }
    }

    const movePrev=()=>{ // prev 
        if(!moving){
            if(slide === 0){
                slide= totalItems-1;
            }else{
                slide--;
            }
            moveCarouselTo(slide);
        }    
    }

    
    const setInitialClasses=()=>{ // initial 
        items[totalItems -1].classList.add("prev"); // prev로 저장
        items[0].classList.add("active"); // 현재 active
        items[1].classList.add("next"); // next로 저장 
    }

    const setEventListeners=()=>{ // next , prev 버튼에 대한 이벤트 리스너 
        let next = d.getElementsByClassName("carousel__button--next")[0];
        let prev = d.getElementsByClassName("carousel__button--prev")[0];
        
        next.addEventListener('click',moveNext);
        prev.addEventListener('click',movePrev);
    }

    const slideShow=()=>{
        setInterval(()=>{
            moveNext();
        },5000);
    }

    const initCarousel=()=>{
        setInitialClasses();
        setEventListeners();
        moving = false;
        slideShow();
    }
    initCarousel();
}(document));