import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

export const CreatePage = () => {

    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('');
    const [date, setDate] = useState('');

    const history = useHistory();

    const addExercise = async () => {
        const newExercise = { name, reps, weight, unit, date };
        const response = await fetch('/exercises', {
            method: 'POST',
            body: JSON.stringify(newExercise),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 201) {
            alert("You have successfully added an exercise");
        } else {
            alert(`Failed to add exercise, status code = ${response.status}`);
        }
        history.push("/");
    };

    return (
        <div>
            <h2>Add Exercise</h2>
            <table id="table">
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>Reps</th>
                    <th>Weight</th>
                    <th>Unit</th>
                    <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><input
                type="text"
                value={name}
                placeholder="Enter name here"
                onChange={e => setName(e.target.value)} /></td>
                        <td><input
                type="number"
                value={reps}
                min={0}
                placeholder="Enter reps here"
                onChange={e => setReps(e.target.value)} /></td>
                        <td><input
                type="number"
                value={weight}
                min={0}
                placeholder="Enter weight here"
                onChange={e => setWeight(e.target.value)} /></td>
                        <td><select onChange={e => setUnit(e.target.value)}>
                    <option>Please select a unit</option>   
                    <option>lbs</option>
                    <option>kgs</option>
                </select></td>
                        <td><input
                type="text"
                value={date}
                placeholder="Date format MM-DD-YY"
                onChange={e => setDate(e.target.value)} /></td>
                    </tr>
                </tbody>
            </table>
            <button
                onClick={addExercise}
            >Save</button>
        </div>
    );
}

export default CreatePage;