package com.localizeus.core.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class ApiKeyMapperTest {

    private ApiKeyMapper apiKeyMapper;

    @BeforeEach
    public void setUp() {
        apiKeyMapper = new ApiKeyMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(apiKeyMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(apiKeyMapper.fromId(null)).isNull();
    }
}
