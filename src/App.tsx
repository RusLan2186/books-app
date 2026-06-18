import BooksTable from "./components/BooksTable/BooksTable";
import { useBooks } from "./hooks/useBooks";
import { Box, Container } from "@mui/material";
import { ThemeProvider, CssBaseline } from "@mui/material";

import { Header } from "./components/Header/Header";
import { TableSkeleton } from "./components/TableSkeleton/TableSkeleton";
import { useThemeMode } from "./hooks/useThemeMode";
import { darkTheme, lightTheme } from "./theme";

function App() {
  const { books, loading, error } = useBooks();
  const { mode, toggleMode } = useThemeMode();
  const theme = mode === "light" ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: "100vh", bgcolor: "background.default", pb: 4, transition: 'all 0.3s ease' }}>
        <Header mode={mode} onThemeToggle={toggleMode} />

        <Container maxWidth="xl">
          {loading ? (
            <TableSkeleton />
          ) : error ? (
            <Box sx={{ p: 4, textAlign: "center", color: "error.main" }}>
              Error: {error}
            </Box>
          ) : (
            <Box sx={{ width: "100%" }}>
              <BooksTable books={books} loading={loading} />
            </Box>
          )}
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
