import React, { useEffect, useState } from 'react'
import NoDataFound from '../table/NoDataFound';
import Table from '../table/Table';
import { TD, TR } from '../table/Common';
import Input from '../forms/Input';
import Select from '../forms/Select';
import { get } from '@/utils/services';
import Button from '../forms/Button';

const headers = [
    {
        title: "Workout"
    },
    {
        title: "Sets"
    },
    {
        title: "Repitation"
    },
    {
        title: "Gaps"
    },
    {
        title: "Action"
    },
];

const data = {onDay:0, setCount: 0, repsCount: '', gapBwSet: ''}
export interface Exercise {
    onDay: number;
    setCount: number;
    repsCount: string;
    gapBwSet: string;
    [key: string]: string | number | undefined;
}

interface AddWorkoutsProps {
    day: number;
    setExercises: React.Dispatch<React.SetStateAction<Exercise[]>>;
    exercises: Exercise[];
}

const AddWorkouts = ({ day, setExercises, exercises }: AddWorkoutsProps) => {
    const [workoutOptions, setworkoutOptions] = useState<{ value: string; label: string }[]>();

    useEffect(() => {
        get('/api/v1/workout').then((res) => {
            const options = res.map(item => {
                return {
                    value: String(item.id),
                    label: item.workoutName
                }
            })
            setworkoutOptions(options)
        })
    }, [])


    const handleInput = (e) => {
        // debugger;
        const { name, value } = e.target;

        setExercises(prev =>
            prev.map(item =>
                item.onDay === day ? { ...item, [name]: value } : item
            )
        );
    }


    console.log('exercises', exercises)

    const addNewRow = () => {
        const row: Exercise = {
            ...data,
            onDay: day
        };
        setExercises(prev => [
            ...prev,
            row
        ]);
    }

    

    return (
        <div>
            <div className='flex justify-between items-center mb-5'>
            <h2 className='mb-5'>Day: <span> {day} </span></h2>
                <Button onClick={addNewRow}>Add New Item</Button>
            
            </div>

            <Table headers={headers}>
                {exercises?.length > 0 ? exercises?.map((item, index) => (
                    <TR key={item.onDay + index}>
                        <TD><Select options={workoutOptions} noLabel={true}></Select></TD>
                        <TD><Input onChange={handleInput} value={item?.setCount || ''} name='setCount' noLabel={true} type="number" placeholder="Eg. 2" /></TD>
                        <TD><Input onChange={handleInput} value={item.repsCount || ''} name='repsCount' noLabel={true} type="text" placeholder="Eg. 1st set 16, 2nd set 12" /></TD>
                        <TD><Input onChange={handleInput} value={item.gapBwSet || ''} name='gapBwSet' noLabel={true} type="text" placeholder="Eg. 2 Minutes" /></TD>
                        <TD>Delete</TD>
                    </TR>
                )) : <NoDataFound colSpan={headers?.length}/>}
            </Table>

        </div>

    )
}

export default AddWorkouts