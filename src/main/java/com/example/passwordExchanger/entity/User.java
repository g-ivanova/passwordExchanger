package com.example.passwordExchanger.entity;


import jakarta.persistence.*;

@Entity
@Table(name="users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int user_id;
    @Column(name="user_username")
    private String user_username;
    @Column(name="user_email")
    private String user_email;
    @Column(name="user_password")
    private String user_password;
    @Column(name="user_names")
    private String user_names;

    public User(){}

    public User(int user_id, String user_username, String user_email, String user_password, String user_names) {
        this.user_id = user_id;
        this.user_username = user_username;
        this.user_email = user_email;
        this.user_password = user_password;
        this.user_names = user_names;
    }


    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public String getUser_username() {
        return user_username;
    }

    public void setUser_username(String user_username) {
        this.user_username = user_username;
    }

    public String getUser_email() {
        return user_email;
    }

    public void setUser_email(String user_email) {
        this.user_email = user_email;
    }

    public String getUser_password() {
        return user_password;
    }

    public void setUser_password(String user_password) {
        this.user_password = user_password;
    }

    public String getUser_names() {
        return user_names;
    }

    public void setUser_names(String user_names) {
        this.user_names = user_names;
    }

}
