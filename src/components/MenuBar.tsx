import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';

export default function MenuBar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <HeaderLink caption="Bingothon Organizer" href="/" />
                    <Box sx={{ flexGrow: 1 }} />
                    <HeaderLink caption="Calendar" href="/calendar" />
                    <HeaderLink caption="Events" href="/events" />
                    <HeaderLink caption="Sign Ups" href="/signups" />
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
