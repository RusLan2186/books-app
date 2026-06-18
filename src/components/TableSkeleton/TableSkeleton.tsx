import { Box, Skeleton, Paper, Stack } from "@mui/material";

export const TableSkeleton = () => {
  return (
    <Paper
      sx={{
        flexGrow: 1,
        width: "100%",
        p: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        borderRadius: 2,
        boxShadow: 2,
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 2,
          pb: 2,
          borderBottom: "2px solid",
          borderColor: "divider",
          bgcolor: "action.hover",
          mx: -2,
          px: 2,
          mt: -2,
          pt: 2,
        }}
      >
        <Skeleton variant="text" width={160} height={30} />
        <Skeleton variant="text" sx={{ flex: 1 }} height={30} />
        <Skeleton variant="text" sx={{ flex: 1 }} height={30} />
        <Skeleton variant="text" sx={{ flex: 1.5 }} height={30} />
        <Skeleton variant="text" width={140} height={30} />
        <Skeleton variant="text" width={110} height={30} />
      </Box>

      <Box sx={{ flexGrow: 1, overflow: "hidden" }}>
        <Stack spacing={3} sx={{ mt: 1 }}>
          {[...Array(5)].map((_, i) => (
            <Box
              key={i}
              sx={{
                display: "flex",
                gap: 2,
                alignItems: "start",
                pb: 2,
                borderBottom: "1px solid",
                borderColor: "divider",
              }}
            >
              <Skeleton
                variant="rectangular"
                width={160}
                height={200}
                sx={{ borderRadius: 1 }}
              />
              <Box sx={{ flex: 1 }}>
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "1.2rem", width: "90%" }}
                />
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "1.2rem", width: "40%" }}
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "1rem", width: "70%" }}
                />
              </Box>
              <Box
                sx={{ flex: 1.5, display: "flex", flexWrap: "wrap", gap: 0.5 }}
              >
                <Skeleton variant="rounded" width={70} height={24} />
                <Skeleton variant="rounded" width={90} height={24} />
                <Skeleton variant="rounded" width={60} height={24} />
              </Box>
              <Box sx={{ width: 140 }}>
                <Skeleton variant="text" width={60} />
              </Box>
              <Box sx={{ width: 110 }}>
                <Skeleton variant="text" width={40} />
              </Box>
            </Box>
          ))}
        </Stack>
      </Box>
    </Paper>
  );
};
