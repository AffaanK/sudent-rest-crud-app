const express = require('express');
const router = express.Router();
const Student = require('../models/student');

router.get('/add',(req,res)=>{
	
    res.render('students/add',{ title: 'Add Student ',primaryClass:'addStudent'});
});

router.get('/:id',async(req,res)=>{
try{
	const id = req.params.id;
	const student= await Student.findOne({id:id})

	res.render('students/view',{ student:student});
}
catch(err){
	console.error(err)
}
});

router.get('/',(req,res)=>{
    res.render('students/index',{ title: 'Students ',primaryClass:'students'});
});

module.exports =router;