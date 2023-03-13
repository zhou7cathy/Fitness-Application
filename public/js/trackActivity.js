const trackActivityHandler = async (event) => {
    event.preventDefault();

    const allInputs = document.getElementById('exercise_form').getElementsByTagName('input')

    let postData = [];

    for(let i = 0; i < allInputs.length; i++) {
      if(allInputs[i].value) {
        postData.push({
          exerciseId: allInputs[i].getAttribute('id'),
          exerciseTime: allInputs[i].value
        })
      }
    }
  
    if (postData.length !== 0) {
      const response = await fetch(`/api/workout/exercise`, {
        method: 'POST',
        body: JSON.stringify(postData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/workout');
      } else {
        alert('Failed to track activity');
      }
    }
  };
  
  document
    .getElementById('exercise_form')
    .addEventListener('submit', trackActivityHandler);

