import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout';
import { useTasks } from '../context/taskContext';
import { useRouter } from 'next/router';

const TaskFormPage = () => {

    const [task, setTask] = useState({
        title: '',
        description: '',
    });

    const {createTask, updateTask, tasks} = useTasks();
    const {push, query} = useRouter();

    const handleChange = (e) => {
        const {name,value} = e.target
        setTask({...task, [name]: value})
    };
    const handleSubmit = (e) => {
        
        e.preventDefault()

        if(!query.id){
            createTask(task.title, task.description );
        } else {
            updateTask(query.id, task );
        }

        push("/");
    }

    useEffect(()=> {
        if (query.id) {
            const taskFound = tasks.find(task => task.id === query.id);
            setTask({title: taskFound.title, description: taskFound.description})
        }
    },[]);

    return (
        <Layout>
            <div className='flex justify-center iterms-center h-full'>

            <form onSubmit={handleSubmit}>
                <h1>{query.id ? 'Update Task': 'Create a Task'}</h1>

                <input
                    type='text'
                    name='title'
                    placeholder='Write a title'
                    className='bg-gray-800 focus:text-gray-100 focus:outline-none w-full py-3 px-4 mb-5'
                    onChange={handleChange}
                    value={task.title}
                />

                <textarea
                    rows='2'
                    placeholder='Write a description'
                    className='bg-gray-800 focus:text-gray-100 focus:outline-none w-full py-3 px-4 mb-5'
                    name='description'
                    onChange={handleChange}
                    value={task.description}
                />
                <button
                    className='bg-green-500 hover:bg-green-300 px-4 py-2 rounded-sm disabled:opacity-30'
                    disabled={!task.title}
                >
                    Save
                </button>
            </form>
            </div>

        </Layout>
    );
};

export default TaskFormPage;