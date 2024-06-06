import { modelUser } from "../dao/models/users.model.js"

export const handleLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await modelUser.findOne({ email: email });
        if (!user) {
            throw new Error("No se encontro el usuario")
        }
        if (user.password === password && email === user.email) {
            req.session.user = { firstName: user.firstName, lastName: user.lastName, email: user.email, role: user.role, id:user._id};
            res.status(200).send({ message: { ok: true, url: '/' } })
        }
        else {
            res.status(400).send({ message: 'Datos incorrectos' })
        }

    } catch ({ message }) {
        res.status(500).send({ message: message });
    }
}

export const handleLogout=(req,res)=>{
    try {
        req.session.destroy(err=>{
            if(err)
                {
                    res.status(400).send({message:"Hubo un error"})
                }
                else{
                    res.status(200).send({message:{ok:true,url:'/login'}})
                }
        })
        
    } catch ({ message }) {
        res.status(500).send({ message: message });
    }
}