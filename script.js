document.getElementById('applicationForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission
    const form = event.target;
    const formData = new FormData(form); // Get the form data
    const messageDiv = document.getElementById('message');

     messageDiv.textContent = 'Submitting...';
    messageDiv.classList.remove('success', 'error');

    fetch('/submit', {
        method: 'POST',
        body: formData,
    })
        .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
           return response.text();
          
        })
        .then(data => {
            console.log(data);
            messageDiv.textContent = 'Application submitted successfully!';
            messageDiv.classList.add('success');
            form.reset();

        })
        .catch(error => {
            console.error('Submission error:', error);
             messageDiv.textContent = 'Error submitting application';
            messageDiv.classList.add('error');
           
        });
});