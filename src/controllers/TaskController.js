import Task from '../../src/models/Task.js';
import User from '../../src/models/User.js';
import moment from 'moment-timezone';

async function getTasksByUserId(req, res) {
  const userId = req.params.userId;

  try {
    const tasks = await Task.find({ user: userId }).select('_id title description createdAt');

    if (tasks.length === 0) {
      return res.json({ message: 'Nenhuma tarefa encontrada para este usuário.' });
    }

    const tasksFormatted = tasks.map(task => ({
      _id: task._id,
      title: task.title,
      description: task.description,
      createdAt: moment(task.createdAt).tz('America/Sao_Paulo').format('YYYY-MM-DD-HH:mm'),
    }));

    res.json(tasksFormatted);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar tarefas.' });
  }
}

async function createTask(req, res) {
  const { title, description } = req.body;
  const userId = req.params.userId;

  if (!title || !description || !userId) {
    return res.status(400).json({ error: 'Forneça título, descrição e usuário para a tarefa.' });
  }

  try {
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    const newTask = new Task({
      title,
      description,
      user: userId,
      createdAt: new Date(), 
    });

    await newTask.save();

    res.status(201).json({ _id: newTask._id, title: newTask.title, description: newTask.description, createdAt: newTask.createdAt });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar a tarefa.' });
  }
}

async function updateTask(req, res) {
  const taskId = req.params.taskId;
  const updateFields = req.body; 

  if (Object.keys(updateFields).length === 0) {
    return res.status(400).json({ error: 'Forneça os campos para atualizar a tarefa.' });
  }

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { $set: updateFields },
      { new: true } 
    );

    if (!updatedTask) {
      return res.status(404).json({ error: 'Tarefa não encontrada.' });
    }

    res.status(200).json({
      _id: updatedTask._id,
      title: updatedTask.title,
      description: updatedTask.description,
      createdAt: moment(updatedTask.createdAt).tz('America/Sao_Paulo').format('YYYY-MM-DD-HH:mm'),
      updatedAt: moment(updatedTask.updatedAt).tz('America/Sao_Paulo').format('YYYY-MM-DD-HH:mm'),
    });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar a tarefa.' });
  }
}

async function deleteTask(req, res) {
  const taskId = req.params.taskId; 

  try {
    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res.status(404).json({ error: 'Tarefa não encontrada.' });
    }

    res.status(200).json({ message: 'Tarefa excluída com sucesso!', deletedTask });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao excluir a tarefa.' });
  }
}

export default { getTasksByUserId, createTask, deleteTask, updateTask };
