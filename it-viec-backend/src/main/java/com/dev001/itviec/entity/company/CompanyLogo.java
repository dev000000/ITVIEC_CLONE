package com.dev001.itviec.entity.company;

import jakarta.persistence.Access;
import jakarta.persistence.AccessType;
import jakarta.persistence.Basic;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

import com.dev001.itviec.entity.base.BaseEntity;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "company_logos")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CompanyLogo extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id", nullable = false, unique = true)
    Company company;

    @Column(name = "file_name", nullable = false, columnDefinition = "VARCHAR(255)")
    String fileName;

    @Column(name = "content_type", nullable = false, columnDefinition = "VARCHAR(100)")
    String contentType;

    @Column(nullable = false)
    long size;

    @Lob
    @Basic(fetch = FetchType.LAZY)
    @Access(AccessType.FIELD)
    @Column(name = "logo_data", nullable = false, columnDefinition = "LONGBLOB")
    byte[] data;
}
