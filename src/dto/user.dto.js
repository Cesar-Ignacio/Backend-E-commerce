class UserDTO {
    constructor(user) {
        this._id = user._id;
        this.fullName = `${user.firstName} ${user.lastName}`;
        this.email = user.email;
        this.age = user.age;
        this.cart_id = user.cart_id;
        this.password = user.password;
        this.role = user.role.toUpperCase();
        this.hasDocuments = user.hasDocuments;
        this.last_connection = user.last_connection
    }

    getPublicFields() {
        return {
            fullName: this.fullName,
            email: this.email,
            role: this.role,
            last_connection: this.last_connection
        };
    }
}

export default UserDTO;