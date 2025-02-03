'use server'

import connectToDB from "@/lib/db"
import Task from "@/models/Task"
import { revalidatePath } from "next/cache"

export async function createTask(formData){
    try{
        await connectToDB();
        const newTask = new Task({
            title: formData['title'],
            description: formData['description'],
            dueDate: new Date(formData['dueDate'])
        });

        await newTask.save();
        revalidatePath('/')
        return {success: true, message: 'task created Successfully'}

    } catch (error){
        return { success: false, error: error.message}
    }
}

export async function toggleTask(id, isCompleted){
    try{
        await connectToDB();
        await Task.findByIdAndUpdate(id, {isCompleted: !isCompleted});
        revalidatePath('/');
        return {success: true, message: 'task updated Successfully'}
    } catch (error){
        return {success: false, error: error.message}
    }
}


export async function deleteTask(id){
    try{
        await connectToDB();
        await Task.findByIdAndDelete(id);
        revalidatePath('/')
        return {success: true}
    } catch (error){
        return {success: false, error: error.message}
    }
}


export async function updateTask(id, task){
    try{
        await connectToDB();
        await Task.findByIdAndUpdate(id, task, {new: true});
        revalidatePath('/');
        return {success: true, message: 'task updated Successfully'}
    } catch (error){
        return {success: false, error: error.message}
    }
}