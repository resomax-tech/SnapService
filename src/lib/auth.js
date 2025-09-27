import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const hashPassword = async (password)=>{
    return await bcrypt.hash(password,10)
}

export const comparePassword = async (password, hash)=>{
    return bcrypt.compare(password, hash)
}

export const generateToken = async (user)=>{
    const payload = {
        sub: user._id,
        name: user.name,
        mobile: user.mobile
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET,{expiresIn: "7d"})
    return token
}

export const decryptToken = async (token)=>{
    const payload = jwt.decode(token)   
    return payload
}

