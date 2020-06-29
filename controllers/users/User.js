const DB = require('../../db/mysql/connection');

class User{
    constructor(){
        if(!User.instance){
            User.instance = this;
        }
        return User.instance;
    }

    async all(){
        try {
            let [rows] = await DB.query('SELECT * From users');
            return rows;
        } catch (error) {
            return{error:error.message}
        }
    }

    async create(payload){
        try {
            if(!payload.email || payload.email.length == 0){
                throw new Error('Email is required');
            }

            if(!payload.password || payload.password.length == 0){
                throw new Error('Password is required');
            }

            let[result] = await DB.query('INSERT INTO users (name, email, passowrd) values (?,?,?)',[payload.name, payload.email, payload.password]);
            result = await this.fetchID(result.insertId);

            return result;
        } catch (error) {
            return {error:error.message}
        }
    }

    async login(payload){
        try {
            if(!payload.email || payload.email.length == 0 ){
                throw new Error("Email field is required.");
            }
            if(!payload.password || payload.password.length == 0){
                throw new Error("Password field is required.");
            }

            let [rows] = await DB.query('SELECT userID FROM users WHERE email = ? AND passowrd = ?',[payload.email, payload.password]);
            let valid = rows[0] ? rows[0] : null;            
            if(valid == null){
                return 'Email or Password is wrong..!';
            }else{
                return 'Login successfully..!';
            }
        } catch (err) {
            return {error:err.message}
        }
    }

    async fetchID(userId){
        try {
            if(!userId){
                throw new Error('Somthing went wrong');
            }

            let [rows] = await DB.query('SELECT name, email,passowrd FROM users WHERE userId = ? ',[userId]);
            return rows;
        } catch (error) {
            return {error:error.message}
        }
    }
}
const instance = new User();
Object.freeze(instance);

module.exports = instance;