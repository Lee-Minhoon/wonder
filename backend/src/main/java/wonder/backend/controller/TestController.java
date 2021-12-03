package wonder.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import wonder.backend.domain.User;
import wonder.backend.repository.UserRepository;

@Controller
public class TestController {
    @GetMapping("/test/login")
    public String login() {
        return "login";
    }
}
