package com.property.controller;

import com.property.model.Property;
import com.property.repository.PropertyRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/properties")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class PropertyController {
    private final PropertyRepository propertyRepository;

    public PropertyController(PropertyRepository propertyRepository) {
        this.propertyRepository = propertyRepository;
    }

    @PostMapping
    public ResponseEntity<Property> createProperty(@RequestBody Property property, Authentication auth) {
        try {
            Property saved = propertyRepository.save(property);
            return ResponseEntity.status(HttpStatus.CREATED).body(saved);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<Property>> getAllProperties(Authentication auth) {
        Long userId = (Long) auth.getDetails();
        List<Property> properties = propertyRepository.findByOwnerId(userId);
        return ResponseEntity.ok(properties);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Property> getProperty(@PathVariable Long id) {
        return propertyRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Property> updateProperty(@PathVariable Long id, @RequestBody Property property) {
        return propertyRepository.findById(id)
                .map(existing -> {
                    property.setId(id);
                    Property updated = propertyRepository.save(property);
                    return ResponseEntity.ok(updated);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProperty(@PathVariable Long id) {
        if (propertyRepository.existsById(id)) {
            propertyRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
