import TaskList from '@/components/TaskList';
import connectToDB from '@/lib/db';
import Task from '@/models/Task';

export default async function Home() {
  await connectToDB();
  const tasks = await Task.find().sort({ createdAt: -1 });

  return (
    <main className="container mx-auto p-4 max-w-4xl min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Task Manager</h1>
      <TaskList tasks={JSON.parse(JSON.stringify(tasks))} />
    </main>
  );
}