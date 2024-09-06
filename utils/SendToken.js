exports.sendtoken = (student,statusCode,res) => {
    const token = student.getjwtoken();
    const options = { 
        exipres: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000 
        ),
        httpOnly: true,
    }
    res.status(statusCode).cookie("token",token,options, {
        httpOnly: true,
        secure: true,
        maxAge:   24 * 60 * 60 * 1000,
        sameSite: "none"
      }).json({
        success: true,
        id: student._id, student
    });
};
