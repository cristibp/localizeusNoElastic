package com.localizeus.core.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class ProjectHistoryMapperTest {

    private ProjectHistoryMapper projectHistoryMapper;

    @BeforeEach
    public void setUp() {
        projectHistoryMapper = new ProjectHistoryMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(projectHistoryMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(projectHistoryMapper.fromId(null)).isNull();
    }
}
