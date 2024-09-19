package com.example.passwordExchanger.entity;

public class UsersAndRoles {

    private int user_id;
    private String user_names;
    private String user_username;
    private String user_email;
    private String user_roles;

    public UsersAndRoles(int user_id, String user_names, String user_username, String user_email) {
        this.user_id = user_id;
        this.user_names = user_names;
        this.user_username = user_username;
        this.user_email = user_email;
    }
    public UsersAndRoles(int user_id, String user_names, String user_username, String user_email, String user_roles) {
        this.user_id = user_id;
        this.user_names = user_names;
        this.user_username = user_username;
        this.user_email = user_email;
        this.user_roles = user_roles;
    }

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public String getUser_names() {
        return user_names;
    }

    public void setUser_names(String user_names) {
        this.user_names = user_names;
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

    public String getUser_roles() {
        return user_roles;
    }

    public void setUser_roles(String user_roles) {
        this.user_roles = user_roles;
    }
}
