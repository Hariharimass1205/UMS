import user from "../model/userModel.js"
import jwt from 'jsonwebtoken'
const maxAge = 3 * 24 * 60 * 60 * 1000
const createAdminToken = (email) => {
    return jwt.sign({ email }, process.env.JWT_KEY, { expiresIn: maxAge })
}

export const verifyadminjwt = async (req, res) => {
    try {
        if (req.cookies.jwtToken) {
            jwt.verify(req.cookies.jwtToken, process.env.JWT_KEY);
            res.send(true)
        } else {
            res.send(false)
        }
    } catch (error) {
        res.send(false)
        console.log(error);
    }
}

export const adduser = async (req, res) => {
    try {
        const { email, password, phone, name } = req.body
        if (!email || !password) {
            return res.status(400).send('email and password required')
        }
        const existingUser = await user.findOne({ $or: [{ email }, { phone }] });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email or phone number already exists.' });
        }
        const userDetails = await user.create({ email, password, phone, username: name,createdAt: new Date() })
        return res.status(200).json(userDetails);
    } catch (error) {
        console.log(error);
    }
}


export const adminlogin = async (req, res) => {
    try {
        console.log(req.body)
        console.log('admincontroller');
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).send('email and password required')
        }
        if (email != process.env.ADMIN_EMAIL || password != process.env.ADMIN_PASSWORD) {
            return res.status(400).send('Enter valid credentials')
        }
        let adminToken = createAdminToken(email)
        console.log(adminToken);
        res.cookie('jwtToken', adminToken, {
            maxAge,
            sameSite: 'None',
            secure: true
        })
        return res.status(200).send('Login successfull');

    } catch (error) {
        console.log(error);
    }
}

export const userdetails = async (req, res) => {
    try {
        const users = await user.find().sort({ createdAt: -1 });
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
}

export const deleteuser = async (req, res) => {
    try {
        const { userId } = req.body
        await user.findByIdAndDelete(userId);
        res.status(200).send('user deleted successfully');
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
}
export const userDetailsEdit = async (req, res) => {
    try {
        const { userId } = req.params;
        const existingUser = await user.findOne({ _id: userId });
        return res.status(200).json(existingUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
}

export const edituser = async (req, res) => {
    try {
        const { userId, phone, email, name } = req.body;
        console.log(req.body);
        const existingEmailUser = await user.findOne({ email, _id: { $ne: userId } });
        if (existingEmailUser) {
          return res.status(400).json({ message: 'Email already in use' });
        }
    
        const existingPhoneUser = await user.findOne({ phone, _id: { $ne: userId } });
        if (existingPhoneUser) {
          return res.status(400).json({ message: 'Phone number already in use' });
        }
        await user.findByIdAndUpdate(
            userId,
            { phone, email,username: name },
            { new: true, runValidators: true }
        )
        res.status(200).send('user edited successfully');
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
}




