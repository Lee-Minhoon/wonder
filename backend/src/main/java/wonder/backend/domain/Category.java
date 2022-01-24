package wonder.backend.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity @Getter @Setter @NoArgsConstructor
public class Category {
    @Id
    private Long id;
    private Long parentId;
    private String name;
}
