package com.postit.postit.controllers;

import com.postit.postit.model.User;
import com.postit.postit.repository.UserRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;
import java.util.List;

@RestController
public class UserController {

    private final UserRepository userRepository;

    UserController(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<User> getStudent(){
        return userRepository.findAll();
    }

    @PostMapping
    public User createUser(@RequestBody User user){
        userRepository.save(user);
        return userRepository.getReferenceById(1l);
    }
}
