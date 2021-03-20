const bmiValues = [
  "Underweight",
  "Normal",
  "Overweight",
  "Class 1 Obesity",
  "Class 2 Obesity",
  "Class 3 Obesity",
];

const calculateBmi = (height: number, weight: number) => {
  const bmi = weight / Math.pow(height / 100, 2);
  let prefix = "";

  if (bmi < 18.5) {
    prefix = bmiValues[0];
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    prefix = bmiValues[1];
  } else if (bmi >= 25 && bmi <= 29.9) {
    prefix = bmiValues[2];
  } else if (bmi >= 30.0 && bmi <= 34.9) {
    prefix = bmiValues[3];
  } else if (bmi >= 35.0 && bmi <= 39.9) {
    prefix = bmiValues[4];
  } else if (bmi >= 40) {
    prefix = bmiValues[5];
  }

  return `${prefix} (${bmi.toFixed(2)})`;
};

console.log(calculateBmi(200, 74));
