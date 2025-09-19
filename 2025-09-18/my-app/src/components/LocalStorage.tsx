import useLocalStorage from "../hooks/useLocalStorage"

const LocalStorage = () => {
  const [name, setName] = useLocalStorage<string>("name", "")

  return (
    <div>
      <h1>Hello, {name || "Guest"}!</h1>
      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Enter your name"
      />
    </div>
  )
}

export default LocalStorage
