var express = require("express");
var router = express.Router();
// const Validator = require("fastest-validator");
// const v = new Validator();
// const { TODO } = require("../models");
const todoController = require('../controllers/todo.controller');

// Membuat todolist baru
router.post("/tambah", todoController.createTODO);
// Melihat semua todolist
router.get("/lihat", todoController.getTODO);

// Melihat detail todo
router.get("/lihat/:id", todoController.getTODObyid);

// Mengubah todolist
router.put("/ubah/:id", todoController.editTODO);

// Menghapus todo
router.delete("/hapus/:id", todoController.hapusTODObyid);

// Menghapus semua todo
router.delete("/hapus", todoController.hapusTODO);

module.exports = router;