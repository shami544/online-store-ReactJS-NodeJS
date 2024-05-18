const express = require('express')
const Users = require("../models/Users")
const jwt = require('jsonwebtoken');
const Tokens = require('../models/token');
const sendEmail = require("../middlewares/email")
const crypto = require('crypto')
const bcrypt = require("bcryptjs")


const protectAdmin = async (req = express.request, res = express.response, next) => {
    // get token

    let token;

    if (req.headers.authorization) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
        // return next(new ApiError("you are not login ,please login to get access this route", 401))
        res.status(401).json({
            errors: [
                {
                    msg: "you are not login ,please login to get access this route",
                },
            ],
        });
    }
    else if (token) {
        try {
            const decodedToken = jwt.decode(token);
            const tokenDb = await Tokens.find({ token: token })
            // التحقق مما إذا كان التوكن منتهي الصلاحية أم لا
            if (decodedToken && decodedToken.exp && Date.now() >= decodedToken.exp * 1000) {
                // التوكن منتهي الصلاحية
                res.status(401).json({
                    errors: [{
                        msg: "انتهت صلاحية التوكن"
                    }]
                });

            }
            else if (!tokenDb) {
                res.status(401).json({
                    errors: [{
                        msg: " التوكين غير موجود في قاعدة البيانات "
                    }]
                });
            } else {
                const decoded = jwt.verify(token, process.env.JWT_ADMIN_SECRET_KEY)
                const currentUser = await Users.findById(decoded.userId)
                if (!currentUser) {
                    res.status(401).json({
                        errors: [
                            {
                                msg: "the user that belone to this token dose on longer exist",
                            },
                        ],
                    });
                }
                // check if user change his password after token created
                if (currentUser.passwordChangedat) {
                    const passChangedTimestamp = parseInt(
                        currentUser.passwordChangedat.getTime() / 1000,
                        10
                    );
                    // Password changed after token created (Error)
                    if (passChangedTimestamp > decoded.iat) {
                        return next(
                            // new ApiError(
                            //     'User recently changed his password. please login again..',
                            //     401
                            // )
                            res.status(401).json({
                                errors: [
                                    {
                                        msg: "User recently changed his password. please login again..",
                                    },
                                ],
                            })
                        );
                    }
                }
                req.user = currentUser
                next()
            }
        } catch (error) {
            res.status(400).json({
                errors: [
                    {
                        msg: "This account is not authorized",
                    },
                ],
            });
        }
    }
}

const protectAll = async (req = express.request, res = express.response, next) => {
    // get token

    let token;

    if (req.headers.authorization) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
        // return next(new ApiError("you are not login ,please login to get access this route", 401))
        res.status(401).json({
            errors: [
                {
                    msg: "you are not login ,please login to get access this route",
                },
            ],
        });
    }
    else if (token) {
        try {
            const decodedToken = jwt.decode(token);
            const tokenDb = await Tokens.find({ token: token })

            // التحقق مما إذا كان التوكن منتهي الصلاحية أم لا
            if (decodedToken && decodedToken.exp && Date.now() >= decodedToken.exp * 1000) {
                // التوكن منتهي الصلاحية
                res.status(401).json({
                    errors: [{
                        msg: "انتهت صلاحية التوكن"
                    }]
                });
            }
            else if (!tokenDb) {
                res.status(401).json({
                    errors: [{
                        msg: " التوكين غير موجود في قاعدة البيانات "
                    }]
                });
            } else {
                const decoded = jwt.verify(token, process.env.JWT_CLINE_SECRET_KEY)
                const currentUser = await Users.findById(decoded.userId)
                if (!currentUser) {
                    res.status(401).json({
                        errors: [
                            {
                                msg: "the user that belone to this token dose on longer exist",
                            },
                        ],
                    });
                }
                // check if user change his password after token created
                if (currentUser.passwordChangedat) {
                    const passChangedTimestamp = parseInt(
                        currentUser.passwordChangedat.getTime() / 1000,
                        10
                    );
                    // Password changed after token created (Error)
                    if (passChangedTimestamp > decoded.iat) {
                        return next(
                            // new ApiError(
                            //     'User recently changed his password. please login again..',
                            //     401
                            // )
                            res.status(401).json({
                                errors: [
                                    {
                                        msg: "User recently changed his password. please login again..",
                                    },
                                ],
                            })
                        );
                    }
                    req.user = currentUser
                    next()
                }
            }

        } catch (error) {
            const decodedToken = jwt.decode(token);
            const tokenDb = await Tokens.find({ token: token })
            // التحقق مما إذا كان التوكن منتهي الصلاحية أم لا
            if (decodedToken && decodedToken.exp && Date.now() >= decodedToken.exp * 1000) {
                // التوكن منتهي الصلاحية
                res.status(401).json({
                    errors: [{
                        msg: "انتهت صلاحية التوكن"
                    }]
                });
            }
            else if (!tokenDb) {
                res.status(401).json({
                    errors: [{
                        msg: " التوكين غير موجود في قاعدة البيانات "
                    }]
                });
            } else {
                // التوكن صالح
                const decoded = jwt.verify(token, process.env.JWT_ADMIN_SECRET_KEY)
                const currentUser = await Users.findById(decoded.userId)
                if (!currentUser) {
                    res.status(401).json({
                        errors: [
                            {
                                msg: "the user that belone to this token dose on longer exist",
                            },
                        ],
                    });
                }
                // check if user change his password after token created
                if (currentUser.passwordChangedat) {
                    const passChangedTimestamp = parseInt(
                        currentUser.passwordChangedat.getTime() / 1000,
                        10
                    );
                    // Password changed after token created (Error)
                    if (passChangedTimestamp > decoded.iat) {
                        return next(
                            // new ApiError(
                            //     'User recently changed his password. please login again..',
                            //     401
                            // )
                            res.status(401).json({
                                errors: [
                                    {
                                        msg: "User recently changed his password. please login again..",
                                    },
                                ],
                            })
                        );
                    }
                }
                req.user = currentUser
                next()
            }
        }
    }
}

const forgotPassword = async (req, res, next) => {
    const user = await Users.findOne({ email: req.body.email })

    if (!user) {
        res.status(404).json({
            errors: [
                {
                    msg: "we could not find the user with given email",
                },
            ],
        });
    }

    const resetToken = user.createResetPasswordToken();
    await user.save({ validateBeforeSave: false })
    const resetUrl = `${req.protocol}://${req.get('host')}/auth/PatchPassword/${resetToken}`;
    const message = `saddsa sa dsad sad sad sa\n\n${resetUrl}\n\nfdsfds fds df gs`

    try {
        await sendEmail({
            email: user.email,
            subject: "password change request received",
            message: message,
        })
        res.status(200).json({
            status: 'success',
            message: 'password reset lin; send to the user email'
        })
    } catch (error) {
        user.passwordResetToken = undefined;
        user.passwordResetTokenExpires = undefined;
        await user.save({ validateBeforeSave: false })
        return res.status(500).json({
            errors: [
                {
                    msg: "please try agine later",
                },
            ],
        });
    }
}

const resetPassword = async (req, res) => {
    try {
        const token = crypto.createHash('sha256').update(req.params.token).digest('hex');
        const user = await Users.findOne({ passwordResetToken: token, passwordResetTokenExpires: { $gt: Date.now() } });

        if (!user) {
            return res.status(404).json({
                errors: [
                    {
                        msg: "Token is invalid or has expired",
                    },
                ],
            });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 12);

        const updateResult = await Users.updateOne(
            { _id: user._id },
            {
                $set: {
                    password: hashedPassword,
                    passwordChangedAt: Date.now(),
                },
                $unset: {
                    passwordResetToken: "",
                    passwordResetTokenExpires: ""
                }
            }
        );

        if (updateResult.nModified === 0) {
            return res.status(404).json({
                errors: [
                    {
                        msg: "Failed to update user",
                    },
                ],
            });
        }

        res.status(200).json({ msg: 'Password has been reset successfully.' });
    } catch (error) {
        res.status(500).json({ errors: [{ msg: error.message }] });
    }
};

module.exports = { protectAll, protectAdmin, forgotPassword, resetPassword }