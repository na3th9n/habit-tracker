import './App.css'
import { useState, useEffect } from 'react'

interface habitsJson {
  data: habits[],
}

interface habits {
  habit: string,
  completed: boolean,
}

function App() {
  const [habitInput, setHabitInput] = useState<string>("");
  const [habits, setHabits] = useState<habits[]>([]);

  useEffect(() => {
    console.log("Effect");
    // Effects are used to connect to external systems since it occurs after the component renders on the DOM
    // fetch habits
    try {
      const habitsJson: habitsJson = {
        data: [
          { habit: "fake-habit-1", completed: true },
          { habit: "fake-habit-2", completed: false },
          { habit: "fake-habit-3", completed: true },
        ]
      };

      const res = habitsJson.data;

      setHabits(res);
    } catch {
      console.log("Error");
    }
  }, [])

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setHabitInput(e.target.value);
  }

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    // TODO: Re-make to a POST request to the server
    try {
      setHabits([...habits, { habit: habitInput, completed: false }]);
      setHabitInput("");
    } catch {
      console.log("Future error here");
    }
  }
  // next time, how do I make the table update once you submit a form?
  // if you submit the form, it sends a POST request and changes habitsJson
  // do we have to do another GET request then or can we have a cache to restrict antoher network call

  return (
    <>
      <div>New Habit</div>
      <form onSubmit={handleSubmit}>
        <label>Enter your new habit:
          <input
            type="text"
            value={habitInput}
            onChange={handleChange}
          />
        </label>
        <input type="submit" />
      </form>

      <div>
        Current habit input: {habitInput}
      </div>


      <div>Habit Tracker</div>
      <table>
        <tr>
          <th>Habit</th>
          <th>1</th>
        </tr>
        {habits.map((val, key) => {
          return (
            <tr key={key}>
              <th>{val.habit}</th>
              <th>
                <input type="checkbox" defaultChecked={val.completed} />
              </th>
            </tr>
          )
        })}
      </table>
    </>
  )
}

export default App
