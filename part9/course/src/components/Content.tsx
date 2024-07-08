import Part from './Part';
import {CoursePart} from '../types'
interface contentProps {
  parts: CoursePart[]
}

const Content = (props: contentProps ) => {
  return (
    <>
     {props.parts.map(part =>
      <Part key={part.name} part={part}></Part>
     )}
    </>
  )
}

export default Content;