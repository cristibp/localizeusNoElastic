package com.localizeus.core.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class PlanMapperTest {

    private PlanMapper planMapper;

    @BeforeEach
    public void setUp() {
        planMapper = new PlanMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(planMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(planMapper.fromId(null)).isNull();
    }
}
