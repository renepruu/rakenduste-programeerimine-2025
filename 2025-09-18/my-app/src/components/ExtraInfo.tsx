import { Box, Typography, Stack } from "@mui/material"

export default function ExtraInfo() {
  return (
    <Box
      sx={{
        mt: 3,
        p: 2,
        border: "1px solid #ccc",
        borderRadius: 2,
        maxWidth: 400,
        display: "flex",
        flexDirection: "column",
        margin: "0 auto",
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        padding: 3,
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
      >
        Minu huvid/hobid
      </Typography>
      <Stack spacing={30}>Programmeerimine • Ronimine • Jooksmine</Stack>
      <br />
      Võta minuga ühendust:
      <Typography>E-mail: rene.pruul2@gmail.com</Typography>
    </Box>
  )
}
