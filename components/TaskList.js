'use client';

import { useTransition, useState } from 'react';
import { toggleTask, deleteTask } from '@/actions';
import { toast } from 'react-hot-toast';
import AddTaskForm from './AddTaskForm';

export default function TaskList({ tasks }) {
  const [isPending, startTransition] = useTransition();
  const [selectedTask, setSelectedTask] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleToggle = (id, isCompleted) => {
    startTransition(async () => {
      const result = await toggleTask(id, isCompleted);
      if (!result.success) toast.error(result.error);
    });
  };

  const handleDelete = (id) => {
    startTransition(async () => {
      const result = await deleteTask(id);
      if (result.success) {
        toast.success('Task deleted');
      } else {
        toast.error(result.error);
      }
    });
  };

  return (
    <div className="space-y-4">
      <button
        onClick={() => {
          setSelectedTask(null);
          setShowForm(true);
        }}
        className="fixed bottom-8 right-8 bg-blue-600 text-white w-14 h-14 rounded-full shadow-lg hover:bg-blue-700 flex items-center justify-center text-2xl transition-transform hover:scale-105"
      >
        +
      </button>

      {showForm && <AddTaskForm task={selectedTask} onClose={() => {  setShowForm(false);
            setSelectedTask(null); }} />}

      <div className="grid gap-4">
        {tasks.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4 text-6xl">📭</div>
            <p className="text-gray-500 text-lg">No tasks found. Start by creating one!</p>
          </div>
        )}

        {tasks.map((task) => (
          <div key={task._id} className="border bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 group">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={task.isCompleted}
                    onChange={() => handleToggle(task._id, task.isCompleted)}
                    className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer peer"
                  />
                  <div className="absolute inset-0 border-2 border-transparent peer-checked:border-blue-500 rounded pointer-events-none transition-all" />
                </div>
                <div className="flex-1">
                  <h3 className={`text-lg font-semibold ${task.isCompleted ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                    {task.title}
                  </h3>
                  {task.description && (
                    <p className="text-gray-600 mt-1 text-sm leading-relaxed">
                      {task.description}
                    </p>
                  )}
                  {task.dueDate && (
                    <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                      <span>{new Date(task.dueDate).toLocaleDateString('en-US', {
                        weekday: 'short',
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => {
                    setSelectedTask(task);
                    setShowForm(true);
                  }}
                  className="p-2 text-gray-600 hover:text-blue-600 rounded-lg hover:bg-gray-50 transition-colors"
                  title="Edit task"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </button>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="p-2 text-gray-600 hover:text-red-600 rounded-lg hover:bg-gray-50 transition-colors"
                  title="Delete task"
                  disabled={isPending}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}