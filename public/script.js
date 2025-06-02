// script.js
document.getElementById("question-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  // Collect form data
  const questionid = document.getElementById("id").value;
  const questionText = document.getElementById("question").value;
  const options = document.getElementById("options").value.split(",");
  const createdBy = document.getElementById("createdBy").value;

  try {
    // Send data to the backend
    console.log('ehhhhhhh')
    const response = await fetch("http://localhost:3000/questions/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ questionid, questionText, options, createdBy }),
    });

    const data = await response.json();

    // Handle response
    const responseDiv = document.getElementById("response");
    if (response.ok) {
      responseDiv.textContent = data.message;
      responseDiv.className = "response success";
      document.getElementById("question-form").reset();
    } else {
      responseDiv.textContent = data.message || "Failed to create question";
      responseDiv.className = "response error";
    }
  } catch (error) {
    console.error("Error:", error);
    const responseDiv = document.getElementById("response");
    responseDiv.textContent = "An error occurred while creating the question";
    responseDiv.className = "response error";
  }
});
// script.js
document.getElementById("question-form").addEventListener("submit", async (e) => {
    e.preventDefault();
  
    // Collect form data
    const id = document.getElementById("id").value;
    const question = document.getElementById("question").value;
    const options = document.getElementById("options").value.split(",");
    const createdBy = document.getElementById("createdBy").value;
  
    try {
      // Send data to the backend
      console.log('ehhhhhhh')
      const response = await fetch("http://localhost:3000/questions/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, question, options, createdBy }),
      });
  
      const data = await response.json();
  
      // Handle response
      const responseDiv = document.getElementById("response");
      if (response.ok) {
        responseDiv.textContent = data.message;
        responseDiv.className = "response success";
        document.getElementById("question-form").reset();
      } else {
        responseDiv.textContent = data.message || "Failed to create question";
        responseDiv.className = "response error";
      }
    } catch (error) {
      console.error("Error:", error);
      const responseDiv = document.getElementById("response");
      responseDiv.textContent = "An error occurred while creating the question";
      responseDiv.className = "response error";
    }
  });
  