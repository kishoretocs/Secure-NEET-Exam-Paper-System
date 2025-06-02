// Select the form and result message element
const form = document.getElementById('checkResultForm');
const resultMessage = document.getElementById('resultMessage');

// Handle form submission
form.addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent default form submission

  // Get the question ID from the input
  const questionid = document.getElementById('questionid').value;

  try {
    // Fetch the request details
    console.log(questionid)
    const response = await fetch(`http://localhost:3000/request/${questionid}`);
    const request = await response.json();
    console.log(typeof(request.sharesReceived))
  
    // Check if shares are sufficient
    if (Object.keys(request.sharesReceived).length >= 3) {
      // If sufficient, fetch decrypted question
      console.log('------------------')
      const decryptResponse = await fetch(`http://localhost:3000/questions/decrypt/${questionid}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ shares: Object.values(request.sharesReceived) }),
      });

      const decryptData = await decryptResponse.json();

      if (decryptResponse.ok) {
        // Display decrypted data
        resultMessage.style.color = 'green';
        resultMessage.innerHTML = `
          <h2>Decrypted Question:</h2>
          <p>${decryptData.question}</p>
          <h3>Options:</h3>
          <ul>
            ${decryptData.options.map((option) => `<li>${option}</li>`).join('')}
          </ul>
        `;
      } else {
        // Handle decryption errors
        resultMessage.style.color = 'red';
        resultMessage.textContent = decryptData.error || 'Decryption failed.';
      }
    } else {
      // If shares are insufficient
      resultMessage.style.color = 'orange';
      resultMessage.textContent = `More shares are needed. Currently have ${request.sharesReceived}.`;
    }
  } catch (error) {
    // Handle general errors
    console.error('Error:', error);
    resultMessage.style.color = 'red';
    resultMessage.textContent = 'Failed to fetch result. Please try again.';
  }
});
