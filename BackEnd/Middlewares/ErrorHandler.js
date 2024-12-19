const notFound = (req,res,next) => {
    const err = new Error(`Page Not Found ${req.origenalUrl}`);
    res.status(404).json({message : err.message})
    next(err);
}

const errorHandlar = (err,req,res,next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;

    res.status(statusCode).json({
        message : message,
        stack : err.stack
    })
}

export {notFound,errorHandlar}