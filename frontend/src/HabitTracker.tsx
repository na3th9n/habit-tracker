import './App.css'
import { useState, useEffect } from 'react'
import type { Habit } from '@habit-tracker/shared'
import CsvExport from './components/CsvExport.tsx'

// CONSTANTS
const habits_url = "http://localhost:3001/habits";

// API Handlers
async function getHabits(): Promise<Habit[]> {
  const res = await fetch(habits_url)
  if (!res.ok) throw new Error(`GET /habits failed: ${res.status}`)
  return res.json();
}

async function postHabits(name: string): Promise<Habit> {
  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: name })
  };

  const res = await fetch(habits_url, config);
  if (!res.ok) throw new Error(`POST /habits failed: ${res.status}`)
  return res.json();
}

// async function postCompleted() {
//   res = fetch(habits_url, 
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({  })
//     }
//   )
// }
;
function HabitTracker() {
  const [habitInput, setHabitInput] = useState<string>("");
  const [habits, setHabits] = useState<Habit[]>([]);

  useEffect(() => {
    getHabits()
      .then((res) => setHabits(res))
      .catch((e) => console.error(e))
  }, [])

  // function handleCheckboxEvent(e: React.ChangeEvent<HTMLInputElement>) {
  //
  // }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setHabitInput(e.target.value);
  }

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    postHabits(habitInput)
      .then((habit) => {
        setHabits([...habits, habit]);
        setHabitInput("");
      })
      .catch((e) => console.error(e));
  }

  return (
    <>
      <CsvExport />
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
        <thead>
          <tr>
            <th>Habit</th>
            <th>1</th>
          </tr>
        </thead>
        <tbody>
          {habits.map((habit) => {
            return (
              <tr key={habit.id}>
                <td>{habit.name}</td>
                <td>
                  <input type="checkbox" defaultChecked={habit.completed} />
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}

export default HabitTracker
