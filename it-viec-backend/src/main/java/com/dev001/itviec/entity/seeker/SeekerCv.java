package com.dev001.itviec.entity.seeker;

import jakarta.persistence.*;

import com.dev001.itviec.entity.base.BaseEntity;
import com.dev001.itviec.entity.cvfile.CvFile;

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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seeker_id", nullable = false)
    Seeker seeker;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cv_file_id", nullable = false)
    CvFile cvFile;

    @Column(name = "is_primary", nullable = false)
    @Builder.Default
    boolean isPrimary = false;
}
