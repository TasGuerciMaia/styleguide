import { createContext } from 'react'

const Context = createContext<TableState & TableProps & Bulk>(null)
const { Provider } = Context

export default Context
export { Provider as TableProvider }
