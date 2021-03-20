interface Review {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const ratings = [
  "try harder next week... bro...",
  "not too bad but could be better",
  "looks thick. solid. tight.",
];

const calculateExercises = (exercises: number[], target: number): Review => {
  const periodLength = exercises.length;
  const trainingDays = exercises.reduce(
    (total, day) => total + (day > 0 ? 1 : 0),
    0
  );

  const totalHours = exercises.reduce((total, hours) => total + hours, 0);

  const average = totalHours / periodLength;
  const rating = average >= target + 0.5 ? 3 : average >= target ? 2 : 1;

  return {
    periodLength,
    trainingDays,
    success: average >= target,
    rating,
    ratingDescription: ratings[rating - 1],
    target,
    average,
  };
};

export const parseInputCalculateExercises = (
  targetRaw: any,
  exercisesRaw: any[]
) => {
  if (!targetRaw || exercisesRaw.length === 0) {
    throw "parameters missing";
  }

  const exercises = exercisesRaw.map((e) => parseFloat(e));
  const target = parseFloat(targetRaw);

  if (Number.isNaN(target) || exercises.some((e) => isNaN(e))) {
    throw "malformatted parameters";
  }

  return calculateExercises(exercises, target);
};

if (process.argv.length > 2) {
  const [, , target, ...exercises] = process.argv;

  console.log(parseInputCalculateExercises(target, exercises));
}
