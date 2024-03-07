const navItems = document.querySelectorAll("#nav-list a");
const activeLine = document.querySelector("#active-line");
const defaultImgSrc = "./images/img-placeholder.png";

const projects = [
    {
        title: "Freeplay Haven",
        description: "Finn spill som er gratis ved hjelp av API, med mulighet for sortering av kategorier, platformer, relevans, alfabetisk, popularitet og utgivelse dato. Inkluderer paginering.",
        imageSrc: "./images/project-images/freeplay-haven.jpg",
        languages: ["HTML", "CSS", "JavaScript"]
    },
    {
        title: "CubeDash",
        description: "Et spill hvor man beveger en kube for å unngå fallende kuber. Inkluderer vanskelighets-grad, score og high-score.",
        imageSrc: "./images/project-images/cubedash.jpg",
        languages: ["HTML", "CSS", "JavaScript"]
    },
    {
        title: "The Royal Edict of To-do's",
        description: "En oppgave liste hvor brukeren kan legge til oppgaver med en mulighet for manuell sortering, nummerering, avkrysning, skjuling og sletting av fullførte oppgaver.",
        imageSrc: "./images/project-images/todo-list.jpg",
        languages: ["HTML", "CSS", "JavaScript"]
    },
    {
        title: "Drumkit",
        description: "Vestibulum interdum, dolor sit amet gravida pulvinar, ipsum massa mattis turpis, ut dictum ante tellus quis ex. Quisque aliquet non tellus sodales consequat. Cras sapien ipsum, luctus at scelerisque rutrum, luctus non dui. Maecenas vitae ex at nunc sodales scelerisque.",
        imageSrc: "./images/project-images/drumkit.jpg",
        languages: ["HTML", "CSS", "JavaScript"]
    },
]

// Initialize
generateProjectCards();
let isScrolling = false;
updateActiveNavItem("hero")
// handleScroll("hero");


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
    const languageContainer = document.createElement("div");

    e.languages.forEach(lang => {
        const languageItem = document.createElement("p");
        languageItem.textContent = lang;
        languageItem.classList.add("card-language-item");
        languageContainer.append(languageItem);
    })

    title.textContent = e.title;
    description.textContent = e.description;
    e.imageSrc.length ? image.src = e.imageSrc : image.src = defaultImgSrc;

    cardContainer.classList.add("card-container")
    textContainer.classList.add("projects_text-container");
    title.classList.add("card-title");
    description.classList.add("card-description");
    image.classList.add("project-image");
    languageContainer.classList.add("card-language-container");

    textContainer.append(title, description)
    cardContainer.append(image, textContainer, languageContainer);
    projectsWrapper.append(cardContainer);
    })
}

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

    if (pageHeight() <= scrollPos + window.innerHeight) {
        return "contact";
    }

    sections.forEach(section => {
        if (scrollPos >= section.offsetTop - (window.innerHeight / 2)) currentSection = section.id;
    });

    return currentSection;
}