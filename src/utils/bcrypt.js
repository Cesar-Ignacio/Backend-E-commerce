import bcrypt from 'bcrypt'

const saltRounds = 10; // Número de rondas de sal

// Función para hashear una contraseña
export const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (error) {
        console.error('Error hashing password:', error);
        throw new Error('Error hashing password')
    }
};

// Función para verificar una contraseña
export const checkPassword = async (password, hashedPassword) => {
    try {
        const match = await bcrypt.compare(password, hashedPassword);
        return match;
    } catch (error) {
        console.error('Error comparing password:', error);
        throw new Error('Error comparing password');        
    }
};