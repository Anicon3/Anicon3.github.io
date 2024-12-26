let sections = document.getElementsByTagName('section');
for (let i = 0; i < sections.length; i++) {
    sections[i].classList.add("snap-section");
}
document.forms['registrationForm'].focus(function () {
    //console.log("form");
    document.getElementByclassName('snap-container').styel.scrollSnapType = "none";
    for (let i = 0; i < sections.length; i++) {
        document.getElementByclassName('snap-section')[i].style.scrollSnapAlign = "none";
    }
});
function scroll_pro () {
    //console.log(document.getElementsByClassName("snap-container"), "pro");
    document.getElementsByClassName("snap-container")[0].style.scrollSnapType = "y proximity";
}
function scroll_man () {
    //console.log(document.getElementsByClassName("snap-container"), "man");
    document.getElementsByClassName("snap-container")[0].style.scrollSnapType = "y mandatory"
}
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            //console.log(entry);
            if (entry.isIntersecting) {
                scroll_pro();
            } else {
                scroll_man();
            }
        })
    },
    {
        threshold: 0
    }
);
const section_ele = document.querySelectorAll('form');
section_ele.forEach(el => observer.observe(el));
const observer_ani = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            //console.log(entry);
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            } else {
                entry.target.classList.remove("show");
            }
        })
    },
    {
        threshold: 0.25
    }
);
const section_ele_ani = document.querySelectorAll('.snap-section');
section_ele_ani.forEach(el => observer_ani.observe(el));
