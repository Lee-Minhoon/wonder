package wonder.backend.repository;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import wonder.backend.domain.User;

import javax.sql.DataSource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

public class JdbcTemplateUserRepository implements UserRepository {
    private final JdbcTemplate jdbcTemplate;

    public JdbcTemplateUserRepository(DataSource dataSource) {
        jdbcTemplate = new JdbcTemplate(dataSource);
    }

    @Override
    public User save(User user) {
        SimpleJdbcInsert jdbcInsert = new SimpleJdbcInsert(jdbcTemplate);
        jdbcInsert.withTableName("user").usingGeneratedKeyColumns("number");

        Map<String, Object> parameters = new HashMap<>();
        parameters.put("id", user.getId());
        parameters.put("password", user.getPassword());
        parameters.put("nickname", user.getNickname());

        Number key = jdbcInsert.executeAndReturnKey(new MapSqlParameterSource(parameters));
        user.setNumber(key.longValue());

        return user;
    }

    @Override
    public Optional<User> findByNumber(Long number) {
        List<User> result = jdbcTemplate.query("select * from user where number= ?", memberRowMapper(), number);
        return result.stream().findAny();
    }

    @Override
    public Optional<User> findById(String id) {
        List<User> result = jdbcTemplate.query("select * from user where id = ?", memberRowMapper(), id);
        return result.stream().findAny();
    }

    @Override
    public List<User> findAll() {
        return jdbcTemplate.query("select * from user", memberRowMapper());
    }

    private RowMapper<User> memberRowMapper() {
        return (rs, rowNum) -> {
            User member = new User();

            return member;
        };
    }

}
