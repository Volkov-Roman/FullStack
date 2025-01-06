const Course = ({ course }) => {
    return (
      <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    );
  }

const Header = ({ course }) => {
  return <h2>{course}</h2>
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => (<Part key={part.id} part={part.name} number_of_exercises={part.exercises} />))}
    </div>
  )
}

const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0);
  return <p style={{ fontWeight: 'bold' }}>total of {total} exercises</p>;
}

const Part = ({ part, number_of_exercises }) => {
  return <p>{part}: {number_of_exercises}</p>
}

export default Course
