package com.postit.postit.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;

import java.util.ArrayList;
import java.util.Collection;

@Setter
@Getter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@RequiredArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty @Column(unique = true, nullable = false)
    private String email;
    @NonNull
    private String name;

    @OneToMany
    @JoinColumn(name = "author_id")
//    @JsonIgnore
//    @Cascade(CascadeType.ALL)
//    @OneToMany(fetch = FetchType.EAGER, mappedBy = "parent")

    public Collection<Post> posts = new ArrayList<>();

    public User(Long id, String email, String name) {
        this.id = id;
        this.email = email;
        this.name = name;
    }
}
