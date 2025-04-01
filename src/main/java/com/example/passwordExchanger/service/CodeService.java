package com.example.passwordExchanger.service;

import com.example.passwordExchanger.entity.Code;
import com.example.passwordExchanger.entity.UserRoles;

import java.util.List;

public interface CodeService {

    List<Code> getAllCodes();

    Code saveCode(Code code);

    Code getCodeById(int id);

    Code updateCode(Code code);

    void deleteCodeById(Long id);
    void insertCode(int user_id);
    int getLastID();

    Code getCodeByUserId(int user_id);
}
