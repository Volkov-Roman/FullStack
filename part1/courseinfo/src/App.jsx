const Header = ({ course }) => {
  return <h1>{course}</h1>
}

const Content = (props) => {
  return (
    <div>
      <Part part={props.parts[0].name} number_of_exercises={props.parts[0].exercises} />
      <Part part={props.parts[1].name} number_of_exercises={props.parts[1].exercises} />
      <Part part={props.parts[2].name} number_of_exercises={props.parts[2].exercises} />
    </div>
  )
}

const Total = (props) => {
  return <p>Number of exercises: {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
}

const Part = ({ part, number_of_exercises }) => {
  return <p>{part}: {number_of_exercises}</p>
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

export default App
