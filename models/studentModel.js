const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");


const studentModel = new mongoose.Schema({

    fullname:{
        type:String,
        required:[true,"Full name is required"],
        minLenght:[3,"full name should be atleast 3 character long"]
    },
    // lastname:{
    //     type:String,
    //     required:[true,"last name is required"],
    //     minLenght:[3,"last name should be atleast 3 character long"]
    // },
    // city:{
    //     type:String,
    //     required:[true,"city name is required"],
    //     minLenght:[3,"city name should be atleast 3 character long"]
    // },
    contact:{
        type:String,
        required:[true,"Contact is required"],
        minLenght:[10,"Contact should be atleast 10 character long"],
        maxLenght:[10,"Contact must not exceed 10 character"]

    },
    avatar:{
        type:Object,
        default:{
            fileId:'',
            url:"https://plus.unsplash.com/premium_photo-1683584405772-ae58712b4172?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
        },
    },
    gender:{
        type:String,
        emum:["Male","Female","Others"],
    },
    email:{
        type:String,
        unique:true,
        require:[true,"Email is required"],
        unique: [true, "Email already exists"],
        index: { unique: true, sparse: true },
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please fill a valid email address',
        ],

    },
    password:{
        type:String,
        select:false,
        required: [true, "password is required"],
        minLength: [6, 'Password should have atleast 6 Characters'],
        maxLength: [15, 'Password should not exceed more than 15 Characters'],
     // match: [/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/ , "Password must have this char"],
    },
    
    passwordResetToken:{
        type:String,
        default:"0"
    },
    resume:{
        education:[
        ],
        jobs:[],
        internships:[],
        responsibilities:[],
        courses:[],
        projects:[],
        skills:[],
        accomplishments:[],
    },
    internships:[
        { type: mongoose.Schema.Types.ObjectId, ref:"internship"}
    ],
    jobs:[
        { type: mongoose.Schema.Types.ObjectId, ref:"job"}
    ],

},{timestamps:true});

studentModel.pre("save", function(){
    if(!this.isModified("password")){
        return;
    }
    let salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt)
});

studentModel.methods.comparepassword = function(password){
    return bcrypt.compareSync(password, this.password);
};

studentModel.methods.getjwtoken = function (){
    return jwt.sign({id: this.id},process.env.JWT_SECRET ,{
        expiresIn: process.env.JWT_EXPIRE,
    });
};

const student = mongoose.model("student",studentModel);

module.exports = student;