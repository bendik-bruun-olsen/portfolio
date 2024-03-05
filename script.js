const navItems = document.querySelectorAll("#nav-list a");
const activeLine = document.querySelector("#active-line");
const defaultImgSrc = "./images/img-placeholder.png";

const projects = [
    {
        title: "Lorem Ipsum",
        description: "Vestibulum interdum, dolor sit amet gravida pulvinar, ipsum massa mattis turpis, ut dictum ante tellus quis ex. Quisque aliquet non tellus sodales consequat. Cras sapien ipsum, luctus at scelerisque rutrum, luctus non dui. Maecenas vitae ex at nunc sodales scelerisque.",
        imageSrc: "",
        languages: ["html", "css"]
    },
    {
        title: "Lorem Ipsum",
        description: "Vestibulum interdum, dolor sit amet gravida pulvinar, ipsum massa mattis turpis, ut dictum ante tellus quis ex. Quisque aliquet non tellus sodales consequat. Cras sapien ipsum, luctus at scelerisque rutrum, luctus non dui. Maecenas vitae ex at nunc sodales scelerisque.",
        imageSrc: "",
        languages: ["html", "css"]
    },
    {
        title: "Lorem Ipsum",
        description: "Vestibulum interdum, dolor sit amet gravida pulvinar, ipsum massa mattis turpis, ut dictum ante tellus quis ex. Quisque aliquet non tellus sodales consequat. Cras sapien ipsum, luctus at scelerisque rutrum, luctus non dui. Maecenas vitae ex at nunc sodales scelerisque.",
        imageSrc: "",
        languages: ["html", "css"]
    },
    {
        title: "Lorem Ipsum",
        description: "Vestibulum interdum, dolor sit amet gravida pulvinar, ipsum massa mattis turpis, ut dictum ante tellus quis ex. Quisque aliquet non tellus sodales consequat. Cras sapien ipsum, luctus at scelerisque rutrum, luctus non dui. Maecenas vitae ex at nunc sodales scelerisque.",
        imageSrc: "",
        languages: ["html", "css"]
    },
    {
        title: "Lorem Ipsum",
        description: "Vestibulum interdum, dolor sit amet gravida pulvinar, ipsum massa mattis turpis, ut dictum ante tellus quis ex. Quisque aliquet non tellus sodales consequat. Cras sapien ipsum, luctus at scelerisque rutrum, luctus non dui. Maecenas vitae ex at nunc sodales scelerisque.",
        imageSrc: "",
        languages: ["html", "css"]
    },
    {
        title: "Lorem Ipsum",
        description: "Vestibulum interdum, dolor sit amet gravida pulvinar, ipsum massa mattis turpis, ut dictum ante tellus quis ex. Quisque aliquet non tellus sodales consequat. Cras sapien ipsum, luctus at scelerisque rutrum, luctus non dui. Maecenas vitae ex at nunc sodales scelerisque.",
        imageSrc: "",
        languages: ["html", "css"]
    }
]

// Initialize


function generateProjectCards() {
    const projectsWrapper = document.querySelector("#projects-wrapper");

    projects.forEach(e => {
    const cardContainer = document.createElement("div");
    const textContainer = document.createElement("div");
    const title = document.createElement("h3");
    const description = document.createElement("p");
    const image = document.createElement("img");

    title.textContent = e.title;
    description.textContent = e.description;
    e.imageSrc.length ? image.src = e.imageSrc : image.src = defaultImgSrc;

    cardContainer.classList.add("card-container")
    textContainer.classList.add("text-container");
    description.classList.add("card-description");
    image.classList.add("project-image");

    textContainer.append(title, description)
    cardContainer.append(image, textContainer);
    projectsWrapper.append(cardContainer);
    })
}

generateProjectCards();

let isScrolling = false;

const pageHeight = () => {
    return Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
        );
}

updateActiveNavItem("hero")
handleScroll("hero");

function updateActiveNavItem(sectionName) {
    const navItem = document.querySelector(`a[href="#${sectionName}"]`);
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
    }, 600)
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