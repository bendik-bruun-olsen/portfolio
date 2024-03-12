const navItems = document.querySelectorAll("#nav-list a");
const activeLine = document.querySelector("#active-line");
const defaultImage = "./images/img-placeholder.png";
let isScrolling = false;

const projects = [
    {
        title: "Freeplay Haven",
        description: "Finn spill som er gratis ved hjelp av API, med mulighet for sortering av kategorier, platformer, relevans, alfabetisk, popularitet og utgivelse dato. Inkluderer paginering.",
        image: "freeplay-haven.jpg",
        languages: ["HTML", "CSS", "JavaScript"],
        githubLink: "https://github.com/bendik-kodehode/Freeplay_Haven",
        websiteLink: "https://bendik-kodehode.github.io/Freeplay_Haven/"
    },
    {
        title: "CubeDash",
        description: "Et spill hvor man beveger en kube for å unngå fallende kuber. Inkluderer vanskelighets-grad, score og high-score.",
        image: "cubedash.jpg",
        languages: ["HTML", "CSS", "JavaScript"],
        githubLink: "https://github.com/bendik-kodehode/Cubedash",
        websiteLink: "https://bendik-kodehode.github.io/Cubedash/"
    },
    {
        title: "The Royal Edict of To-do's",
        description: "En oppgave liste hvor brukeren kan legge til oppgaver med en mulighet for manuell sortering, nummerering, avkrysning, skjuling og sletting av fullførte oppgaver.",
        image: "todo-list.jpg",
        languages: ["HTML", "CSS", "JavaScript"],
        githubLink: "https://github.com/bendik-kodehode/The_Royal_Edict_of_To-dos",
        websiteLink: "https://bendik-kodehode.github.io/The_Royal_Edict_of_To-dos/"
    },
    {
        title: "Drumkit",
        description: "Spill av forskjellige tromme-lyder ved hjelp av hotkeys eller klikking på instrumentene",
        image: "drumkit.jpg",
        languages: ["HTML", "CSS", "JavaScript"],
        githubLink: "https://github.com/bendik-kodehode/Drumkit",
        websiteLink: "https://bendik-kodehode.github.io/Drumkit/"
    },
]

window.addEventListener("resize", () => {
    decideArrowDirection();
})

const initialize = () => {
    generateProjectCards();
    updateActiveNavItem("hero")
    // handleScroll("hero");
    decideArrowDirection();
}
initialize();

// Find the proper page height (Due to inconsistency across different browsers)
const pageHeight = () => {
    return Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
        );
}

function generateProjectCards() {
    const projectsWrapper = document.querySelector("#projects-wrapper");

    projects.forEach(e => {
    const cardContainer = document.createElement("div");
    const textContainer = document.createElement("div");
    const title = document.createElement("h3");
    const description = document.createElement("p");
    const image = document.createElement("img");
    const imageWebsiteAnchor = document.createElement("a");
    const iconsWrapper = document.createElement("div");
    const languageContainer = document.createElement("div");
    const sourceContainer = document.createElement("div");
    const githubIcon = document.createElement("img");
    const githubAnchor = document.createElement("a");
    const websiteIcon = document.createElement("img");
    const websiteIconAnchor = document.createElement("a");

    e.languages.forEach(lang => {
        const languageItem = document.createElement("p");
        languageItem.textContent = lang;
        languageItem.classList.add("card-language-item");
        languageContainer.append(languageItem);
    })

    title.textContent = e.title;
    description.textContent = e.description;

    // Set default placeholder if image not provided
    e.image.length ? 
        image.src = `./images/project-images/${e.image}` : 
        image.src = defaultImage;

    githubIcon.src = "./images/icons/Github.png";
    websiteIcon.src = "./images/icons/website.png";
    imageWebsiteAnchor.href = e.websiteLink;
    githubAnchor.href = e.githubLink;
    websiteIconAnchor.href = e.websiteLink;
    imageWebsiteAnchor.target = "_blank";
    githubAnchor.target = "_blank";
    websiteIconAnchor.target = "_blank";

    cardContainer.classList.add("card-container")
    textContainer.classList.add("projects_text-container");
    title.classList.add("card-title");
    description.classList.add("card-description");
    image.classList.add("project-image");
    iconsWrapper.classList.add("card-icons-wrapper");
    languageContainer.classList.add("card-language-container");
    sourceContainer.classList.add("card-source-container");
    githubIcon.classList.add("card-source-icon");
    websiteIcon.classList.add("card-source-icon");

    textContainer.append(title, description);
    githubAnchor.append(githubIcon);
    websiteIconAnchor.append(websiteIcon);
    sourceContainer.append(githubAnchor, websiteIconAnchor);
    iconsWrapper.append(sourceContainer, languageContainer);
    imageWebsiteAnchor.append(image);
    cardContainer.append(imageWebsiteAnchor, textContainer, iconsWrapper);
    projectsWrapper.append(cardContainer);
    })
}

navItems.forEach(item => {
    item.addEventListener("click", function(e) {
        e.preventDefault();
        isScrolling = true;
        const selectedSection = this.getAttribute("href").substring(1);
        updateActiveNavItem(selectedSection);
        handleScroll(selectedSection);
    })
});

window.addEventListener("scroll", () => {
    if (!isScrolling) updateActiveNavItem(findNearestSection());
});

function updateActiveNavItem(sectionName) {
    const navItem = document.querySelector(`a[href="#${sectionName}"]`);
    navItems.forEach(item => { 
        item.classList.remove("active-nav-item") 
    })
    navItem.classList.add("active-nav-item");
    
    if (navItem) {
        activeLine.style.width = `${navItem.offsetWidth}px`;
        activeLine.style.transform = `translateX(${navItem.offsetLeft}px)`;
    }
}

function handleScroll(sectionName) {
    const targetSection = document.querySelector(`#${sectionName}`)
    window.scrollTo({
        top: targetSection.offsetTop,
        behavior: "smooth"
    })
    setTimeout(() => {
        isScrolling = false;
    }, 1000)
}

function findNearestSection() {
    const sections = document.querySelectorAll("section");
    const scrollPos = window.scrollY;
    let currentSection = "";

    // If at bottom of page
    if (pageHeight() <= scrollPos + window.innerHeight) return "contact";

    sections.forEach(section => {
        if (scrollPos >= section.offsetTop - (window.innerHeight / 2)) currentSection = section.id;
    });

    return currentSection;
}

function decideArrowDirection() {
    // Changes the arrow orientation in contact section
    const arrow = document.querySelector("#contact-arrow");

    if (window.innerWidth < 1024) {
        arrow.classList.remove("fa-arrow-right");
        arrow.classList.add("fa-arrow-down");
    } else {
        arrow.classList.remove("fa-arrow-down");
        arrow.classList.add("fa-arrow-right");
    }
}