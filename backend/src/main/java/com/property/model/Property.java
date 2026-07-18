package com.property.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "properties")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Property {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    private String city;

    @Column(nullable = false)
    private String state;

    @Column(nullable = false)
    private String zipCode;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private BigDecimal monthlyRent;

    @Column(nullable = false)
    private Integer bedrooms;

    @Column(nullable = false)
    private Integer bathrooms;

    @Column(nullable = false)
    private Double squareFeet;

    @ManyToOne
    @JoinColumn(name = "owner_id", nullable = false)
    private User owner;

    @OneToMany(mappedBy = "property", cascade = CascadeType.ALL)
    private List<Tenant> tenants = new ArrayList<>();

    @OneToMany(mappedBy = "property", cascade = CascadeType.ALL)
    private List<MaintenanceRequest> maintenanceRequests = new ArrayList<>();

    @OneToMany(mappedBy = "property", cascade = CascadeType.ALL)
    private List<RentPayment> rentPayments = new ArrayList<>();

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
