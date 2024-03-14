window.onload = function() {
  var inputs = document.querySelectorAll('input');
  inputs.forEach(function(input) {
    input.classList.add('valid');
  });
};

document.querySelector('form').addEventListener('submit', function(event) {
  event.preventDefault();

  var sexElement = document.querySelector('input[name="sex"]:checked');
  var sex = sexElement ? sexElement.value : '';
  var ageElement = document.querySelector('input[name="age"]');
  var weightElement = document.querySelector('input[name="weight"]');
  var heightElement = document.querySelector('input[name="height"]');

  var inputs = [sexElement, ageElement, weightElement, heightElement];

  // Remove the .invalid class from all input fields and add the .valid class
  inputs.forEach(function(input) {
    if (input) {
      input.classList.remove('invalid');
      input.classList.add('valid');
    }
  });

  if (sex === '' || ageElement.value === '' || weightElement.value === '' || heightElement.value === '') {
    alert('Please fill in all fields');

    // Add the .invalid class to the input fields that are empty and remove the .valid class
    inputs.forEach(function(input) {
      if (input && input.value === '') {
        input.classList.remove('valid');
        input.classList.add('invalid');
      }
    });

    return;
  }

  var weight = parseFloat(weightElement.value);
  var height = parseFloat(heightElement.value) / 100;

  if (isNaN(weight) || isNaN(height)) {
    alert('Please enter valid numbers');
    return;
  }

  var bmi = weight / (height * height);
  document.querySelector('#bmi-result').textContent = bmi.toFixed(1);

  var category;
  var resultText;
  var resultColor;

  if (bmi < 18.5) {
    category = 'Underweight';
    resultText = 'Berat Badan Kurang';
    resultColor = 'red';
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    category = 'Normal';
    resultText = 'Berat Badan Normal';
    resultColor = 'green';
  } else if (bmi >= 25 && bmi <= 29.9) {
    category = 'Overweight';
    resultText = 'Berat Badan Lebih';
    resultColor = 'orange';
  } else {
    category = 'Obese';
    resultText = 'Obesitas';
    resultColor = 'red';
  }

  document.querySelector('#result').textContent = resultText;
  document.querySelector('#result').style.color = resultColor;
  document.querySelector('#bmi-result').style.color = resultColor;
  document.querySelector('#status-result').textContent = 'anda memiliki ' + resultText.toLowerCase();
  document.querySelector('#between').textContent = 'Hasil BMI ' + (category === 'Obese' ? 'lebih dari 29.9' : 'antara ' + (category === 'Underweight' ? 'kurang dari 18.5' : (category === 'Normal' ? '18.5 - 24.9' : '25 - 29.9')));
});