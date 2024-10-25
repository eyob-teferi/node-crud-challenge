const express =require('express')
const {getAllPersons,getPerson,createPerson,updatePerson,deletePerson}=require('../controllers/person')

const router=express.Router();

module.exports = (app) => {
    router.get('/',getAllPersons(app));
    router.get('/:personId',getPerson(app));
    router.post('/',createPerson(app));
    router.put('/:personId',updatePerson(app));
    router.delete('/:personId',deletePerson(app));

    return router;
};