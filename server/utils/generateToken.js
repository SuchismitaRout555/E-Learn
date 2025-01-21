import jwt from 'jsonwebtoken';

export const generateToken = (user, res, message) => {
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '30d' });

    return res.status(200).cookie("token", token, { httpOnly: true, sameSite: 'strict', maxAge: 30 * 24 * 60 * 60 * 1000 }).json({
         message, success: true, user });
};