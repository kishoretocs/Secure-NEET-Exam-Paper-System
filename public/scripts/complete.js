// Select the form and response message element
const form = document.getElementById('completeRequestForm');
const responseMessage = document.getElementById('responseMessage');

// Handle form submission
form.addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent default form submission

  // Get form data
  const questionid = document.getElementById('questionid').value;
  const username = document.getElementById('username').value;

  try {
    // Send data to the server
    const response = await fetch('http://localhost:3000/users/complete-request', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ questionid, username }),
    });

    // Parse response
    const data = await response.json();

    // Display response message
    if (response.ok) {
      responseMessage.style.color = 'green';
      responseMessage.textContent = data.message;
    } else {
      responseMessage.style.color = 'red';
      responseMessage.textContent = data.message || 'An error occurred.';
    }
  } catch (error) {
    console.error('Error:', error);
    responseMessage.style.color = 'red';
    responseMessage.textContent = 'Failed to complete request. Please try again.';
  }
});
