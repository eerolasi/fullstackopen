const calculateBmi = (height: number, weight: number) => {
  const bmi = weight / ((height / 100) ** 2);
  const underweight = 18.4;
  const overweight = 25;
  if (bmi <= underweight) return "Underweight";
  else if (bmi > underweight && bmi < overweight) return "Normal (healthy weight)";
  else if (bmi >= overweight && bmi < 30) return "Overweight";
  else return "Obese";

};

const parseArguments = (args: string[]) => {
  if (args.length !== 4) throw new Error('Invalid number of arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    };
  } else throw new Error('Provided values were not numbers!');

};

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {

  if (error instanceof Error) console.log(error.message);
}

export default calculateBmi;
