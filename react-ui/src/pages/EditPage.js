import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

export const EditPage = ({ exerciseToEdit }) => {

    const [name, setName] = useState(exerciseToEdit.name);
    const [reps, setReps] = useState(exerciseToEdit.reps);
    const [weight, setWeight] = useState(exerciseToEdit.weight);
    const [unit, setUnit] = useState(exerciseToEdit.unit);
    const [date, setDate] = useState(exerciseToEdit.date);

    const history = useHistory();

    const editExercise = async () => {
        const edited = { name, reps, weight, unit, date };
        const response = await fetch(`/exercises/${exerciseToEdit._id}`, {
            method: 'PUT',
            body: JSON.stringify(edited),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 200) {
            alert("You have successfully saved an exercise");
        } else {
            alert(`Failed to edit exercise, status code = ${response.status}`);
        }
        history.push("/");
    };

    const unitSelection = unit !== "kgs"? "kgs": "lbs";

    return (
        <div>
            <h2>Edit Exercise</h2>
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
                onChange={e => setName(e.target.value)} /></td>
                        <td><input
                type="number"
                value={reps}
                min={0}
                onChange={e => setReps(e.target.value)} /></td>
                        <td><input
                type="number"
                value={weight}
                min={0}
                onChange={e => setWeight(e.target.value)} /></td>
                        <td><select value={unit} onChange={e => setUnit(e.target.value)}>  
                    <option>{unit}</option>
                    <option>{unitSelection}</option>
                </select></td>
                        <td><input
                type="text"
                value={date}
                onChange={e => setDate(e.target.value)} /></td>
                    </tr>
                </tbody> 
            </table>
            <button id="button" onClick={editExercise}>Save</button>
        </div>
    );
}

export default EditPage;