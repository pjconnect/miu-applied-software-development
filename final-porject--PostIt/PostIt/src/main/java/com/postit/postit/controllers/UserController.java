package com.postit.postit.controllers;

import com.postit.postit.model.User;
import com.postit.postit.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.List;

@RestController
@RequestMapping("/user")
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
    public User createUser( @RequestBody User user){
        var u = new User(null, user.getEmail(), "ff");
        userRepository.save(u);
        return u;
    }
}
