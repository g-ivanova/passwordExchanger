package com.example.passwordExchanger.securingweb;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfiguration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebSecurity
@ComponentScan
public class WebSecurityConfig implements WebMvcConfigurer {
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {


        http


                .authorizeHttpRequests((requests) -> requests
                        .requestMatchers("/index", "/home","/sendpass","/getUsersFromRole","/home/{user_id}/{id}","/admin","/admin/{user_id}/{role_id}","/edit_group","/admin/**","/admin/addNewGroup","add_new_role","/admin/addUserToGroup","/admin/deleteGroup/{user_id}/{id}","/admin/deleteUser/{id}/{user_id}","/admin/deleteUserFromGroup/{id}/{user_id}/{role_id}","/admin/searchUser","/admin/searchUser/{user_id}/{searchText}","/admin/searchGroup","/admin/searchGroup/**","/admin/editUser/{id}/{user_id}","/home/settings","/home/settings/{user_id}/{role_id}","/resetpassword","/passwordValidity","/home/resetPassword","/home/resetPassword/{email}","/home/resetPassword/**","/sendEmail","/sendpass/{user}/{user_id}","/sendpass/**","/validatePassword","/validateCode").permitAll()
                        .requestMatchers("/register","/js/**","/resources/**", "/static/**", "/css/**", "/js/**", "/images/**", "/error", "/dist/**").permitAll()
                        .requestMatchers(HttpMethod.DELETE).permitAll()
                        .anyRequest().authenticated()


                )
                .formLogin((form) -> form
                        .loginPage("/")
                        .permitAll()
                        .usernameParameter(("user_username"))
                        .passwordParameter("user_password")
                )
                .logout((logout) -> logout.permitAll());
        http
            .csrf().disable();
        return http.build();
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/js/**").addResourceLocations("classpath:/static/js/");
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**").allowedMethods("GET", "PUT", "POST", "DELETE",
                "PATCH", "OPTIONS", "HEAD");
    }
}