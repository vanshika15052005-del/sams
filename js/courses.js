// courses.js

function applyCourse(courseName) {

    // store selected course
    localStorage.setItem("selectedCourse", courseName);

    alert("You selected " + courseName);

    // redirect to admission page
    window.location.href = "admission.html";
}