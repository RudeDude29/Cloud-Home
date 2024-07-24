const nodemailer = require("nodemailer");
const OtpModel = require("../model/otpSchema");
const UserModel = require("../model/userModel");

const sendOTPMail = async (email, otp) => {
    try {
        let mailer = nodemailer.createTransport({
            service: "gmail",
            secure: false,
            port: 465,
            auth: {
                user: process.env.NODEMAILER_MAIL_USER,
                pass: process.env.NODEMAILER_MAIL_PASS,
            },
        });

        const response = await mailer.sendMail({
            from: "abcd", // likhilesh@<home.cloud.app>
            to: email,
            subject: "OTP", // OTP verification for your account
            html: `
                <html>
                    <body>
                        <h1> Your OTP for Cloud Home APP is </h1>
                        <h1> ${otp} </h1>
                    </body>
                </html>
            `,
        });

        

        return true;
    } catch (err) {
        console.log("--------------------------------");
        console.log("in login",err);
        console.log("--------------------------------");

        return false;
    }
};

const generateOtp = async (req, res) => {
    try {
        const { email, _id } = req.user;
        const restrictedTimeforOTP = 10 * 60 * 1000;
        const sentOPTMail = await OtpModel.findOne({
            email,
            createdAt: {
                $gte: Date.now() - restrictedTimeforOTP ,
            },
        });

        if (sentOPTMail) {
            res.status(200);
            res.json({
                status: "success",
                message: `Otp is already is sent to ${email}`,
                data: {
                    expiresAt: sentOPTMail.createdAt,
                },
            });
            return;
        }

        

        const randomOTP = Math.floor(Math.random() * 9000 + 1000);

        const isMailSent = await sendOTPMail(email, randomOTP);

        if (!isMailSent) {
            res.status(500);
            res.json({
                status: "Fail",
                message: `Otp NOT sent to ${email}`,
                data: {},
            });
            return;
        }

        await OtpModel.create({
            otp: randomOTP,
            email,
            userId: _id,
        });

        res.status(201);
        res.json({
            status: "success",
            message: `Otp sent to ${email}`,
            data: {},
        });
    } catch (err) {
        console.log("----------------------------");
        console.log(err);
        console.log("----------------------------");
        res.status(500).json({
            status: "fail",
            message: "Internal Server Error",
            data: err,
        });
    }
};
 
const verifyOtp = async (req,res)=>{
      const {otp} = req.body;
      const {email} = req.user;

      const restrictedTimeforOTP = 10 * 60 * 1000;

      const sentOTPMail = await OtpModel.findOne({
        email,
        createdAt: {
            $gte: Date.now() - restrictedTimeforOTP,
        }
      })

      try {
        if(!sentOTPMail){
            res.status(404).json({
                status:"fail",
                message:"Verification failed. Please generate new OTP",
            });
            return;
        }
        
        const isCorrect = await sentOTPMail.verifyOtp(otp + '', sentOTPMail.otp);
        if (!isCorrect) {
            res.status(400).json({
                status: "fail",
                message: "Incorrect otp",
                data: {},
            });
            return;
        }

        await UserModel.findOneAndUpdate({email},
            {isEmailVerified:true}
        );

        res.status(200);
        res.json({
            status:"success",
            message:"Verification successful",
            data:{},
        });

      } catch (error) {
        console.log(error)
        res.status(500).json({
            status:"fail",
            message:"Internal server err",
            data:error,
        })
      }
}

module.exports = { generateOtp , verifyOtp };
