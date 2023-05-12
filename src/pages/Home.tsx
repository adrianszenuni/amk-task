import { Fragment } from 'react';

import AddTaskForm from '../components/AddTaskForm';
import TasksList from '../components/TasksList';

const Home: React.FC = () => {
    return (
      <Fragment>
        <AddTaskForm />
        <TasksList />
      </Fragment>
    );
}

export default Home;