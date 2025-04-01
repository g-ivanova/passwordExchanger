package com.example.passwordExchanger.entity;

import jakarta.persistence.*;

import java.sql.Date;

@Entity
@Table(name="passwords")
public class Password {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int password_id;
    @Column(name="password_desc")
    private String password_desc;
    @Column(name="password_from")
    private int password_from;
    @Column(name="password_to")
    private int password_to;
    @Column(name="password_validity")
    private String password_validity;
    @Column(name="pass")
    private byte[] pass;

    public Password(){}

    public Password(int password_id, String password_desc, int password_from, int password_to, String password_validity, byte[] password) {
        this.password_id = password_id;
        this.password_desc = password_desc;
        this.password_from = password_from;
        this.password_to = password_to;
        this.password_validity = password_validity;
        this.pass = password;
    }

    public int getPassword_id() {
        return password_id;
    }

    public void setPassword_id(int password_id) {
        this.password_id = password_id;
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

    public int getPassword_to() {
        return password_to;
    }

    public void setPassword_to(int password_to) {
        this.password_to = password_to;
    }

    public String getPassword_validity() {
        return password_validity;
    }

    public void setPassword_validity(String password_validity) {
        this.password_validity = password_validity;
    }

    public byte[] getPass() {
        return pass;
    }

    public void setPass(byte[] password) {
        this.pass = password;
    }
}
