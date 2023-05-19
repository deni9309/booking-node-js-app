// function that exepts defaultTitle and returns other function
module.exports = (defaultTitle) => (req, res, next) => {  
    res.locals.title = defaultTitle;

    next();
};