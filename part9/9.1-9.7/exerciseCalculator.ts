interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const calculateExercises = (exerciseHours: number[], targetAmount: number): Result => {
  const periodLength = exerciseHours.length;
  const trainingDays = exerciseHours.filter(hour => hour > 0).length;
  const average = exerciseHours.reduce((total, value) => total + value, 0) / periodLength;
  const target = targetAmount;
  const success = average >= target;

  let rating = 1;
  if (success) {
    rating = 3;
  } else if (average >= target * 0.7) {
    rating = 2;
  }
  let ratingDescription = "";
  switch (rating) {
    case 1:
      ratingDescription = 'bad';
      break;
    case 2:
      ratingDescription = 'not too bad but could be better';
      break;
    case 3:
      ratingDescription = 'excellent';
      break;
  }
  return {
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: average
  };
};

const parseArguments = (args: string[]): { targetAmount: number, exerciseHours: number[] } => {
  if (args.length < 4) {
    throw new Error('Invalid number of arguments');
  }


  const targetAmount: number = Number(args[2]);
  const exerciseHours: number[] = args.slice(3).map(hour => Number(hour));

  if (isNaN(targetAmount) || exerciseHours.some(hour => isNaN(hour))) {
    throw new Error('All arguments must be numbers');
  }

  return { targetAmount, exerciseHours };
};
if (require.main === module) {
  const { targetAmount, exerciseHours } = parseArguments(process.argv);
  console.log(calculateExercises(exerciseHours, targetAmount));

}

export default calculateExercises;