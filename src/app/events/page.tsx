import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Typography,
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import Link from 'next/link';

export default function EventsPage() {
    return (
        <Box>
            <Typography variant="h4">Events</Typography>

            <Accordion>
                <AccordionSummary expandIcon={<ExpandMore />}>
                    <Box
                        sx={{
                            display: 'flex',
                            width: '100%',
                            alignItems: 'center',
                            paddingRight: 2,
                        }}
                    >
                        <Box>
                            <Typography variant="h6">
                                Generic Bingo Tournament
                            </Typography>
                            <Typography variant="body1">
                                Estimate: 1:30:00
                            </Typography>
                        </Box>
                        <Box sx={{ flexGrow: 1 }} />
                        <Box>
                            <Typography variant="body2">
                                Upcoming Matches: 20
                            </Typography>
                            <Typography variant="body2">
                                Needs Restreamer: 20
                            </Typography>
                        </Box>
                    </Box>
                </AccordionSummary>
                <AccordionDetails>
                    <Box
                        sx={{
                            display: 'flex',
                            paddingBottom: 2,
                            columnGap: 32,
                        }}
                    >
                        <Box>
                            <Typography variant="h6">
                                Upcoming Matches
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="h6">
                                Needs Restreamer
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex' }}>
                        <Box sx={{ flexGrow: 1 }} />
                        <Button
                            sx={{ float: 'right' }}
                            LinkComponent={Link}
                            href="/matches/new"
                        >
                            New Match
                        </Button>
                    </Box>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
}
