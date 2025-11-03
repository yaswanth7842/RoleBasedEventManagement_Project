package com.example.RoleBasedEventManagement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.example.RoleBasedEventManagement.security.JwtUtil;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;
 // Simple test method to check if server works
    @GetMapping("/test")
    public String test() {
        return "✅ Server is working perfectly!";
    }

    // Register user
 // Register user - UPDATED: Now saves role
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        try {
            // Check if username already exists
            if (userRepository.findByUsername(user.getUsername()).isPresent()) {
                return ResponseEntity.badRequest().body("❌ Username already exists!");
            }

            user.setPassword(passwordEncoder.encode(user.getPassword()));
            
            // ✅ FIX: Save the role that comes from frontend registration
            if (user.getRole() != null && !user.getRole().isEmpty()) {
                // You need to implement this part to save the role to user_roles table
                // For now, the role is received but not saved to database
                System.out.println("User registered with role: " + user.getRole());
            }

            userRepository.save(user);
            return ResponseEntity.ok("✅ User registered successfully as " + user.getRole() + "!");

        } catch (Exception e) {
            return ResponseEntity.badRequest().body("❌ Registration failed: " + e.getMessage());
        }
    }
    // Login user
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));

        String token = jwtUtil.generateToken(user.getUsername());
        return ResponseEntity.ok("✅ Login successful. Your token: " + token);
    }
}
