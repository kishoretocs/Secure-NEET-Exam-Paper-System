document.getElementById('decryption-request-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const questionid = document.getElementById('questionid').value;
  const requesterName = document.getElementById('requesterName').value;
  console.log(questionid,requesterName)
  try {
    const response = await fetch('http://localhost:3000/request-decrypt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ questionid, requesterName }),
    });

    const data = await response.text();
    const responseDiv = document.getElementById('response');

    if (response.ok) {
      responseDiv.textContent = 'Request created successfully!';
      responseDiv.style.color = 'green';
    } else {
      responseDiv.textContent = data || 'Failed to create request.';
      responseDiv.style.color = 'red';
    }
  } catch (error) {
    console.error('Error:', error);
    const responseDiv = document.getElementById('response');
    responseDiv.textContent = 'An error occurred while creating the request.';
    responseDiv.style.color = 'red';
  }
});
