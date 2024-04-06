'use client';
import { Box, Button, Card, CardContent, TextField } from '@mui/material';
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

function TeamForm({ index, control, remove }) {
    return (
        <Box sx={{ border: '1px solid black', padding: 2 }}>
            <Controller
                name={`teams.${index}.name`}
                control={control}
                render={({ field }) => (
                    <TextField {...field} placeholder="Team Name" />
                )}
            />
            <Card sx={{ marginTop: 2 }}>
                <CardContent></CardContent>
            </Card>
            <Button onClick={remove}>Remove</Button>
        </Box>
    );
}

export default function NewMatchPage() {
    const { control, handleSubmit } = useForm<FormInput>({
        defaultValues: { date: dayjs(), teams: [{ name: '', players: [] }] },
    });
    const {
        fields: teams,
        append,
        remove,
    } = useFieldArray({ control, name: 'teams' });
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <form onSubmit={handleSubmit((values) => console.log(values))}>
                <Controller
                    name="date"
                    control={control}
                    render={({ field }) => <DateTimePicker {...field} />}
                />
                <Box sx={{ display: 'flex' }}>
                    {teams.map((team, index) => (
                        <TeamForm
                            key={team.id}
                            control={control}
                            index={index}
                            remove={() => remove(index)}
                        />
                    ))}
                    <Button onClick={() => append({ name: '', players: [] })}>
                        Add Team
                    </Button>
                </Box>
                <Button type="submit">Submit</Button>
            </form>
        </LocalizationProvider>
    );
}
