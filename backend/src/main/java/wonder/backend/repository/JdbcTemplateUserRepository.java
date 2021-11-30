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
        List<User> result = jdbcTemplate.query("select * from user where number= ?", userRowMapper(), number);
        return result.stream().findAny();
    }

    @Override
    public Optional<User> findById(String id) {
        List<User> result = jdbcTemplate.query("select * from user where id = ?", userRowMapper(), id);
        return result.stream().findAny();
    }

    @Override
    public Optional<User> findByPassword(String id, String password) {
        List<User> result = jdbcTemplate.query("select * from user where id = ? and password = ?", userRowMapper(), id, password);
        return result.stream().findAny();
    }

    @Override
    public List<User> findAll() {
        return jdbcTemplate.query("select * from user", userRowMapper());
    }

    private RowMapper<User> userRowMapper() {
        return (rs, rowNum) -> {
            User user = new User();
            user.setNumber(rs.getLong("number"));
            user.setId(rs.getString("id"));
            user.setPassword(rs.getString("password"));
            user.setNickname(rs.getString("nickname"));
            return user;
        };
    }

}
