// 1. Array of Certificate Course Objects
const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces development basics...',
        completed: true // Mark true if completed
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces structural styling HTML/CSS...',
        completed: true // Mark true if completed
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Building structurally sound applications using blocks...',
        completed: false
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Introductory overview exploring Object Oriented frameworks...',
        completed: false
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Web Frontend Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'In-depth focus covering DOM manipulation and design layouts...',
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Web Frontend Development II',
        credits: 3,
        certificate: 'Web and Computer Programming',
        description: 'Advanced production scale front-end responsive building architectural practices...',
        completed: false
    }
];

// 2. Core Initializer
document.addEventListener("DOMContentLoaded", () => {
    displayCourses(courses);
    setupFilterButtons();
    renderFooterData();
});

// 3. Render and Filter Cards Engine
function displayCourses(filteredCourses) {
    const container = document.getElementById("course-list-container");
    container.innerHTML = ""; // Empty out data layout

    filteredCourses.forEach(course => {
        const card = document.createElement("div");
        card.classList.add("course");
        
        // Add styling if completed matches true 
        if (course.completed) {
            card.classList.add("completed");
        }
        
        card.textContent = `${course.subject} ${course.number}`;
        container.appendChild(card);
    });

    // Compute dynamic running reduce function credit sums
    const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    document.getElementById("total-credits").textContent = totalCredits;
}

// 4. Setup Event Listeners for Filters
function setupFilterButtons() {
    const btnAll = document.getElementById("btn-all");
    const btnCse = document.getElementById("btn-cse");
    const btnWdd = document.getElementById("btn-wdd");
    const buttons = [btnAll, btnCse, btnWdd];

    function clearActiveClasses() {
        buttons.forEach(btn => btn.classList.remove("active"));
    }

    btnAll.addEventListener("click", () => {
        clearActiveClasses();
        btnAll.classList.add("active");
        displayCourses(courses);
    });

    btnCse.addEventListener("click", () => {
        clearActiveClasses();
        btnCse.classList.add("active");
        const cseCourses = courses.filter(course => course.subject === "CSE");
        displayCourses(cseCourses);
    });

    btnWdd.addEventListener("click", () => {
        clearActiveClasses();
        btnWdd.classList.add("active");
        const wddCourses = courses.filter(course => course.subject === "WDD");
        displayCourses(wddCourses);
    });
}

// 5. Dynamic Footer Management
function renderFooterData() {
    // Inject Year
    const currentYearSpan = document.getElementById("currentyear");
    if(currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
    
    // Inject modification stamps strings safely
    const lastModParagraph = document.getElementById("lastModified");
    if(lastModParagraph) {
        lastModParagraph.textContent = `Last Modification: ${document.lastModified}`;
    }
}