export default class UserModel {
  constructor(id, name, email, password) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }
  static add(user) {
    const { name, email, password } = user;
    const id = name.length;
    const newUser = new UserModel(id, name, email, password);
    users.push(newUser);
  }
  static isValidUser({ email, password }) {
    const user = users.find(
      (user) => user.email == email && user.password == password
    );
    return user;
  }
}
const users = [];
