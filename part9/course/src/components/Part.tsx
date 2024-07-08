import React from 'react';
import { CoursePart } from '../types';

interface PartProps {
  part: CoursePart;
}

const Part = (props: PartProps) => {
  const { part } = props
  switch (part.kind) {
    case 'basic':
      return (
        <>
          <strong>{part.name} {part.exerciseCount}</strong>
          <br />
          <div>{part.description}</div>
          <br />
        </>
      );
    case 'group':
      return (
        <>
          <strong>{part.name} {part.exerciseCount}</strong>
          <br />
          <div>project exercises {part.groupProjectCount}</div>
          <br />
        </>
      );
    case 'background':
      return (
        <>
          <strong>{part.name} {part.exerciseCount}</strong>
          <br />
          <i>{part.description}</i>
          <br />
          <div>submit to {part.backgroundMaterial}</div>
          <br />
        </>
      );
    case 'special':
      return (
        <>
          <strong>{part.name} {part.exerciseCount}</strong>
          <br />
          <i>{part.description}</i>
          <br />
          <div>required skills: {part.requirements.join(", ")}</div>
          <br />
        </>
      );
    default:
      return assertNever(part);
  }
};

const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

export default Part;
