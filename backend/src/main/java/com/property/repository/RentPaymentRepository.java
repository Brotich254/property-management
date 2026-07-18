package com.property.repository;

import com.property.model.RentPayment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RentPaymentRepository extends JpaRepository<RentPayment, Long> {
    List<RentPayment> findByTenantId(Long tenantId);
    List<RentPayment> findByPropertyId(Long propertyId);
    List<RentPayment> findByPropertyIdAndStatus(Long propertyId, RentPayment.PaymentStatus status);
}
