import { Router } from 'express';
import pool from '../database.js';

const router = Router();

// Route to render the form for adding a new estado
router.get('/addestado', (req, res) => {
    res.render('estados/add');
});

// Route to handle adding a new estado
router.post('/addestado', async (req, res) => {
    try {
        const { descripcion } = req.body;
        const newEstado = { descripcion };
        await pool.query('INSERT INTO estado SET ?', [newEstado]);
        res.redirect('/listestado');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route to list all estados
router.get('/listestado', async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM estado');
        res.render('estados/list', { estados: result });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route to render the form for editing an estado
router.get('/editestado/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [estado] = await pool.query('SELECT * FROM estado WHERE estado_id = ?', [id]);
        const estadoEdit = estado[0];
        res.render('estados/edit', { estado: estadoEdit });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route to handle editing an estado
router.post('/editestado/:id', async (req, res) => {
    try {
        const { descripcion } = req.body;
        const { id } = req.params;
        const editEstado = { descripcion };
        await pool.query('UPDATE estado SET ? WHERE estado_id = ?', [editEstado, id]);
        res.redirect('/listestado');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route to delete an estado
router.get('/deleteestado/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM estado WHERE estado_id = ?', [id]);
        res.redirect('/listestado');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
