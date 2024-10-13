const Todo = require("../models/Todo");

exports.updateTodo = async(req, res) => {
    try {
        const {id} = req.params;
        const{title, description} = req.body;

        const todo = await Todo.findByIdAndUpdate(
            id,
            {title, description, updatedAt: Date.now()},
        )
        res.status(200).json({
            success: true,
            data:todo,
            message: "updated successfully"
        })
    } catch (err) {
        console.error(err);
        res.status(500).json(
            {
                success: false,
                data: "Internal server error",
                message:err.message,
            })
    }
}