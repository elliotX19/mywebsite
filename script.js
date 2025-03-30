// This JavaScript file controls the visibility of the project details section

const showDetailsButton = document.getElementById('show-details-btn');
const projectDetails = document.getElementById('project-details');

// Initially hide the project details section
projectDetails.style.display = 'none';

// Toggle the display of the project details when the button is clicked
showDetailsButton.addEventListener('click', function() {
    if (projectDetails.style.display === 'none') {
        projectDetails.style.display = 'block';
    } else {
        projectDetails.style.display = 'none';
    }
});
