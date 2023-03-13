const form = document.getElementById("fitness-form");
const submitBtn = document.getElementById("submit-btn");

form.addEventListener("submit", async (e) => {
  e.preventDefault(); // prevent the form from submitting normally

  // create an object to store the form data
  const formData = {};
  const elements = e.target.elements;
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    if (element.type == "number") {
      formData[element.name] = element.value;
    } else if (element.type == "radio" && element.checked){
      formData[element.name] = element.value;
    }
  }

  const response = await fetch('/api/form/question', {
    method: 'POST',
    body: JSON.stringify(formData),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/account');
  } else {
    alert(response.statusText);
  }
});
