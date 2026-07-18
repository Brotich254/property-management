package com.property.repository;

import com.property.model.MaintenanceRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MaintenanceRequestRepository extends JpaRepository<MaintenanceRequest, Long> {
    List<MaintenanceRequest> findByPropertyId(Long propertyId);
    List<MaintenanceRequest> findByPropertyIdAndStatus(Long propertyId, MaintenanceRequest.Status status);
    List<MaintenanceRequest> findByTenantId(Long tenantId);
}
