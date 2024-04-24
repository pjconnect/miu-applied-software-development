package com.postit.postit.repository;

import com.postit.postit.model.Post;
import com.postit.postit.model.User;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Collection;

public interface UserRepository extends JpaRepository<User, Long> {

    @Query("select s from User as s where s.id = :id")
    User getPostsByUserId(int id);

    @Query("select s.posts from User as s where s.id = :id")
    Collection<Post> getPostsByUserId(long id, PageRequest page);

}
