document.getElementById("decryptForm").addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const questionId = document.getElementById("questionId").value;
    const sharesInput = document.getElementById("shares").value;
    const shares = sharesInput.split("\n").map((share) => share.trim()); // Split shares by line
  
    const resultDiv = document.getElementById("result");
    const questionOutput = document.getElementById("decryptedQuestion");
    const optionsOutput = document.getElementById("decryptedOptions");
  
    try {
      const response = await fetch(`/decrypt/${questionId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ shares }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to decrypt the question. Check your shares or ID.");
      }
  
      const data = await response.json();
  
      // Update the UI with the decrypted question and options
      questionOutput.textContent = data.question;
      optionsOutput.innerHTML = "";
      data.options.forEach((option) => {
        const li = document.createElement("li");
        li.textContent = option;
        optionsOutput.appendChild(li);
      });
  
      resultDiv.classList.remove("hidden");
    } catch (err) {
      alert(err.message);
      resultDiv.classList.add("hidden");
    }
  });
  