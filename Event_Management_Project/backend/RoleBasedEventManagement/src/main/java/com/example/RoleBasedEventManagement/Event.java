package com.example.RoleBasedEventManagement;

import jakarta.persistence.*;

@Entity
@Table(name = "events")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String eventName;
    private String location;
    private String date;
    private String description;

    @ManyToOne
    @JoinColumn(name = "created_by")
    private User createdBy;

    // ✅ Default constructor
    public Event() {}

    // ✅ All-args constructor
    public Event(Long id, String eventName, String location, String date, String description, User createdBy) {
        this.id = id;
        this.eventName = eventName;
        this.location = location;
        this.date = date;
        this.description = description;
        this.createdBy = createdBy;
    }

    // ✅ Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEventName() {
        return eventName;
    }

    public void setEventName(String eventName) {
        this.eventName = eventName;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public User getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(User createdBy) {
        this.createdBy = createdBy;
    }
}
