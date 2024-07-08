import express from 'express';
import calculateBmi from './9.1-9.7/bmiCalculator';
import calculateExercises from './9.1-9.7/exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;
  try {
    if (height && weight && !isNaN(Number(weight)) && !isNaN(Number(height))) {
      const bmi = calculateBmi(Number(height), Number(weight));
      res.json({
        height,
        weight,
        bmi,
      });
    } else {
      throw new Error('malformatted parameters');
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send({ error: error.message });
    }
  }
});

app.post('/exercises', (req, res) => {
  interface ExerciseRequestBody {
    daily_exercises: number[];
    target: number;
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target }: ExerciseRequestBody = req.body;

  if (!daily_exercises || !target) {
    return res.status(400).json({ error: 'parameters missing' });
  }

  if (!Array.isArray(daily_exercises) || daily_exercises.some(isNaN), isNaN(Number(target))) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }
  const result = calculateExercises(daily_exercises.map(Number), Number(target));
  return res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
