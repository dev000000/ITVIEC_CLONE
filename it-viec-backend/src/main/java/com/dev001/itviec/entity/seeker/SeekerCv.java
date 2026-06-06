package com.dev001.itviec.entity.seeker;

import jakarta.persistence.*;

import com.dev001.itviec.entity.base.BaseEntity;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "seeker_cvs")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SeekerCv extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seeker_id", nullable = false, unique = true)
    Seeker seeker;

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
