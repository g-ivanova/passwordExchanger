package com.example.passwordExchanger.entity;

import jakarta.persistence.*;

@Entity
@Table(name="codes")
public class Code {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int code_id;
    @Column(name="code")
    private String code;
    @Column(name="code_validity")
    private String code_validity;
    @Column(name="user_id")
    private int user_id;

    public Code(){}

    public Code(int code_id, String code, String code_validity, int user_id) {
        this.code_id = code_id;
        this.code = code;
        this.code_validity = code_validity;
        this.user_id = user_id;
    }

    public Code(int user_id) {
        this.user_id = user_id;
    }

    public int getCode_id() {
        return code_id;
    }

    public void setCode_id(int code_id) {
        this.code_id = code_id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getCode_validity() {
        return code_validity;
    }

    public void setCode_validity(String code_validity) {
        this.code_validity = code_validity;
    }

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }
}
