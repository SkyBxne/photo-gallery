"use strict";

const photos = [
    ["/img/photos/1.jpg", ["#black&white", "#sculpture", "#greek"]],
    ["/img/photos/2.jpg", ["#ship", "#ocean", "#painting"]],
    ["/img/photos/3.jpg", ["#greek", "#painting", "#evil"]],
    ["/img/photos/4.jpg", ["#black&white", "#nature", "#old"]],
    ["/img/photos/5.jpg", ["#people", "#greek", "#painting"]],
    ["/img/photos/6.jpg", ["#future", "#painting", "#nature"]],
    ["/img/photos/7.jpg", ["#renaissance", "#gold", "#photo"]],
    ["/img/photos/8.jpg", ["#painting", "#bar", "#people"]],
    ["/img/photos/9.jpg", ["#flowers", "#painting", "#colorful"]],
    ["/img/photos/10.jpg", ["#greek", "#sculpture", "#photo"]],
    ["/img/photos/11.jpg", ["#renaissance", "#painting", "#angels"]],
    ["/img/photos/12.jpg", ["#renaissance", "#photo", "#gold"]],
    ["/img/photos/13.jpeg", ["#angels", "#renaissance", "#painting"]],
    ["/img/photos/14.jpg", ["#painting", "#nature", "#far"]],
    ["/img/photos/15.jpg", ["#village", "#far", "#photo"]],
    ["/img/photos/16.jpeg", ["#painting", "#heaven", "#angels"]],
    ["/img/photos/17.jpg", ["#photo", "#renaissance", "#castle"]],
    ["/img/photos/18.jpg", ["#venice", "#river", "#photo"]]
];

const modalBg = document.querySelector(".modal-bg");
const commentTextInput = document.querySelector(".photo-comments-creator__input");
const commentLabelLength = document.querySelector(".photo-comments-creator__length-info");
const searchButton = document.querySelector(".search-form__button");
const searchInput = document.querySelector(".search-form__input");
const photoContainer = document.querySelector(".photos__grid");
const pageIcon = document.querySelector(".header__icon");
const searchResult = document.querySelector(".photos__search-result");

const media = window.matchMedia("(max-width: 105.75rem)");

const fragment = new DocumentFragment();

let currentPhoto;
let changeMedia;
if(media.matches) changeMedia = true;
else if(!media.matches) changeMedia = false;

let createdPhotos = [];

searchButton.addEventListener("click", () => {
    let tag = searchInput.value;
    searchPhoto(tag);
});

pageIcon.addEventListener("click", () => {
    window.location.reload();
});

media.addEventListener("change", e => {
    if(e.matches) return changeMedia = true;
    else if(!e.matches) return changeMedia = false;
});

const searchPhoto = (typedTag) => {
    let gottenPhotos = [];
    for(let photo in photos) {
        for(let tagGroup of photos[photo][1]) {
            let finalTag;
            typedTag.startsWith("#") ? finalTag = typedTag : finalTag = "#" + typedTag;
            if(tagGroup == finalTag) {
                gottenPhotos.push(photos[photo]);    
            }
        }
    }
    photoContainer.innerHTML = "";
    if(gottenPhotos.length > 0) {
        searchResult.style.display = "none";
        photoCreator(gottenPhotos); 
    }else {
        searchResult.style.display = "block";
        photoCreator(photos);
    }
}

const tagSelector = (tags) => {
    if(tags !== "") {
        let tag = tags.join(" ");
        return tag;
    }else {
        return "No tags";
    }
}

const moveThroughPhotos = (direction, photoBlurObj, photoObj, tagObject, commentObject, textInput, avaiablePhotos) => {   
    if(currentPhoto + direction >= 0 && currentPhoto + direction < avaiablePhotos.length) {
        let position = currentPhoto + direction;
        photoBlurObj.style.backgroundImage = `url(${avaiablePhotos[position][0]})`;
        photoObj.setAttribute("src", avaiablePhotos[position][0]);
        tagObject.innerHTML = avaiablePhotos[position][1];
        commentObject.innerHTML = "";
        textInput.value = "";
        currentPhoto = currentPhoto + direction;   
    }
}

const commentCreator = (commentsObj, comment) => {
    if(comment.length > 0) {
        const commentContainer = document.createElement("div");
        commentContainer.classList.add("container__comment");
        commentsObj.appendChild(commentContainer);

        const commentUser = document.createElement("p");
        commentUser.classList.add("comment__user");
        commentUser.textContent = "User__" + Math.floor(Math.random() * 500);
        commentContainer.appendChild(commentUser);

        const commentText = document.createElement("p");
        commentText.classList.add("comment__text");
        commentText.textContent = `${comment}`;
        commentContainer.appendChild(commentText);
    }
}

const openPhoto = (selectedPhoto /* url tags obj id */) => {  
        if(changeMedia) return;
        currentPhoto = parseInt(selectedPhoto[3]);

        const photoSection = document.createElement("section");
        photoSection.classList.add("photo-modal");


        const containerDiv = document.createElement("div");
        containerDiv.classList.add("photo-modal__container");
        containerDiv.style.animation = "openModal 0.2s linear both";
        photoSection.appendChild(containerDiv);

        /**/

        const closeButton = document.createElement("button");
        closeButton.classList.add("container__close-button");
        closeButton.innerHTML = `<span class="material-symbols-outlined">close</span>`;
        closeButton.addEventListener("click", () => {
            selectedPhoto[2].style.animation = "none";
            photoSection.style.animation = "closeModal 0.2s linear both";
            setTimeout(() => {
                photoSection.innerHTML = "";
                photoSection.remove();
            }, 200);
        });
        containerDiv.appendChild(closeButton);

        const infoDiv = document.createElement("div");
        infoDiv.classList.add("container__info-container");
        containerDiv.appendChild(infoDiv);

        /**/

        const photoDiv = document.createElement("div");
        photoDiv.classList.add("container__photo-container");
        infoDiv.appendChild(photoDiv);

        const photoBlurDiv = document.createElement("div");
        photoBlurDiv.classList.add("info-container__photo-blur");
        photoBlurDiv.style.backgroundImage = `url(${selectedPhoto[0]})`;
        photoDiv.appendChild(photoBlurDiv);

        const imgElement = document.createElement("img");
        imgElement.setAttribute("src", selectedPhoto[0]);
        photoDiv.appendChild(imgElement);

        const socialDiv = document.createElement("div");
        socialDiv.classList.add("container__social");
        infoDiv.appendChild(socialDiv);

        const photoInfoDiv = document.createElement("div");
        photoInfoDiv.classList.add("social__photo-info");
        socialDiv.appendChild(photoInfoDiv);

        const tagsTitle = document.createElement("p");
        tagsTitle.classList.add("photo-info__title");
        tagsTitle.textContent = "Tags";
        photoInfoDiv.appendChild(tagsTitle);

        const tagsContainer = document.createElement("p");
        tagsContainer.classList.add("photo-info__tags");
        tagsContainer.innerHTML = selectedPhoto[1];
        photoInfoDiv.appendChild(tagsContainer);

        const commentsContainerDiv = document.createElement("div");
        commentsContainerDiv.classList.add("social__photo-comments-container");
        socialDiv.appendChild(commentsContainerDiv);

        const commentsTitle = document.createElement("p");
        commentsTitle.classList.add("photo-comments-container__title");
        commentsTitle.textContent = "Comments";
        commentsContainerDiv.appendChild(commentsTitle);

        const commentsContainer = document.createElement("div");
        commentsContainer.classList.add("photo-comments-container__container");
        commentsContainerDiv.appendChild(commentsContainer);

        const commentCreatorDiv = document.createElement("div");
        commentCreatorDiv.classList.add("social__photo-comments-creator");
        socialDiv.appendChild(commentCreatorDiv);

        const textLength = document.createElement("label");
        textLength.classList.add("photo-comments-creator__length-info");
        textLength.setAttribute("for", "comment-creator-input");
        textLength.textContent = "0/200";
        commentCreatorDiv.appendChild(textLength);

        const textInput = document.createElement("input");
        textInput.classList.add("photo-comments-creator__input");
        textInput.setAttribute("type", "text");
        textInput.setAttribute("id", "comment-creator-input");
        textInput.setAttribute("maxlength", "200");
        textInput.addEventListener("input", () => {
            if(textInput.value.length >= 1) {
                let length = textInput.value.length;
                textLength.textContent = length + "/200";
                textLength.style.display = "block";
            }else {
                textLength.style.display = "none";
            }
        
            if(textInput.value.length >= 200) {
                textLength.style.color = "#c1121f";
            }else {
                textLength.style.color = "goldenrod";
            }
        });
        commentCreatorDiv.appendChild(textInput);

        const commentButton = document.createElement("button");
        commentButton.classList.add("photo-comments-creator__send");
        commentButton.innerHTML = `<span class="material-symbols-outlined">send</span>`;
        commentButton.addEventListener("click", () => {
            commentCreator(commentsContainer, textInput.value);
        });
        commentCreatorDiv.appendChild(commentButton);

        const leftButton = document.createElement("button");
        leftButton.classList.add("container__left-button");
        leftButton.innerHTML = `<span class="material-symbols-outlined">arrow_back_ios</span>`;
        leftButton.addEventListener("click", () => {
            moveThroughPhotos(-1, photoBlurDiv, imgElement, tagsContainer, commentsContainer, textInput, createdPhotos);
        });
        containerDiv.appendChild(leftButton);

        const rightButton = document.createElement("button");
        rightButton.classList.add("container__right-button");
        rightButton.innerHTML = `<span class="material-symbols-outlined">arrow_forward_ios</span>`;
        rightButton.addEventListener("click", () => {
            moveThroughPhotos(1, photoBlurDiv, imgElement, tagsContainer, commentsContainer, textInput, createdPhotos);
        });
        containerDiv.appendChild(rightButton);

        photoSection.style.display = "flex";

        document.body.append(photoSection);
}

const openCommentsModal = (tags) => {
    const mainSection = document.createElement("section");
    mainSection.classList.add("photo-comments");

    const containerDiv = document.createElement("div");
    containerDiv.classList.add("photo-comments__container");
    mainSection.appendChild(containerDiv);

    const closeButton = document.createElement("button");
    closeButton.classList.add("container__close-button-comments");
    closeButton.innerHTML = `<span class="material-symbols-outlined">close</span>`;
    closeButton.addEventListener("click", () => {
        mainSection.style.animation = "closeModal 0.2s linear both";
        containerDiv.style.animation = "closeCommentModal 0.2s ease-out both";
        setTimeout(() => {
            mainSection.innerHTML = "";
            mainSection.remove();
        }, 205);
    });
    containerDiv.appendChild(closeButton);

    const commentsContainer = document.createElement("container__comments-container");
    commentsContainer.classList.add("container__comments-container");
    containerDiv.appendChild(commentsContainer);

    const tagsText = document.createElement("p");
    tagsText.classList.add("comments-container__tags");
    tagsText.innerText = tags;
    commentsContainer.appendChild(tagsText);

    const commentsTitle = document.createElement("p");
    commentsTitle.classList.add("comments-container__title");
    commentsTitle.innerText = "Comments";
    commentsContainer.appendChild(commentsTitle);

    const commentsRealContainer = document.createElement("div");
    commentsRealContainer.classList.add("comments-container__container");
    commentsContainer.appendChild(commentsRealContainer);

    const commentsCreator = document.createElement("div");
    commentsCreator.classList.add("container__comment-creator");
    containerDiv.appendChild(commentsCreator);

    const labelLength = document.createElement("label");
    labelLength.classList.add("container__length-info");
    labelLength.setAttribute("for", "comment-creator-input");
    labelLength.innerText = "200/200";
    commentsCreator.appendChild(labelLength);

    const textInput = document.createElement("input");
    textInput.classList.add("container__input");
    textInput.setAttribute("type", "text");
    textInput.setAttribute("id", "comment-creator-input");
    textInput.setAttribute("maxlength", "200");
    textInput.addEventListener("input", () => {
        if(textInput.value.length >= 1) {
            let length = textInput.value.length;
            labelLength.textContent = length + "/200";
            labelLength.style.display = "block";
        }else {
            labelLength.style.display = "none";
        }
    
        if(textInput.value.length >= 200) {
            labelLength.style.color = "#c1121f";
        }else {
            labelLength.style.color = "goldenrod";
        }
    });
    commentsCreator.appendChild(textInput);

    const sendButton = document.createElement("button");
    sendButton.classList.add("container__send");
    sendButton.innerHTML = `<span class="material-symbols-outlined">send</span>`;
    sendButton.addEventListener("click", () => {
        commentCreator(commentsRealContainer, textInput.value);
    });
    commentsCreator.appendChild(sendButton);

    document.body.append(mainSection);
}

const photoCreator = (p) => {
    createdPhotos = [];
    for(let photo in p) {
        const mainDiv = document.createElement("div");
        mainDiv.classList.add("grid__photo-container");
        mainDiv.setAttribute("id", `${photo}`);

        const photoDiv = document.createElement("div");
        photoDiv.classList.add("photo-container__photo");
        mainDiv.appendChild(photoDiv);

        const imgElement = document.createElement("img");
        imgElement.setAttribute("src", p[photo][0]);
        photoDiv.appendChild(imgElement);

        const socialDiv = document.createElement("div");
        socialDiv.classList.add("photo-container__social");
        mainDiv.appendChild(socialDiv);

        const tagsContainer = document.createElement("p");
        tagsContainer.classList.add("photo-info__tags");
        tagsContainer.innerHTML = tagSelector(p[photo][1]);
        socialDiv.appendChild(tagsContainer);
        
        const openComments = document.createElement("button");
        openComments.classList.add("photo-info__open-comments-button");
        openComments.innerHTML = `Open comments`;
        openComments.addEventListener("click", () => {
            openCommentsModal(tagsContainer.innerText);
        });
        socialDiv.appendChild(openComments);

        let photoCreated = [p[photo][0], tagsContainer.innerText, photoDiv, mainDiv.getAttribute("id")];
        createdPhotos.push(photoCreated);

        mainDiv.addEventListener("click", () => {
            if(changeMedia) return;
            openPhoto(createdPhotos[photo]);
            modalBg.style.display = "block";
            photoDiv.style.animation = "openPhoto 0.3s linear both reverse"; 
        });

        fragment.append(mainDiv);
    }
    photoContainer.append(fragment);
}

photoCreator(photos);

// Add no results text
// Add all animations
// Fuck everything