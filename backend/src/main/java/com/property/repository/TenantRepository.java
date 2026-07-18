package com.property.repository;

import com.property.model.Tenant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TenantRepository extends JpaRepository<Tenant, Long> {
    List<Tenant> findByPropertyId(Long propertyId);
    Optional<Tenant> findByUserIdAndPropertyId(Long userId, Long propertyId);
}
