const User = require("../model/user");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const handleCandidategoogleAuth = async (req, res) => {

    try {
        const { email, name, password } = req.body;
        const foundUser = await User.findOne({ email }).exec();
        if (foundUser) {
            const role = foundUser?.role;
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "id": foundUser._id,
                    "name": foundUser.name,
                    "email": foundUser.email,
                    "role": role

                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '30s' }
            );
            const refreshToken = jwt.sign(
                {
                    "name": foundUser.name,
                    "email": foundUser.email,
                    "role": role
                },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '1d' }
            );
            foundUser.refreshToken = refreshToken;
            const result = await foundUser.save();
            // console.log(result);
            // console.log(accessToken);   
            // console.log(refreshToken);
            res.cookie(
                'jwt',
                refreshToken,
                {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'None',
                    maxAge: 1000 * 60 * 60 * 24 * 7
                }
            )
            res.json({ role, accessToken })
        } else {
            const newUser = new User({
                name: name,
                email: email,
                password: password,
                role: 1002
            });
            const savedUser = await newUser.save();
            const role = savedUser.role;
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "id": savedUser._id,
                        "name": savedUser.name,
                        "email": savedUser.email,
                        "role": role
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '30s' }
            );
            const refreshToken = jwt.sign(
                {
                    "name": savedUser.name,
                    "email": savedUser.email,
                    "role": role
                },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '1d' }
            );
            savedUser.refreshToken = refreshToken;
            const result = await savedUser.save();
            // console.log(result);
            // console.log(accessToken);
            // console.log(refreshToken);
            res.cookie(
                'jwt',
                refreshToken,
                {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'None',
                    maxAge: 1000 * 60 * 60 * 24 * 7
                }
            )
            res.json({ role, accessToken, savedUser })
        }
    } catch (err) {
        console.log(err);
    }
}


module.exports = { handleCandidategoogleAuth };
