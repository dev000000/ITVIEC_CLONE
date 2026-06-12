package com.dev001.itviec.entity.cvfile;

import jakarta.persistence.Access;
import jakarta.persistence.AccessType;
import jakarta.persistence.Basic;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
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
@Table(name = "cv_files")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CvFile extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;

    @Column(name = "file_name", nullable = false, columnDefinition = "VARCHAR(255)")
    String fileName;

    @Column(name = "content_type", nullable = false, columnDefinition = "VARCHAR(100)")
    String contentType;

    @Column(nullable = false)
    long size;

    @Lob
    @Basic(fetch = FetchType.LAZY)
    @Access(AccessType.FIELD)
    @Column(name = "cv_data", nullable = false, columnDefinition = "LONGBLOB")
    byte[] data;
}
