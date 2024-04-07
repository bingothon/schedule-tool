'use client';
import {
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    Typography,
} from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { Controller, useFieldArray, useForm } from 'react-hook-form';

interface FormInput {
    date: Dayjs;
    teams: Team[];
}

interface Player {
    name: string;
    twitch: string;
    pronouns: string;
    country: string;
}

interface Team {
    name: string;
    players: Player[];
}

const emptyPlayer: Player = {
    name: '',
    twitch: '',
    pronouns: '',
    country: '',
};

const emptyTeam: Team = {
    name: '',
    players: [emptyPlayer],
};

function PlayerForm({ teamIndex, index, control, remove, showRemove }) {
    const prefix = `teams.${teamIndex}.players.${index}`;
    return (
        <Box sx={{ display: 'flex', columnGap: 2 }}>
            <Controller
                name={`${prefix}.name`}
                control={control}
                render={({ field }) => <TextField {...field} label="Name" />}
            />
            <Controller
                name={`${prefix}.twitch`}
                control={control}
                render={({ field }) => <TextField {...field} label="Twitch" />}
            />
            <Controller
                name={`${prefix}.pronouns`}
                control={control}
                render={({ field }) => (
                    <TextField {...field} label="Pronouns" />
                )}
            />
            <Controller
                name={`${prefix}.country`}
                control={control}
                render={({ field }) => <TextField {...field} label="Country" />}
            />
            {showRemove && <Button onClick={remove}>Remove Player</Button>}
        </Box>
    );
}

function TeamForm({ index, control, remove, showRemove }) {
    const {
        fields: players,
        append,
        remove: removePlayer,
    } = useFieldArray({ control, name: `teams.${index}.players` });
    return (
        <Box
            sx={{
                padding: 2,
                border: '1px solid lightgrey',
                borderRadius: '12px',
            }}
        >
            <Controller
                name={`teams.${index}.name`}
                control={control}
                render={({ field }) => (
                    <TextField {...field} label="Team Name" />
                )}
            />
            <Box sx={{ marginTop: 2 }}>
                <Box display="flex" flexDirection="column" rowGap={2}>
                    {players.map((player, playerIndex) => (
                        <PlayerForm
                            key={player.id}
                            index={playerIndex}
                            teamIndex={index}
                            control={control}
                            remove={() => removePlayer(index)}
                            showRemove={players.length > 1}
                        />
                    ))}
                </Box>
                <Button onClick={() => append(emptyPlayer)}>Add Player</Button>
            </Box>
            {showRemove && <Button onClick={remove}>Remove Team</Button>}
        </Box>
    );
}

export default function NewMatchPage() {
    const { control, handleSubmit } = useForm<FormInput>({
        defaultValues: { date: dayjs(), teams: [emptyTeam] },
    });
    const {
        fields: teams,
        append,
        remove,
    } = useFieldArray({ control, name: 'teams' });

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <form onSubmit={handleSubmit((values) => console.log(values))}>
                <Card elevation={4} sx={{ mb: 2 }}>
                    <CardContent>
                        <Typography variant="h6" sx={{ pb: 2 }}>
                            Match Information
                        </Typography>
                        <Controller
                            name="date"
                            control={control}
                            render={({ field }) => (
                                <DateTimePicker label="Date" {...field} />
                            )}
                        />
                    </CardContent>
                </Card>
                <Card elevation={4}>
                    <CardContent>
                        <Typography variant="h6">Players</Typography>
                        <Box display="flex" flexDirection="column" rowGap={2}>
                            {teams.map((team, index) => (
                                <TeamForm
                                    key={team.id}
                                    control={control}
                                    index={index}
                                    remove={() => remove(index)}
                                    showRemove={teams.length > 1}
                                />
                            ))}
                            <Button onClick={() => append(emptyTeam)}>
                                Add Team
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
                <Button type="submit">Submit</Button>
            </form>
        </LocalizationProvider>
    );
}
