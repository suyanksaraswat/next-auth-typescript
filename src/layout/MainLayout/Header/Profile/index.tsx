"use client";

import { useRef, useState } from "react";
import {
  Avatar,
  Box,
  ButtonBase,
  Card,
  CardContent,
  ClickAwayListener,
  Grid,
  IconButton,
  Paper,
  Popper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";

import ProfileTab from "./ProfileTab";

import { CustomUser } from "@/app/api/auth/[...nextauth]/options";
import { signOut } from "next-auth/react";

const Profile = ({ session }: { session: { user: CustomUser } }) => {
  const theme = useTheme();

  const handleLogout = async () => {
    // logout
    signOut({
      callbackUrl: "/login",
      redirect: true,
    });
  };

  const anchorRef: any = useRef(null);
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: any) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const iconBackColorOpen = "grey.300";

  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <ButtonBase
        sx={{
          p: 0.25,
          bgcolor: open ? iconBackColorOpen : "transparent",
          borderRadius: 1,
          "&:hover": { bgcolor: "secondary.lighter" },
        }}
        aria-label="open profile"
        ref={anchorRef}
        aria-controls={open ? "profile-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <Stack direction="row" spacing={2} alignItems="center" sx={{ p: 0.5 }}>
          <Avatar alt="profile user" sx={{ width: 32, height: 32 }} />
          <Typography variant="subtitle1">{session?.user?.name}</Typography>
        </Stack>
      </ButtonBase>
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        // transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, 9],
              },
            },
          ],
        }}
        sx={{ zIndex: 1000 }}
      >
        {open && (
          <Paper
            sx={{
              boxShadow: theme.shadows,
              width: 290,
              minWidth: 240,
              maxWidth: 290,
              [theme.breakpoints.down("md")]: {
                maxWidth: 250,
              },
            }}
          >
            <ClickAwayListener onClickAway={handleClose}>
              <Card>
                <CardContent sx={{ px: 2.5, pt: 3 }}>
                  <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Grid item>
                      <Stack direction="row" spacing={1.25} alignItems="center">
                        <Avatar
                          alt="profile user"
                          sx={{ width: 32, height: 32 }}
                        />
                        <Stack>
                          <Typography variant="h6">
                            {session?.user?.name}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {session?.user?.role}
                          </Typography>
                        </Stack>
                      </Stack>
                    </Grid>
                  </Grid>
                </CardContent>

                {open && <ProfileTab handleLogout={handleLogout} />}
              </Card>
            </ClickAwayListener>
          </Paper>
        )}
      </Popper>
    </Box>
  );
};

export default Profile;
