package com.example.passwordExchanger.service.impl;

import com.example.passwordExchanger.entity.Code;
import com.example.passwordExchanger.repository.CodeRepository;
import com.example.passwordExchanger.service.CodeService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CodeServiceImpl implements CodeService {

    private CodeRepository codeRepository;
    public CodeServiceImpl(CodeRepository codeRepository) {
        super();
        this.codeRepository = codeRepository;
    }
    @Override
    public List<Code> getAllCodes() {
        return codeRepository.findAll();
    }

    @Override
    public Code saveCode(Code code) {
       return codeRepository.save(code);
    }

    @Override
    public Code getCodeById(int id) {
        return codeRepository.findById((long)id).get();
    }

    @Override
    public Code updateCode(Code code) {
        return codeRepository.save(code);
    }

    @Override
    public void deleteCodeById(Long id) {
        codeRepository.deleteById(id);
    }

    @Override
    public void insertCode(int user_id) {
        codeRepository.insertCode(user_id);
    }

    @Override
    public int getLastID() {
        return codeRepository.getLastID();
    }
}
