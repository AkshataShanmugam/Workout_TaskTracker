import React, {useState} from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { formatDistanceToNow } from 'date-fns'

function WorkoutDetails( { workout } ) {
  const { dispatch } = useWorkoutsContext();
  const handleClick = async () => {
    const promise = await fetch('api/workouts/' + workout._id, {
      method: 'DELETE'
    })

    const json = await promise.json()

    if (promise.ok){
      dispatch({type: "DELETE_WORKOUT", payload: json})
    }

  }

  const [isHoveredUpdate, setIsHoveredUpdate] = useState(false);
  const [isHoveredDelete, setIsHoveredDelete] = useState(false);

  const handleHoverUpdate = () => {
    setIsHoveredUpdate(!isHoveredUpdate);
  }

  const handleHoverDelete = () => {
    setIsHoveredDelete(!isHoveredDelete);
  }

  return (
    <div className='workout-details'>
        <h4> {workout.title} </h4>
        <p> <bold> Time (hrs): </bold> {workout.load} </p>
        <p> <bold> Parts done : </bold> {workout.reps} </p>
        <p> { formatDistanceToNow(new Date( workout.createdAt ), {addSuffix: true} ) } </p>
        
        <span className="material-symbols-outlined" id="left" style={{color: 'green', fontSize: '20px'} } > Update </span>
        
        <span className="material-symbols-outlined" onClick={ handleClick } style={{color: 'red', fontSize: '20px'}} > Delete </span>
        
    </div>
  )
}

export default WorkoutDetails