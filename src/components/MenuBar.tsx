'use client';
import { Avatar, Menu, MenuItem, Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import { bindMenu } from 'material-ui-popup-state';
import { bindTrigger, usePopupState } from 'material-ui-popup-state/hooks';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

export default function MenuBar() {
    const { data: session } = useSession();

    const menuState = usePopupState({
        variant: 'popover',
        popupId: 'userMenu',
    });

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar sx={{ columnGap: 0 }}>
                    <HeaderLink caption="Bingothon Organizer" href="/" />
                    <Box sx={{ flexGrow: 1 }} />
                    <HeaderLink caption="Calendar" href="/calendar" />
                    <HeaderLink caption="Events" href="/events" />
                    <HeaderLink caption="Sign Ups" href="/signups" />
                    {session && session.user && (
                        <>
                            <Button color="inherit" {...bindTrigger(menuState)}>
                                <Typography variant="button">
                                    {session.user.name}
                                </Typography>
                                <Avatar src={session.user.image} />
                            </Button>
                            <Menu
                                {...bindMenu(menuState)}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                            >
                                {/* <MenuItem>
                                    <FormGroup>
                                        <FormControlLabel
                                            control={
                                                <Switch
                                                    onChange={toggleTheme}
                                                    checked={
                                                        theme.palette.mode ===
                                                        'dark'
                                                    }
                                                />
                                            }
                                            label="Dark Mode"
                                        />
                                    </FormGroup>
                                </MenuItem> */}
                                <MenuItem onClick={() => signOut()}>
                                    <Typography textAlign="center">
                                        Logout
                                    </Typography>
                                </MenuItem>
                            </Menu>
                        </>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}

interface HeaderLinkProps {
    caption: string;
    href: string;
}
function HeaderLink({ caption, href }: HeaderLinkProps) {
    return (
        <Button color="inherit" LinkComponent={Link} href={href}>
            {caption}
        </Button>
    );
}
