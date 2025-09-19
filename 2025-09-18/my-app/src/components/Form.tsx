import { Box, Stack, TextField, Button } from "@mui/material"

export default function FormContent() {
  return (
    <Box sx={{ p: 3 }}>
      {/*       <Typography
        variant="h4"
        component={"div"}
        sx={{ textAlign: "center" }}
      ></Typography> */}
      <Stack
        spacing={2}
        sx={{
          maxWidth: 400,
          margin: "0 auto",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TextField
          label="Kasutajanimi"
          variant="outlined"
          fullWidth
        />
        <TextField
          label="E-post"
          type="email"
          variant="outlined"
          fullWidth
        />
        <TextField
          label="Parool"
          type="password"
          variant="outlined"
          fullWidth
        />
        <Button
          variant="outlined"
          color="primary"
        >
          Logi sisse
        </Button>
      </Stack>
    </Box>
  )
}
