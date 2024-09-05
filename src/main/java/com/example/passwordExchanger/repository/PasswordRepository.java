package com.example.passwordExchanger.repository;

import com.example.passwordExchanger.entity.Password;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PasswordRepository extends JpaRepository<Password,Long> {

}
