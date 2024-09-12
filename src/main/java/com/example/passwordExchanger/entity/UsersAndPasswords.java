package com.example.passwordExchanger.entity;

import java.sql.Date;

public class UsersAndPasswords {

     private int id_password;

     String password_desc;

     int password_from;

     int password_to;

     String password_to_name;

     String password_from_name;

     String password;

     String password_date;

    public UsersAndPasswords(int id_password, String password_desc, int password_from, String password_from_name, String password, String password_date) {
        this.id_password = id_password;
        this.password_desc = password_desc;
        this.password_from = password_from;
        this.password_from_name = password_from_name;
        this.password = password;
        this.password_date = password_date;
    }

    public UsersAndPasswords(int id_password, String password_desc, int password_from, int password_to, String password_to_name, String password_from_name, String password, String password_date) {
        this.id_password = id_password;
        this.password_desc = password_desc;
        this.password_from = password_from;
        this.password_to = password_to;
        this.password_to_name = password_to_name;
        this.password_from_name = password_from_name;
        this.password = password;
        this.password_date = password_date;
    }

    public UsersAndPasswords() {

    }


    public int getPassword_to() {
        return password_to;
    }

    public void setPassword_to(int password_to) {
        this.password_to = password_to;
    }

    public String getPassword_to_name() {
        return password_to_name;
    }

    public void setPassword_to_name(String password_to_name) {
        this.password_to_name = password_to_name;
    }

    public int getId_password() {
        return id_password;
    }

    public void setId_password(int id_password) {
        this.id_password = id_password;
    }

    public String getPassword_desc() {
        return password_desc;
    }

    public void setPassword_desc(String password_desc) {
        this.password_desc = password_desc;
    }

    public int getPassword_from() {
        return password_from;
    }

    public void setPassword_from(int password_from) {
        this.password_from = password_from;
    }

    public String getPassword_from_name() {
        return password_from_name;
    }

    public void setPassword_from_name(String password_from_name) {
        this.password_from_name = password_from_name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPassword_date() {
        return password_date;
    }

    public void setPassword_date(String password_date) {
        this.password_date = password_date;
    }
}
