function showProjectDetails() {
    const projectDetails = document.getElementById('projectDetails');
    if (projectDetails.style.display === "none") {
        projectDetails.style.display = "block";  // Show the details
    } else {
        projectDetails.style.display = "none";  // Hide the details
    }
}
