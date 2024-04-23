import { useState } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';

const WorkoutForm = () => {
    const { dispatch } = useWorkoutsContext()

    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const workout = {title, load, reps}

        const response = await fetch("/api/workouts", {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                "Content-Type": "application/json"
            }
        })

        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
            setEmptyFields(json.emptyFields);
        }

        if (response.ok) {
            setTitle('');
            setLoad('');
            setReps('');
            setError(null);
            setEmptyFields([])
            console.log("New workout added", json)
            dispatch({type: "CREATE_WORKOUT", payload: json})
        }

    }

    return (
        <form onSubmit = {handleSubmit} className='create'>
            <h3> Add a new task </h3>
            <label> Task Title: </label>
            <input 
            type = "text"
            onChange={(e) => setTitle(e.target.value)}
            value = {title}
            className={emptyFields.includes('title') ? 'error': ''}
            />

            <label> Time to complete (in hrs): </label>
            <input 
            type = "number"
            onChange={(e) => setLoad(e.target.value)}
            value = {load}
            className={emptyFields.includes('load') ? 'error': ''}
            />

            <label> Part Completed (out of 4): </label>
            <input 
            type = "number"
            onChange={(e) => setReps(e.target.value)}
            value = {reps}
            className={emptyFields.includes('reps') ? 'error': ''}
            />

            <button> Add task </button>
            { error && <div className="error"> { error } </div> }
        </form>
    )
}

export default WorkoutForm