const express=require('express');
// create an new router
const router=new express.Router();
const student=require("../../models/studentApi");
// we need to define router

// CREATE POST
router.post("/students", async (req, res) => {
    // res.send("hello this is post");
    console.log(req.body);
    const user = new student(req.body);
    // WITH THEN CATCH
    // user.save().then(() => {
    // res.status(201).send(user);
    // } ).catch((e) => {
    //     res.status(403).send(e);
    // })
    // WITH TRY AND CATCH
    try {
        const createUser = await user.save();
        res.status(201).send(createUser);
    } catch (error) {
        res.status(400).send(error);

    }

});
//READ POST
router.get("/students", async (req, res) => {
    try {
        const data = await student.find();
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send(error);
    }

});
// DATA GET WITH ID
router.get("/students/:id", async (req, res) => {
    try {
        const _id = req.params.id;

        const data = await student.findOne({ _id: _id });
        if (!data) {
            return res.status(404).send();
        }
        else {
            res.status(201).send(data);
        }
    } catch (e) {
        res.status(500).send(e)
    }
});
// DATA GET WITH NAME
router.get("/students/:name", async (req, res) => {
    try {
        const name = req.params.name.toString();
        const data = await student.findOne({ name: name });
        if (!data) {
            return res.status(500).send();
        }
        else {
            res.status(201).send(data);
        }
    } catch (error) {
        res.send(error)

    }
});
// UPDATE DATA WITH ID
// app.patch("/students/:id",async(req,res) => {

//     try {
//         const _id= req.params.id;
//         const updateStudent=await student.findByIdAndUpdate(_id,req.body,{new:true});
//         res.status(200).send(updateStudent);
//     } catch (error) {
//         res.status(400).send(error);


//     }
// });
// UPDATE DATA WITH ROLLNO
router.patch("/students/:rollNo", async (req, res) => {

    try {
        const rollNo = req.params.rollNo;
        const updateStudent = await student.findOneAndUpdate(rollNo, req.body, { new: true });
        res.status(200).send(updateStudent);
    } catch (error) {
        res.status(400).send(error);


    }
});
//DELETE STUDENTS
router.delete("/students/:id", async (req, res) => {
    try {
        const deleteStudent = await student.findByIdAndDelete(req.params.id);
        if(!deleteStudent){
            return res.status(404).send("data is invalid");
        }
        else{
            res.status(200).send(deleteStudent);
        }
     
    } catch (error) {
        res.status(500).send(error);

    }
})

module.exports=router;