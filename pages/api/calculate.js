export default async function handler(req, res) {
    // Extract the equation from the request
    const equation = JSON.parse(req.body)?.equation
    
    try {
        // Evaluate the equation and send the result if evaluation was successful
        const result = eval(equation)
        res.status(200).json({ message: "successful", result })
    } catch (e) {
        // Send an error response if the evaluation failed
        res.status(500).json({ message: "error"})
    }   
}