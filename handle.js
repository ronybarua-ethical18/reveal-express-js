const handle = (req, res) =>{
    res.send(req.app.locals.title = 'My App')
}

module.exports = handle