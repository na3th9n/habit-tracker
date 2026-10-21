import { useState, type ChangeEvent } from 'react'
import Papa from 'papaparse'
import { type Workout } from '@habit-tracker/shared'

interface CsvExportProps {
  onSet: (data: Workout[]) => void
}

export default function CsvUpload({ onSet }: CsvExportProps) {
  const [error, setError] = useState<string | null>(null);

  function handleFileUpload(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith(".csv")) {
      setError("File type error. Please upload a CSV.");
      return;
    }

    Papa.parse<Workout>(file, {
      header: true,
      encoding: 'UTF-8',
      complete: (result) => {
        if (result.data.length === 0) {
          setError("Error. File is empty.");
          onSet([]);
          return;
        }

        setError(null);
        console.log(result.data)
        onSet(result.data);
      },
      error: (error) => {
        setError(`Parsing Error. ${error.message}`)
      }
    })
  }

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
      {error && <p>{error}</p>}
    </div>
  )
}
