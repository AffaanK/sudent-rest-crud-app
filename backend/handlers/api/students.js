const express = require('express');
const Student = require('../../models/student');
const router = express.Router();

router.post('/', (req, res) => {
	//sanitize data 
	const name = typeof (req.body.name) == 'string' && req.body.name.trim().length > 0 ? req.body.name.trim() : false;
	const address = typeof (req.body.address) == 'string' && req.body.address.trim().length > 0 ? req.body.address.trim() : false;
	const age = typeof (req.body.age) == 'string' && req.body.age > 0  ? req.body.age : false;
	const phone = typeof (req.body.phone) == 'string' && req.body.phone.trim().length == 10  ? req.body.phone.trim() : false;

	console.log(phone , name , address , age,req.body.age)
	if (phone && name && address && age) {
		// Make sure the Student doesnt already exist
    Student.findOne({phone:phone})
    .then((student)=>{
      if(student== null){
				 Student.create({
					name: name,
					address:address,
					age:age,
					phone:phone
				}).then((newUser) => {
						res.status(200).send(newUser);
				}).catch(err => {
						res.status(500).send({ 'Error': 'Internal Server Error' })
						console.log(err)
					})
      }else{
        res.status(400).send({ 'Error': 'A Student with that phone number already exists' })    
      }
    })
    .catch(err => {
      res.status(500).send({'Error':'Internal Server Error.'})
      console.error('database error:', err)
    })
	} else
		res.status(400).send({ 'Error': 'Missing required field(s).' })
});

router.post('/:id', (req, res) => {

	//sanitize data 
	const id = req.params.id;
	const name = typeof (req.body.name) == 'string' && req.body.name.trim().length > 0 ? req.body.name.trim() : false;
	const address = typeof (req.body.address) == 'string' && req.body.address.trim().length > 0 ? req.body.address.trim() : false;
	const age = typeof (req.body.age) == 'string' && req.body.age > 0  ? req.body.age : false;
	const phone = typeof (req.body.phone) == 'string' && req.body.phone.trim().length == 10  ? req.body.phone.trim() : false;


	if (phone || name || address || age) {
		// Make sure the Student doesnt already exist
    Student.findOne({id:id})
    .then((student)=>{
      if(student != null){
				if(name){
					student.name=name;
				}
				if(age){
					student.age=age
				}
				if(phone){
					student.phone=phone
				}
				if(address){
					student.address=address
				}

				 Student.updateOne(student).then((updatedUser) => {
						res.status(200).send(updatedUser);
				}).catch(err => {
						res.status(500).send({ 'Error': 'Internal Server Error' })
						console.log(err)
					})
      }else{
        res.status(400).send({ 'Error': 'A Student with that phone number Does not exists' })    
      }
    })
    .catch(err => {
      res.status(500).send({'Error':'Internal Server Error.'})
      console.error('database error:', err)
    })
	} else
		res.status(400).send({ 'Error': 'Missing required field(s).' })
});

/**
 * get List of all the Student
 * 
 */
router.get('/:id', async (req, res) => {
	try {
		const id = req.params.id;
		const students =await Student.findOne({id:id})
			res.status(200).json({ students: students })		

	} catch (error) {

		res.status(500).send({ 'Error': 'Internal Server Error' })
	}

})
/**
 * get List of all the Student
 * 
 */
 router.get('/', async (req, res) => {
	try {
		const students =await Student.find()
			res.status(200).json({ students: students })		

	} catch (error) {
		res.status(500).send({ 'Error': 'Internal Server Error' })
	}

})

router.delete('/:id',async(req,res)=>{
	try {
		const id = req.params.id;
		const students =await Student.deleteOne({_id:id})
			res.status(200).json({ students: students })		

	} catch (error) {
		res.status(500).send({ 'Error': 'Internal Server Error' })
	}
})
module.exports = router;