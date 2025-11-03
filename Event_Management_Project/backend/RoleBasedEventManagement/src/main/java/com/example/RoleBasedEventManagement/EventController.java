package com.example.RoleBasedEventManagement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/events")
public class EventController {

    @Autowired
    private EventRepository eventRepository;

    // ✅ Create Event
    @PostMapping("/add")
    public ResponseEntity<?> createEvent(@RequestBody Event event) {
        eventRepository.save(event);
        return ResponseEntity.ok("✅ Event created successfully!");
    }

    // ✅ Get All Events
    @GetMapping("/all")
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    // ✅ Delete Event
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteEvent(@PathVariable Long id) {
        eventRepository.deleteById(id);
        return ResponseEntity.ok("🗑️ Event deleted successfully!");
    }
}
