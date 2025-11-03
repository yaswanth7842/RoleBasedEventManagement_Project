package com.example.RoleBasedEventManagement;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    // Protected endpoint
    @GetMapping("/user/test")
    public String testProtected() {
        return "🔐 Access granted! You are authenticated successfully!";
    }
}
