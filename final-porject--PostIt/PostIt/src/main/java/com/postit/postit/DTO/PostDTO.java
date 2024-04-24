package com.postit.postit.DTO;

import com.postit.postit.model.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class PostDTO {
    int Id;
    String description;
    User author;
    int totalLikes;
}
