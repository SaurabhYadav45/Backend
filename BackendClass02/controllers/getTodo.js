const Todo = require("../models/Todo");


exports.getTodo = async (req, res) => {
    try {
        // fetch all todo items from the database
        const todos = await Todo.find({});

        // response
        res.status(200)
        .json({
            success: true,
            data: todos,
            message : "Entire Todo is fetched",
        });
    } catch (err) {
        console.error(err)
        res.status(500)
        .json({
            success: false,
            error: err.message,
            message: "Server Error"
        });
    }
}


exports.getTodoById = async (req, res) =>{
    try {
        console.log(req.params);
        const id = req.params.id;
        const todo = await Todo.findById({_id:id})

        // If data for given id not found
        if(!todo){
            return res.status(404).jsom({
                success: false,
                message: " No data found with given id"
            })
        }
        // data for given id is found
        res.status(200).json({
            success: true,
            data: todo,
            message: `Todo ${id} data successfullyy fetched`,
        })
    } catch (err) {
        console.error(err);
        console.log(err);
        res.status(500).json(
            {
                success: false,
                data: "Internal server error",
                message:err.message,
            })
    }
}