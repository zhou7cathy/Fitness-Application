const ChartData = async () => {
    const response = await fetch('/api/matrix/chart');
    const data = await response.json();
    const chart = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(chart, {
      type: 'bar',
      data: data,
      options: {
        scales: {
          y: {
            ticks: {
              callback: function(value, index, ticks) {
                return value + 'mins';
              }
            }
          }
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: function(context) {
                let label = context.dataset.label || '';

                if (label) {
                  label += ': ' +context.formattedValue + ' mins';
                }
                return label;
              }
            }
          }
        }
      }
    });
  };
  ChartData();


  const trendData = async () => {
    const response = await fetch('/api/matrix/trends');
    const data = await response.json();
    const popularWorkoutsList = document.getElementById('trendingList');
  
    popularWorkoutsList.innerHTML = '';
    data.forEach(workout => {
      const li = document.createElement('li');
      li.textContent = `${workout.exercise_name}`;
      popularWorkoutsList.appendChild(li);
    });
  }
  trendData(); 
