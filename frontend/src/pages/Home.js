import { useEffect, React } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';

// components
import WorkoutDetails from '../component/WorkoutDetails';
import WorkoutForm from '../component/WorkoutForm';

function Home() {
  const { workouts, dispatch } = useWorkoutsContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      const promise = await fetch('api/workouts');
      const json = await promise.json()
      
      if (promise.ok) {
        dispatch({type: 'SET_WORKOUTS', payload: json})
      }
    }
    fetchWorkouts();
  }, [dispatch])

  return (
    <div className='home'>
      <div className='workouts'>
        { ((!workouts).length === 0) && <h3>Good work! No tasks left for today!</h3> }
        { workouts && workouts.map((workout) => (
          < WorkoutDetails key={workout._id} workout={workout} />  
        )) }
      </div>
      < WorkoutForm />
    </div>
  )
}

export default Home