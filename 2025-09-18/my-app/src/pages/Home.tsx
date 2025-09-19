import Navbar from "../components/Navbar"
import Button from "@mui/material/Button"

function Home() {
  return (
    <>
      <Navbar />
      <h1>Rene Pruul</h1>

      <div>
        <Button
          variant="outlined"
          size="large"
        >
          MUI nupp, outlined + large
        </Button>
      </div>
    </>
  )
}

export default Home
