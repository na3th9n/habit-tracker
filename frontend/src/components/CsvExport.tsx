import { useState, type ChangeEvent } from 'react'
import Papa from 'papaparse'

export default function CsvExport() {
  type ParsedData = Record<string, string>

  const [data, setData] = useState<ParsedData[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleFileUpload(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith(".csv")) {
      setError("File type error. Please upload a CSV.");
      return;
    }

    Papa.parse<ParsedData>(file, {
      header: true,
      encoding: 'UTF-8',
      complete: (result) => {
        if (result.data.length === 0) {
          setError("Error. File is empty.");
          setData(null)
        }

        setError(null);
        setData(result.data);
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
      {data && (
        <div>
          <p>
            Loaded Data: {data.length} rows
          </p>
        </div>
      )}
    </div>
  )
}
