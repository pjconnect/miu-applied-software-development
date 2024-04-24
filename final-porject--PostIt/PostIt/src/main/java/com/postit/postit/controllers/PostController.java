package com.postit.postit.controllers;

import com.postit.postit.DTO.PostDTO;
import com.postit.postit.DTO.UserDTO;
import com.postit.postit.model.Post;
import com.postit.postit.model.User;
import com.postit.postit.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

import java.awt.print.Pageable;
import java.util.Collection;

@RestController
@RequestMapping("/post")
public class PostController {

    @Autowired

    private UserRepository userRepository;

    @PostMapping("/")
    public void Create(){

    }

    @GetMapping("/user/{id}")
    public Collection <PostDTO> GetAll(@PathVariable Long id){
        var x = userRepository.getPostsByUserId(id, PageRequest.of(0, 10))
                .stream()
                .map(t -> new PostDTO(t.getId(), t.getDescription(), new User(t.getAuthor().getId(), t.getAuthor().getEmail(), t.getAuthor().getName()), t.getTotalLikes()))
                .toList()
                ;
        return x;
    }
}
