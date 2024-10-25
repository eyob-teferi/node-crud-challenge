const validatePerson=require('../validation/person')
const { v4: uuidv4 } = require('uuid');



const getAllPersons= (app) => (req, res) =>{

    const persons=app.get('db');

    res.json(persons)
}

const getPerson= (app) => (req, res) =>{
    const persons=app.get('db');

    const {personId} =req.params

    const person = persons.find(p => p.id === personId);

    if (person) {
        res.json(person);
    } else {
        res.status(404).json({ error: 'Person not found' });
    }
}

const createPerson = (app) => (req, res) =>{
    const persons=app.get('db');

    const { error } = validatePerson(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    const newPerson = {
        id: uuidv4(),
        ...req.body,
    };

    persons.push(newPerson);

    res.status(201).json(newPerson);
}


const updatePerson= (app) => (req, res) =>{
    const persons=app.get('db');

    const { error } = validatePerson(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    const {personId} =req.params

    const personIndex = persons.findIndex(p => p.id === personId);

    if (personIndex === -1) {
        return res.status(404).json({ error: 'Person not found' });
    }

    const updatedPerson = {
        id: personId, 
        ...req.body,
    };

    persons[personIndex] = updatedPerson;

    res.json(updatedPerson);
    
}

const deletePerson= (app) => (req, res) =>{
    const persons=app.get('db');

    const {personId} =req.params

    const personIndex = persons.findIndex(p => p.id === personId);

    if (personIndex === -1) {
        return res.status(404).json({ error: 'Person not found' });
    }

    persons.splice(personIndex, 1);

    res.status(204).json('Delted successfuly');
}

module.exports={getAllPersons,getPerson,createPerson,updatePerson,deletePerson}