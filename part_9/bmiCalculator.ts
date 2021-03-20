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

export const parseAndCalculateBmi = (arg1: any, arg2: any) => {
  if (!arg1 || !arg2) {
    throw "You need to provide both height and weight";
  }

  const height = parseFloat(arg1);
  const weight = parseFloat(arg2);

  if (Number.isNaN(height) || Number.isNaN(weight)) {
    throw "Both height and weight need to be numbers";
  }

  return calculateBmi(height, weight);
};

if (process.argv.length > 2) {
  console.log(parseAndCalculateBmi(process.argv[2], process.argv[3]));
}
