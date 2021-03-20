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
  const rating = target >= average + 0.5 ? 3 : target >= average ? 2 : 1;

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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
