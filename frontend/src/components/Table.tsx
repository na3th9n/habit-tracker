// I don't think if I am going to use this even
interface TableProps {
  name: string
  cols: string[]
  rows: string[][]
}

export default function Table({ name, cols, rows }: TableProps) {
  return (
    <div>
      <div>{name}</div>
      <table>
        <thead>
          {cols.map((colName) => {
            return (
              <th>{colName}</th>
            )
          })}
        </thead>
        <tbody>
          {rows.map((row) => {
            return (
              <tr>
                {row.map((cell) => {
                  return (
                    <td>{cell}</td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
