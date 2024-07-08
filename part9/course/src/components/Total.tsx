// render the total sum of exercises in all parts
interface Total {
  total: number
}
const Total = (props: Total) => {
  return <p>Number of exercises {props.total}</p>
}

export default Total