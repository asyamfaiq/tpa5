const { TodoList, User } = require('../models')
const Validator = require('fastest-validator')
const jwt = require('jsonwebtoken')
const v = new Validator()

async function createTODO (req, res) {
  // validation
  const schema = {
    tittle: 'string',
    description: 'string|optional'
  }
  const validate = v.validate(req.body, schema)
  if (validate.length) {
    return res.status(400).json(validate)
  }
  // proses create
  // const {id} = req.params
  // console.log(id)
  const auth = await req.headers.authorization
  const token = await auth.split(' ')[1]

  const verified = jwt.verify(token, 'secret')
  if (!verified) {
    res.json({
      status: 400,
      message: 'Failed create data'
    })
  } else {
    const temp = await TodoList.create({
      name: req.body.name,
      description: req.body.description,
      isDone: req.body.isDone,
      user_id: verified.user_id
    })
    res.json({
      status: 200,
      message: 'Success create data',
      data: temp
    })
  }
}
async function getTODO (req, res) {
  const auth = await req.headers.authorization
  const token = await auth.split(' ')[1]

  const verified = jwt.verify(token, 'secret')
  const ambil = await TodoList.findAll({
    where: {
      user_id: verified.user_id
    }
  })
  res.status(200).json({
    message: 'Success get all data',
    data: ambil
  })
}
async function getTODObyid (req, res) {
  const auth = await req.headers.authorization
  const token = await auth.split(' ')[1]

  const verified = jwt.verify(token, 'secret')

  const id = req.params.id
  // check id in table todolist
  let ambilid = await TodoList.findByPk(id)
  if (!ambilid) {
    res.status(404).json({ status: 404, message: 'Data not found' })
  } else {
    if (ambilid.user_id == verified.user_id) {
      res.status(200).json({ message: 'Success get data', data: ambilid })
    } else {
      res.status(400).json({ message: 'failed get data' })
    }
  }
}
async function editTODO (req, res) {
  const auth = await req.headers.authorization
  const token = await auth.split(' ')[1]

  const verified = jwt.verify(token, 'secret')
  // validation
  const schema = {
    name: 'string|optional',
    description: 'string|optional'
  }
  const validate = v.validate(req.body, schema)
  if (validate.length) {
    return res.status(400).json(validate)
  }
  const id = req.params.id
  let note = await TodoList.findByPk(id)
  if (!note) {
    res.status(404).json({ status: 404, message: 'Data not found' })
  } else {
    if (note.user_id == verified.user_id) {
      // proses update
      edit = await TodoList.update(
        {
          name: req.body.name,
          description: req.body.description,
          isDone: req.body.isDone
        },
        {
          where: {
            id: id
          }
        }
      )
      res.json({
        status: 200,
        message: 'Success update data',
        data: edit
      })
    } else {
      res.json({
        status: 400,
        message: 'Failed update data'
      })
    }
  }
}
async function hapusTODObyid (req, res) {
  const auth = await req.headers.authorization
  const token = await auth.split(' ')[1]

  const verified = jwt.verify(token, 'secret')
  const id = req.params.id
  // check id in table todolist
  let hapus = await TodoList.findByPk(id)
  if (!hapus) {
    return res.status(404).json({ status: 404, message: 'Data not found' })
  }
  if (hapus.user_id == verified.user_id) {
    // proses delete data
    const hapus1 = await TodoList.destroy({
      where: {
        id: id
      }
    })
    res.json({
      status: 200,
      message: 'Success delete data',
      data: hapus1
    })
  } else {
    res.json({
      status: 400,
      message: 'failed delete data'
    })
  }
}
async function hapusTODO (req, res) {
  // proses delete data
  const auth = await req.headers.authorization
  const token = await auth.split(' ')[1]

  const verified = jwt.verify(token, 'secret')

  if (!verified) {
    res.json({
      status: 400,
      message: 'failed delete data'
    })
  } else {
    const hapusid = await TodoList.destroy({
      where: {
        user_id: verified.user_id
      }
    })
    res.json({
      status: 200,
      message: 'Success delete data',
      data: hapusid
    })
  }
}
module.exports = {
  createTODO: createTODO,
  getTODO: getTODO,
  getTODObyid: getTODObyid,
  editTODO: editTODO,
  hapusTODObyid: hapusTODObyid,
  hapusTODO: hapusTODO
}